import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Northfield";
const SLUG = "northfield";
const POSTCODES = "B31";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Northfield", desc: "Full house moves throughout Northfield, from interwar semis on Bristol Road South to Longbridge Village family homes. Affordable, planned, on-time." },
  { icon: Building2, name: "Flat Removals Northfield", desc: "Flat and apartment removals in Northfield, from ground-floor estate properties to modern Longbridge Village apartments with lift access and allocated parking." },
  { icon: Truck, name: "Man and Van Northfield", desc: "Affordable man and van in Northfield for smaller loads, single-item moves and short-notice relocations throughout B31 and into neighbouring B29, B30 and B38." },
  { icon: Building2, name: "Office Removals Northfield", desc: "Efficient office removals for Northfield businesses, including units in the Longbridge redevelopment and retail parks along Bristol Road South." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing in Northfield homes using professional materials. We supply all boxes, tape and wrapping, so you don't need to source anything." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Flexible storage alongside your Northfield removal, particularly useful for downsizers and residents in the active Longbridge new-build market." },
];

const whyUs = [
  { title: "Northfield & Longbridge Specialists", desc: "We know the estate roads of Northfield, the new access routes through Longbridge Village and the best loading spots off Bristol Road South, local knowledge that speeds up every move." },
  { title: "Fully Insured as Standard", desc: "£10m goods-in-transit and £5m public liability on every Northfield job, protecting your belongings regardless of property type or size." },
  { title: "Competitive, Fixed Pricing", desc: "Northfield is one of our most affordable service areas. Prices are fixed, quoted in writing and never change on move day, with no hidden surprises." },
  { title: "5-Star Rated Local Service", desc: "Our 4.9-star Google average reflects the consistency we deliver across south Birmingham. Northfield customers regularly book us again for friends and family moves." },
];

const faqs = [
  { q: "How much does a removal in Northfield cost?", a: "A 2–3 bedroom Northfield house move typically costs £300–£700. 1930s and 1950s semis with through-lounges and garage access are straightforward to quote. Longbridge new-builds with lift access are also easy to plan and are priced clearly. Free, fixed quotes within 30 minutes." },
  { q: "Do you cover the Northfield postcode B31?", a: "Yes, we cover all of B31 including Northfield village, West Heath, Longbridge, the Hanging Wythian Road area, California and the Bell Lane corridor. No travel surcharge applies to B31." },
  { q: "Can you handle moves in the Longbridge development?", a: "Yes, Longbridge Village is a significant part of our Northfield workload. The development on the former MG Rover/Austin site has brought new apartments, townhouses and retail units with varied access arrangements. We're familiar with the road layout and parking allocation system on the site." },
  { q: "Do you offer same-day removals in Northfield?", a: "Yes, subject to van availability. Northfield is well within our same-day coverage area. Call before midday and we'll confirm a slot for 1–3 room loads. Full house moves in B31 need 48 hours' notice." },
  { q: "Can you move from a 1930s semi in Northfield with a rear lane?", a: "Absolutely. 1930s semis in Northfield often have rear lanes serving back gardens and garages. We use these wherever it provides a shorter, easier route for large furniture. Our crew assesses the best access point on arrival and adjusts the plan to suit the property layout." },
];

const LocalArea = (
  <>
    <p>
      Northfield occupies the B31 postcode in south-west Birmingham, approximately 6 miles
      from the city centre along the Bristol Road South (A38). The area is one of the largest
      residential districts in south Birmingham, covering Northfield village, West Heath,
      California, Longbridge and Hanging Wythian. It is best known historically as the home of
      the Austin Motor Company, later British Leyland and MG Rover.
    </p>
    <p>
      The majority of properties in B31 are 1930s to 1960s semis and terraces, well-built,
      solid homes with through-lounges, rear gardens and, in many cases, garages or rear lane
      access. These are exactly the type of properties our removal company handles every day.
    </p>
    <p>
      The most significant change to Northfield&apos;s landscape in recent years is the Longbridge
      Village development, a major regeneration project on the former MG Rover/Austin site that
      has delivered hundreds of new homes, apartments, a shopping centre (The Square at
      Longbridge) and new road infrastructure. If you&apos;re moving into a new Longbridge
      property, we can co-ordinate with your developer or estate manager on access arrangements.
    </p>
    <p>
      Northfield borders several areas we cover extensively. Families frequently move between
      Northfield and{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link>{" "}
      (B29) to the north along Bristol Road,{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>{" "}
      (B14) to the east and Bournville (B30) to the north-east.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides affordable, fully insured house and office removals across Northfield B31. From interwar semis on Bristol Road South to Longbridge Village new-builds, our local crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
