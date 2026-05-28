"use client";

// Sticky site header with logo, anchor nav, contact phone and a primary CTA.
// On screens narrower than 1024px the inline nav is replaced by a burger
// button that opens a slide-in drawer with the same links + phone + CTA.

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, LOGO } from "../../../lib/content";
import {
  pushCtaClick,
  pushMobileMenuOpen,
  pushNavClick,
  pushPhoneClick,
} from "../../../lib/gtm";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Our Process" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
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
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={styles.navLink}
                onClick={() => pushNavClick({ target: l.href, location: "header" })}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className={styles.phone}
              aria-label={`Call ${COMPANY.phone}`}
              onClick={() => pushPhoneClick({ location: "header" })}
            >
              <PhoneIcon />
              <span className={styles.phoneText}>{COMPANY.phone}</span>
            </a>
            <a
              href="#contact"
              className={`btn-primary ${styles.cta}`}
              onClick={() =>
                pushCtaClick({ cta_id: "free_estimate", cta_location: "header" })
              }
            >
              Free Estimate
            </a>
            <button
              type="button"
              className={styles.burger}
              onClick={() => {
                setOpen((o) => {
                  if (!o) pushMobileMenuOpen();
                  return !o;
                });
              }}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <BurgerIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer is a sibling of <header>, not a child — the header has
          `backdrop-filter` which would otherwise create a containing block
          for `position: fixed`, clipping the drawer to header height. */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav"
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-label="Site navigation"
        aria-hidden={!open}
      >
        <nav className={styles.drawerNav}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.drawerLink}
              onClick={() => {
                pushNavClick({ target: l.href, location: "drawer" });
                close();
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className={styles.drawerPhone}
            onClick={() => {
              pushPhoneClick({ location: "drawer" });
              close();
            }}
          >
            <PhoneIcon />
            <span>{COMPANY.phone}</span>
          </a>
          <a
            href="#contact"
            className={`btn-primary ${styles.drawerCta}`}
            onClick={() => {
              pushCtaClick({ cta_id: "free_estimate", cta_location: "drawer" });
              close();
            }}
          >
            Free Estimate
          </a>
        </div>
      </aside>
    </>
  );
}
