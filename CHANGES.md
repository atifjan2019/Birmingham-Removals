# SEO / AEO / GEO Change Log — birminghamremovals.uk

Dates use the session date **2026-05-22** unless otherwise noted.

---

## 2026-05-23 - Per-area unique content for all 73 expanded area pages

Replaced the shared templated paragraphs on every expanded area page with
hand-written per-area content. Each of the 73 area entries now has:

- A unique meta description (145-155 chars, padded by varied phrasing where
  shorter)
- A hand-written opening hook (1-2 sentences referencing specific local
  geography, housing or context)
- A hand-written local-knowledge paragraph naming real streets, access
  challenges and removal-day pinch points
- Two hand-written area-specific FAQ pairs leading the FAQ block

Per-area content lives in `src/lib/areaContent/batch{1..6}.js` and is spliced
into the existing generators in `src/lib/areaPageData.js`. The dynamic
`/areas/[area]` route renders the unique content automatically — no template
or schema changes required.

Batches committed separately for reviewability:

- Batch 1 (Greater Birmingham adjacents, 16): Bromsgrove, Redditch, Tamworth,
  Lichfield, Sutton Four Oaks, Sutton Mere Green, Sutton Walmley, Sutton
  Trinity, Sutton Vesey, Sutton Roughley, Knowle, Dorridge, Balsall Common,
  Castle Bromwich, Streetly, Aldridge.
- Batch 2 (Dudley/Sandwell/Walsall suburbs, 17): Stourbridge, Halesowen,
  Kingswinford, Wollaston, Sedgley, Brierley Hill, Quarry Bank, Gornal,
  Hateley Heath, Charlemont, Great Barr, Princes End, Pelsall, Brownhills,
  Pheasey, Rushall, Shelfield.
- Batch 3 (Wolverhampton/Coventry suburbs, 12): Tettenhall Regis, Tettenhall
  Wightwick, Penn, Oxley, Bushbury North, Merry Hill (Wolverhampton),
  Earlsdon, Cheylesmore, Wainbody, Woodlands, Bablake, Whoberley.
- Batch 4 (remaining Birmingham suburbs, 12): Northfield, Longbridge, Rubery,
  Frankley Great Park, Castle Vale, Bournville, Highters Heath, Kings Norton,
  Shard End, Bentley Heath, Meriden, Hampton-in-Arden.
- Batch 5 (wider West Midlands market towns, 8): Warwick, Stratford-upon-
  Avon, Rugby, Worcester, Stafford, Nuneaton and Bedworth, Cannock Chase,
  Wyre Forest (Kidderminster, Bewdley, Stourport).
- Batch 6 (outer regions, 8): Telford and Wrekin, Shrewsbury/Shropshire,
  Herefordshire, Malvern Hills, Wychavon (Evesham), South Staffordshire
  (Wombourne), Staffordshire Moorlands (Leek), North Warwickshire (Coleshill).

QC: zero placeholder strings (`grep -r PLACEHOLDER|TODO|FIXME|lorem|ipsum`
returns nothing). All 73 meta descriptions are unique. Production build runs
without errors or warnings.

---

## 2026-05-22 - West Midlands area page expansion

Created or expanded 73 area entries across the six requested campaign batches
using the shared dynamic area renderer. Each entry has postcode-aware
metadata, linked services, local knowledge, trust points, nearby area links,
FAQs, CTA coverage, city registry data and sitemap priority data.

Expanded existing URLs: /areas/northfield, /areas/longbridge, /areas/rubery,
/areas/bournville, /areas/kings-norton, /areas/great-barr.

Sitemap priorities by distance from Birmingham city centre:
- 0.8 (within ~20 miles): Bromsgrove, Redditch, Tamworth, Lichfield, the six
  Sutton wards, Knowle, Dorridge, Balsall Common, Castle Bromwich, Streetly,
  Aldridge, the Black Country and Walsall suburbs, the Wolverhampton suburbs,
  the Coventry suburbs, the additional Birmingham suburbs.
- 0.7 (20-40 miles): Stafford, Nuneaton, Cannock Chase, Wyre Forest, North
  Warwickshire.
- 0.6 (40+ miles or `isDistantArea`): Stratford-upon-Avon, Rugby, Worcester,
  Telford, Shropshire, Herefordshire, Malvern, Wychavon, South Staffs outer,
  Staffordshire Moorlands.

`isDistantArea: true` pages render a callout: "We cover moves to and from
[Area] as part of our wider West Midlands and nationwide service".
