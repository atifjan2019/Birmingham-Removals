import { BUSINESS } from "@/config/business";

export const movingCompanySchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": `${BUSINESS.url}/#organization`,
  name: BUSINESS.name,
  url: BUSINESS.url,
  image: BUSINESS.logo,
  logo: BUSINESS.logo,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  foundingDate: String(BUSINESS.foundingYear),
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  areaServed: BUSINESS.areasServed.map((n) => ({ "@type": "Place", name: n })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating.value,
    reviewCount: BUSINESS.rating.count,
  },
  ...(BUSINESS.sameAs && BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BUSINESS.url}/#website`,
  url: BUSINESS.url,
  name: BUSINESS.name,
  publisher: { "@id": `${BUSINESS.url}/#organization` },
};

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function serviceAreaSchema(city, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Removals",
    name: `Removals in ${city}`,
    provider: { "@id": `${BUSINESS.url}/#organization` },
    areaServed: { "@type": "Place", name: city },
    url: `${BUSINESS.url}/areas/${slug}`,
  };
}

export function faqSchema(qa) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}
