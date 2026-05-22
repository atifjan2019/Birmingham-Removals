import { notFound } from "next/navigation";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/servicesData";
import ServicePageClient from "./ServicePageClient";
import { getSiteSettings } from "@/lib/siteSettings";
import { makeMeta } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
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

const SERVICE_SCHEMA_DATA = {
  "house-removals": {
    serviceType: "House Removals",
    name: "House Removals Birmingham",
    description:
      "Full house removals across Birmingham and the West Midlands. Fixed prices, DBS-checked crews, comprehensive insurance. Free quote in 30 minutes.",
    minPrice: 250,
    maxPrice: 2000,
  },
  "office-removals": {
    serviceType: "Office Removals",
    name: "Office Removals Birmingham",
    description:
      "Zero-downtime office relocations across Birmingham. Evening and weekend scheduling, IT handling, fixed prices.",
    minPrice: 400,
    maxPrice: 5000,
  },
  "man-and-van": {
    serviceType: "Man and Van",
    name: "Man and Van Birmingham",
    description:
      "Same-day man and van service across Birmingham, Solihull and the Black Country. Fixed prices, fully insured.",
    minPrice: 60,
    maxPrice: 400,
  },
  "packing-service": {
    serviceType: "Packing Service",
    name: "Professional Packing Service Birmingham",
    description:
      "Professional packing service in Birmingham using double-walled boxes and specialist wrapping. Full or part-packing available.",
    minPrice: 80,
    maxPrice: 600,
  },
  "storage-solutions": {
    serviceType: "Storage Solutions",
    name: "Storage Solutions Birmingham",
    description:
      "Secure, climate-controlled storage near Birmingham city centre. Short and long-term, fully insured, CCTV-monitored.",
    minPrice: 20,
    maxPrice: 200,
  },
  "piano-and-specialist-items": {
    serviceType: "Specialist Item Removals",
    name: "Piano & Specialist Item Removals Birmingham",
    description:
      "Expert removal of pianos, antiques, artwork and fragile items in Birmingham. Specialist crew with the proper equipment.",
    minPrice: 150,
    maxPrice: 800,
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
    ...(SERVICE_SCHEMA_DATA[slug]
      ? [serviceSchema({ ...SERVICE_SCHEMA_DATA[slug], slug })]
      : []),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <ServicePageClient service={JSON.parse(JSON.stringify(service))} settings={settings} />
    </>
  );
}
