// Master registry of every city / area served. Used by:
//   - /areas index
//   - /areas/[slug] dynamic route (for slugs without a dedicated static file)
//   - sitemap.js
// The 10 "primary" cities also have rich static pages under /areas/{slug}/page.js
// that take precedence over the dynamic [slug] route.

export const cities = {
  edgbaston: {
    name: "Edgbaston",
    postcodes: "B15, B16",
    tag: "Premium Coverage",
    intro:
      "Premium house and office removals across Edgbaston. Our fully insured crew knows every Georgian terrace, leafy avenue and gated estate in B15 and B16.",
    primary: true,
  },
  harborne: {
    name: "Harborne",
    postcodes: "B17",
    tag: "Village Moves",
    intro:
      "Friendly, efficient removals across Harborne. From High Street apartments to family homes off War Lane, we handle the packing, lifting and paperwork end to end.",
    primary: true,
  },
  moseley: {
    name: "Moseley",
    postcodes: "B13",
    tag: "Village Character",
    intro:
      "Reliable Moseley removals for students, professionals and growing families. Weekday, evening or weekend slots with the same trusted crew and transparent pricing.",
    primary: true,
  },
  "kings-heath": {
    name: "Kings Heath",
    postcodes: "B14",
    tag: "Local Experts",
    intro:
      "Expert local movers covering Kings Heath and Billesley. We know the narrow parking bays on High Street and plan every move for minimum disruption.",
    primary: true,
  },
  "selly-oak": {
    name: "Selly Oak",
    postcodes: "B29",
    tag: "Student Moves",
    intro:
      "Fast, affordable student and family removals across Selly Oak and Bournbrook. Last-minute bookings welcome, and we regularly handle the end-of-term rush.",
    primary: true,
  },
  "sutton-coldfield": {
    name: "Sutton Coldfield",
    postcodes: "B72, B73, B74, B75, B76",
    tag: "Premium Coverage",
    intro:
      "Discreet, high-end removals across Sutton Coldfield, Four Oaks and Mere Green. Specialist handling for antiques, art and pianos is standard on every job.",
    primary: true,
  },
  solihull: {
    name: "Solihull",
    postcodes: "B91, B92, B93",
    tag: "Wide Coverage",
    intro:
      "Trusted Solihull removals from Shirley to Dorridge. Luton vans and experienced crews handle suburban homes and commercial moves with equal care.",
    primary: true,
  },
  erdington: {
    name: "Erdington",
    postcodes: "B23, B24",
    tag: "Fast Response",
    intro:
      "Affordable Erdington removals with same-day options available. Flats, family homes and shared houses, every job fully insured as standard.",
    primary: true,
  },
  "hall-green": {
    name: "Hall Green",
    postcodes: "B28",
    tag: "Family Moves",
    intro:
      "Family-focused removals covering Hall Green, Springfield and Tyseley. We handle schools, storage and scheduling around your family's routine.",
    primary: true,
  },
  northfield: {
    name: "Northfield",
    postcodes: "B31",
    tag: "Estate Moves",
    intro:
      "Local removals across Northfield B31, covering Longbridge Village, Bristol Road South, West Heath and the surrounding estates. Same-day slots often available.",
    primary: true,
  },
  "kings-norton": {
    name: "Kings Norton",
    postcodes: "B30, B38",
    tag: "Estate Moves",
    intro:
      "Dedicated Kings Norton and Cotteridge crews. Large fleet, tail-lift vans and a team that has done it all, from 1-bed flats to 5-bed detached homes.",
  },
  "acocks-green": {
    name: "Acocks Green",
    postcodes: "B27",
    tag: "Local Experts",
    intro:
      "Smooth removals across Acocks Green and Yardley. Friendly DBS-checked crews, clear pricing and no surprises on move day.",
  },
  bearwood: {
    name: "Bearwood",
    postcodes: "B66, B67",
    tag: "Fast Response",
    intro:
      "Rapid Bearwood and Smethwick movers. Short-notice bookings, flexible slots and transparent hourly rates.",
  },
  "great-barr": {
    name: "Great Barr",
    postcodes: "B42, B43, B44",
    tag: "Wide Coverage",
    intro:
      "Experienced crews across Great Barr, Kingstanding and Perry Barr. Luton vans, packing materials and a full door-to-door service.",
  },
  handsworth: {
    name: "Handsworth",
    postcodes: "B20, B21",
    tag: "Cost-Effective",
    intro:
      "Affordable Handsworth removals with flexible timings. Whether you are moving a flat or a large family home, we price fairly and deliver on time.",
  },
  quinton: {
    name: "Quinton",
    postcodes: "B32",
    tag: "Local Experts",
    intro:
      "Reliable Quinton and Halesowen border removals. We know the local estates, parking restrictions and best routes in and out of B32.",
  },
  "city-centre": {
    name: "City Centre",
    postcodes: "B1, B2, B3, B4, B5",
    tag: "Apartment Specialists",
    intro:
      "City-centre removals across the Jewellery Quarter, Digbeth and Colmore Row. We navigate lifts, parking permits and tight loading bays every week.",
  },
  dudley: {
    name: "Dudley",
    postcodes: "DY1, DY2, DY3",
    tag: "Black Country",
    intro:
      "Black Country removals covering Dudley, Brierley Hill and Netherton. Affordable rates, same-day quotes and no obligation.",
  },
  "west-bromwich": {
    name: "West Bromwich",
    postcodes: "B70, B71",
    tag: "Black Country",
    intro:
      "Fully insured West Bromwich and Oldbury removals. Commercial and residential moves priced by the job or by the hour.",
  },
  wolverhampton: {
    name: "Wolverhampton",
    postcodes: "WV1, WV2, WV3",
    tag: "Wide Coverage",
    intro:
      "Wolverhampton removals delivered by Birmingham-headquartered crews. City-centre flats, suburban family homes and everything in between.",
  },
  coventry: {
    name: "Coventry",
    postcodes: "CV1, CV2, CV3",
    tag: "Wider West Midlands",
    intro:
      "Coventry and Kenilworth removals delivered with the same Birmingham-standard care. Long-distance moves quoted free.",
  },
};

export const allCitySlugs = Object.keys(cities);

export const primaryCitySlugs = allCitySlugs.filter((slug) => cities[slug].primary);

export function getCity(slug) {
  return cities[slug] || null;
}

export const citiesList = allCitySlugs.map((slug) => ({ slug, ...cities[slug] }));
