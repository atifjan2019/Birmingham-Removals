import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Rubery";
const SLUG = "rubery";
const POSTCODES = "B45";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Reliable removals in Rubery and Rednal B45, on the Birmingham and Worcestershire border by the Lickey Hills. Interwar semis, new estates and Great Park covered.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals rubery",
    "house removals rubery",
    "man and van rubery",
    "B45 removals",
    "office removals rubery",
    "removal company rubery",
    "rubery great park removals",
    "rednal removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Rubery", desc: "Full house moves throughout Rubery and Rednal, from interwar semis off New Road to the modern estates climbing towards the Lickey Hills. Carefully planned and delivered on time." },
  { icon: Building2, name: "Flat Removals Rubery", desc: "Flat and apartment removals across B45, including the newer developments near Rubery Great Park where allocated parking and entry arrangements are sorted ahead of the day." },
  { icon: Truck, name: "Man and Van Rubery", desc: "Affordable man and van in Rubery for single items, light loads and short-notice moves, handy for the smaller properties and first-time buyers along the New Road corridor." },
  { icon: Building2, name: "Office Removals Rubery", desc: "Commercial moves for the units and businesses around Rubery Great Park retail and leisure park, with the easy M5 access at Junction 4 making larger relocations straightforward." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing using strong boxes and proper wrapping. We supply all the materials, so there's nothing to source before you leave a long-held family home." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for Rubery moves, useful for downsizers and for anyone bridging a gap between completion dates on either side of the county border." },
];

const whyUs = [
  { title: "Rubery & Lickey Hills Knowledge", desc: "We know the steeper roads rising towards the Lickeys, the access off New Road and Cock Hill Lane, and the parking around Rubery Great Park, local detail that keeps every move efficient." },
  { title: "Fully Insured as Standard", desc: "£10m goods-in-transit and £5m public liability cover on every Rubery and Rednal job, whatever the property type or distance." },
  { title: "Easy Motorway Reach", desc: "With the M5 at Junction 4 on the doorstep, we keep travel time low on longer moves out of B45, which helps keep your fixed price competitive." },
  { title: "Fixed, Honest Pricing", desc: "Rubery is one of our most affordable areas. Quotes are fixed in writing and never change on move day, with no hidden extras for stairs or weekends." },
];

const faqs = [
  { q: "How much does a removal in Rubery cost?", a: "A typical Rubery 2 to 3 bedroom move costs between £300 and £700, depending on volume, access and destination. Interwar semis with through-lounges are quick to quote; homes on the hillier estates are priced accurately once we've noted the access. Free, fixed quotes usually arrive within 30 minutes." },
  { q: "Do you cover the Rubery postcode B45?", a: "Yes. We cover all of B45 including Rubery itself, the adjoining Rednal, the streets off New Road and Cock Hill Lane and the estates near the Lickey Hills. No travel surcharge applies anywhere in B45." },
  { q: "Can you handle parking and access on New Road?", a: "We can. New Road is Rubery's main high street and gets busy through the day, while some of the older terraces have limited frontage. We plan loading for quieter periods and position the van to keep the road moving for shops and residents alike." },
  { q: "Do you offer same-day removals in Rubery?", a: "Yes, subject to van availability. Same-day man and van jobs in Rubery and Rednal are common, so call before midday and we'll confirm a slot. Full-house moves need around 48 hours' notice so we can match the right crew and van." },
  { q: "Do you move across the Birmingham and Worcestershire border from Rubery?", a: "Regularly. Rubery straddles the city boundary, with the Lickey Hills and Worcestershire countryside right next door. We move households both into Birmingham and out towards Bromsgrove and the surrounding villages, and the M5 at Junction 4 keeps those longer runs quick and well priced." },
];

const LocalArea = (
  <>
    <p>
      Rubery lies on the south-western edge of Birmingham, roughly 8 miles from the city centre and
      sitting right on the boundary between the city and Worcestershire. It nestles at the foot of
      the Lickey Hills, a much-loved stretch of country park, with the adjoining district of Rednal
      running up towards the slopes. The M5 motorway at Junction 4 sits close by, making B45 a
      practical base for commuters across the West Midlands.
    </p>
    <p>
      Housing in Rubery and Rednal mixes solid interwar semis, found in numbers off New Road, with
      more modern estates built on the rising ground near the hills. New Road forms the area&apos;s
      high street, while Rubery Great Park brings retail and leisure to the western side and Cock
      Hill Lane threads through the older residential streets. The variety means our man and van
      service and full-crew removals are both kept busy here through the year.
    </p>
    <p>
      Rubery connects neatly to areas we know well. Households move regularly between here and{" "}
      <Link href="/areas/longbridge" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Longbridge</Link>{" "}
      just to the east, and on to{" "}
      <Link href="/areas/northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>{" "}
      a little further into the city. Whether you&apos;re settling into a new estate by the Lickeys
      or heading out into Worcestershire, the removal company Rubery residents rely on will see the
      day through smoothly.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides reliable, fully insured house and office removals across Rubery and Rednal B45, on the Birmingham and Worcestershire border by the Lickey Hills. From interwar semis off New Road to modern hillside estates, our local crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
