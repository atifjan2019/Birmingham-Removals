import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
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

const siteUrl = "https://www.birminghamremovals.uk";

export async function generateMetadata() {
  const s = await getSiteSettings();
  const icons = s.faviconUrl ? { icon: s.faviconUrl } : undefined;
  const ogImage = s.logoUrl && !s.logoUrl.startsWith("/") ? s.logoUrl : `${siteUrl}/images/logo.png`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Birmingham Removals | Trusted House & Office Movers in Birmingham",
      template: "%s | Birmingham Removals",
    },
    description:
      "Birmingham's most trusted removals company. House moves, office relocations, man & van and packing across Birmingham, Solihull, Sutton Coldfield & the West Midlands. Free quotes, same-day availability.",
    keywords: [
      "removals Birmingham",
      "house removals Birmingham",
      "office removals Birmingham",
      "man and van Birmingham",
      "moving company Birmingham",
      "removals Solihull",
      "removals Sutton Coldfield",
      "removals West Midlands",
      "Birmingham movers",
    ],
    alternates: { canonical: siteUrl },
    icons,
    openGraph: {
      title: "Birmingham Removals | Trusted House & Office Movers",
      description:
        "Birmingham's 5-star removals team. Free quotes, fully insured, same-day availability across the West Midlands.",
      type: "website",
      locale: "en_GB",
      url: siteUrl,
      siteName: "Birmingham Removals",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Birmingham Removals | Trusted House & Office Movers",
      description:
        "Birmingham's 5-star removals team. Free quotes, fully insured, same-day availability.",
      images: [ogImage],
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

function buildPhoneE164(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("44")) return `+${digits}`;
  if (digits.startsWith("0")) return `+44${digits.slice(1)}`;
  return `+${digits}`;
}

function buildJsonLd(s) {
  const sameAs = ["facebook", "instagram", "twitter", "linkedin", "youtube", "tiktok"]
    .map((k) => s[k])
    .filter((v) => v && String(v).trim().length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Birmingham Removals",
    url: siteUrl,
    image: s.logoUrl && !s.logoUrl.startsWith("/") ? s.logoUrl : `${siteUrl}/images/logo.png`,
    telephone: buildPhoneE164(s.phone),
    email: s.email,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address || "Birmingham City Centre",
      addressLocality: "Birmingham",
      addressRegion: "West Midlands",
      postalCode: "B1 1AA",
      addressCountry: "GB",
    },
    areaServed: [
      "Birmingham",
      "Solihull",
      "Sutton Coldfield",
      "Edgbaston",
      "Harborne",
      "Moseley",
      "Selly Oak",
      "Kings Heath",
      "Erdington",
      "West Midlands",
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.4862,
      longitude: -1.8904,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "21:00",
    },
    sameAs,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "312",
    },
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  const jsonLd = buildJsonLd(settings);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="smartlook" strategy="afterInteractive">
          {`
            window.smartlook||(function(d) {
              var o=window.smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
              var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
              c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            window.smartlook('init', '46b85b47fc8859eeb693f5a26240894d74e9edd7', { region: 'eu' });
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-[#0B1E3F]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
