import { BUSINESS } from "@/config/business";
import { getAllServiceSlugs } from "@/lib/servicesData";
import { allCitySlugs, getCity } from "@/lib/cities";
import { areaPages } from "@/lib/areaPageData";
import blogPosts from "@/lib/blogData";

// Genuine last-modified dates, reflecting when each section's content was last
// meaningfully updated. Update the relevant date here when you change a page so
// the sitemap stays honest (avoid stamping every URL with the same build time).
const LASTMOD = {
  home: "2026-05-22",
  marketing: "2026-05-22", // /about, /contact, /faq, /reviews, /services, /areas, /blog
  quote: "2026-05-22",
  service: "2026-05-21", // /services/[slug]
  area: "2026-05-20", // established /areas/[slug]
  areaNew: "2026-05-22", // newly added areas
  htmlSitemap: "2026-05-15",
};

const NEW_AREAS = new Set(areaPages.map((area) => area.slug));

function lastModFor(path) {
  if (path === "") return LASTMOD.home;
  if (path === "/quote") return LASTMOD.quote;
  if (path === "/sitemap") return LASTMOD.htmlSitemap;
  if (path.startsWith("/services/")) return LASTMOD.service;
  if (path.startsWith("/areas/")) {
    const slug = path.replace("/areas/", "");
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
    "/quote",
    "/blog",
    "/sitemap",
  ];
  const servicePaths = getAllServiceSlugs().map((slug) => `/services/${slug}`);
  const areaPaths = allCitySlugs.map((slug) => `/areas/${slug}`);
  // Blog posts carry their own publish/updated date as lastmod.
  const blogEntries = blogPosts.map((p) => ({
    url: `${BUSINESS.url}/blog/${p.slug}`,
    lastModified: p.updated || p.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Per-path SEO hints: the homepage ranks highest, primary marketing pages
  // next, then the service/area landing pages.
  const meta = (path) => {
    if (path === "") return { changeFrequency: "weekly", priority: 1.0 };
    if (path === "/quote") return { changeFrequency: "monthly", priority: 0.9 };
    if (path === "/services" || path === "/areas")
      return { changeFrequency: "weekly", priority: 0.8 };
    if (path === "/sitemap") return { changeFrequency: "monthly", priority: 0.5 };
    if (path.startsWith("/areas/")) {
      const slug = path.replace("/areas/", "");
      return { changeFrequency: "monthly", priority: getCity(slug)?.priority || 0.8 };
    }
    if (path.startsWith("/services/"))
      return { changeFrequency: "monthly", priority: 0.8 };
    return { changeFrequency: "monthly", priority: 0.6 };
  };

  const pageEntries = [...staticPaths, ...servicePaths, ...areaPaths].map((path) => ({
    url: `${BUSINESS.url}${path}`,
    lastModified: lastModFor(path),
    ...meta(path),
  }));

  return [...pageEntries, ...blogEntries];
}
