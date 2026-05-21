import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/servicesData";
import ServicePageClient from "./ServicePageClient";
import { getSiteSettings } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { BUSINESS } from "@/config/business";

const SERVICE_META = {
  "house-removals": {
    title: "House Removals Birmingham | Fixed Prices, Fully Insured",
    description:
      "Stress-free house removals across Birmingham and the West Midlands. DBS-checked crews, transit insurance included, fixed quote in 30 minutes. Call today.",
  },
  "office-removals": {
    title: "Office Removals Birmingham | Evening & Weekend Moves",
    description:
      "Zero-downtime office removals in Birmingham. Evening and weekend scheduling, IT handling, fully insured. Fixed-price quote in 30 minutes.",
  },
  "man-and-van": {
    title: "Man and Van Birmingham | Same-Day Bookings Available",
    description:
      "Reliable man and van service across Birmingham, Solihull and the Black Country. Same-day slots, fixed prices, fully insured. Book online or call.",
  },
  "packing-service": {
    title: "Professional Packing Service Birmingham | Fragile-Safe",
    description:
      "Full, part or fragile-only packing for Birmingham moves. Premium materials included, expert wrapping for antiques, glass and electronics. Free quote.",
  },
  "storage-solutions": {
    title: "Storage Solutions Birmingham | Secure & Climate-Controlled",
    description:
      "Short and long-term storage in Birmingham. Secure, CCTV-monitored, climate-controlled units. Ideal for chain breaks and renovations. Free quote.",
  },
  "piano-and-specialist-items": {
    title: "Piano & Specialist Item Removals Birmingham",
    description:
      "Expert piano, antique and high-value item removals across Birmingham. Specialist crews, full insurance, careful handling guaranteed. Free quote today.",
  },
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const meta = SERVICE_META[slug] || {
    title: `${service.title} Birmingham`,
    description: service.heroSubtext,
  };
  return makeMeta({
    title: meta.title,
    description: meta.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const settings = await getSiteSettings();
  const schemas = [
    breadcrumbSchema([
      { name: "Home", url: BUSINESS.url },
      { name: "Services", url: `${BUSINESS.url}/services` },
      { name: service.title, url: `${BUSINESS.url}/services/${slug}` },
    ]),
    ...(Array.isArray(service.faqs) && service.faqs.length > 0
      ? [faqSchema(service.faqs)]
      : []),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ServicePageClient service={JSON.parse(JSON.stringify(service))} settings={settings} />
    </>
  );
}
