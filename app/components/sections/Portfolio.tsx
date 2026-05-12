// Portfolio gallery — 6 example job photos with hover-zoom on the image.

import { PROJECTS } from "../../lib/content";

export function Portfolio() {
  return (
    <section id="portfolio" className="border-y border-slate-100 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">Recent jobs</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Our portfolio</h2>
          </div>
          <a href="#contact" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
            Book your job →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <div key={i} className="group overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.src})` }}
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Recent Job</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{p.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
