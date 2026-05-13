"use client";

// Custom-styled service picker. Wraps a hidden <input> so it still
// participates in standard form submission, but the trigger and option list
// are rendered as <button>s for full styling control.

import { useEffect, useRef, useState } from "react";
import { SERVICE_OPTIONS } from "../../lib/content";
import { CheckIcon, ChevronIcon } from "../icons";
import styles from "./ServiceSelect.module.css";

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
    <div ref={ref} className={styles.wrapper}>
      <input type="hidden" name="service" value={value} required />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={styles.trigger}
      >
        <span className={value ? styles.triggerLabelFilled : styles.triggerLabelEmpty}>
          {value || "I'm interested in..."}
        </span>
        <ChevronIcon open={open} />
      </button>

      <div
        role="listbox"
        className={`${styles.panel} ${open ? styles.panelOpen : styles.panelClosed}`}
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
              className={`${styles.option} ${selected ? styles.optionSelected : styles.optionIdle}`}
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
