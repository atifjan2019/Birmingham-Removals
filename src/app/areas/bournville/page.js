import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Bournville";
const SLUG = "bournville";
const POSTCODES = "B30";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Careful removals in Bournville B30, the Cadbury model village. We know the Bournville Village Trust streets, conservation rules and the closes around the Green.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals bournville",
    "house removals bournville",
    "man and van bournville",
    "B30 removals",
    "office removals bournville",
    "removal company bournville",
    "bournville village trust removals",
    "cadbury world removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Bournville", desc: "Full house moves across Bournville, from the Arts-and-Crafts cottages on Linden Road to the larger family homes along Mary Vale Road. We treat every original feature with care." },
  { icon: Building2, name: "Flat Removals Bournville", desc: "Flat and maisonette removals throughout B30, including the period conversions and Trust-managed properties near Bournville Green where access and upkeep standards matter." },
  { icon: Truck, name: "Man and Van Bournville", desc: "Flexible man and van across Bournville for single rooms, light loads and short-notice moves, popular with residents in the smaller cottages and apartments near the railway station." },
  { icon: Building2, name: "Office Removals Bournville", desc: "Commercial moves for the practices and small businesses around the village and Cadbury World, scheduled to avoid the visitor-heavy daytime traffic on Linden Road." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with double-walled boxes and specialist wrapping for china, glassware and antiques, often found in Bournville's well-kept period homes." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for Bournville moves, useful while a chain settles or a Trust property handover is arranged between dates." },
];

const whyUs = [
  { title: "Bournville Conservation Know-How", desc: "Many homes here fall under the Bournville Village Trust with strict upkeep and conservation standards. We protect paintwork, original doors and front-garden hedging, and we leave the property exactly as we found it." },
  { title: "Fully Insured as Standard", desc: "£10m goods-in-transit and £5m public liability cover on every Bournville job, giving real peace of mind when moving heirlooms from a cherished period cottage." },
  { title: "Fixed, Transparent Pricing", desc: "No weekend loading, no stair surcharges, no last-minute additions. The written quote is the final figure, every time." },
  { title: "Respectful of the Village", desc: "Bournville is quiet, green and proudly tidy. Our crews work calmly and considerately, mindful that this is a conservation village and not just another estate." },
];

const faqs = [
  { q: "How much does a removal in Bournville cost?", a: "A typical Bournville 2 to 3 bedroom move costs between £350 and £800, depending on volume, access and destination. Period cottages with narrow hallways and original staircases are quoted accurately once we've seen the layout. Free, itemised quotes are usually returned within 30 minutes." },
  { q: "Do you cover the Bournville postcode B30?", a: "Yes. We cover all of B30 including the village core around Bournville Green, the streets off Linden Road and Mary Vale Road, Cotteridge and Stirchley nearby. There is no travel surcharge anywhere in B30." },
  { q: "Can you manage parking and access on Linden Road?", a: "We can. Linden Road runs past Cadbury World and gets busy with visitors, while several village streets are narrow and tree-lined. We plan loading for quieter times of day and position the van to keep the road clear for residents and neighbours." },
  { q: "Do you offer same-day removals in Bournville?", a: "Yes, subject to van availability. Same-day man and van jobs in Bournville are straightforward, so call before midday for a slot. Full-house moves need roughly 48 hours' notice so we can allocate the right crew and van size." },
  { q: "Do you understand Bournville Village Trust requirements when moving?", a: "We do. A large share of Bournville homes are managed by the Trust, which sets clear standards on upkeep and how properties are maintained. Our crews work to leave gardens, paths and paintwork undamaged, and we're happy to coordinate access timing where a Trust handover applies." },
];

const LocalArea = (
  <>
    <p>
      Bournville sits about 4 miles south-west of Birmingham city centre, in the B30 postcode
      between Selly Oak and Kings Norton. It is world-famous as the model village built by George
      Cadbury for the workers at his chocolate factory, and that origin still shapes the place
      today: wide grass verges, mature trees and the open expanse of Bournville Green give the area
      a calm, almost rural feel within the city.
    </p>
    <p>
      The housing stock is distinctive. Arts-and-Crafts cottages and semis line Linden Road, Mary
      Vale Road and the closes around the Green, many of them still managed by the Bournville
      Village Trust under conservation standards that keep the streetscape consistent. Landmarks
      such as Cadbury World, the Tudor-era Selly Manor and Bournville railway station anchor the
      village, and the area was historically alcohol-free, a quirk that residents still mention
      with affection. These older homes need a careful hand, which is exactly how our crews work.
    </p>
    <p>
      Bournville borders several areas we cover in depth. Moves regularly run between here and{" "}
      <Link href="/areas/kings-norton" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Norton</Link>{" "}
      to the south,{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link>{" "}
      to the north and{" "}
      <Link href="/areas/northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>{" "}
      to the south-west. Whether you&apos;re moving into a Trust cottage or out of a family home
      near the Green, we&apos;ll handle the day with the care this special village deserves.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers careful, fully insured house and office removals across Bournville B30, the Cadbury model village. From Arts-and-Crafts cottages on Linden Road to family homes near the Green, our local crew respects every conservation detail."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
