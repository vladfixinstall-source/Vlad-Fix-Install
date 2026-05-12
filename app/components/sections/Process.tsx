// "How we work" — 4-step process band on a slate background.

import { PROCESS_STEPS } from "../../lib/content";

export function Process() {
  return (
    <section id="process" className="border-y border-slate-100 bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">How we work</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">A simple, four-step process.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.t} className="relative rounded-2xl bg-white p-7 ring-1 ring-slate-200">
              <div className="text-5xl font-bold text-blue-700/20">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{step.t}</h3>
              <p className="mt-2 text-slate-600">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
