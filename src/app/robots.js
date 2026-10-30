import { BUSINESS } from "@/config/business";

export default function robots() {
  return {
    rules: [
      // /api/site-image serves the logo and favicon that the Organization
      // schema and the manifest point at; the longer allow rule wins over
      // the /api disallow, so Google can fetch them.
      { userAgent: "*", allow: ["/", "/api/site-image/"], disallow: ["/admin", "/api"] },
    ],
    sitemap: `${BUSINESS.url}/sitemap.xml`,
  };
}
