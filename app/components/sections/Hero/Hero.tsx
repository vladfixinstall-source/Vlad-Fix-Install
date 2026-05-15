// Hero — value proposition, primary CTAs, the first contact form and
// the trust-signal row.

import { ContactForm } from "../../ContactForm";
import { Stars } from "../../Stars";
import type { AggregateRating } from "../../../lib/rating";
import styles from "./Hero.module.css";

export function Hero({ aggregate }: { aggregate: AggregateRating | null }) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <p className={styles.pill}>
            <span>Trusted San Diego Handyman</span>
            <span className={styles.pillPart2}>4+ Years of Quality Installs</span>
          </p>
          <h1 className={styles.h1}>
            Fix it. Install it. <span className={styles.h1Accent}>Done right.</span>
          </h1>
          <p className={styles.sub}>
            TV mounting, smart locks, ceiling fans, faucets, shelves and every
            small repair in between — handled by one focused pro with four years
            of dedicated install experience. Honest pricing, clean work, and a
            workmanship guarantee on every job.
          </p>
          <div className={styles.ctaRow}>
            <a href="#contact" className={`btn-primary ${styles.ctaPrimary}`}>
              Get Free Estimate
            </a>
            <a href="#services" className={styles.ctaSecondary}>
              See Services
            </a>
          </div>
          <div className={styles.trustRow}>
            {aggregate === null ? (
              <div className={styles.trustRating}>
                <span className={styles.skeletonStars} />
                <span className={styles.skeletonText} />
              </div>
            ) : aggregate.count > 0 ? (
              <div className={styles.trustRating}>
                <Stars n={aggregate.rating} />
                <span className={styles.trustNumber}>{aggregate.rating.toFixed(1)}</span>
                <span>· {aggregate.count} verified reviews</span>
              </div>
            ) : null}
            <div>Fully insured</div>
            <div>Same-day booking</div>
            <div>Workmanship guarantee</div>
          </div>
        </div>
        <div className={styles.rightCol}>
          <ContactForm id="hero-form" />
        </div>
      </div>
    </section>
  );
}
