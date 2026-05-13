// Trust-widget card for a single review platform (Thumbtack / Google).

import type { ReviewPlatform } from "../../lib/platforms";
import { Stars } from "../Stars";
import styles from "./ReviewPlatformCard.module.css";

export function ReviewPlatformCard({ platform: p }: { platform: ReviewPlatform }) {
  const hasReviews = p.count > 0;
  const isPlaceholder = !p.href || p.href === "#";

  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        {p.badge}
        <div>
          <p className={styles.cardTitle}>{p.name} Reviews</p>
          {hasReviews ? (
            <div className={styles.cardRatingRow}>
              <span className={styles.cardRatingNumber}>{p.rating.toFixed(1)}</span>
              <Stars n={p.rating} />
              <span className={styles.cardReviewCount}>({p.count})</span>
            </div>
          ) : (
            <p className={styles.cardComingSoon}>Reviews coming soon</p>
          )}
        </div>
      </div>
      {isPlaceholder ? (
        <span aria-disabled="true" className={styles.pillDisabled}>
          Coming soon
        </span>
      ) : (
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.linkButton}
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
    <div className={styles.skeleton}>
      <div className={styles.skeletonLeft}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonTextBlock}>
          <div className={styles.skeletonTitleBar} />
          <div className={styles.skeletonSubBar} />
        </div>
      </div>
      <div className={styles.skeletonButton} />
    </div>
  );
}
