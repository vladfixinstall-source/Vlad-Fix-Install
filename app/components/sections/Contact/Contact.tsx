// Bottom contact section — business details, ZIP-code service-area strip,
// and the second contact form.

import { COMPANY, SERVICE_RADIUS_MILES, SERVICE_ZIPS } from "../../../lib/content";
import { ContactForm } from "../../ContactForm";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <p className={styles.eyebrow}>Get started</p>
          <h2 className={styles.heading}>
            Got something to fix or install? Let&apos;s get it done.
          </h2>
          <p className={styles.intro}>
            Send a quick message with what you need. Most jobs are quoted the
            same day and scheduled within 24–48 hours.
          </p>
          <div className={styles.infoGrid}>
            <div>
              <p className={styles.infoLabel}>Phone</p>
              <a href={`tel:${COMPANY.phoneTel}`} className={styles.infoPhone}>
                {COMPANY.phone}
              </a>
            </div>
            <div>
              <p className={styles.infoLabel}>Email</p>
              <a href={`mailto:${COMPANY.email}`} className={styles.infoEmail}>
                {COMPANY.email}
              </a>
            </div>
            <div>
              <p className={styles.infoLabel}>Service area</p>
              <p className={styles.infoBig}>{COMPANY.area}</p>
              <p className={styles.infoSmall}>Within {SERVICE_RADIUS_MILES} miles</p>
            </div>
            <div>
              <p className={styles.infoLabel}>Hours</p>
              <p className={styles.infoBig}>Available 24/7</p>
              <p className={styles.infoSmall}>Same-day booking</p>
            </div>
          </div>

          <div className={styles.zipBox}>
            <div className={styles.zipHead}>
              <p className={styles.infoLabel}>ZIP codes we serve</p>
              <p className={styles.zipMeta}>
                {SERVICE_ZIPS.length} areas · {SERVICE_RADIUS_MILES} mi radius
              </p>
            </div>
            <ul className={styles.zipList}>
              {SERVICE_ZIPS.map((zip) => (
                <li key={zip} className={styles.zipPill}>
                  {zip}
                </li>
              ))}
            </ul>
            <p className={styles.zipFootnote}>
              Don&apos;t see your ZIP? Call or email — we often travel beyond the standard radius.
            </p>
          </div>
        </div>
        <ContactForm id="footer-form" compact />
      </div>
    </section>
  );
}
