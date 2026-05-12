// External review platforms shown in the trust-widget strip above the
// individual reviews slider. Rating/count/href can be overridden at runtime
// from the "Platforms" tab of the Google Sheet (see lib/sheet.ts).

import { ReactNode } from "react";

export type ReviewPlatform = {
  name: string;
  rating: number;        // average; 0 if no public reviews yet
  count: number;         // 0 = treated as placeholder
  href: string;          // "#" = treated as placeholder (button replaced with "Coming soon")
  cta: string;
  buttonBg: string;
  badge: ReactNode;
};

function ThumbtackBadge() {
  return (
    <span
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-bold text-white"
      style={{ background: "#009FD9" }}
      aria-hidden="true"
    >
      T
    </span>
  );
}

function GoogleBadge() {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="h-6 w-6">
        <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
      </svg>
    </span>
  );
}

export const REVIEW_PLATFORMS: ReviewPlatform[] = [
  {
    name: "Thumbtack",
    rating: 5.0,
    count: 11,
    href: "https://www.thumbtack.com/ca/san-diego/handyman/vlad/service/526629456390619143",
    cta: "Review us on Thumbtack",
    buttonBg: "#009FD9",
    badge: <ThumbtackBadge />,
  },
  {
    name: "Google",
    rating: 0,    // TODO: set the real average from Google Business Profile
    count: 0,     // TODO: set the real review count
    href: "https://maps.app.goo.gl/BHJ3cP1DUU2j7NvD6",
    cta: "Review us on Google",
    buttonBg: "#1A73E8",
    badge: <GoogleBadge />,
  },
];
