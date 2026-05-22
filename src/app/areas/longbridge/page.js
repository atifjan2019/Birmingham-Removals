import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Longbridge";
const SLUG = "longbridge";
const POSTCODES = "B31";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Fixed-price removals in Longbridge B31, from new-build apartments on the former Rover site to family homes near Cofton Park. DBS crew, full cover, free quote.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals longbridge",
    "house removals longbridge",
    "man and van longbridge",
    "B31 removals",
    "office removals longbridge",
    "removal company longbridge",
    "longbridge town centre removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Longbridge", desc: "Full house moves throughout Longbridge, from the established semis off Longbridge Lane and Lowhill Lane to the newer townhouses on the regenerated Rover site. Planned, packed and delivered on time." },
  { icon: Building2, name: "Apartment Removals Longbridge", desc: "Specialist apartment moves in the new-build blocks around Longbridge Town Centre, where lift access, fob entry and allocated bays need booking in advance. We sort the logistics so you don't have to." },
  { icon: Truck, name: "Man and Van Longbridge", desc: "Flexible man and van across Longbridge for single rooms, student kit and light loads, well suited to the compact one and two-bed apartments near Bournville College and the train station." },
  { icon: Building2, name: "Office Removals Longbridge", desc: "Commercial moves for the offices, college units and retail premises around Longbridge Town Centre and the M&S, scheduled out of hours to keep your business running." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing using sturdy double-walled boxes and proper wrapping. Ideal for first-time buyers furnishing a brand-new Longbridge apartment from scratch." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for Longbridge moves, handy when a new-build completion date slips or a chain stalls between contracts." },
];

const whyUs = [
  { title: "Longbridge Site Knowledge", desc: "We know the new road network across the redeveloped Rover site, the bay-allocation system on the apartment blocks and where loading works best around Longbridge Lane and the town centre." },
  { title: "Fully Insured as Standard", desc: "Every Longbridge job carries £10m goods-in-transit and £5m public liability cover, whether we're moving a studio flat or a four-bed townhouse." },
  { title: "Fixed, Transparent Pricing", desc: "No weekend premiums and no surcharge for stairs or lift waits. The written quote you accept is the price you pay on the day." },
  { title: "Trusted by Longbridge Movers", desc: "Our 4.9-star Google rating is built on hundreds of south Birmingham moves. New residents settling into Longbridge regularly pass our name to neighbours in the next block." },
];

const faqs = [
  { q: "How much does a removal in Longbridge cost?", a: "A typical Longbridge 2 to 3 bedroom move runs between £320 and £750, depending on volume, floor level and destination. New-build apartments with a lift are quick to load and price; townhouses with internal stairs are quoted accurately once we've noted the layout. Free, itemised quotes usually arrive within 30 minutes." },
  { q: "Do you cover the Longbridge postcode B31?", a: "Yes. We cover all of B31 including the Longbridge Town Centre apartments, the streets off Longbridge Lane and Lowhill Lane, the Cofton area and the established estates bordering Northfield. No travel surcharge applies anywhere in B31." },
  { q: "Can you deal with parking on the Longbridge apartment blocks?", a: "We can. Many blocks around Longbridge Lane operate gated parking and allocated visitor bays. We book a loading slot with the managing agent ahead of time, or work from the nearest permitted bay, so the move runs smoothly without blocking residents." },
  { q: "Do you offer same-day removals in Longbridge?", a: "Yes, subject to van availability. Same-day man and van jobs across Longbridge are common, so call before midday and we'll confirm a slot. Larger full-house moves need around 48 hours' notice so we can match the right van and crew." },
  { q: "Are you used to moving into the new builds on the old Rover site?", a: "Very much so. The regeneration of the former Austin and MG Rover plant has delivered hundreds of apartments and townhouses, and we move people in most weeks. We're familiar with the access routes, the fob-entry systems and the developer handover process at Longbridge Town Centre." },
];

const LocalArea = (
  <>
    <p>
      Longbridge lies around 7 miles south-west of Birmingham city centre, at the southern end of
      the B31 postcode along the A38 Bristol Road South. For most of the twentieth century it was
      defined by the vast Austin, later British Leyland and MG Rover, car plant. Since the works
      closed, the site has been transformed into Longbridge Town Centre, a large regeneration that
      now brings together Bournville College, an M&amp;S, new-build apartments and rows of modern
      townhouses.
    </p>
    <p>
      The housing here is a tale of two eras. Away from the regeneration, streets off Longbridge
      Lane and Lowhill Lane hold solid interwar and post-war semis with gardens and, often, garage
      access. Closer to the centre, the new apartment blocks and townhouses appeal to first-time
      buyers and commuters who value the Cross-City line station and the green space at nearby
      Cofton Park. Our man and van service suits the compact flats, while the full-crew option
      handles family townhouses with ease.
    </p>
    <p>
      Longbridge sits among several areas we know inside out. Residents regularly move to and from{" "}
      <Link href="/areas/northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>{" "}
      just to the north,{" "}
      <Link href="/areas/rubery" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Rubery</Link>{" "}
      to the west and{" "}
      <Link href="/areas/kings-norton" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Norton</Link>{" "}
      to the east. Whether you&apos;re collecting keys to a brand-new flat or leaving a long-held
      family home, the removal company Longbridge residents recommend will make the day a calm one.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides fixed-price, fully insured house and office removals across Longbridge B31. From the new-build apartments and townhouses on the regenerated Rover site to established homes off Longbridge Lane, our local crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
