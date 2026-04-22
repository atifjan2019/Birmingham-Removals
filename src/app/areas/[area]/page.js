import { notFound } from "next/navigation";
import AreaClient from "./AreaClient";
import { areasData } from "../data";
import { getSiteSettings } from "@/lib/siteSettings";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const area = resolvedParams.area;
  const data = areasData[area];

  if (!data) {
    return { title: "Area Not Found | Birmingham Removals" };
  }

  const title = `Removals in ${data.name} | Birmingham Removals`;
  return {
    title,
    description: data.description,
    alternates: { canonical: `https://www.birminghamremovals.uk/areas/${area}` },
    openGraph: {
      title: `Expert Removals in ${data.name} — Birmingham Removals`,
      description: data.description,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(areasData).map((area) => ({ area }));
}

export default async function AreaPage({ params }) {
  const resolvedParams = await params;
  const area = resolvedParams.area;
  const data = areasData[area];
  if (!data) notFound();
  const settings = await getSiteSettings();
  return <AreaClient areaData={data} areaSlug={area} settings={settings} />;
}
