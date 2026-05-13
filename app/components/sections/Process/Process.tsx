// "How we work" — 4-step process band on a slate background.

import { PROCESS_STEPS } from "../../../lib/content";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>How we work</p>
          <h2 className={styles.heading}>A simple, four-step process.</h2>
        </div>
        <div className={styles.grid}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.t} className={styles.step}>
              <div className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className={styles.stepTitle}>{step.t}</h3>
              <p className={styles.stepDesc}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
