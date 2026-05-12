// Trust-widget card for a single review platform (Thumbtack / Google).
// Placeholder state: no reviews yet OR no real href → shows "Coming soon".

import type { ReviewPlatform } from "../lib/platforms";
import { Stars } from "./Stars";

export function ReviewPlatformCard({ platform: p }: { platform: ReviewPlatform }) {
  const hasReviews = p.count > 0;
  const isPlaceholder = !p.href || p.href === "#";

  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        {p.badge}
        <div>
          <p className="font-bold text-slate-900">{p.name} Reviews</p>
          {hasReviews ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900">{p.rating.toFixed(1)}</span>
              <Stars n={p.rating} />
              <span className="text-sm text-slate-500">({p.count})</span>
            </div>
          ) : (
            <p className="mt-1 text-sm text-slate-500">Reviews coming soon</p>
          )}
        </div>
      </div>
      {isPlaceholder ? (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500"
        >
          Coming soon
        </span>
      ) : (
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: p.buttonBg }}
        >
          {p.cta}
        </a>
      )}
    </div>
  );
}

export function ReviewPlatformSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-center gap-4">
        <div className="h-11 w-11 shrink-0 rounded-full bg-slate-200" />
        <div className="space-y-2">
          <div className="h-5 w-36 rounded bg-slate-200" />
          <div className="h-4 w-44 rounded bg-slate-200" />
        </div>
      </div>
      <div className="h-10 w-44 rounded-lg bg-slate-200" />
    </div>
  );
}
