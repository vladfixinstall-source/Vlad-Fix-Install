// dataLayer helpers for Google Tag Manager. Components import the
// named functions below to push semantic events; GTM dashboard maps
// those events to whatever tags (GA4, Google Ads, Meta, etc.) the
// manager configures.
//
// Every helper is server-safe (no-op on SSR / when dataLayer missing),
// so they can be called from anywhere — Server Components included
// (though triggers usually live inside client components).

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!window.dataLayer) return;
  window.dataLayer.push(payload);
}

// ---------- Conversions / leads ----------

/**
 * Successful contact-form submission. The strongest signal — these
 * are warm leads the business should follow up on.
 */
export function pushFormSubmit(args: {
  form_id: "hero-form" | "footer-form";
  service?: string;
}) {
  pushDataLayer({
    event: "form_submit",
    form_id: args.form_id,
    service: args.service || undefined,
  });
}

/**
 * Contact-form submission failed (network error, Web3Forms quota,
 * etc.). Lets the manager see if there are conversion-killing bugs.
 */
export function pushFormError(args: {
  form_id: "hero-form" | "footer-form";
  reason?: string;
}) {
  pushDataLayer({
    event: "form_error",
    form_id: args.form_id,
    error_reason: args.reason || undefined,
  });
}

/**
 * User clicked the phone number (tel: link). On mobile this opens
 * the dialer — for a handyman site, calls are leads too.
 */
export function pushPhoneClick(args: {
  location: "header" | "drawer" | "contact";
}) {
  pushDataLayer({
    event: "phone_click",
    click_location: args.location,
  });
}

/**
 * User clicked the email address (mailto: link).
 */
export function pushEmailClick(args: { location: "contact" }) {
  pushDataLayer({
    event: "email_click",
    click_location: args.location,
  });
}

// ---------- Engagement ----------

/**
 * User picked a service in the contact-form dropdown. Drives the
 * "which services drive interest?" question.
 */
export function pushServiceSelect(args: { service: string }) {
  pushDataLayer({
    event: "service_select",
    service: args.service,
  });
}

/**
 * User opened the Portfolio lightbox to a specific photo. GA4
 * standard event name.
 */
export function pushPortfolioView(args: {
  photo_index: number;
  photo_label: string;
}) {
  pushDataLayer({
    event: "view_item",
    item_index: args.photo_index,
    item_name: args.photo_label,
    item_category: "portfolio_photo",
  });
}

/**
 * User clicked an external review-platform button (Thumbtack / Google
 * profile). Off-site engagement signal.
 */
export function pushPlatformClick(args: { platform: string }) {
  pushDataLayer({
    event: "platform_click",
    platform: args.platform,
  });
}

/**
 * Primary CTA button click — separates intent-to-convert from
 * accidental scrolling. `cta_id` matches what's on the button
 * (e.g. "hero_get_free_estimate").
 */
export function pushCtaClick(args: { cta_id: string; cta_location: string }) {
  pushDataLayer({
    event: "cta_click",
    cta_id: args.cta_id,
    cta_location: args.cta_location,
  });
}

/**
 * Header / drawer nav link click. Useful for understanding which
 * sections users actually jump to via nav vs. scrolling.
 */
export function pushNavClick(args: { target: string; location: "header" | "drawer" }) {
  pushDataLayer({
    event: "nav_click",
    nav_target: args.target,
    nav_location: args.location,
  });
}

/**
 * User opened the mobile burger menu. Mobile-UX engagement metric.
 */
export function pushMobileMenuOpen() {
  pushDataLayer({
    event: "mobile_menu_open",
  });
}

// ---------- Compliance / consent ----------

/**
 * User responded to the cookie banner. Required for downstream
 * Consent Mode v2 configuration in GTM.
 */
export function pushCookieConsent(args: { choice: "accepted" | "declined" }) {
  pushDataLayer({
    event: "cookie_consent",
    consent_choice: args.choice,
  });
}
