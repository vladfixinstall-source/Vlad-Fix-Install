"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pushCookieConsent } from "../../lib/gtm";
import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "vfi-cookie-consent";

type Consent = "accepted" | "declined";

function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

function writeConsent(choice: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // localStorage disabled (private mode, quota) — fail silently
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  const respond = (choice: Consent) => {
    writeConsent(choice);
    pushCookieConsent({ choice });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      aria-hidden={!visible}
      className={`${styles.banner} ${visible ? styles.bannerShown : styles.bannerHidden}`}
    >
      <div className={styles.row}>
        <div className={styles.copy}>
          <p className={styles.title}>We respect your privacy</p>
          <p className={styles.text}>
            This site uses minimal essential storage to remember your preferences.
            We don&apos;t run third-party advertising or tracking cookies.
            California residents — see your rights in our{" "}
            <Link href="/privacy-policy#your-rights" className={styles.link}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={() => respond("declined")} className={styles.decline}>
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond("accepted")}
            className={`btn-primary ${styles.accept}`}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
