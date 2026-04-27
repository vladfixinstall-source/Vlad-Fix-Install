"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";

const SERVICES = [
  { title: "TV Mounting (All Sizes)", desc: "Any size, any wall — drywall, brick or concrete. Cables hidden, screen perfectly level." },
  { title: "Door Installation & Repair", desc: "Interior and exterior doors, hinge fixes, alignment, weather-stripping and lockset prep." },
  { title: "Lock Installation & Replacement", desc: "Deadbolts, smart locks and rekeying — modern hardware installed and tested in minutes." },
  { title: "Ceiling Fan Installation & Replacement", desc: "Safe wiring, balanced mounting and remote setup for any ceiling height." },
  { title: "Picture & Mirror Hanging", desc: "Precise placement with the right anchors for drywall, plaster, tile or brick." },
  { title: "Curtain & Blinds Installation", desc: "Rods, tracks and blinds installed clean, level and ready to use." },
  { title: "Shelf Installation", desc: "Floating, bracketed or built-in shelving — anchored to studs and load-rated." },
  { title: "Doorbell Installation (Video Doorbells)", desc: "Wired and battery video doorbells, configured to your Wi-Fi and chime." },
  { title: "Garbage Disposal Installation & Replacement", desc: "Quick swap-outs and new installs with leak-free plumbing connections." },
  { title: "Faucet Installation & Replacement", desc: "Kitchen and bathroom faucets, supply lines and shut-off valves done right." },
  { title: "Caulking & Sealing", desc: "Bathroom, kitchen and window seals — fresh, watertight and mold-resistant." },
  { title: "General Handyman Services", desc: "Small jobs and odd tasks — one trusted person to take the whole punch list." },
  { title: "Home Maintenance & Repairs", desc: "Scheduled tune-ups and on-call repairs that keep your home in top shape." },
];

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Something else"];

const STATS = [
  { num: "10+", label: "Years on the job" },
  { num: "3,500", label: "Jobs completed" },
  { num: "4.9★", label: "Average rating" },
  { num: "Same-Day", label: "Booking available" },
];

const PROJECTS = [
  { src: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=900&q=80", label: "75\" TV Mount on Brick" },
  { src: "https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=80", label: "Smart Lock Upgrade" },
  { src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80", label: "Ceiling Fan Replacement" },
  { src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80", label: "Floating Shelves Build" },
  { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=80", label: "Faucet Replacement" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80", label: "Bathroom Re-Caulking" },
];

type Review = {
  name: string;
  rating: number;   // 1–5; defaults to 5 if missing/invalid
  service: string;  // e.g. "TV Mounting" — shown as small label above the quote
  date: string;     // free-form, e.g. "March 12, 2025"
  text: string;
};

const REVIEWS: Review[] = [
  { name: "Jennifer M.", rating: 5, service: "TV Mounting + Shelf Installation", date: "March 12, 2025", text: "Booked Vlad for a TV mount and three shelves. He was on time, clean, and finished in one visit. New go-to handyman." },
  { name: "Robert K.", rating: 5, service: "Faucet Installation & Caulking", date: "February 28, 2025", text: "Replaced both bathroom faucets and re-caulked the tubs in an afternoon. No mess, no surprises on the bill." },
  { name: "Lauren P.", rating: 5, service: "Smart Lock + Video Doorbell", date: "January 15, 2025", text: "Smart lock and video doorbell installed and configured to my phone. Walked me through everything before leaving." },
];

// Google Sheet ID that powers the live Reviews section.
// Set NEXT_PUBLIC_REVIEWS_SHEET_ID in .env.local (or the deployment platform).
// See .env.example and the README for setup. Leave unset to keep the static
// REVIEWS list above as the only source.
const REVIEWS_SHEET_ID = process.env.NEXT_PUBLIC_REVIEWS_SHEET_ID ?? "";

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

async function fetchSheetReviews(sheetId: string): Promise<Review[]> {
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

function Stars({ n }: { n: number }) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return (
    <span aria-label={`${full} out of 5 stars`} className="inline-flex select-none tracking-wide">
      <span className="text-amber-500">{"★".repeat(full)}</span>
      <span className="text-slate-300">{"★".repeat(5 - full)}</span>
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-blue-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M16.704 5.296a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.29-7.29a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ServiceSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="service" value={value} required />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-slate-300 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value || "I'm interested in..."}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        role="listbox"
        className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-72 origin-top overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 transition duration-150 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {SERVICE_OPTIONS.map((label) => {
          const selected = value === label;
          return (
            <button
              type="button"
              key={label}
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(label);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                selected
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{label}</span>
              {selected && <CheckIcon />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HorizontalSlider({
  children,
  label,
  fadeColor = "white",
}: {
  children: React.ReactNode;
  label: string;
  fadeColor?: "white" | "slate";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Re-evaluate when slides are added/removed (e.g. reviews loaded async).
    const mo = new MutationObserver(update);
    mo.observe(el, { childList: true });
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mo.disconnect();
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-slide]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const fadeFromLeft =
    fadeColor === "slate" ? "from-slate-50" : "from-white";
  const fadeFromRight =
    fadeColor === "slate" ? "from-slate-50" : "from-white";

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 py-4"
      >
        {children}
      </div>

      {/* Edge fades — hint that more content exists in that direction */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -left-6 w-16 bg-gradient-to-r ${fadeFromLeft} to-transparent transition-opacity duration-200 ${
          canPrev ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -right-6 w-16 bg-gradient-to-l ${fadeFromRight} to-transparent transition-opacity duration-200 ${
          canNext ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating arrow buttons — sit on top of cards, vertically centered */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className={`absolute left-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/10 transition hover:text-blue-700 hover:shadow-xl md:h-12 md:w-12 ${
          canPrev ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 01-1.06 1.06l-4.25-4.24a.75.75 0 010-1.06l4.25-4.24a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next"
        className={`absolute right-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/10 transition hover:text-blue-700 hover:shadow-xl md:h-12 md:w-12 ${
          canNext ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [loading, setLoading] = useState<boolean>(Boolean(REVIEWS_SHEET_ID));

  useEffect(() => {
    if (!REVIEWS_SHEET_ID) return;
    let cancelled = false;
    fetchSheetReviews(REVIEWS_SHEET_ID)
      .then((r) => { if (!cancelled && r.length) setReviews(r); })
      .catch(() => { /* keep static fallback */ })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Client stories</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Trusted by homeowners across the area.
          </h2>
        </div>
        <HorizontalSlider label="Customer reviews">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  data-slide
                  className="flex w-[300px] shrink-0 animate-pulse snap-start flex-col rounded-2xl border border-slate-200 bg-white p-7 sm:w-[360px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-3 w-20 rounded bg-slate-200" />
                  </div>
                  <div className="mt-3 h-3 w-32 rounded bg-slate-200" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-5/6 rounded bg-slate-200" />
                    <div className="h-3 w-2/3 rounded bg-slate-200" />
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                  </div>
                </div>
              ))
            : reviews.map((r, i) => (
                <div
                  key={`${r.name}-${i}`}
                  data-slide
                  className="flex w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-7 sm:w-[360px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Stars n={r.rating} />
                    {r.date && (
                      <span className="text-xs font-medium text-slate-400">{r.date}</span>
                    )}
                  </div>
                  {r.service && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
                      {r.service}
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-slate-700">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="font-semibold text-slate-900">{r.name}</p>
                  </div>
                </div>
              ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}

function ContactForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [service, setService] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-7 shadow-xl ring-1 ring-slate-200 md:p-8"
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-slate-900">Request a Free Estimate</h3>
        <p className="mt-1 text-sm text-slate-500">
          We respond to every inquiry within one business day.
        </p>
      </div>
      {sent ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-700">
          ✓ Thank you — we&apos;ll reach out shortly to schedule your visit.
        </div>
      ) : (
        <div className="grid gap-3">
          <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
            <input
              required
              name="firstName"
              placeholder="First name"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
            <input
              required
              name="lastName"
              placeholder="Last name"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          />
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          />
          <ServiceSelect value={service} onChange={setService} />
          <textarea
            name="msg"
            rows={4}
            placeholder="Tell us about your project (optional)"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          />
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Get My Free Estimate
          </button>
        </div>
      )}
    </form>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-700 font-bold text-white">V</span>
            <span className="text-xl font-bold tracking-tight">Vlad Fix &amp; Install</span>
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-slate-700 lg:flex">
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#process" className="hover:text-blue-700">Our Process</a>
            <a href="#portfolio" className="hover:text-blue-700">Portfolio</a>
            <a href="#reviews" className="hover:text-blue-700">Reviews</a>
            <a href="#contact" className="hover:text-blue-700">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 md:inline-block"
          >
            Free Estimate
          </a>
        </div>
      </header>

      {/* HERO + form #1 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Your Trusted Local Handyman · Same-Day Service
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
              Fix it. Install it. <span className="text-blue-700">Done right.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              TV mounting, smart locks, ceiling fans, faucets, shelves and every
              small repair in between — handled by one reliable pro. Honest pricing,
              clean work, and a workmanship guarantee on every job.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Get Free Estimate
              </a>
              <a
                href="#services"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                See Services
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">★★★★★</span>
                <span className="font-semibold text-slate-900">4.9</span> on Google
              </div>
              <div>Licensed &amp; insured</div>
              <div>Same-day booking</div>
              <div>Workmanship guarantee</div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ContactForm id="hero-form" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Our Services</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Everything your home needs — one trusted pro.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From a single TV mount to a full punch list, every job is handled
              with the same care, cleanliness and workmanship guarantee.
            </p>
          </div>
          <HorizontalSlider label="Our services">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                data-slide
                className="group flex w-[280px] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-200 hover:shadow-xl sm:w-[320px]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-lg font-bold text-blue-700">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-slate-600">{s.desc}</p>
                <a href="#contact" className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                  Book this service <span className="ml-1 transition group-hover:translate-x-1">→</span>
                </a>
              </div>
            ))}
          </HorizontalSlider>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-y border-slate-100 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">How we work</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">A simple, four-step process.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { t: "Request", d: "Send a quick message with what you need — photos help us quote faster." },
              { t: "Quote", d: "Clear, upfront pricing. No surprises and no high-pressure sales." },
              { t: "Schedule", d: "Pick a time that works — same-day and weekend slots usually open." },
              { t: "Done Right", d: "Clean, careful work and a guarantee on everything we install or fix." },
            ].map((step, i) => (
              <div key={step.t} className="relative rounded-2xl bg-white p-7 ring-1 ring-slate-200">
                <div className="text-5xl font-bold text-blue-700/20">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{step.t}</h3>
                <p className="mt-2 text-slate-600">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl font-bold tracking-tight text-blue-700 md:text-6xl">{s.num}</div>
              <div className="mt-2 text-sm font-medium text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="border-y border-slate-100 bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Recent jobs</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Our portfolio</h2>
            </div>
            <a href="#contact" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              Book your job →
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <div key={i} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${p.src})` }}
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Recent Job</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{p.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* CONTACT FORM #2 */}
      <section id="contact" className="bg-blue-700 py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Get started</p>
            <h2 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Got something to fix or install? Let&apos;s get it done.
            </h2>
            <p className="mt-5 max-w-md text-lg text-blue-100">
              Send a quick message with what you need. Most jobs are quoted the
              same day and scheduled within 24–48 hours.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Phone</p>
                <a href="tel:+17636205151" className="mt-1 block text-xl font-bold">(763) 620-5151</a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Email</p>
                <a href="mailto:hello@vladfixinstall.com" className="mt-1 block text-lg font-semibold">
                  hello@vladfixinstall.com
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Service area</p>
                <p className="mt-1">Twin Cities &amp; surrounding suburbs</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Hours</p>
                <p className="mt-1">Mon–Sat 9am–9pm<br/>Sun 11am–7pm</p>
              </div>
            </div>
          </div>
          <ContactForm id="footer-form" compact />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded bg-blue-700 text-xs font-bold text-white">V</span>
            <span>© {new Date().getFullYear()} Vlad Fix &amp; Install · Licensed &amp; insured</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
