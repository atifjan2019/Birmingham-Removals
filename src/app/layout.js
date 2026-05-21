import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BUSINESS } from "@/config/business";
import JsonLd from "@/components/seo/JsonLd";
import { movingCompanySchema, websiteSchema } from "@/lib/schema";

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

export const metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Birmingham Removals | Fixed-Price House & Office Movers",
    template: "%s | Birmingham Removals",
  },
  description:
    "Birmingham's 5-star removals company since 2015. Fixed prices, fully insured, DBS-checked crews. House, office, man & van across the West Midlands.",
  keywords: [
    "removals Birmingham",
    "house removals Birmingham",
    "office removals Birmingham",
    "man and van Birmingham",
    "moving company Birmingham",
    "removals Solihull",
    "removals Sutton Coldfield",
    "removals West Midlands",
  ],
  alternates: { canonical: BUSINESS.url },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  openGraph: {
    title: "Birmingham Removals | Fixed-Price House & Office Movers",
    description:
      "Birmingham's 5-star removals company since 2015. Fixed prices, fully insured, DBS-checked crews. House, office, man & van across the West Midlands.",
    type: "website",
    locale: "en_GB",
    url: BUSINESS.url,
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
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
        {children}
      </body>
    </html>
  );
}
