import { notFound } from "next/navigation";
import servicesData, { getServiceBySlug, getAllServiceSlugs } from "@/lib/servicesData";
import ServicePageClient from "./ServicePageClient";

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Newcastle Removals`,
    description: service.heroSubtext,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={JSON.parse(JSON.stringify(service))} />;
}
