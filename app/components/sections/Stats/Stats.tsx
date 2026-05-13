// Four big stat numbers. Slot 3 (Average rating) is computed at runtime
// from the aggregate; shows a skeleton while platforms are still loading.

import { ReactNode } from "react";
import { STATS_BASE } from "../../../lib/content";
import type { AggregateRating } from "../../../lib/rating";
import styles from "./Stats.module.css";

type StatCell = { num: ReactNode; label: string };

export function Stats({ aggregate }: { aggregate: AggregateRating | null }) {
  const ratingCell: StatCell =
    aggregate === null
      ? {
          num: <span className={styles.skeletonNum} />,
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
    <section className={styles.section}>
      <div className={styles.grid}>
        {cells.map((s) => (
          <div key={s.label} className={styles.cell}>
            <div className={styles.num}>{s.num}</div>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
