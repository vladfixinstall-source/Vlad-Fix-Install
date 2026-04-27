# Vlad Fix & Install — Single-Page Site

Single-page marketing site for **Vlad Fix & Install**, a local handyman service:
TV mounting, smart locks, ceiling fans, faucets, shelves and small repairs.

Built with **Next.js 14 + TypeScript + Tailwind CSS**.

## What's on the page

- Sticky navigation header with phone CTA
- Hero section with a contact form (**form #1**)
- Services grid (13 handyman services)
- Four-step process section
- Stats band
- Recent jobs gallery with hover effects
- Customer reviews
- Bottom contact section with full company info + contact form (**form #2**)
- Footer

The contact form uses a custom service-picker dropdown (animated, keyboard-
dismissible, click-outside-to-close) populated from the same `SERVICES` list
that drives the services grid.

Forms use local React state — submission shows a success message. Wire them up
to your backend (email API, Formspree, etc.) when going live.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Build for production

```bash
npm run build
npm start
```

## Tech

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS 3.4**
- `next/font` for Inter + Playfair Display
- External imagery from Unsplash (configured in `next.config.mjs`)

## Project structure

```
vlad-fix-install/
├── app/
│   ├── layout.tsx     # Root layout, fonts, metadata
│   ├── globals.css    # Tailwind + base styles
│   └── page.tsx       # Single-page site (header → hero → services → ... → footer)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```
