import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata = {
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Birmingham Removals | Trusted House & Office Movers",
    description:
      "Birmingham's 5-star removals team. Free quotes, fully insured, same-day availability across the West Midlands.",
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Birmingham Removals",
  },
  twitter: {
    card: "summary_large_image",
    title: "Birmingham Removals | Trusted House & Office Movers",
    description:
      "Birmingham's 5-star removals team. Free quotes, fully insured, same-day availability.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Birmingham Removals",
  url: siteUrl,
  image: `${siteUrl}/images/logo.png`,
  telephone: "+447365380090",
  email: "info@birminghamremovals.uk",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Birmingham City Centre",
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
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "312",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.smartlook||(function(d) {
                var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
                var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
                c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
              })(document);
              smartlook('init', 'a45602631ad33a33d938753e59ec193131138703', { region: 'eu' });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#0B1E3F]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
