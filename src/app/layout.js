import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/config/business";
import JsonLd from "@/components/seo/JsonLd";
import { movingCompanySchema, websiteSchema } from "@/lib/schema";
import { getSiteSettings } from "@/lib/siteSettings";
import ConsentDefault from "@/components/analytics/ConsentDefault";
import AnalyticsLoader from "@/components/analytics/AnalyticsLoader";
import CookieBanner from "@/components/consent/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export async function generateMetadata() {
  // Use the favicon uploaded via /admin/settings (stored as a data URL), falling
  // back to the static file when none has been set.
  const settings = await getSiteSettings();
  const faviconUrl = settings.faviconUrl || "/favicon.ico";

  return {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Birmingham Removals | Fixed-Price House & Office Movers",
    template: "%s | Birmingham Removals",
  },
  description:
    "Birmingham's 5-star removals company since 2015. Fixed prices, fully insured, DBS-checked crews. House, office, man & van across the West Midlands.",
  // Use the trailing-slash origin so the canonical and og:url match exactly
  // (Next normalises the root canonical with a trailing slash via metadataBase).
  alternates: { canonical: `${BUSINESS.url}/` },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#F97316",
    "geo.region": "GB-WMD",
    "geo.placename": "Birmingham, West Midlands",
    "geo.position": "52.4862;-1.8904",
    ICBM: "52.4862, -1.8904",
  },
  icons: {
    icon: [{ url: faviconUrl }],
    shortcut: [{ url: faviconUrl }],
    apple: [{ url: faviconUrl }],
  },
  openGraph: {
    title: "Birmingham Removals | Fixed-Price House & Office Movers",
    description:
      "Birmingham's 5-star removals company since 2015. Fixed prices, fully insured, DBS-checked crews. House, office, man & van across the West Midlands.",
    type: "website",
    locale: "en_GB",
    url: `${BUSINESS.url}/`,
    siteName: BUSINESS.name,
    images: [{ url: BUSINESS.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birmingham Removals | Fixed-Price House & Office Movers",
    description:
      "Birmingham's 5-star removals company. Fixed prices, fully insured, DBS-checked crews across the West Midlands.",
    images: [BUSINESS.ogImage],
  },
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
  };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        {/* First, while the page is parsed: Google's consent defaults, all denied
            until the visitor accepts. Nothing contacts Google Analytics or
            Smartlook before then (see AnalyticsLoader), so neither is
            preconnected either. */}
        <ConsentDefault />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <JsonLd data={[movingCompanySchema, websiteSchema]} />
      </head>
      <body className="min-h-screen bg-white text-[#0B1E3F]" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#0B1E3F] focus:rounded focus:shadow-lg focus:outline focus:outline-2 focus:outline-[#F97316]"
        >
          Skip to main content
        </a>
        {/* Early in the page, so keyboard and screen reader users meet the
            question first; it is fixed in place, so it still sits above the page. */}
        <CookieBanner />
        <div id="main-content" className="outline-none">{children}</div>
        <AnalyticsLoader />
      </body>
    </html>
  );
}
