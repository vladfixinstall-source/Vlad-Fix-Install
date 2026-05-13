"use client";

// Contact form delivered via Formsubmit.co — see lib/sheet.ts for the
// endpoint env var.

import { FormEvent, useState } from "react";
import { FORMSUBMIT_ENDPOINT } from "../../lib/sheet";
import { ServiceSelect } from "../ServiceSelect";
import styles from "./ContactForm.module.css";

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

    if (data._honey) {
      setSent(true);
      return;
    }
    if (!FORMSUBMIT_ENDPOINT) {
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
    <form id={id} onSubmit={onSubmit} className={styles.form}>
      <div className={styles.header}>
        <h3 className={styles.title}>Request a Free Estimate</h3>
        <p className={styles.subtitle}>
          We respond to every inquiry within one business day.
        </p>
      </div>
      {sent ? (
        <div className={styles.success}>
          ✓ Thank you — we&apos;ll reach out shortly to schedule your visit.
        </div>
      ) : (
        <div className={styles.fields}>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />
          <div className={`${styles.nameRow} ${compact ? styles.nameRowCompact : ""}`}>
            <input required name="firstName" placeholder="First name" className={styles.input} />
            <input required name="lastName" placeholder="Last name" className={styles.input} />
          </div>
          <input required type="email" name="email" placeholder="Email address" className={styles.input} />
          <input required type="tel" name="phone" placeholder="Phone number" className={styles.input} />
          <ServiceSelect value={service} onChange={setService} />
          <textarea
            name="msg"
            rows={4}
            placeholder="Tell us about your project (optional)"
            className={styles.input}
          />
          {error && (
            <div role="alert" className={styles.error}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className={`btn-primary ${styles.submit}`}
          >
            {submitting ? (
              <>
                <span className={styles.spinner} />
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
