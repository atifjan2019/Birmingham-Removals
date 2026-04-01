import { notFound } from "next/navigation";
import AreaClient from "./AreaClient";

const areasData = {
  gosforth: {
    name: "Gosforth",
    description:
      "Premium house and office removals in Gosforth. Experience a zero-stress move with our fully insured, professional team serving all Gosforth postcodes.",
  },
  jesmond: {
    name: "Jesmond",
    description:
      "Expert moving services in Jesmond perfectly tailored for students, local professionals, and families. Fast, reliable, and highly reviewed.",
  },
  heaton: {
    name: "Heaton",
    description:
      "Affordable and reliable removals in Heaton. Whether you are moving a 3-bedroom house or just a few single items, we securely manage your move.",
  },
  gateshead: {
    name: "Gateshead",
    description:
      "Trusted local removals operating seamlessly across the river in Gateshead. Benefit from our extensive fleet and highly-trained moving experts.",
  },
  tynemouth: {
    name: "Tynemouth",
    description:
      "Coastal removals and bespoke storage solutions throughout Tynemouth. Let our team handle the heavy lifting while you enjoy your new home.",
  },
  "whitley-bay": {
    name: "Whitley Bay",
    description:
      "Professional and fully-equipped moving services in Whitley Bay. Fast response times, local expertise, and transparent pricing structure.",
  },
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const area = resolvedParams.area;
  const data = areasData[area];

  if (!data) {
    return {
      title: "Area Not Found | Swift Removals",
    };
  }

  return {
    title: `Removals in ${data.name} | Swift Removals Newcastle`,
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
