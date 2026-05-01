"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      aria-hidden={!visible}
      className={`fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl ring-1 ring-slate-900/5 transition duration-300 sm:bottom-6 sm:p-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 sm:pr-4">
          <p className="font-semibold text-slate-900">We respect your privacy</p>
          <p className="mt-1 text-sm text-slate-600">
            This site uses minimal essential storage to remember your preferences.
            We don&apos;t run third-party advertising or tracking cookies.
            California residents — see your rights in our{" "}
            <Link
              href="/privacy-policy#your-rights"
              className="font-medium text-blue-700 underline hover:text-blue-800"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="button"
            onClick={() => respond("declined")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond("accepted")}
            className="btn-primary rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-800"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
