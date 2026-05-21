import { BUSINESS } from "@/config/business";

export function makeMeta({ title, description, path, image, noindex }) {
  const url = `${BUSINESS.url}${path}`;
  const ogImage = image || BUSINESS.ogImage;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
