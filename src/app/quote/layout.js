export const metadata = {
  title: "Get a Free Quote",
  description:
    "Get a fixed, no-obligation quote from Birmingham Removals in under 2 minutes. House, office, man & van or packing,all covered across the West Midlands.",
  alternates: { canonical: "https://www.birminghamremovals.uk/quote" },
  openGraph: {
    title: "Get a Free Quote | Birmingham Removals",
    description:
      "Get a fixed, no-obligation removals quote in under 2 minutes — house, office, man & van or packing across the West Midlands.",
    url: "https://www.birminghamremovals.uk/quote",
    siteName: "Birmingham Removals",
    type: "website",
    images: [{ url: "https://www.birminghamremovals.uk/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function QuoteLayout({ children }) {
  return children;
}
