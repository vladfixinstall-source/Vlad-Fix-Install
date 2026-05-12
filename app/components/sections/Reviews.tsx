"use client";

// Reviews section — owns its own fetch of individual customer testimonials
// from the Google Sheet (with static REVIEWS as fallback). The trust-widget
// strip (Thumbtack + Google cards) is driven by `platforms` passed in from
// Home; null = still loading → skeleton cards.

import { useEffect, useState } from "react";
import { REVIEWS } from "../../lib/content";
import type { Review } from "../../lib/content";
import type { ReviewPlatform } from "../../lib/platforms";
import { REVIEWS_SHEET_ID, fetchSheetReviews } from "../../lib/sheet";
import { HorizontalSlider } from "../HorizontalSlider";
import { ReviewPlatformCard, ReviewPlatformSkeleton } from "../ReviewPlatformCard";
import { Stars } from "../Stars";

export function Reviews({ platforms }: { platforms: ReviewPlatform[] | null }) {
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
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Client stories</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Trusted by homeowners across the area.
          </h2>
        </div>
        <div className="mb-12 grid gap-4 md:grid-cols-2">
          {platforms === null
            ? Array.from({ length: 2 }).map((_, i) => (
                <ReviewPlatformSkeleton key={i} />
              ))
            : platforms.map((p) => (
                <ReviewPlatformCard key={p.name} platform={p} />
              ))}
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
