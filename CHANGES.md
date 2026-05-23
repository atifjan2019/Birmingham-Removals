# SEO / AEO / GEO Change Log — birminghamremovals.uk

Comprehensive change log for the SEO / area-expansion / schema work shipped
on the `main` branch. Dates use the session date noted in each section.

---

## 2026-05-23 - E6 build: Google Maps embeds on 10 primary area pages

The 10 static primary-city area pages now render a keyless Google Maps
iframe centred on each area's postcode. The /contact map is intentionally
deferred until E2 (real street address) is supplied — embedding a map
pinned to "United Kingdom" provides zero value.

**New component:** `src/components/AreaMap.js`

- Server-rendered iframe (no client JS, no `next/dynamic`).
- Uses the public `maps.google.com/maps?q=...&output=embed` URL, so no API
  key, no billing account and no runtime config required.
- `loading="lazy"` so the iframe never blocks the LCP paint.
- Wrapped in a `<figure>` with `aria-label` and a screen-reader-only
  `<figcaption>` for accessibility and crawler context.

**Template wiring:** `src/components/AreaTemplate.js`

- Added a new optional `mapQuery` prop. When set, the `<AreaMap>` block
  renders immediately after the existing "Local Knowledge" section.
- When `mapQuery` is omitted (all 73 dynamic area pages today) nothing is
  rendered, so there is no visual change for non-primary areas.
- Also fixed an existing em dash in the section heading:
  `"Local Knowledge — Moving in {name}"` → `"Local Knowledge: Moving in {name}"`
  (em dashes are banned per the project copy rules).

**Per-page `mapQuery` values added to the 10 static primary pages:**

| Page                        | mapQuery                              |
| --------------------------- | ------------------------------------- |
| /areas/edgbaston            | `Edgbaston, Birmingham, B15`          |
| /areas/harborne             | `Harborne, Birmingham, B17`           |
| /areas/moseley              | `Moseley, Birmingham, B13`            |
| /areas/kings-heath          | `Kings Heath, Birmingham, B14`        |
| /areas/selly-oak            | `Selly Oak, Birmingham, B29`          |
| /areas/sutton-coldfield     | `Sutton Coldfield, B72`               |
| /areas/solihull             | `Solihull, B91`                       |
| /areas/erdington            | `Erdington, Birmingham, B23`          |
| /areas/hall-green           | `Hall Green, Birmingham, B28`         |
| /areas/city-centre          | `Birmingham city centre, B1`          |

Queries use "Area, Birmingham, [first postcode]" so the embed centres on
the right neighbourhood rather than the broader city or the postcode
centroid. Sutton Coldfield and Solihull drop the "Birmingham" qualifier
because they are administratively distinct.

**CSP update:** `next.config.mjs`

The site CSP previously had `default-src 'self'` and no `frame-src`, which
would have blocked the Google Maps iframe (default-src governs frame-src
when frame-src is absent). Added:

```
frame-src https://www.google.com https://maps.google.com
```

`frame-ancestors 'none'` is kept untouched — that only governs the site
being embedded elsewhere, not iframes inside the site.

Build verified: 129 routes still build cleanly, zero errors.

---

## 2026-05-23 - Priority 2 build: Homepage reviews grid + freshness signal

**P2a — Homepage reviews carousel replaced with a 3-card server-rendered grid.**

The previous homepage "what our customers say" section was a 1-at-a-time
client-side carousel driven by `framer-motion` and React state, with prev/next
buttons. Only one review was ever visible at a time, and the whole component
loaded as `ssr: false` so the quotes never shipped in the initial HTML for
crawlers.

Replaced with a server-rendered 3-up grid (`src/components/Testimonials.js`,
no longer a `"use client"` component):

- Three featured reviews exported as `HOMEPAGE_REVIEWS` so the homepage can
  emit matching Review JSON-LD from the same source of truth.
- Uses semantic `<ul>` of `<li>` cards with `<blockquote>` for each quote.
- `aria-label="Rated 5 out of 5"` on the star row; decorative star/quote
  icons marked `aria-hidden`.
- "Read all reviews" outbound link to /reviews under the grid.

The companion lazy-loader `src/components/TestimonialsLazy.js` is no longer
needed and has been deleted. `src/app/page.js` now imports `Testimonials`
directly and emits an `ItemList` of `Review` JSON-LD for the three visible
quotes via the existing `reviewListSchema()` helper.

**Aggregate rating note.** The MovingCompany `AggregateRating` in
`src/lib/schema.js` (4.9 / 312) reflects the business's external Google
rating, not the on-page sample reviews, so it has not been changed. The
`/reviews` page already renders 9 reviews in a 3-col grid with a complete
`ItemList` of 9 Review entries, so no restructure was needed there.

**P2b — Homepage freshness signal.**

Added a hidden-but-crawlable `<time dateTime="2026-05-23">` at the end of
the homepage body (inside `QuoteModalProvider`, after `StickyMobileCTA`).
Uses `className="sr-only"` so it is invisible to sighted users but read by
crawlers and screen readers. Reads "Last updated 23 May 2026". Update the
`dateTime` and visible text whenever the homepage is meaningfully changed.

Build verified: still 129 routes, zero errors, zero warnings.

---

## 2026-05-23 - Priority 1a build: Blog (12 posts) deployed

`/blog` is no longer a 404. The 12 posts that existed only on the
`seo/em-dashes-schema-aeo` branch (commits `48c9051`, `75ee655`, `22e2eaa`)
have been restored to `main` and fully wired up.

**Restored from commit 75ee655 (verified blob identity):**

- `src/lib/blogData.js` — newest-first aggregator with `getPostBySlug` /
  `getAllPostSlugs` helpers.
- `src/lib/blog/<slug>.js` (12 modules) — house removal costs, moving
  checklist, best areas to live, moving to Birmingham, office relocation,
  student moving, piano removal, packing tips, moving day, storage, comparing
  companies, conveyancing timeline. Each 1,000-2,500 words, British English,
  no em dashes, with internal links to service + area pages.
- `src/app/blog/page.js` — index. CollectionPage JSON-LD via
  `webPageSchema({ type: "CollectionPage" })`, BreadcrumbBar + BreadcrumbList
  (Home → Blog), 3-col card grid with title, excerpt, date, read time.
- `src/app/blog/[slug]/page.js` — post renderer. BlogPosting + BreadcrumbList
  + (optional) FAQPage JSON-LD, BreadcrumbBar (Home → Blog → Post),
  conditional Table of Contents for posts with >3 sections, crawlable
  `<details>` FAQ blocks, related posts grid, end-of-post CTA.

**New code added on main:**

- `articleSchema()` helper added to `src/lib/schema.js` — emits BlogPosting
  with `@id`, `mainEntityOfPage`, `datePublished`/`dateModified`,
  Organization author, publisher referencing `@id` `#organization`, and
  image fallback to the site OG image.

**Navigation + discovery wiring:**

- `src/components/Navbar.js` — `Blog` link added to `navLinks`, positioned
  between `Reviews` and `About` per the build prompt.
- `src/components/Footer.js` — `Blog` link added to the COMPANY column,
  positioned between `Reviews` and `FAQ`.
- `src/app/sitemap.js` — `/blog` (priority 0.7, weekly) and every
  `/blog/[slug]` (priority 0.7, monthly) added to the XML sitemap. Each post
  uses its own `post.updated || post.date` as `lastModified` rather than a
  shared timestamp. Section `LASTMOD` dates updated to today (2026-05-23)
  for home, marketing, services and area buckets to reflect this session's
  work; `htmlSitemap` updated to match.
- `src/app/sitemap/page.js` — new full-width "Blog" section below the
  existing 3-col Main / Services / Areas grid, listing all 12 posts as
  clickable titles.

Build verified: 129 routes generate cleanly (was 116 before adding the 13
blog routes). Zero errors. Zero placeholder strings in `src/`. No em dashes
in any restored blog copy.

**Priority 1b note — sameAs URLs.** The Facebook
(`facebook.com/birminghamremovals`) and Trustpilot
(`trustpilot.com/review/birminghamremovals.uk`) URLs in
`src/config/business.js` remain in place, with the existing inline comment
flagging them for owner confirmation. They were not removed in this session
because owner confirmation has not been received either way; removing
plausible URLs blindly would lose real entity signal if they are in fact
genuine. Owner still needs to confirm or deny each URL.

---

## 2026-05-23 - Priority 1 build: 4 new services, slug renames, /services breadcrumb

Closes the highest-priority outstanding items in the master build prompt.

**New service pages (Priority 1a).** Four full-length service pages added, each
~1,300-1,500 words with the same structure as `house-removals`: numbered
sections, pricing table, step-by-step process, 8-10 FAQs, internal links to
area + service pages, breadcrumb component, and Service + FAQPage +
BreadcrumbList JSON-LD:

- `/services/student-removals` — affordable Birmingham student moves,
  summer storage, university-area knowledge.
- `/services/long-distance-removals` — UK-wide single-trip moves from
  Birmingham, with destination pricing table.
- `/services/furniture-removals` — single items, showroom collections,
  marketplace pickups, white goods.
- `/services/end-of-tenancy-removals` — same-day inspection-ready moves,
  evening/weekend slots, deposit-safe handling.

All four are registered in `servicesData.js`, given metadata + schema entries
in `src/app/services/[slug]/page.js`, and surfaced in the footer SERVICES
column. The footer also gains a new `All Services →` link to match the
existing `All Areas →` (Priority 4d).

**Area slug renames (Priority 1b).** Eleven area slugs renamed to match the
descriptive borough/district names rather than abbreviated town names:

| Old slug         | New slug                  |
| ---------------- | ------------------------- |
| `nuneaton`       | `nuneaton-and-bedworth`   |
| `cannock`        | `cannock-chase`           |
| `kidderminster`  | `wyre-forest`             |
| `telford`        | `telford-and-wrekin`      |
| `shrewsbury`     | `shrewsbury-shropshire`   |
| `hereford`       | `herefordshire`           |
| `malvern`        | `malvern-hills`           |
| `evesham`        | `wychavon`                |
| `wombourne`      | `south-staffordshire`     |
| `leek`           | `staffordshire-moorlands` |
| `coleshill`      | `north-warwickshire`      |

Each rename touches `src/lib/areaPageData.js` (slug field) and the
corresponding key in `src/lib/areaContent/batch5.js` or `batch6.js`. The
auto-generated sitemap and the `/areas/[area]` dynamic route both pick up
the new slugs without further edits. 301 redirects added in
`next.config.mjs` (`AREA_SLUG_REDIRECTS`) so the old paths forward to the
new canonical URLs and any inbound link equity transfers.

**/services breadcrumb (Priority 4a).** `/services` now renders the
`BreadcrumbBar` component (Home → Services) above the hero and emits a
matching `BreadcrumbList` JSON-LD block, bringing it in line with every
other top-level page.

Build verified clean: `npm run build` generates 116 routes with zero
errors.

---

## 2026-05-23 - Repository audit cleanup

Removed eight boilerplate / dev-only files that were not needed for the live
website:

- `public/file.svg`, `public/globe.svg`, `public/next.svg`,
  `public/vercel.svg`, `public/window.svg` — default Next.js boilerplate
  SVGs with no references anywhere in `src/`.
- `scripts/check.mjs` — debug `console.log` of customers and bookings.
- `scripts/test-booking.mjs` — broken local test importing a non-existent
  path (`./src/app/actions/booking.js`).
- `scripts/create-admin.mjs` — one-off admin upsert that contained a
  hard-coded plaintext admin password. The file is removed from the working
  tree but **the password remains in git history**, so it should be rotated
  if still in use.

Kept (in active use or required for build/deploy): all components in
`src/components`, `src/lib/d1.js` (used by the `prisma.js` D1 shim),
`prisma/schema.prisma` + `prisma/d1-schema.sql`, `worker-api/`,
`scripts/generate-favicon.mjs`, every image in `public/images/`, and the
static `src/app/areas/<slug>/page.js` files (each has unique custom content).

---

## 2026-05-23 - Per-area unique content for all 73 expanded area pages

Replaced the shared templated paragraphs on every expanded area page with
hand-written per-area content. Each of the 73 area entries now has:

- A unique meta description (145-155 chars, padded by varied phrasing where
  shorter — see `padMetaToTarget` in `src/lib/areaPageData.js`).
- A hand-written opening hook (1-2 sentences referencing specific local
  geography, housing or context).
- A hand-written local-knowledge paragraph naming real streets, access
  challenges and removal-day pinch points (permit zones, conservation
  loading rules, gradients, weight-restricted lanes, school runs, etc.).
- Two hand-written area-specific FAQ pairs leading the FAQ block; the
  remaining three FAQ entries fall back to the generic structured generators.

Per-area content lives in `src/lib/areaContent/batch{1..6}.js`. The merge map
in `src/lib/areaPageData.js` splices it into the existing scaffolding so the
dynamic `/areas/[area]` route renders the unique content automatically — no
template, schema or sitemap changes were required.

Batches committed separately for reviewability:

- **Batch 1** (Greater Birmingham adjacents, 16 areas): Bromsgrove, Redditch,
  Tamworth, Lichfield, Sutton Four Oaks, Sutton Mere Green, Sutton Walmley,
  Sutton Trinity, Sutton Vesey, Sutton Roughley, Knowle, Dorridge, Balsall
  Common, Castle Bromwich, Streetly, Aldridge. Commit `72fef9f`.
- **Batch 2** (Dudley/Sandwell/Walsall suburbs, 17): Stourbridge, Halesowen,
  Kingswinford, Wollaston, Sedgley, Brierley Hill, Quarry Bank, Gornal,
  Hateley Heath, Charlemont, Great Barr, Princes End, Pelsall, Brownhills,
  Pheasey, Rushall, Shelfield. Commits `81c9244` and `028411b`.
- **Batch 3** (Wolverhampton/Coventry suburbs, 12): Tettenhall Regis,
  Tettenhall Wightwick, Penn, Oxley, Bushbury North, Merry Hill
  (Wolverhampton/Penn), Earlsdon, Cheylesmore, Wainbody, Woodlands, Bablake,
  Whoberley. Commit `028411b`.
- **Batch 4** (remaining Birmingham suburbs, 12): Northfield, Longbridge,
  Rubery, Frankley Great Park, Castle Vale, Bournville, Highters Heath,
  Kings Norton, Shard End, Bentley Heath, Meriden, Hampton-in-Arden.
  Commit `65d84d2`.
- **Batch 5** (wider West Midlands market towns, 8): Warwick,
  Stratford-upon-Avon, Rugby, Worcester, Stafford, Nuneaton and Bedworth,
  Cannock Chase, Wyre Forest (Kidderminster, Bewdley, Stourport).
  Commit `f5c572e`.
- **Batch 6** (outer regions, 8): Telford and Wrekin, Shrewsbury/Shropshire,
  Herefordshire, Malvern Hills, Wychavon (Evesham), South Staffordshire
  (Wombourne), Staffordshire Moorlands (Leek), North Warwickshire (Coleshill).
  Commit `bd916f3`.
- **Meta-length tidy-up + CHANGES.md restore**: commit `bbc1c0d`.

QC: zero placeholder strings (`grep -r PLACEHOLDER|TODO|FIXME|lorem|ipsum`
returns nothing under `src/`). All 73 meta descriptions are unique. The
production `npm run build` runs clean with no errors or warnings.

Honest scope note: the original brief asked for 800-1,200 words of fully
hand-written content per page. The shipping approach adds ~150-250 words of
unique hand-written copy on top of the existing ~500-700 word templated
scaffolding (services list, why-us, CTA, etc. remain templated as designed).
Each page now reads with a genuine local voice in its opening, local-knowledge
paragraph and FAQs; a fully hand-written 800-1,200 word per-page expansion
would need a further pass.

---

## 2026-05-22 - West Midlands area page expansion (70+ new pages)

Created or expanded 73 area entries across the six requested campaign batches
using the shared dynamic area renderer. Each entry has postcode-aware
metadata, linked services, local knowledge, trust points, nearby area links,
FAQs, CTA coverage, city-registry data and sitemap priority data.

Architecture:

- Data file `src/lib/areaPageData.js` holds the `rawAreaPages` master list,
  the generators (`buildMetaDescription`, `buildOpening`, `buildServices`,
  `buildLocalParagraphs`, `buildWhyUs`, `buildFaqs`, `buildNearby`) and the
  exports consumed by the dynamic route and the cities registry
  (`areaPages`, `areaPagesBySlug`, `areaCityEntries`).
- Dynamic route `src/app/areas/[area]/page.js` renders the unique-content
  pages when `getAreaPage(slug)` returns a record, falling back to a generic
  default for any city registered only in `cities.js` without an entry in
  `areaPageData.js`.
- `src/lib/cities.js` spreads `areaCityEntries` into the master `cities`
  registry so the same data drives the areas-index grid, the sitemap and
  the in-page nearby-area cross-links.
- `src/app/areas/page.js` (the public areas index) groups areas by their
  `tag` / `group` field with H2 subheadings ("Birmingham", "Solihull & South
  Birmingham", "Black Country", "Walsall & Aldridge", "Wolverhampton",
  "Coventry & Warwickshire", "Worcestershire & Beyond", "Staffordshire",
  "Shropshire & Herefordshire") and renders a responsive 3-col grid.
- `src/components/AreasCovered.js` (homepage section) already cross-links to
  the high-priority new areas (Bromsgrove, Redditch, Tamworth, Lichfield,
  Knowle, Stourbridge, Warwick, Stratford-upon-Avon, etc.).

Expanded existing URLs (kept live URLs, replaced static content with the
data-driven render): `/areas/northfield`, `/areas/longbridge`, `/areas/rubery`,
`/areas/bournville`, `/areas/kings-norton`, `/areas/great-barr`.

Sitemap priorities by distance from Birmingham city centre (set in
`src/app/sitemap.js`, picked up from `cities[slug].priority`):

- **0.8** (within ~20 miles): Bromsgrove, Redditch, Tamworth, Lichfield, the
  six Sutton wards, Knowle, Dorridge, Balsall Common, Castle Bromwich,
  Streetly, Aldridge, the Black Country and Walsall suburbs, the
  Wolverhampton suburbs, the Coventry suburbs, the remaining Birmingham
  suburbs.
- **0.7** (20-40 miles): Stafford, Nuneaton and Bedworth, Cannock Chase,
  Wyre Forest, North Warwickshire.
- **0.6** (40+ miles or `isDistantArea: true`): Stratford-upon-Avon, Rugby,
  Worcester, Telford and Wrekin, Shropshire, Herefordshire, Malvern Hills,
  Wychavon, South Staffordshire (Wombourne and Kinver edge), Staffordshire
  Moorlands.

`isDistantArea: true` pages render a callout in the opening section: *"We
cover moves to and from [Area] as part of our wider West Midlands and
nationwide service. Longer-distance jobs are planned as full-day work and
priced clearly upfront, with no hidden mileage charges added on the day."*

Schema per area page (rendered via `src/components/seo/JsonLd.js` in
`AreaTemplate.js`):

- `BreadcrumbList` — Home → Areas → [Area]
- `MovingCompany` via `serviceAreaSchema(name, slug, postcodes)` with
  postcode-aware `areaServed`
- `FAQPage` matching the visible 5 FAQ questions
- All schema references the global `MovingCompany @id` defined in
  `src/lib/schema.js`

Commit: `0e6d3d3 feat(areas): add 70+ new area pages across West Midlands
and surrounding counties`.

---

## 2026-05-22 - Schema, sitemap priorities and homepage SEO deltas (PR #3)

(Merged into `main` from branch `seo/em-dashes-schema-aeo` as
`a67b88c Merge pull request #3`.)

- Added explicit `serviceType` and `hasOfferCatalog` arrays to the global
  `MovingCompany` schema in `src/lib/schema.js`.
- Reworked sitemap priorities in `src/app/sitemap.js` so each section
  (home, marketing pages, services, established areas, newly-added areas,
  quote page, HTML sitemap) has a genuine `lastModified` date keyed by
  section rather than a single build-time timestamp.
- Removed em dashes from copy and replaced with the en-dash / spaced-hyphen
  style used elsewhere on the site.
- Added explicit `sameAs` and `hasMap` properties to the organisation
  schema; tightened homepage pricing copy and the exact-title wording.

---

## 2026-05-22 - Service-page expansion to 1,200-1,700 words

Commit `00566f8 Expand service pages to 1,200-1,700 words; remove keywords
meta`.

- Expanded copy on all six `/services/[slug]` pages (house removals, office
  removals, man & van, packing, storage, piano & specialist items) to the
  1,200-1,700 word range with structured local content, pricing logic and
  CTA placement.
- Removed the legacy `keywords` meta tag (no SEO value, occasionally
  triggers spam flags in newer crawlers).

---

## 2026-05-22 - Longbridge, Bournville and Rubery static pages + technical SEO

Commit `0db80e0 Add Longbridge/Bournville/Rubery pages + technical SEO
fixes`.

- Added rich static area pages for `/areas/longbridge`, `/areas/bournville`
  and `/areas/rubery`. These later became data-driven via `areaPageData.js`
  in the 2026-05-22 expansion above; the unique copy now lives in the
  shared data file rather than in three separate static files.
- Technical SEO fixes: canonical tags, robots directive normalisation,
  CSP allowance for data URIs (so favicons and inline svg backgrounds load
  under a strict CSP).

---

## 2026-05-22 - Page metadata and schema SEO overhaul (PRs #1, #2)

Earlier commits merged via `seo/em-dashes-schema-aeo`: `010cd3b`,
`1146ce4`, `a0d5cac`, `b31ce9c`.

- Reviewed and tightened the `<title>` and meta-description text for every
  public route.
- Added the `MovingCompany` JSON-LD with full opening hours, geo
  coordinates, postal address, employee count and founding date.
- Added `Organization`, `WebSite` and `WebPage` schema where appropriate.
- Added `sameAs` URLs for the Google Business Profile and review platforms.
- Centralised business constants in `src/config/business.js`.
- Layered Local-SEO, AEO (answer-engine) and GEO (generative-engine)
  optimisations: FAQ schema across every service and area page, a single
  consistent business identity across schemas, and conversational long-tail
  question phrasing in the FAQ blocks.

---

## Notes for future sessions

- The Next.js front-end is deployed on **Vercel**. The separate Worker API
  (`worker-api/`) lives on **Cloudflare Workers** with a D1 database. The
  front-end talks to the Worker over HTTP via a thin shim at
  `src/lib/prisma.js` that mimics the Prisma API surface so existing call
  sites continue to work without code changes.
- The dynamic `/areas/[area]` route is the canonical area renderer. Static
  `src/app/areas/<slug>/page.js` files still exist for the original ten
  primary cities (Edgbaston, Harborne, Moseley, Kings Heath, Selly Oak,
  Sutton Coldfield, Solihull, Erdington, Hall Green and the city-centre
  page) and take precedence over the dynamic route. New areas should be
  added by editing `src/lib/areaPageData.js` and (where relevant) the
  per-batch unique-content file under `src/lib/areaContent/`.
- The `MovingCompany` schema `@id` is fixed at `${BUSINESS.url}/#organization`
  so every reference across the site resolves to the same entity.
