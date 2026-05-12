"use client";

// Contact form delivered via Formsubmit.co — see lib/sheet.ts for the
// endpoint env var. Includes loading/error states, a honeypot to slow
// bots, and a hidden _replyto field set to the customer's email so the
// owner can hit Reply straight from their inbox.

import { FormEvent, useState } from "react";
import { FORMSUBMIT_ENDPOINT } from "../lib/sheet";
import { ServiceSelect } from "./ServiceSelect";

export function ContactForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Honeypot tripped — silently "succeed" so the bot thinks it worked
    if (data._honey) {
      setSent(true);
      return;
    }

    if (!FORMSUBMIT_ENDPOINT) {
      // No delivery endpoint configured — show success without sending.
      setSent(true);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.msg,
          _subject: `New estimate: ${data.service || "Service request"} — ${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
          _replyto: data.email,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSent(true);
    } catch {
      setError(
        "Something went wrong. Please try again or call us directly at (760) 626-4981.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="rounded-2xl bg-white p-7 shadow-xl ring-1 ring-slate-200 md:p-8"
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-slate-900">Request a Free Estimate</h3>
        <p className="mt-1 text-sm text-slate-500">
          We respond to every inquiry within one business day.
        </p>
      </div>
      {sent ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-700">
          ✓ Thank you — we&apos;ll reach out shortly to schedule your visit.
        </div>
      ) : (
        <div className="grid gap-3">
          {/* Honeypot — bots fill every field, real users don't see this */}
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
            <input
              required
              name="firstName"
              placeholder="First name"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
            <input
              required
              name="lastName"
              placeholder="Last name"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          />
          <input
            required
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          />
          <ServiceSelect value={service} onChange={setService} />
          <textarea
            name="msg"
            rows={4}
            placeholder="Tell us about your project (optional)"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
          />
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-2 inline-flex items-center justify-center rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Sending...
              </>
            ) : (
              "Get My Free Estimate"
            )}
          </button>
        </div>
      )}
    </form>
  );
}
