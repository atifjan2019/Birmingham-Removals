import { notFound } from "next/navigation";
import AreaClient from "./AreaClient";
import { areasData } from "../data";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const area = resolvedParams.area;
  const data = areasData[area];

  if (!data) {
    return {
      title: "Area Not Found | Newcastle Removals",
    };
  }

  return {
    title: `Removals in ${data.name} | Newcastle Removals`,
    description: data.description,
    openGraph: {
      title: `Expert Removals in ${data.name}`,
      description: data.description,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(areasData).map((area) => ({
    area,
  }));
}

export default async function AreaPage({ params }) {
  const resolvedParams = await params;
  const area = resolvedParams.area;
  const data = areasData[area];

  if (!data) {
    notFound();
  }

  return <AreaClient areaData={data} />;
}
