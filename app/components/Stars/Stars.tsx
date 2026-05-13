// Renders a 1-5 star rating. Rounds to whole stars; clamps to [0, 5].

import styles from "./Stars.module.css";

export function Stars({ n }: { n: number }) {
  const full = Math.max(0, Math.min(5, Math.round(n)));
  return (
    <span aria-label={`${full} out of 5 stars`} className={styles.wrapper}>
      <span className={styles.filled}>{"★".repeat(full)}</span>
      <span className={styles.empty}>{"★".repeat(5 - full)}</span>
    </span>
  );
}
