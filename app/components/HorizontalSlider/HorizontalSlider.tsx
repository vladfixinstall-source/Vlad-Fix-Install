"use client";

// Touch-swipeable card slider with floating prev/next buttons and edge fades.
// Native CSS scroll-snap drives the snapping; JS only powers the arrows and
// the fade/arrow visibility.

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./HorizontalSlider.module.css";

const FADE_FROM = {
  white: "#ffffff",
  slate: "#f8fafc",
};

export function HorizontalSlider({
  children,
  label,
  fadeColor = "white",
}: {
  children: ReactNode;
  label: string;
  fadeColor?: "white" | "slate";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Re-evaluate when slides are added/removed (e.g. reviews loaded async).
    const mo = new MutationObserver(update);
    mo.observe(el, { childList: true });
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mo.disconnect();
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-slide]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  // CSS variable consumed by .fadeLeft / .fadeRight gradients
  const fadeStyle = { "--fade-from": FADE_FROM[fadeColor] } as CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className={styles.scrollContainer}
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        style={fadeStyle}
        className={`${styles.fadeBase} ${styles.fadeLeft} ${
          canPrev ? styles.fadeShown : styles.fadeHidden
        }`}
      />
      <div
        aria-hidden="true"
        style={fadeStyle}
        className={`${styles.fadeBase} ${styles.fadeRight} ${
          canNext ? styles.fadeShown : styles.fadeHidden
        }`}
      />

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className={`${styles.arrow} ${styles.arrowLeft} ${
          canPrev ? styles.arrowShown : styles.arrowHidden
        }`}
      >
        <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 01-1.06 1.06l-4.25-4.24a.75.75 0 010-1.06l4.25-4.24a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next"
        className={`${styles.arrow} ${styles.arrowRight} ${
          canNext ? styles.arrowShown : styles.arrowHidden
        }`}
      >
        <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
