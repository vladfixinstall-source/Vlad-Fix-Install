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

## Live reviews from a Google Sheet (optional, no backend)

The reviews section can pull live from a public Google Sheet. No API key,
no server, no auth — the browser fetches the sheet's public CSV endpoint
directly.

**Setup:**

1. Create a new Google Sheet. In the first row add the headers
   (lowercase, exact):

   | name | rating | service | date | text |
   |---|---|---|---|---|

   - **name** — reviewer name (e.g. "Sarah J.")
   - **rating** — number 1–5; missing or invalid values render as 5 stars
   - **service** — service category, shown as a small label (e.g. "TV Mounting")
   - **date** — free-form date string (e.g. "March 12, 2025")
   - **text** — the review body
2. Fill rows below with your reviews — one row per review.
3. Click **Share → General access → Anyone with the link → Viewer**.
4. Copy the sheet ID from the URL
   (`https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`).
5. Copy `.env.example` to `.env.local` and set the ID:
   ```
   NEXT_PUBLIC_REVIEWS_SHEET_ID=your_sheet_id_here
   ```
   For production deploys, set the same variable in your hosting
   platform's dashboard (Vercel/Netlify → Environment Variables).
6. Restart the dev server so Next.js picks up the new env value.

The site shows a skeleton while loading and **falls back to the static
`REVIEWS` list** in `page.tsx` if the sheet is empty or the fetch fails —
so you never end up with an empty reviews section.

To go back to fully static reviews, just unset `NEXT_PUBLIC_REVIEWS_SHEET_ID`.

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
