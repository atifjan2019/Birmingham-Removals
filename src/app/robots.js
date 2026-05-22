import { BUSINESS } from "@/config/business";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
  };
}
