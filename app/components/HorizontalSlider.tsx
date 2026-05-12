"use client";

// Touch-swipeable card slider with floating prev/next buttons and edge fades.
// Native CSS scroll-snap drives the snapping; JS only powers the arrows and
// the fade/arrow visibility.

import { ReactNode, useEffect, useRef, useState } from "react";

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

  const fadeFromLeft = fadeColor === "slate" ? "from-slate-50" : "from-white";
  const fadeFromRight = fadeColor === "slate" ? "from-slate-50" : "from-white";

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 py-4"
      >
        {children}
      </div>

      {/* Edge fades — hint that more content exists in that direction */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -left-6 w-16 bg-gradient-to-r ${fadeFromLeft} to-transparent transition-opacity duration-200 ${
          canPrev ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -right-6 w-16 bg-gradient-to-l ${fadeFromRight} to-transparent transition-opacity duration-200 ${
          canNext ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Floating arrow buttons — sit on top of cards, vertically centered */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className={`absolute left-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/10 transition hover:text-blue-700 hover:shadow-xl md:h-12 md:w-12 ${
          canPrev ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 01-1.06 1.06l-4.25-4.24a.75.75 0 010-1.06l4.25-4.24a.75.75 0 011.06 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next"
        className={`absolute right-1 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-900/10 transition hover:text-blue-700 hover:shadow-xl md:h-12 md:w-12 ${
          canNext ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 011.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
