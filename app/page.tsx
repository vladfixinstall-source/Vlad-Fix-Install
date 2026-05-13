"use client";

// Home page — pure composition. Holds platforms state + derived aggregate
// rating; renders sections in scroll order. Everything else lives in
// app/components/sections/ and app/lib/.

import { useEffect, useState } from "react";
import type { ReviewPlatform } from "./lib/platforms";
import { REVIEW_PLATFORMS } from "./lib/platforms";
import { computeAggregateRating } from "./lib/rating";
import {
  REVIEWS_SHEET_ID,
  fetchSheetPlatforms,
  mergePlatforms,
} from "./lib/sheet";

import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { Stats } from "./components/sections/Stats";
import { Portfolio } from "./components/sections/Portfolio";
import { Reviews } from "./components/sections/Reviews";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";

export default function Home() {
  // Platforms come from the Sheet's "Platforms" tab. While that fetch is in
  // flight, `platforms` stays `null` and downstream sections render skeleton
  // placeholders. On failure (no ID, network error, missing tab, empty tab)
  // we fall back to the in-code REVIEW_PLATFORMS so the page never stays
  // blank.
  const [platforms, setPlatforms] = useState<ReviewPlatform[] | null>(
    REVIEWS_SHEET_ID ? null : REVIEW_PLATFORMS,
  );

  useEffect(() => {
    if (!REVIEWS_SHEET_ID) return;
    let cancelled = false;
    fetchSheetPlatforms(REVIEWS_SHEET_ID)
      .then((overrides) => {
        if (cancelled) return;
        setPlatforms(
          overrides.length > 0
            ? mergePlatforms(REVIEW_PLATFORMS, overrides)
            : REVIEW_PLATFORMS,
        );
      })
      .catch(() => {
        if (cancelled) return;
        setPlatforms(REVIEW_PLATFORMS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const aggregate = platforms ? computeAggregateRating(platforms) : null;

  return (
    <main style={{ minHeight: "100vh" }}>
      <Header />
      <Hero aggregate={aggregate} />
      <About aggregate={aggregate} />
      <Services />
      <Process />
      <Stats aggregate={aggregate} />
      <Portfolio />
      <Reviews platforms={platforms} />
      <Contact />
      <Footer />
    </main>
  );
}
