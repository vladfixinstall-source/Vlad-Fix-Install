// "Meet Vlad" — owner photo, bio, highlights and a CTA back to the form.
// A small floating rating badge overlays the photo; mirrors the same
// loading / no-reviews / live states as the hero trust line.

import { OWNER } from "../../lib/content";
import { CheckIcon } from "../icons";
import { Stars } from "../Stars";
import type { AggregateRating } from "../../lib/rating";

export function About({ aggregate }: { aggregate: AggregateRating | null }) {
  return (
    <section id="about" className="border-y border-slate-100 bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:items-center">
        <div className="relative lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-900/5">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${OWNER.photo})` }}
              role="img"
              aria-label={`Photo of ${OWNER.name}`}
            />
          </div>
          {aggregate === null ? (
            <div className="absolute -bottom-6 left-6 animate-pulse rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 lg:-right-6 lg:left-auto">
              <div className="flex items-center gap-3">
                <span className="h-5 w-24 rounded bg-slate-200" />
                <span className="h-5 w-8 rounded bg-slate-200" />
              </div>
              <span className="mt-2 block h-3 w-32 rounded bg-slate-200" />
            </div>
          ) : aggregate.count > 0 ? (
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200 lg:-right-6 lg:left-auto">
              <div className="flex items-center gap-3">
                <Stars n={aggregate.rating} />
                <span className="text-lg font-bold text-slate-900">
                  {aggregate.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                From {aggregate.count} verified reviews
              </p>
            </div>
          ) : null}
        </div>
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
            Meet {OWNER.name}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {OWNER.tagline}
          </h2>
          <div className="mt-6 space-y-4 text-lg text-slate-600">
            {OWNER.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {OWNER.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-slate-700">
                <span className="mt-0.5 shrink-0">
                  <CheckIcon />
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn-primary mt-10 inline-flex items-center rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-800"
          >
            Get in touch with me
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
