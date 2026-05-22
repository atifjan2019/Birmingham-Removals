import { BUSINESS } from "@/config/business";
import { getAllServiceSlugs } from "@/lib/servicesData";
import { allCitySlugs } from "@/lib/cities";

export default function sitemap() {
  const now = new Date();
  const staticPaths = [
    "",
    "/services",
    "/areas",
    "/about",
    "/contact",
    "/faq",
    "/reviews",
    "/quote",
    "/sitemap",
  ];
  const servicePaths = getAllServiceSlugs().map((slug) => `/services/${slug}`);
  const areaPaths = allCitySlugs.map((slug) => `/areas/${slug}`);

  // Per-path SEO hints: the homepage ranks highest, primary marketing pages
  // next, then the service/area landing pages.
  const meta = (path) => {
    if (path === "") return { changeFrequency: "weekly", priority: 1.0 };
    if (path === "/quote") return { changeFrequency: "monthly", priority: 0.9 };
    if (path === "/services" || path === "/areas")
      return { changeFrequency: "weekly", priority: 0.8 };
    if (path === "/sitemap") return { changeFrequency: "monthly", priority: 0.3 };
    if (path.startsWith("/services/") || path.startsWith("/areas/"))
      return { changeFrequency: "monthly", priority: 0.7 };
    return { changeFrequency: "monthly", priority: 0.6 };
  };

  return [...staticPaths, ...servicePaths, ...areaPaths].map((path) => ({
    url: `${BUSINESS.url}${path}`,
    lastModified: now,
    ...meta(path),
  }));
}
