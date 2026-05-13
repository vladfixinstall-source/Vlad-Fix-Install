// Sticky site header with logo, anchor nav and a primary CTA.

import Image from "next/image";
import Link from "next/link";
import { COMPANY, LOGO } from "../../../lib/content";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label={COMPANY.name}>
          <span className={styles.logoBox}>
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              fill
              priority
              sizes="(max-width: 640px) 72px, 86px"
              className={styles.logoImg}
            />
          </span>
        </Link>
        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#process" className={styles.navLink}>Our Process</a>
          <a href="#portfolio" className={styles.navLink}>Portfolio</a>
          <a href="#reviews" className={styles.navLink}>Reviews</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </nav>
        <a href="#contact" className={`btn-primary ${styles.cta}`}>
          Free Estimate
        </a>
      </div>
    </header>
  );
}
