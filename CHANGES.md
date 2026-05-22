# SEO / AEO / GEO Change Log — birminghamremovals.uk

All work below is on branch `seo/em-dashes-schema-aeo` (PR #1). **Nothing is live until that PR is merged into `main`.**

Dates use the session date **2026-05-22**.

---

## 1. Content cleanup

| Change | Rationale |
|---|---|
| Removed every em dash (`—`) from public-facing content; replaced with natural punctuation (commas, full stops, colons, "to"). | Consistent, cleaner copy; em dashes were inconsistent across the site. Admin dashboard placeholders and code comments were left untouched (not indexable content). |
| Fixed botched no-space commas left by a prior find/replace (e.g. `Yes,beds` → `Yes, beds`) in `servicesData`, `reviews`, `about`. | Readability / correctness. |
| Corrected Bearwood postcodes to **B66, B67**. | Accuracy. |
| British English throughout new/edited copy (-ise, colour, licence). | Site is UK-only. |

## 2. Titles & metadata

| Change | Rationale |
|---|---|
| Fixed duplicate brand in page titles. The root layout applies a `%s | Birmingham Removals` template, so page titles that also contained the brand showed it twice. | Title length / no spammy duplicate brand. |
| Area titles now render `Removals {Area} | Fixed-Price Movers | Birmingham Removals`. | Brand appears once, keyword-led. |
| Exact titles set (via `absoluteTitle` to bypass the template where the brand is embedded): About `About Us \| 5-Star Birmingham Removals Since 2015`; Reviews `Customer Reviews \| 4.9-Star Removals Birmingham`; Contact `Contact Us \| Free Quote in 30 Mins \| Birmingham Removals`; FAQ `Removals FAQ: Prices, Insurance & Booking \| Birmingham Removals`. | Match requested wording while keeping brand once. |
| **Removed the `keywords` meta tag sitewide** (`makeMeta` no longer emits it; layout array dropped). | Google has ignored it since 2009; it exposed targeting. |
| `lang="en"` → `lang="en-GB"`. | Correct locale for a UK business (voice search, screen readers). |
| Added `theme-color`, `geo.region`, `geo.placename`, `geo.position`, `ICBM` meta. | GEO signals for local search / directories. |
| Added web app manifest (`public/site.webmanifest`) + `manifest` link. | PWA / mobile signals. |
| og:url and canonical now both use the trailing-slash origin on the homepage. | Consistency (Google flags og/canonical mismatch). |

## 3. Structured data (`src/lib/schema.js`, `src/config/business.js`)

| Change | Rationale |
|---|---|
| `MovingCompany` enriched: `geo`, `openingHoursSpecification`, `contactPoint`, `numberOfEmployees`, `postalCode`, `aggregateRating` with `bestRating`/`worstRating`, `memberOf` (BAR), `hasMap`, `sameAs` (Facebook + Trustpilot), `serviceType[]`, `hasOfferCatalog`, and a curated typed `areaServed` (Birmingham with Wikidata). | Rich-result eligibility, entity clarity, local signals. |
| `WebSite` schema: added `SearchAction` (sitelinks searchbox) + description. | SERP sitelinks searchbox. |
| Service pages: `Service` schema with `offers`/`priceSpecification` per service. | Service rich results. |
| Area pages: enriched `Service` schema with `description`, `offers`, `hasOfferCatalog`, postcodes. | Local service rich results. |
| Reviews page: `Review` + `ItemList` + `CollectionPage` schema. | Review snippets. |
| About: `AboutPage` schema; Contact: `ContactPage` schema; Quote: `BreadcrumbList`; Homepage: `HowTo` (4-step booking). | Page-type clarity + rich results. |
| New schema helpers: `serviceSchema`, `serviceHowToSchema`, `howToSchema`, `reviewListSchema`, `webPageSchema`. | Reusable, consistent JSON-LD. |

## 4. Technical SEO

| Change | Rationale |
|---|---|
| Removed legacy `Host:` directive from robots.txt. | Yandex-only; ignored by Google; noise. |
| Sitemap: unique per-URL `lastModified` via a maintained date map; priorities homepage 1.0 / quote 0.9 / service & area 0.8 / utility 0.5. | Removed the "all identical timestamp" auto-generated smell. |
| Added `loading="lazy"` + `decoding="async"` to below-the-fold images (footer logo, about photo); hero keeps `next/image priority`. | LCP / CLS on mobile. |
| Added explicit `width`/`height` to the about image. | Prevent layout shift. |

## 5. Visible breadcrumbs

| Change | Rationale |
|---|---|
| New `Breadcrumbs` / `BreadcrumbBar` component rendered above the hero on all **area** and **service** pages, plus **about, contact, reviews, quote**. Plain crawlable HTML, matches the existing `BreadcrumbList` schema. | Google prefers breadcrumbs present in both schema and visible HTML. |

## 6. Homepage / Reviews / Contact / FAQ

| Change | Rationale |
|---|---|
| Homepage: visible opening hours + a price-guide paragraph (£350–£650 etc.) in the pricing section. | AEO (answer engines can surface hours/prices). |
| Reviews: keyword-led H1 (was a bare rating stat); rating moved below as a styled line. | Keyword targeting. |
| Contact: added `<h2>` section headings (Call Us / WhatsApp / Email / Opening Hours). | Heading hierarchy. |
| FAQ: expanded to 16 schema-backed questions. | AEO coverage. |
| Footer NAP set to "West Midlands, UK". | NAP consistency with schema. |

## 7. New area pages

| Page | Postcode |
|---|---|
| `/areas/longbridge` | B31 |
| `/areas/bournville` | B30 |
| `/areas/rubery` | B45 |

Each has unique local content (streets, landmarks, housing stock), area-specific FAQs, internal links to neighbouring areas, and full Service/Breadcrumb/FAQ schema via the shared `AreaTemplate`. Registered in `src/lib/cities.js` as primary areas (appear in the /areas grid and sitemap).

> Northfield and Kings Norton already existed with unique content (no duplication created).

## 8. Service page content expansion

Refactored `servicesData.js` into per-service modules under `src/lib/services/`. Expanded all 6 to long-form (~1,050–1,740 words) with: pricing tables, step-by-step process, use-case sections, expanded FAQs (8–12 each), and contextual internal links to area + service pages. The service page renderer now supports **pricing tables** and **inline links/bold** in body copy.

| Service | Approx words |
|---|---|
| House Removals | ~1,500 |
| Office Removals | ~1,400 |
| Storage Solutions | ~1,200 |
| Piano & Specialist Items | ~1,200 |
| Man & Van | ~1,050 |
| Packing Service | ~1,000 |

---

## Outstanding — blocked on real business data (not invented)

Provide these and they get wired into footer NAP, schema, About, Contact and Reviews:

1. **Full business address** (street, city, postcode).
2. **Companies House number** (+ VAT number if registered).
3. **Founder/director**: name, job title, 3–4 sentence bio, optional headshot + LinkedIn — biggest remaining E-E-A-T win.
4. **Profile URLs**: Google Business Profile / CID, real Trustpilot URL + rating/count, BAR member-directory link + membership number.
5. **Real reviews** (name, area, rating, text, date) if you want more than 9 with genuine dates.

> `business.js` currently lists `sameAs` Facebook + Trustpilot URLs as requested — **confirm these profiles exist and are yours**, or they should be removed (a wrong `sameAs` hurts trust).

## Outstanding — content build-out (unblocked, not yet done)

- **§10** 4 new service pages: student-removals, long-distance-removals, furniture-removals, end-of-tenancy-removals.
- **§9** Blog architecture (`/blog`, `/blog/[slug]`, Article schema, sitemap inclusion) + 12 posts.
- **§11** Area content audits; expand Dudley / Wolverhampton / Coventry to 1,200+ words.
- **§8** Reorganise FAQ under category headings + add remaining questions.
- **§3** Homepage H1 rewrite, "who we are" intro, expand homepage reviews grid to 6–9.
- **§12–14** Contact form, quote-page trust signals, accessibility (skip-nav, aria-labels, tel links audit), 301 redirects map.
- **§6.3 / §12.2** Google Maps embeds (need GBP/coords).
- **§6.5** Optional `/areas/{area}/{service}` combo pages.

---

## Deploy note

Merge **PR #1** (`seo/em-dashes-schema-aeo`) into `main` to deploy. The merge is gated and must be triggered by the site owner:

```bash
gh pr merge seo/em-dashes-schema-aeo --merge --delete-branch
```
