// Services slider — full SERVICES list as horizontally-scrollable cards.

import { SERVICES } from "../../../lib/content";
import { HorizontalSlider } from "../../HorizontalSlider";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Our Services</p>
          <h2 className={styles.heading}>Everything your home needs — one trusted pro.</h2>
          <p className={styles.sub}>
            From a single TV mount to a full punch list, every job is handled
            with the same care, cleanliness and workmanship guarantee.
          </p>
        </div>
        <HorizontalSlider label="Our services">
          {SERVICES.map((s, i) => (
            <div key={s.title} data-slide className={styles.card}>
              <div className={styles.badge}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>
              <a href="#contact" className={styles.link}>
                Book this service <span className={styles.linkArrow}>→</span>
              </a>
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
