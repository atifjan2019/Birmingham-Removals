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
  "student-removals": {
    title: "Student Removals Birmingham | Affordable University Moves",
    description:
      "Affordable student removals across Birmingham for UoB, BCU and Aston. Halls, HMOs and shared houses, small van options, same-day slots. Free quote.",
  },
  "long-distance-removals": {
    title: "Long Distance Removals from Birmingham | Nationwide Moves",
    description:
      "Nationwide removals from Birmingham to London, Manchester, Bristol and beyond. Fixed-price, fully insured, storage-in-transit option. Free quote.",
  },
  "furniture-removals": {
    title: "Furniture & Single Item Removals Birmingham | From £60",
    description:
      "Single item and furniture removals across Birmingham. Sofas, beds, wardrobes, appliances and marketplace collections. Fixed prices from £60. Free quote.",
  },
  "end-of-tenancy-removals": {
    title: "End of Tenancy Removals Birmingham | Fast Flat & HMO Moves",
    description:
      "Fast end of tenancy removals across Birmingham, timed to your checkout date. Flats, HMOs and shared houses, same-day and storage options. Free quote.",
  },
};

const SERVICE_SCHEMA_DATA = {
  "house-removals": {
    serviceType: "House Removals",
    name: "House Removals Birmingham",
    description:
      "Full house removals across Birmingham and the West Midlands. Fixed prices, DBS-checked crews, £10m goods-in-transit insurance included. Free quote in 30 minutes.",
    minPrice: 250,
    maxPrice: 1800,
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
  "student-removals": {
    serviceType: "Student Removals",
    name: "Student Removals Birmingham",
    description:
      "Affordable student removals across Birmingham for UoB, BCU and Aston students. Halls, HMOs and shared houses, small van options, fully insured.",
    minPrice: 60,
    maxPrice: 300,
  },
  "long-distance-removals": {
    serviceType: "Long Distance Removals",
    name: "Long Distance Removals from Birmingham",
    description:
      "Nationwide removals from Birmingham to London, Manchester, Bristol, Edinburgh and beyond. Fixed-price, fully insured, storage-in-transit available.",
    minPrice: 600,
    maxPrice: 5000,
  },
  "furniture-removals": {
    serviceType: "Furniture Removals",
    name: "Furniture and Single Item Removals Birmingham",
    description:
      "Single item and furniture removals across Birmingham. Sofas, beds, wardrobes, appliances and marketplace collections. Fully insured, careful handling.",
    minPrice: 60,
    maxPrice: 300,
  },
  "end-of-tenancy-removals": {
    serviceType: "End of Tenancy Removals",
    name: "End of Tenancy Removals Birmingham",
    description:
      "Fast end of tenancy removals across Birmingham, timed to your checkout. Flats, HMOs and shared houses, same-day and short-term storage options.",
    minPrice: 60,
    maxPrice: 400,
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
