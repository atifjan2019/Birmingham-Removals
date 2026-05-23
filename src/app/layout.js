import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BUSINESS } from "@/config/business";
import JsonLd from "@/components/seo/JsonLd";
import { movingCompanySchema, websiteSchema } from "@/lib/schema";
import { getSiteSettings } from "@/lib/siteSettings";

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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://web-sdk.smartlook.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://web-sdk.smartlook.com" />
        <JsonLd data={[movingCompanySchema, websiteSchema]} />
        <Script id="smartlook" strategy="lazyOnload">
          {`
            (function(){
              if (typeof window.smartlook !== 'function') {
                var sl = function(){ sl.api.push(arguments); };
                sl.api = [];
                window.smartlook = sl;
                var c = document.createElement('script');
                c.async = true; c.defer = true; c.type = 'text/javascript'; c.charset = 'utf-8';
                c.src = 'https://web-sdk.smartlook.com/recorder.js';
                document.head.appendChild(c);
              }
              window.smartlook('init', '46b85b47fc8859eeb693f5a26240894d74e9edd7', { region: 'eu' });
            })();
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-[#0B1E3F]" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#0B1E3F] focus:rounded focus:shadow-lg focus:outline focus:outline-2 focus:outline-[#F97316]"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
