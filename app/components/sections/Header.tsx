// Sticky site header with logo, anchor nav and a primary CTA. Anchor links
// scroll to in-page sections; "Free Estimate" jumps to #contact.
//
// The logo image is fixed-box / object-contain — drop any aspect ratio
// into /public/logo.png and it fits without distortion.

import Image from "next/image";
import Link from "next/link";
import { COMPANY, LOGO } from "../../lib/content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center" aria-label={COMPANY.name}>
          <span className="relative block h-12 w-40 sm:h-14 sm:w-48">
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              fill
              priority
              sizes="(max-width: 640px) 160px, 192px"
              className="object-contain object-left"
            />
          </span>
        </Link>
        <nav className="hidden gap-8 text-sm font-medium text-slate-700 lg:flex">
          <a href="#about" className="hover:text-blue-700">About</a>
          <a href="#services" className="hover:text-blue-700">Services</a>
          <a href="#process" className="hover:text-blue-700">Our Process</a>
          <a href="#portfolio" className="hover:text-blue-700">Portfolio</a>
          <a href="#reviews" className="hover:text-blue-700">Reviews</a>
          <a href="#contact" className="hover:text-blue-700">Contact</a>
        </nav>
        <a
          href="#contact"
          className="btn-primary hidden rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 md:inline-block"
        >
          Free Estimate
        </a>
      </div>
    </header>
  );
}
