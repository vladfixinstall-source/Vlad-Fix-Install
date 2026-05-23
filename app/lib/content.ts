// Page content — pure data the marketing site renders. Edit any string
// here and the change shows up everywhere it's referenced.

export type ServiceItem = { title: string; desc: string };
export type Project = { src: string; label: string };
export type StatItem = { num: string; label: string };
export type Review = {
  name: string;
  rating: number;   // 1–5; defaults to 5 if missing/invalid
  service: string;  // e.g. "TV Mounting" — shown as small label above the quote
  date: string;     // free-form, e.g. "March 12, 2025"
  text: string;
};

// Business identity used in header, footer, contact, privacy policy.
export const COMPANY = {
  name: "Vlad Fix & Install",
  logoLetter: "V",
  phone: "(760) 626-4981",
  phoneTel: "+17606264981",
  email: "vladfixinstall@gmail.com",
  area: "San Diego, CA",
};

// Full-color logo shown in page headers. Drop the artwork into /public/ at
// the path below — Next.js serves /public/* from the site root, so the src
// stays the same regardless of where the project is deployed.
//
// `object-contain` in the header keeps the image at its native aspect ratio
// inside a fixed box, so this works whether the file is a tight horizontal
// crop or a square with whitespace around it.
export const LOGO = {
  src: "/logo.png",
  alt: "Vlad Fix & Install",
};

export const SERVICES: ServiceItem[] = [
  { title: "TV Mounting (All Sizes)", desc: "Any size, any wall — drywall, brick or concrete. Cables hidden, screen perfectly level." },
  { title: "Door Installation & Repair", desc: "Interior and exterior doors, hinge fixes, alignment, weather-stripping and lockset prep." },
  { title: "Lock Installation & Replacement", desc: "Deadbolts, smart locks and rekeying — modern hardware installed and tested in minutes." },
  { title: "Ceiling Fan Installation & Replacement", desc: "Safe wiring, balanced mounting and remote setup for any ceiling height." },
  { title: "Picture & Mirror Hanging", desc: "Precise placement with the right anchors for drywall, plaster, tile or brick." },
  { title: "Curtain & Blinds Installation", desc: "Rods, tracks and blinds installed clean, level and ready to use." },
  { title: "Shelf Installation", desc: "Floating, bracketed or built-in shelving — anchored to studs and load-rated." },
  { title: "Doorbell Installation (Video Doorbells)", desc: "Wired and battery video doorbells, configured to your Wi-Fi and chime." },
  { title: "Garbage Disposal Installation & Replacement", desc: "Quick swap-outs and new installs with leak-free plumbing connections." },
  { title: "Faucet Installation & Replacement", desc: "Kitchen and bathroom faucets, supply lines and shut-off valves done right." },
  { title: "Caulking & Sealing", desc: "Bathroom, kitchen and window seals — fresh, watertight and mold-resistant." },
  { title: "General Handyman Services", desc: "Small jobs and odd tasks — one trusted person to take the whole punch list." },
  { title: "Home Maintenance & Repairs", desc: "Scheduled tune-ups and on-call repairs that keep your home in top shape." },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Something else"];

export const SERVICE_ZIPS = [
  "92115", "92117", "92120", "92123", "92111",
  "92037", "92014", "92024", "92009",
];
export const SERVICE_RADIUS_MILES = 15;

// `Average rating` is computed at runtime from REVIEW_PLATFORMS so the rating
// readouts stay in sync. STATS_BASE provides only the non-rating cells.
export const STATS_BASE: StatItem[] = [
  { num: "4+", label: "Years specializing in installs" },
  { num: "500+", label: "Jobs completed" },
  { num: "Same-Day", label: "Booking available" },
];

export const PROCESS_STEPS = [
  { t: "Request", d: "Send a quick message with what you need — photos help us quote faster." },
  { t: "Quote", d: "Clear, upfront pricing. No surprises and no high-pressure sales." },
  { t: "Schedule", d: "Pick a time that works — same-day and weekend slots usually open." },
  { t: "Done Right", d: "Clean, careful work and a guarantee on everything we install or fix." },
];

// Real photos of Vlad's work, served from /public/images.
// First 6 entries are shown in the Portfolio grid; all entries are paged
// through in the fullscreen Lightbox.
export const PROJECTS: Project[] = [
  // ---- Featured (grid) ----
  { src: "/images/photo_2026-05-13_16-54-22.jpg", label: "Front Door Refinishing — Before & After" },
  { src: "/images/photo_2026-05-13_16-54-30.jpg", label: "Double-Door Install with Smart Lock" },
  { src: "/images/photo_2026-05-13_16-54-27.jpg", label: "75\" TV Mount over Brick Fireplace" },
  { src: "/images/photo_2026-05-13_16-54-26.jpg", label: "Custom Closet Shelving — Before & After" },
  { src: "/images/photo_2026-05-13_16-54-40.jpg", label: "Bedroom TV Mount, Cables Hidden" },
  { src: "/images/photo_2026-05-13_16-54-38.jpg", label: "Backyard Pergola Assembly" },
  // ---- Lightbox-only ----
  { src: "/images/photo_2026-05-13_16-54-19.jpg", label: "Front Door — Refinished Close-Up" },
  { src: "/images/photo_2026-05-13_16-54-20.jpg", label: "Door — Mid-Refinish (Sanded)" },
  { src: "/images/photo_2026-05-13_16-54-23.jpg", label: "Closet Shelving — Installation" },
  { src: "/images/photo_2026-05-13_16-54-24.jpg", label: "Closet Shelving — Detail View" },
  { src: "/images/photo_2026-05-13_16-54-28.jpg", label: "TV + Soundbar over Plaster Fireplace" },
  { src: "/images/photo_2026-05-13_16-54-31.jpg", label: "Living Room TV Mount" },
  { src: "/images/photo_2026-05-13_16-54-33.jpg", label: "TV Mount on Stacked Stone Fireplace" },
  { src: "/images/photo_2026-05-13_16-54-37.jpg", label: "Wall TV Mount — Clean Install" },
];

export const FEATURED_PROJECT_COUNT = 6;

// Static fallback for the Reviews slider. Used until/unless a Google Sheet
// review feed loads at runtime.
export const REVIEWS: Review[] = [
  { name: "Jennifer M.", rating: 5, service: "TV Mounting + Shelf Installation", date: "March 12, 2025", text: "Booked Vlad for a TV mount and three shelves. He was on time, clean, and finished in one visit. New go-to handyman." },
  { name: "Robert K.", rating: 5, service: "Faucet Installation & Caulking", date: "February 28, 2025", text: "Replaced both bathroom faucets and re-caulked the tubs in an afternoon. No mess, no surprises on the bill." },
  { name: "Lauren P.", rating: 5, service: "Smart Lock + Video Doorbell", date: "January 15, 2025", text: "Smart lock and video doorbell installed and configured to my phone. Walked me through everything before leaving." },
];

// Owner copy for the About section. Drop a real photo into /public and
// set `photo` to `/your-file.jpg` to replace the placeholder image.
export const OWNER = {
  name: "Vlad",
  tagline: "Honest work, on time, done right — every job.",
  photo: "/images/MainFoto.png",
  bio: [
    "Hi, I'm Vlad — your local San Diego handyman. Over the last four years I've focused on what most homeowners actually need: clean, careful installations and small repairs done right the first time. TV mounts, smart locks, ceiling fans, faucets, shelves — by treating every job like it's in my own home, I've built Vlad Fix & Install on a simple promise.",
    "I take one customer at a time, never stack appointments back-to-back, and stand behind every install with a workmanship guarantee. You'll always know exactly what you're paying for before I lift a tool — no surprises on the bill, no rushed corners, and the work area cleaner than I found it.",
  ],
  highlights: [
    "4+ years specializing in home installations",
    "Fully insured",
    "Same-day booking, weekend slots",
    "Workmanship guarantee on every install",
  ],
};
