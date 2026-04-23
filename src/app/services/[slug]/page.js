import { notFound } from "next/navigation";
import servicesData, { getServiceBySlug, getAllServiceSlugs } from "@/lib/servicesData";
import ServicePageClient from "./ServicePageClient";
import { getSiteSettings } from "@/lib/siteSettings";

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Birmingham Removals`,
    description: service.heroSubtext,
    alternates: { canonical: `https://www.birminghamremovals.uk/services/${slug}` },
    openGraph: {
      title: `${service.title} | Birmingham Removals`,
      description: service.heroSubtext,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const settings = await getSiteSettings();
  return <ServicePageClient service={JSON.parse(JSON.stringify(service))} settings={settings} />;
}
