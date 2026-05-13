"use client";

// Reviews section — owns its own fetch of individual customer testimonials
// from the Google Sheet (with static REVIEWS as fallback). The trust-widget
// strip (Thumbtack + Google cards) is driven by `platforms` passed in from
// Home; null = still loading → skeleton cards.

import { useEffect, useState } from "react";
import { REVIEWS } from "../../../lib/content";
import type { Review } from "../../../lib/content";
import type { ReviewPlatform } from "../../../lib/platforms";
import { REVIEWS_SHEET_ID, fetchSheetReviews } from "../../../lib/sheet";
import { HorizontalSlider } from "../../HorizontalSlider";
import { ReviewPlatformCard, ReviewPlatformSkeleton } from "../../ReviewPlatformCard";
import { Stars } from "../../Stars";
import styles from "./Reviews.module.css";

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
    <section id="reviews" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Client stories</p>
          <h2 className={styles.heading}>Trusted by homeowners across the area.</h2>
        </div>
        <div className={styles.platformGrid}>
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
                <div key={i} data-slide className={styles.skeleton}>
                  <div className={styles.skeletonHeader}>
                    <div className={styles.skeletonStars} />
                    <div className={styles.skeletonDate} />
                  </div>
                  <div className={styles.skeletonService} />
                  <div className={styles.skeletonTextBlock}>
                    <div className={styles.skeletonTextLine1} />
                    <div className={styles.skeletonTextLine2} />
                    <div className={styles.skeletonTextLine3} />
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.skeletonName} />
                  </div>
                </div>
              ))
            : reviews.map((r, i) => (
                <div key={`${r.name}-${i}`} data-slide className={styles.card}>
                  <div className={styles.cardHeader}>
                    <Stars n={r.rating} />
                    {r.date && <span className={styles.cardDate}>{r.date}</span>}
                  </div>
                  {r.service && <p className={styles.cardService}>{r.service}</p>}
                  <p className={styles.cardText}>&ldquo;{r.text}&rdquo;</p>
                  <div className={styles.cardFooter}>
                    <p className={styles.cardName}>{r.name}</p>
                  </div>
                </div>
              ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
