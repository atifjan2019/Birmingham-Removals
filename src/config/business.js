// Single source of truth for NAP and brand-level facts.
// Import from anywhere via `@/config/business`.

export const BUSINESS = {
  name: "Birmingham Removals",
  legalName: "Birmingham Removals",
  url: "https://www.birminghamremovals.uk",
  logo: "https://www.birminghamremovals.uk/images/logo.webp",
  ogImage: "https://www.birminghamremovals.uk/og-image.jpg",
  phoneDisplay: "07365 380090",
  phoneE164: "+447365380090",
  telHref: "tel:+447365380090",
  email: "hello@birminghamremovals.uk",
  priceRange: "££",
  foundingYear: 2015,
  numberOfEmployees: 24,
  openingHours: { opens: "07:00", closes: "21:00" },
  rating: { value: "4.9", count: "312" },
  address: {
    locality: "Birmingham",
    region: "West Midlands",
    postalCode: "B1",
    country: "GB",
  },
  geo: { latitude: 52.4862, longitude: -1.8904 },
  hasMap: "https://maps.google.com/?q=Birmingham+Removals+West+Midlands",
  // British Association of Removers (referenced in the About page stats).
  memberOf: { name: "British Association of Removers", url: "https://www.bar.co.uk" },
  areasServed: [
    "Birmingham",
    "Solihull",
    "Sutton Coldfield",
    "Edgbaston",
    "Harborne",
    "Selly Oak",
    "Moseley",
    "Kings Heath",
    "Erdington",
    "Hall Green",
    "Northfield",
    "Acocks Green",
    "Bearwood",
    "City Centre",
    "Coventry",
    "Dudley",
    "Great Barr",
    "Handsworth",
    "Kings Norton",
    "Quinton",
    "West Bromwich",
    "Wolverhampton",
    "West Midlands",
  ],
  // Social / review profile URLs emitted as schema `sameAs`. Confirm each of
  // these profiles actually exists and matches the brand; replace or remove any
  // that do not (a wrong/unverified URL hurts trust more than an omission).
  sameAs: [
    "https://www.facebook.com/birminghamremovals",
    "https://www.trustpilot.com/review/birminghamremovals.uk",
  ],
};
