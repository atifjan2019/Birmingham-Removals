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
