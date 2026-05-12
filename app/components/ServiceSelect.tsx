"use client";

// Custom-styled service picker. Wraps a hidden <input> so it still
// participates in standard form submission, but the trigger and option list
// are rendered as <button>s for full styling control.

import { useEffect, useRef, useState } from "react";
import { SERVICE_OPTIONS } from "../lib/content";
import { CheckIcon, ChevronIcon } from "./icons";

export function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="service" value={value} required />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-slate-300 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value || "I'm interested in..."}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        role="listbox"
        className={`absolute left-0 right-0 top-full z-30 mt-2 max-h-72 origin-top overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 transition duration-150 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {SERVICE_OPTIONS.map((label) => {
          const selected = value === label;
          return (
            <button
              type="button"
              key={label}
              role="option"
              aria-selected={selected}
              onClick={() => {
                onChange(label);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                selected
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{label}</span>
              {selected && <CheckIcon />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
