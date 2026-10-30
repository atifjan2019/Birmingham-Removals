import { BUSINESS } from "@/config/business";
import { getAllServiceSlugs } from "@/lib/servicesData";
import { allCitySlugs, getCity } from "@/lib/cities";
import { areaPages } from "@/lib/areaPageData";
import blogPosts from "@/lib/blogData";

// Genuine last-modified dates, reflecting when each section's content was last
// meaningfully updated. Update the relevant date here when you change a page so
// the sitemap stays honest (avoid stamping every URL with the same build time).
const LASTMOD = {
  home: "2026-05-23",
  marketing: "2026-05-23", // /about, /contact, /faq, /reviews, /services, /areas
  quote: "2026-05-22",
  service: "2026-05-23", // /services/[slug]
  area: "2026-05-23", // established /areas/[slug]
  areaNew: "2026-05-23", // newly added / renamed areas
  blogIndex: "2026-05-23",
  htmlSitemap: "2026-05-23",
};

const NEW_AREAS = new Set(areaPages.map((area) => area.slug));
// Areas added after the May content pass, with the date each batch went live.
const AREA_ADDED = Object.fromEntries(
  ["handsworth-wood", "boldmere", "wylde-green", "selly-park", "rednal", "winson-green", "hockley", "stockland-green", "maypole",
    "hamstead", "perry-beeches", "hay-mills", "solihull-lodge", "water-orton", "hagley", "kinver", "wombourne", "codsall",
    "old-hill", "styvechale"].map((slug) => [slug, "2026-10-24"])
);
// Area pages whose content was rewritten after they went live.
const AREA_UPDATED = Object.fromEntries(
  [
    "longford-coventry", "brandwood-end", "cheswick-green", "nechells", "olton", "stourbridge", "bromsgrove",
    "redditch", "tamworth", "lichfield", "warwick", "solihull", "sutton-coldfield", "wolverhampton", "dudley",
    "yardley", "stechford", "sheldon", "ward-end", "hodge-hill", "small-heath", "sparkhill", "sparkbrook",
    "bordesley-green", "aston", "ladywood", "lozells", "perry-barr", "kingstanding", "yardley-wood", "shirley",
    "marston-green", "chelmsley-wood", "smiths-wood", "bartley-green", "weoley-castle", "stirchley", "cotteridge",
    "billesley", "tyseley", "digbeth", "jewellery-quarter", "washwood-heath", "alum-rock", "witton", "saltley",
    "oldbury", "smethwick", "tipton", "wednesbury", "rowley-regis", "blackheath", "cradley-heath", "langley",
    "tividale", "walsall", "willenhall", "bloxwich", "darlaston", "bentley-walsall", "short-heath", "bilston",
    "wednesfield", "coseley", "fallings-park", "blakenhall", "finham", "tile-hill", "canley", "stoke-coventry",
    "foleshill", "radford-coventry", "wyken", "binley", "allesley", "keresley", "monkspath", "dickens-heath",
    "hockley-heath", "lyndon", "elmdon", "five-ways", "highgate-birmingham", "bordesley", "balsall-heath",
    "druids-heath", "west-heath-birmingham", "garretts-green", "lea-hall", "tile-cross", "kitts-green", "new-oscott",
    "pype-hayes", "lye", "wordsley", "wall-heath", "netherton-dudley", "amblecote", "caldmore", "palfrey",
    "pleck", "leamore", "birchills", "walsall-wood", "essington", "compton-wolverhampton", "whitmore-reans",
    "heath-town", "low-hill", "fordhouses", "pendeford", "coundon-coventry", "holbrooks", "hillfields-coventry",
    "whitley-coventry", "walsgrave", "potters-green", "bell-green-coventry", "kingshurst", "fordbridge", "meriden-village",
  ].map((slug) => [slug, "2026-10-30"])
);
// Service pages added or rewritten after the May pass.
const SERVICE_UPDATED = { "flat-removals": "2026-10-30", "piano-and-specialist-items": "2026-10-30" };
const BLOG_LASTMOD = new Map(blogPosts.map((p) => [p.slug, p.updated || p.date]));

function lastModFor(path) {
  if (path === "") return LASTMOD.home;
  if (path === "/quote") return LASTMOD.quote;
  if (path === "/sitemap") return LASTMOD.htmlSitemap;
  if (path === "/blog") return LASTMOD.blogIndex;
  if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    return BLOG_LASTMOD.get(slug) || LASTMOD.blogIndex;
  }
  if (path.startsWith("/services/")) return SERVICE_UPDATED[path.replace("/services/", "")] || LASTMOD.service;
  if (path.startsWith("/areas/")) {
    const slug = path.replace("/areas/", "");
    if (AREA_UPDATED[slug]) return AREA_UPDATED[slug];
    if (AREA_ADDED[slug]) return AREA_ADDED[slug];
    return NEW_AREAS.has(slug) ? LASTMOD.areaNew : LASTMOD.area;
  }
  return LASTMOD.marketing;
}

export default function sitemap() {
  const staticPaths = [
    "",
    "/services",
    "/areas",
    "/about",
    "/contact",
    "/faq",
    "/reviews",
    "/blog",
    "/quote",
    "/sitemap",
  ];
  const servicePaths = getAllServiceSlugs().map((slug) => `/services/${slug}`);
  const areaPaths = allCitySlugs.map((slug) => `/areas/${slug}`);
  const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);

  const meta = (path) => {
    if (path === "") return { changeFrequency: "weekly", priority: 1.0 };
    if (path === "/quote") return { changeFrequency: "monthly", priority: 0.9 };
    if (path === "/services" || path === "/areas")
      return { changeFrequency: "weekly", priority: 0.8 };
    if (path === "/blog") return { changeFrequency: "weekly", priority: 0.7 };
    if (path === "/sitemap") return { changeFrequency: "monthly", priority: 0.5 };
    if (path.startsWith("/blog/"))
      return { changeFrequency: "monthly", priority: 0.7 };
    if (path.startsWith("/areas/")) {
      const slug = path.replace("/areas/", "");
      return { changeFrequency: "monthly", priority: getCity(slug)?.priority || 0.8 };
    }
    if (path.startsWith("/services/"))
      return { changeFrequency: "monthly", priority: 0.8 };
    return { changeFrequency: "monthly", priority: 0.6 };
  };

  return [...staticPaths, ...servicePaths, ...areaPaths, ...blogPaths].map((path) => ({
    url: `${BUSINESS.url}${path}`,
    lastModified: lastModFor(path),
    ...meta(path),
  }));
}
