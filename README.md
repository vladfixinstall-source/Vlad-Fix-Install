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

Submissions are delivered by [Formsubmit.co](https://formsubmit.co) — no
backend required. The form POSTs JSON to their AJAX endpoint, which emails
the destination address. Includes a honeypot field for bot protection,
loading and error states, and `_replyto` is set to the customer's email so
the owner can reply directly from their inbox.

## Contact form delivery (Formsubmit.co)

1. Set the destination in `.env.local`:
   ```
   NEXT_PUBLIC_FORMSUBMIT_ENDPOINT=your@email.com
   ```
2. Submit the form **once** from the live site. Formsubmit will email a
   confirmation link to that address — click it to activate.
3. From then on, every submission is delivered to the inbox.
4. (Recommended) Once active, log into Formsubmit, grab the **hashed key**
   (looks like `el/xxxxxxxx`), and replace the email in `.env.local` so the
   raw address isn't visible in browser source.

Free tier covers a generous monthly volume; there is no signup. If the env
var is left unset, the form shows the success message without actually
sending — useful for offline demos.

## Owner / "Meet Vlad" section

The About section content lives in the `OWNER` constant at the top of
[`app/page.tsx`](app/page.tsx):

```ts
const OWNER = {
  name: "Vlad",
  tagline: "Honest work, on time, done right — every job.",
  photo: "https://images.unsplash.com/...",  // see below
  bio: [
    "Hi, I'm Vlad — your local San Diego handyman...",
    "I take one job at a time...",
  ],
  highlights: [
    "4+ years specializing in home installations",
    "Fully insured",
    // ...
  ],
};
```

**To add the owner's real photo:** drop the file as `public/vlad.jpg` (any
filename works) and change `photo` to `"/vlad.jpg"`. Or paste any hosted
image URL (Cloudinary, S3, etc.).

## Aggregate rating (single source of truth)

Every "X.X ★" readout on the page (hero trust line, stats band, About
badge) is computed from the platform list (Thumbtack + Google) —
`computeAggregateRating()` does a count-weighted average. Platforms
with `count: 0` are treated as placeholders and skipped.

The platform list comes from in-code defaults (`REVIEW_PLATFORMS`),
**optionally overridden by a "Platforms" tab in the same Google Sheet**
that powers individual reviews. This lets the owner update rating/count
per platform without touching code.

## Platform overrides via the "Platforms" sheet tab (optional)

In the same Google Sheet that holds reviews, add a second tab named
exactly **`Platforms`** (case-sensitive) with first-row headers
(lowercase, exact):

| name | rating | count | href |
|---|---|---|---|

- **name** — must match a platform in `REVIEW_PLATFORMS` (case-insensitive),
  e.g. `Thumbtack` or `Google`
- **rating** — average rating, e.g. `5.0`
- **count** — total number of reviews, e.g. `11`
- **href** — full profile URL the platform's CTA button links to

Empty cells in any column fall back to the in-code default for that
platform. Rows whose `name` doesn't match any defined platform are
ignored. The fetch happens client-side on page mount; if the tab is
missing or unreadable, the page silently falls back to the in-code
defaults — so this is purely additive.

Update a single cell to change the rating everywhere on the site
(hero trust line, stats band, About badge, trust-widget cards, and
the count-weighted aggregate).

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
