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

  return [...staticPaths, ...servicePaths, ...areaPaths].map((path) => ({
    url: `${BUSINESS.url}${path}`,
    lastModified: now,
  }));
}
