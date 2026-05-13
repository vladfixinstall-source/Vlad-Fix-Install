// "Meet Vlad" — owner photo, bio, highlights and a CTA back to the form.

import { OWNER } from "../../../lib/content";
import type { AggregateRating } from "../../../lib/rating";
import { CheckIcon } from "../../icons";
import { Stars } from "../../Stars";
import styles from "./About.module.css";

export function About({ aggregate }: { aggregate: AggregateRating | null }) {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <div className={styles.photoFrame}>
            <div
              className={styles.photo}
              style={{ backgroundImage: `url(${OWNER.photo})` }}
              role="img"
              aria-label={`Photo of ${OWNER.name}`}
            />
          </div>
          {aggregate === null ? (
            <div className={styles.badgeSkeleton}>
              <div className={styles.badgeRow}>
                <span className={styles.skeletonBarLg} />
                <span className={styles.skeletonBarSm} />
              </div>
              <span className={styles.skeletonBarThin} />
            </div>
          ) : aggregate.count > 0 ? (
            <div className={styles.badge}>
              <div className={styles.badgeRow}>
                <Stars n={aggregate.rating} />
                <span className={styles.badgeNumber}>{aggregate.rating.toFixed(1)}</span>
              </div>
              <p className={styles.badgeSub}>From {aggregate.count} verified reviews</p>
            </div>
          ) : null}
        </div>
        <div className={styles.rightCol}>
          <p className={styles.eyebrow}>Meet {OWNER.name}</p>
          <h2 className={styles.heading}>{OWNER.tagline}</h2>
          <div className={styles.bio}>
            {OWNER.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className={styles.highlights}>
            {OWNER.highlights.map((h) => (
              <li key={h} className={styles.highlightItem}>
                <span className={styles.highlightIcon}>
                  <CheckIcon />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <a href="#contact" className={`btn-primary ${styles.cta}`}>
            Get in touch with me
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
