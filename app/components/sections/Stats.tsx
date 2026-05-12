// Four big stat numbers across the page. The "Average rating" cell is
// computed at runtime — slot 3 — and shows a skeleton while platforms
// are loading.

import { ReactNode } from "react";
import { STATS_BASE } from "../../lib/content";
import type { AggregateRating } from "../../lib/rating";

type StatCell = { num: ReactNode; label: string };

export function Stats({ aggregate }: { aggregate: AggregateRating | null }) {
  const ratingCell: StatCell =
    aggregate === null
      ? {
          num: <span className="mx-auto block h-12 w-24 animate-pulse rounded bg-slate-200 md:h-16" />,
          label: "Average rating",
        }
      : {
          num: aggregate.count > 0 ? `${aggregate.rating.toFixed(1)}★` : "—",
          label:
            aggregate.count > 0
              ? `Avg. rating · ${aggregate.count} reviews`
              : "Average rating",
        };

  const cells: StatCell[] = [
    ...STATS_BASE.slice(0, 2),
    ratingCell,
    ...STATS_BASE.slice(2),
  ];

  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {cells.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-5xl font-bold tracking-tight text-blue-700 md:text-6xl">
              {s.num}
            </div>
            <div className="mt-2 text-sm font-medium text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
