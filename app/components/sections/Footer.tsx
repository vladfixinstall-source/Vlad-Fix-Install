// Site footer — slim copyright row + secondary navigation links. Used by
// both the home page and the privacy policy page.

import Link from "next/link";
import { COMPANY } from "../../lib/content";

export function Footer({ privacyActive = false }: { privacyActive?: boolean }) {
  return (
    <footer className="bg-slate-900 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded bg-blue-700 text-xs font-bold text-white">
            {COMPANY.logoLetter}
          </span>
          <span>
            © {new Date().getFullYear()} {COMPANY.name} · Fully insured
          </span>
        </div>
        <div className="flex gap-6">
          <Link
            href="/privacy-policy"
            className={privacyActive ? "font-semibold text-white" : "hover:text-white"}
          >
            Privacy
          </Link>
          <a href={privacyActive ? "/#contact" : "#contact"} className="hover:text-white">
            Contact
          </a>
          {privacyActive ? (
            <Link href="/" className="hover:text-white">Home</Link>
          ) : (
            <a href="#about" className="hover:text-white">About</a>
          )}
        </div>
      </div>
    </footer>
  );
}
