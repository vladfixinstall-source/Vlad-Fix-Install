// Services slider — full SERVICES list rendered as horizontally-scrollable
// cards via HorizontalSlider. Each card links back to the contact form.

import { SERVICES } from "../../lib/content";
import { HorizontalSlider } from "../HorizontalSlider";

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Our Services</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything your home needs — one trusted pro.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            From a single TV mount to a full punch list, every job is handled
            with the same care, cleanliness and workmanship guarantee.
          </p>
        </div>
        <HorizontalSlider label="Our services">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              data-slide
              className="group flex w-[280px] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-200 hover:shadow-xl sm:w-[320px]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-lg font-bold text-blue-700">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 flex-1 text-slate-600">{s.desc}</p>
              <a href="#contact" className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                Book this service <span className="ml-1 transition group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
