// Portfolio gallery — example job photos with hover-zoom on the image.

import { PROJECTS } from "../../../lib/content";
import styles from "./Portfolio.module.css";

export function Portfolio() {
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
          {PROJECTS.map((p, i) => (
            <div key={i} className={styles.card}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
