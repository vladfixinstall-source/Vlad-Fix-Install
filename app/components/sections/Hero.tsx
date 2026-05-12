// Hero — value proposition, primary CTAs, the first contact form and
// the trust-signal row (rating + insurance + same-day + warranty).
// `aggregate` is `null` while the platform overrides are still loading;
// during that window the rating slot renders skeleton placeholders.

import { ContactForm } from "../ContactForm";
import { Stars } from "../Stars";
import type { AggregateRating } from "../../lib/rating";

export function Hero({ aggregate }: { aggregate: AggregateRating | null }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Trusted San Diego Handyman · 4+ Years of Quality Installs
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
            Fix it. Install it. <span className="text-blue-700">Done right.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            TV mounting, smart locks, ceiling fans, faucets, shelves and every
            small repair in between — handled by one focused pro with four years
            of dedicated install experience. Honest pricing, clean work, and a
            workmanship guarantee on every job.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="btn-primary rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800"
            >
              Get Free Estimate
            </a>
            <a
              href="#services"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
            >
              See Services
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-500">
            {aggregate === null ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <span className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              </div>
            ) : aggregate.count > 0 ? (
              <div className="flex items-center gap-2">
                <Stars n={aggregate.rating} />
                <span className="font-semibold text-slate-900">
                  {aggregate.rating.toFixed(1)}
                </span>
                <span>· {aggregate.count} verified reviews</span>
              </div>
            ) : null}
            <div>Fully insured</div>
            <div>Same-day booking</div>
            <div>Workmanship guarantee</div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ContactForm id="hero-form" />
        </div>
      </div>
    </section>
  );
}
