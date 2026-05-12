// Bottom contact section — full business details, the ZIP-code service-area
// strip, and the second contact form.

import { COMPANY, SERVICE_RADIUS_MILES, SERVICE_ZIPS } from "../../lib/content";
import { ContactForm } from "../ContactForm";

export function Contact() {
  return (
    <section id="contact" className="bg-blue-700 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">Get started</p>
          <h2 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Got something to fix or install? Let&apos;s get it done.
          </h2>
          <p className="mt-5 max-w-md text-lg text-blue-100">
            Send a quick message with what you need. Most jobs are quoted the
            same day and scheduled within 24–48 hours.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Phone</p>
              <a href={`tel:${COMPANY.phoneTel}`} className="mt-1 block text-xl font-bold">
                {COMPANY.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Email</p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-1 block break-all text-lg font-semibold"
              >
                {COMPANY.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Service area</p>
              <p className="mt-1 text-lg font-semibold">{COMPANY.area}</p>
              <p className="text-sm text-blue-100">Within {SERVICE_RADIUS_MILES} miles</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">Hours</p>
              <p className="mt-1 text-lg font-semibold">Available 24/7</p>
              <p className="text-sm text-blue-100">Same-day booking</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-blue-800/40 p-6 ring-1 ring-white/10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                ZIP codes we serve
              </p>
              <p className="text-xs text-blue-200">
                {SERVICE_ZIPS.length} areas · {SERVICE_RADIUS_MILES} mi radius
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SERVICE_ZIPS.map((zip) => (
                <li
                  key={zip}
                  className="rounded-md bg-white/10 px-3 py-1.5 font-mono text-sm font-medium tracking-wide ring-1 ring-white/15"
                >
                  {zip}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-blue-200">
              Don&apos;t see your ZIP? Call or email — we often travel beyond the standard radius.
            </p>
          </div>
        </div>
        <ContactForm id="footer-form" compact />
      </div>
    </section>
  );
}
