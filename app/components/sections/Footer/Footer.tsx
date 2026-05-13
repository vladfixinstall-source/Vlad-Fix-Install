// Site footer — slim copyright row + secondary navigation links. Used by
// both the home page and the privacy policy page.

import Link from "next/link";
import { COMPANY } from "../../../lib/content";
import styles from "./Footer.module.css";

export function Footer({ privacyActive = false }: { privacyActive?: boolean }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.branding}>
          <span className={styles.badge}>{COMPANY.logoLetter}</span>
          <span>
            © {new Date().getFullYear()} {COMPANY.name} · Fully insured
          </span>
        </div>
        <div className={styles.links}>
          <Link
            href="/privacy-policy"
            className={privacyActive ? styles.linkActive : styles.linkIdle}
          >
            Privacy
          </Link>
          <a href={privacyActive ? "/#contact" : "#contact"} className={styles.linkIdle}>
            Contact
          </a>
          {privacyActive ? (
            <Link href="/" className={styles.linkIdle}>Home</Link>
          ) : (
            <a href="#about" className={styles.linkIdle}>About</a>
          )}
        </div>
      </div>
    </footer>
  );
}
