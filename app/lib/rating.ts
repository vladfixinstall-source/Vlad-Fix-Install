// Single source of truth for the rating shown across the site.
// Count-weighted average across all platforms with at least one review.

import type { ReviewPlatform } from "./platforms";

export type AggregateRating = { rating: number; count: number };

export function computeAggregateRating(platforms: ReviewPlatform[]): AggregateRating {
  const active = platforms.filter((p) => p.count > 0);
  if (active.length === 0) return { rating: 0, count: 0 };
  const totalCount = active.reduce((s, p) => s + p.count, 0);
  const totalScore = active.reduce((s, p) => s + p.rating * p.count, 0);
  return { rating: totalScore / totalCount, count: totalCount };
}
