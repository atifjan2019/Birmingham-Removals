import { BUSINESS } from "@/config/business";

const ORG_ID = `${BUSINESS.url}/#organization`;
const WEBSITE_ID = `${BUSINESS.url}/#website`;

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const openingHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ALL_DAYS,
  opens: BUSINESS.openingHours.opens,
  closes: BUSINESS.openingHours.closes,
};

export const movingCompanySchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": ORG_ID,
  name: BUSINESS.name,
  url: BUSINESS.url,
  image: BUSINESS.logo,
  logo: BUSINESS.logo,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  foundingDate: String(BUSINESS.foundingYear),
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: BUSINESS.numberOfEmployees,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  ...(BUSINESS.hasMap ? { hasMap: BUSINESS.hasMap } : {}),
  openingHoursSpecification: [openingHoursSpecification],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: BUSINESS.phoneE164,
    contactType: "customer service",
    areaServed: "GB",
    availableLanguage: "English",
    hoursAvailable: openingHoursSpecification,
  },
  areaServed: [
    { "@type": "City", name: "Birmingham", sameAs: "https://www.wikidata.org/wiki/Q2256" },
    { "@type": "City", name: "Solihull" },
    { "@type": "City", name: "Sutton Coldfield" },
    { "@type": "Place", name: "Edgbaston" },
    { "@type": "Place", name: "Harborne" },
    { "@type": "Place", name: "Selly Oak" },
    { "@type": "Place", name: "Moseley" },
    { "@type": "Place", name: "Kings Heath" },
    { "@type": "Place", name: "Erdington" },
    { "@type": "Place", name: "Bearwood" },
    { "@type": "Place", name: "Dudley" },
    { "@type": "Place", name: "West Bromwich" },
    { "@type": "Place", name: "Wolverhampton" },
    { "@type": "Place", name: "Coventry" },
  ],
  serviceType: [
    "House Removals",
    "Office Removals",
    "Man and Van",
    "Packing Service",
    "Storage Solutions",
    "Piano and Specialist Item Removals",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Birmingham Removals Services",
    itemListElement: [
      ["House Removals Birmingham", "house-removals"],
      ["Office Removals Birmingham", "office-removals"],
      ["Man and Van Birmingham", "man-and-van"],
      ["Packing Service Birmingham", "packing-service"],
      ["Storage Solutions Birmingham", "storage-solutions"],
      ["Piano and Specialist Item Removals Birmingham", "piano-and-specialist-items"],
    ].map(([name, slug]) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        url: `${BUSINESS.url}/services/${slug}`,
      },
    })),
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating.value,
    reviewCount: BUSINESS.rating.count,
    bestRating: "5",
    worstRating: "1",
  },
  ...(BUSINESS.memberOf
    ? {
        memberOf: {
          "@type": "Organization",
          name: BUSINESS.memberOf.name,
          url: BUSINESS.memberOf.url,
        },
      }
    : {}),
  ...(BUSINESS.sameAs && BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: BUSINESS.url,
  name: BUSINESS.name,
  description:
    "Fixed-price house and office removals across Birmingham and the West Midlands since 2015.",
  publisher: { "@id": ORG_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BUSINESS.url}/areas/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
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

// Enriched Service schema for an area page (description, offers, hasOfferCatalog).
export function serviceAreaSchema(city, slug, postcodes) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Removals",
    name: `Removals in ${city}`,
    description: `Fixed-price, fully insured house and office removals in ${city}${
      postcodes ? ` (${postcodes})` : ""
    }. DBS-checked crews, free quote in 30 minutes.`,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "Place",
      name: city,
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: "West Midlands",
        addressCountry: "GB",
      },
    },
    url: `${BUSINESS.url}/areas/${slug}`,
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        minPrice: "250",
        maxPrice: "1500",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Removal Services in ${city}`,
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `House Removals ${city}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Office Removals ${city}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Man and Van ${city}` } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: `Packing Service ${city}` } },
      ],
    },
  };
}

// Service schema for a /services/[slug] page.
export function serviceSchema({ serviceType, name, description, slug, minPrice, maxPrice }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    name,
    description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: "Birmingham" },
    url: `${BUSINESS.url}/services/${slug}`,
    ...(minPrice && maxPrice
      ? {
          offers: {
            "@type": "Offer",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "GBP",
              minPrice: String(minPrice),
              maxPrice: String(maxPrice),
            },
          },
        }
      : {}),
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

// HowTo schema (homepage "book in four steps" section).
export function howToSchema(steps) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Book a Removal in Birmingham",
    description:
      "Book a fixed-price, fully insured removal in Birmingham in four simple steps.",
    totalTime: "PT2M",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// HowTo schema for a service page process section.
export function serviceHowToSchema({ name, description, steps }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// Article (BlogPosting) schema for a /blog/[slug] post.
export function articleSchema({ slug, title, description, date, updated, author, image }) {
  const url = `${BUSINESS.url}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: title,
    description,
    datePublished: date,
    dateModified: updated || date,
    author: { "@type": "Organization", name: author || BUSINESS.name, url: `${BUSINESS.url}/about` },
    publisher: { "@id": ORG_ID },
    image: image ? `${BUSINESS.url}${image}` : BUSINESS.ogImage,
    url,
  };
}

// ItemList of reviews for the /reviews page.
export function reviewListSchema(reviews) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Birmingham Removals Customer Reviews",
    description:
      "Verified customer reviews for Birmingham Removals, rated 4.9 out of 5 from 312+ customers.",
    url: `${BUSINESS.url}/reviews`,
    itemListElement: reviews.map((r, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating || 5), bestRating: "5" },
      reviewBody: r.body,
      itemReviewed: { "@id": ORG_ID },
    })),
  };
}

// Generic WebPage schema with optional breadcrumb. `type` lets callers emit
// AboutPage / ContactPage / CollectionPage etc.
export function webPageSchema({ type = "WebPage", path, name, description, breadcrumb }) {
  const url = `${BUSINESS.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    ...(Array.isArray(breadcrumb) && breadcrumb.length
      ? {
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: breadcrumb.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.name,
              item: it.url,
            })),
          },
        }
      : {}),
  };
}
