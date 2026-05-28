"use client";

// Portfolio gallery — first FEATURED_PROJECT_COUNT photos in a grid; clicking
// any card or the "See all jobs" button opens the Lightbox with the full
// PROJECTS list and the right starting index.

import { useState } from "react";
import { FEATURED_PROJECT_COUNT, PROJECTS } from "../../../lib/content";
import { pushPortfolioView } from "../../../lib/gtm";
import { Lightbox } from "../../Lightbox";
import styles from "./Portfolio.module.css";

export function Portfolio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const featured = PROJECTS.slice(0, FEATURED_PROJECT_COUNT);
  const extra = Math.max(0, PROJECTS.length - FEATURED_PROJECT_COUNT);

  const openLightbox = (index: number) => {
    const photo = PROJECTS[index];
    if (photo) {
      pushPortfolioView({ photo_index: index, photo_label: photo.label });
    }
    setLightboxIndex(index);
  };

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Recent jobs</p>
            <h2 className={styles.heading}>Our portfolio</h2>
          </div>
          <a href="#contact" className={styles.cta}>
            Book your job →
          </a>
        </div>
        <div className={styles.grid}>
          {featured.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              className={styles.card}
              aria-label={`Open photo: ${p.label}`}
            >
              <div className={styles.imageBox}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${p.src})` }}
                />
              </div>
              <div className={styles.caption}>
                <p className={styles.cardEyebrow}>Recent Job</p>
                <h3 className={styles.cardTitle}>{p.label}</h3>
              </div>
            </button>
          ))}
        </div>

        {extra > 0 && (
          <div className={styles.seeMore}>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className={styles.seeMoreBtn}
            >
              See all jobs
              <span className={styles.seeMoreCount}>+{extra} more</span>
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={PROJECTS}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
