"use client";

// Contact form delivered via Web3Forms (https://web3forms.com).
// See lib/sheet.ts for the access-key env var.

import { FormEvent, useState } from "react";
import { WEB3FORMS_KEY } from "../../lib/sheet";
import { pushFormError, pushFormSubmit } from "../../lib/gtm";
import { ServiceSelect } from "../ServiceSelect";
import styles from "./ContactForm.module.css";

type FormId = "hero-form" | "footer-form";

export function ContactForm({ id, compact = false }: { id: FormId; compact?: boolean }) {
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
    if (!WEB3FORMS_KEY) {
      // Offline/demo mode — still push the lead event so GTM sees it
      // in local previews. Production always has the key set.
      pushFormSubmit({ form_id: id, service: data.service });
      setSent(true);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.msg,
          subject: `New estimate: ${data.service || "Service request"} — ${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
          replyto: data.email,
          // Web3Forms server-side honeypot — must be empty for real users.
          botcheck: "",
        }),
      });
      const result: { success?: boolean; message?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !result.success) {
        throw new Error(result.message || `HTTP ${res.status}`);
      }
      pushFormSubmit({ form_id: id, service: data.service });
      setSent(true);
    } catch (err) {
      pushFormError({
        form_id: id,
        reason: err instanceof Error ? err.message : "unknown",
      });
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
