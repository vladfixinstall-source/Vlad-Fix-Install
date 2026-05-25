import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = "https://vladfixinstall.com";
const SITE_NAME = "Vlad Fix & Install";
const TITLE = "Vlad Fix & Install — Local Handyman, Done Right";
const DESCRIPTION =
  "TV mounting, smart locks, ceiling fans, faucets, shelves and small repairs by a trusted San Diego handyman. Same-day booking, honest pricing, workmanship guarantee.";

export const metadata: Metadata = {
  // Absolute base — Next.js uses this to resolve all relative URLs in
  // metadata (canonical, og:image, twitter:image…) to fully-qualified URLs,
  // which is required by Facebook/LinkedIn/Slack/Discord parsers.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Vlad Khanasyk" }],
  keywords: [
    "handyman San Diego",
    "TV mounting",
    "smart lock installation",
    "ceiling fan installation",
    "faucet replacement",
    "door installation",
    "shelf installation",
    "home repairs San Diego",
  ],

  // OpenGraph (Facebook, LinkedIn, Slack, Discord, Telegram, WhatsApp, iMessage)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    // app/opengraph-image.png is auto-detected by Next.js and added here
    // as og:image — no need to list it manually. Just confirm the file is
    // 1200×630 and lives at app/opengraph-image.png.
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    // app/twitter-image.png is auto-detected too.
  },

  // Search-engine behaviour
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },

  // Manifest stub — Next.js auto-picks app/icon.png + app/apple-icon.png +
  // app/favicon.ico from the App Router conventions, so we don't list icons
  // manually here.
  category: "Home services",
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8", // brand blue — sets address-bar color on Android Chrome
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
