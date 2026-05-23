// Google Sheets integration — pulls live reviews + platform overrides from
// a public sheet via the gviz endpoint. No backend, no API key.

import type { Review } from "./content";
import type { ReviewPlatform } from "./platforms";

// Sheet that powers both the Reviews slider (default tab) and the platform
// overrides (tab named "Platforms"). Set NEXT_PUBLIC_REVIEWS_SHEET_ID in
// .env.local or the deployment platform's env vars.
export const REVIEWS_SHEET_ID = process.env.NEXT_PUBLIC_REVIEWS_SHEET_ID ?? "";

// Web3Forms access key — issued at https://web3forms.com when an email is
// registered. Form submissions POST to api.web3forms.com/submit with this
// key and are delivered to the registered email. Empty value puts the form
// in offline/demo mode (shows success but doesn't actually send).
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

// ---------- CSV helpers (Reviews tab) ----------

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      rows.push(row); row = [];
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export async function fetchSheetReviews(sheetId: string): Promise<Review[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = parseCSV(await res.text());
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (key: string) => headers.indexOf(key);
  const ni = idx("name");
  const rti = idx("rating");
  const si = idx("service");
  const di = idx("date");
  const ti = idx("text");
  return rows
    .slice(1)
    .map((r) => {
      const ratingRaw = rti >= 0 ? Number((r[rti] ?? "").trim()) : 5;
      const rating = Number.isFinite(ratingRaw) && ratingRaw > 0 ? ratingRaw : 5;
      return {
        name: ni >= 0 ? (r[ni] ?? "").trim() : "",
        rating,
        service: si >= 0 ? (r[si] ?? "").trim() : "",
        date: di >= 0 ? (r[di] ?? "").trim() : "",
        text: ti >= 0 ? (r[ti] ?? "").trim() : "",
      };
    })
    .filter((r) => r.text);
}

// ---------- JSON helpers (Platforms tab) ----------

// Platforms uses gviz JSON (not CSV) on purpose: Sheets sometimes auto-types
// "5.0" as a date and exports it as null in CSV. JSON exposes both the raw
// value `v` and the formatted display `f`, so we can read whatever the user
// actually sees in the cell.
type GvizCell = { v?: string | number | null; f?: string } | null;

function gvizCellString(cell: GvizCell): string {
  if (!cell) return "";
  if (typeof cell.f === "string") return cell.f.trim();
  if (cell.v == null) return "";
  return String(cell.v).trim();
}

function gvizCellNumber(cell: GvizCell): number | undefined {
  const s = gvizCellString(cell);
  if (!s) return undefined;
  // Tolerate locale-formatted decimals like "5,0"
  const n = Number(s.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export async function fetchSheetPlatforms(sheetId: string): Promise<Partial<ReviewPlatform>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Platforms`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();

  // Strip the JSONP wrapper: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const start = text.indexOf("(");
  const end = text.lastIndexOf(")");
  if (start < 0 || end <= start) return [];
  const data = JSON.parse(text.slice(start + 1, end)) as {
    status?: string;
    table?: { cols?: Array<{ label?: string }>; rows?: Array<{ c: GvizCell[] }> };
  };
  if (data.status !== "ok" || !data.table?.rows || !data.table.cols) return [];

  const cols = data.table.cols.map((c) => (c.label ?? "").trim().toLowerCase());
  const ni = cols.indexOf("name");
  const rti = cols.indexOf("rating");
  const ci = cols.indexOf("count");
  const hi = cols.indexOf("href");

  return data.table.rows
    .map<Partial<ReviewPlatform>>((row) => {
      const c = row.c ?? [];
      const href = hi >= 0 ? gvizCellString(c[hi]) : "";
      return {
        name: ni >= 0 ? gvizCellString(c[ni]) : "",
        rating: rti >= 0 ? gvizCellNumber(c[rti]) : undefined,
        count: ci >= 0 ? gvizCellNumber(c[ci]) : undefined,
        href: href || undefined,
      };
    })
    .filter((p) => Boolean(p.name));
}

// Merge sheet overrides on top of in-code defaults. Empty cells fall back to
// the default for that platform; rows whose name doesn't match any default
// are ignored.
export function mergePlatforms(
  defaults: ReviewPlatform[],
  overrides: Partial<ReviewPlatform>[],
): ReviewPlatform[] {
  return defaults.map((d) => {
    const o = overrides.find(
      (x) => x.name?.toLowerCase() === d.name.toLowerCase(),
    );
    if (!o) return d;
    return {
      ...d,
      rating: typeof o.rating === "number" ? o.rating : d.rating,
      count: typeof o.count === "number" ? o.count : d.count,
      href: o.href || d.href,
    };
  });
}
