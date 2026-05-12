// Tiny inline SVG icons shared across components. No deps, no fetch.

export function ChevronIcon({ open }: { open: boolean }) {
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

export function CheckIcon() {
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
