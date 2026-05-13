"use client";

// Fullscreen photo viewer. Keyboard (←/→/Esc), touch swipe, click on backdrop
// to close. Body scroll is locked while the lightbox is mounted. Uses
// next/image with `fill` so the photo scales to fit the viewport at native
// aspect ratio.

import { useEffect, useRef, useState, TouchEvent } from "react";
import Image from "next/image";
import type { Project } from "../../lib/content";
import styles from "./Lightbox.module.css";

const SWIPE_THRESHOLD = 50;

export function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: Project[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);

  const prev = () =>
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  const current = photos[index];

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.stage}>
        <div className={styles.imageWrapper} onClick={onClose}>
          <Image
            src={current.src}
            alt={current.label}
            fill
            sizes="100vw"
            className={styles.image}
            priority
          />
        </div>

        <button
          type="button"
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close"
        >
          ×
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>
      <div className={styles.caption} onClick={(e) => e.stopPropagation()}>
        <span className={styles.counter}>
          {index + 1} / {photos.length}
        </span>
        <span className={styles.label}>{current.label}</span>
      </div>
    </div>
  );
}
