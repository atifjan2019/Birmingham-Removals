import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";
import { getCity, allCitySlugs } from "@/lib/cities";

export async function generateStaticParams() {
  return allCitySlugs.map((area) => ({ area }));
}

export async function generateMetadata({ params }) {
  const { area } = await params;
  const city = getCity(area);
  if (!city) return {};
  return makeMeta({
    title: `Removals ${city.name} | Birmingham Removals — Fixed Prices`,
    description: `Professional removals in ${city.name}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
    path: `/areas/${area}`,
  });
}

function defaultServices(name) {
  return [
    { icon: Home, name: `House Removals ${name}`, desc: `Full house moves across ${name} — careful, fully-insured crews and clear, fixed pricing.` },
    { icon: Building2, name: `Flat Removals ${name}`, desc: `Flat and apartment removals throughout ${name} — including lift access and shared-entrance properties.` },
    { icon: Truck, name: `Man and Van ${name}`, desc: `Affordable man and van service in ${name} for smaller loads, single rooms and short-notice jobs.` },
    { icon: Building2, name: `Office Removals ${name}`, desc: `Out-of-hours commercial removals for ${name} businesses — minimal disruption to operations.` },
    { icon: Package, name: "Packing Service", desc: `Full or part-packing using premium materials — protecting every item from loading to delivery.` },
    { icon: Warehouse, name: "Storage & Removals", desc: `Short and long-term secure storage combined with your ${name} removal — useful for chain breaks and bridging dates.` },
  ];
}

function defaultWhyUs(name) {
  return [
    { title: `Local Knowledge of ${name}`, desc: `We operate across ${name} regularly — routes, parking restrictions and access points are familiar to every crew.` },
    { title: "Fully Insured", desc: "£10m goods-in-transit and £5m public liability cover on every job — your belongings are protected from loading to delivery." },
    { title: "Fixed, Transparent Pricing", desc: "Written, fixed quotes within 30 minutes. No weekend premiums, no stair charges, no surprises on move day." },
    { title: "5-Star Rated", desc: "A 4.9-star Google average from 312+ reviews across Birmingham and the West Midlands." },
  ];
}

function defaultFaqs(name) {
  return [
    { q: `How much does a removal in ${name} cost?`, a: `A typical 2–3 bedroom ${name} house move runs between £300–£900 depending on volume, access and destination. Smaller man and van loads start from £120. Free fixed quotes returned within 30 minutes.` },
    { q: `Do you cover the ${name} postcodes?`, a: `Yes. ${name} is within our standard service area — no travel surcharge. Please confirm the postcode at the time of quoting so we can confirm crew and van size.` },
    { q: "Are your crews insured?", a: "Every move includes £10m goods-in-transit and £5m public liability cover. Our crews are DBS-checked and directly employed." },
    { q: `Do you offer same-day removals in ${name}?`, a: "Yes, subject to van availability. Call before midday for the best chance of a same-day slot, particularly for 1–3 room loads." },
    { q: "How quickly will I get a quote?", a: "Most quotes are returned within 30 minutes. Larger or more complex moves may require a short call or video walkthrough — still no obligation." },
  ];
}

function DefaultLocalArea({ name }) {
  return (
    <>
      <p>
        {name} is a key part of our daily coverage across Birmingham and the wider West Midlands.
        Our crews know the local roads, parking restrictions and access challenges of the area,
        which keeps move days running on schedule and on budget.
      </p>
      <p>
        Whether you are moving into a flat, a family home or a small office, we offer the same
        fixed-price, fully insured service across {name}. Quotes are returned in 30 minutes and
        always include packing materials, transit insurance and a DBS-checked crew.
      </p>
      <p>
        For an overview of every area we cover, see our{" "}
        <Link href="/areas" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">
          coverage page
        </Link>{" "}
        or request a free quote today.
      </p>
    </>
  );
}

export default async function AreaPage({ params }) {
  const { area } = await params;
  const city = getCity(area);
  if (!city) notFound();

  return (
    <AreaTemplate
      slug={area}
      name={city.name}
      postcodes={city.postcodes}
      heroIntro={city.intro}
      services={defaultServices(city.name)}
      localArea={<DefaultLocalArea name={city.name} />}
      whyUs={defaultWhyUs(city.name)}
      faqs={defaultFaqs(city.name)}
    />
  );
}
