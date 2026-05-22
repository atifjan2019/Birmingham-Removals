import { BUSINESS } from "@/config/business";

export function makeMeta({ title, description, path, image, noindex, keywords, absoluteTitle }) {
  const url = `${BUSINESS.url}${path}`;
  const ogImage = image || BUSINESS.ogImage;
  return {
    // `absoluteTitle` bypasses the root layout's "%s | Birmingham Removals"
    // template so the title renders exactly as given (avoids a doubled brand
    // when the brand is already part of the title).
    title: absoluteTitle ? { absolute: title } : title,
    description,
    // The keywords meta tag is intentionally not emitted: Google has ignored it
    // since 2009 and it needlessly exposes targeting. `keywords` is accepted for
    // backwards compatibility with callers but deliberately not rendered.
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
