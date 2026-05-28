"use client";

// SPA route-change tracker. gtm.js fires its own initial page_view on
// hard load, but Next.js App Router navigation (clicking a <Link> to
// /privacy-policy or back to /) is client-side and does NOT reload the
// page — so GTM needs a manual nudge. We skip the first render to
// avoid double-counting the initial page view.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function GTMRouteChange() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!window.dataLayer) return;
    window.dataLayer.push({
      event: "page_view",
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
