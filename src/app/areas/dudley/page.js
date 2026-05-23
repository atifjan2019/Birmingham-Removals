import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Dudley";
const SLUG = "dudley";
const POSTCODES = "DY1, DY2, DY3";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Black Country removals across Dudley DY1 to DY3, covering Brierley Hill, Netherton and Sedgley. Affordable fixed prices, same-day quotes and a free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals dudley",
    "house removals dudley",
    "man and van dudley",
    "DY1 removals",
    "DY2 removals",
    "office removals dudley",
    "removal company dudley",
    "brierley hill removals",
    "netherton removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Dudley", desc: "Full house moves throughout DY1 to DY3, from the terraced streets of Netherton to the semis climbing the hill at Sedgley. We pack, lift and shift the whole property without the stress." },
  { icon: Truck, name: "Man and Van Dudley", desc: "Affordable man and van runs across the Black Country, ideal for single rooms, flat clearances and quick local moves around Brierley Hill and the Merry Hill area." },
  { icon: Home, name: "Family Home Removals", desc: "Plenty of Dudley moves are 3 and 4-bed family homes off the Wolverhampton Road and around Russells Hall, often with garages and gardens to clear. Our larger vans handle the volume in fewer trips." },
  { icon: Building2, name: "Office Removals Dudley", desc: "Commercial and retail moves for businesses around Dudley town centre and the Waterfront at Brierley Hill, arranged out of hours to keep your trading downtime to a minimum." },
  { icon: Package, name: "Packing Service", desc: "Full or part packing with strong double-walled boxes and proper wrapping for glassware, mirrors and white goods, taking the pressure off busy households on move day." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage paired with your Dudley move, useful for chain delays or while a DY3 property in Sedgley is being decorated before you settle in." },
];

const whyUs = [
  { title: "Black Country Route Knowledge", desc: "We know the steep hills around Sedgley, the busy A461 through the town, the access to the Waterfront at Brierley Hill and the tighter terraced streets of Netherton where parking takes planning." },
  { title: "Affordable Fixed Pricing", desc: "Dudley is a value-focused area and we price accordingly. No weekend premiums, no stair charges and no hidden extras, just a clear written quote that holds." },
  { title: "Fully Insured as Standard", desc: "Every DY1 to DY3 job carries £10m goods-in-transit and £5m public liability cover, whether you are moving a one-bed flat or a large family home." },
  { title: "Same-Day Quotes", desc: "Need to move fast? We turn around free quotes the same day and can often confirm a van quickly for local Black Country moves around Dudley, Brierley Hill and Netherton." },
];

const faqs = [
  { q: "How much does a removal in Dudley cost?", a: "A typical 2 to 3 bedroom Dudley move costs between £300 and £720 depending on volume, access and where you are heading. Larger family homes around Russells Hall or Sedgley are quoted accurately once we have noted the layout. Free itemised quotes are usually returned within 30 minutes." },
  { q: "Do you cover the Dudley postcodes, DY1, DY2 and DY3?", a: "Yes. We cover all of DY1, DY2 and DY3, taking in Dudley town centre, Brierley Hill, Netherton, Sedgley and Russells Hall. We also reach the wider Black Country, with no travel surcharge within these postcodes." },
  { q: "Is parking and access difficult on the Dudley hills?", a: "Some Sedgley and Netherton streets are steep and narrow, so we plan the van position carefully and use stair-slides and straps for tricky inclines. Around the Waterfront at Brierley Hill there is usually room to park close, which we confirm before the day." },
  { q: "Do you offer same-day removals in Dudley?", a: "Yes, subject to availability. Same-day man and van jobs around Brierley Hill and Netherton are common, so call before 10 am and we will try to fit you in. Larger full-house moves need at least 48 hours so we can send the right van and crew." },
  { q: "Can you move us from Dudley into Birmingham or further across the Black Country?", a: "Of course. We handle plenty of moves between Dudley and Birmingham as well as across to Wolverhampton and West Bromwich. Longer moves are quoted by the job with a fixed price, so there are no surprises on mileage or time." },
];

const LocalArea = (
  <>
    <p>
      Dudley is the historic heart of the Black Country, sitting around 10 miles north-west of
      Birmingham with its castle, zoo and the National Trust&apos;s Dudley Canal tunnels at its
      centre. The DY1, DY2 and DY3 postcodes spread out across the town and up onto the ridge at
      Sedgley, taking in Netherton to the south and the busy retail draw of Brierley Hill and
      Merry Hill nearby.
    </p>
    <p>
      The housing here is a real Black Country mix, from solid Victorian terraces in Netherton
      and around the town centre to inter-war and post-war semis climbing the hills in Sedgley
      and the family estates around Russells Hall. Many of these homes have gardens, garages and
      lofts, so our full-crew moves and larger vans get plenty of use, while the man and van
      service suits flats and quick local relocations.
    </p>
    <p>
      Households regularly move between Dudley and neighbouring{" "}
      <Link href="/areas/west-bromwich" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">West Bromwich</Link> or
      head north towards{" "}
      <Link href="/areas/wolverhampton" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Wolverhampton</Link>. We also cover{" "}
      <Link href="/areas/stourbridge" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Stourbridge</Link>,{" "}
      <Link href="/areas/kingswinford" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kingswinford</Link>,{" "}
      <Link href="/areas/sedgley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sedgley</Link> and{" "}
      <Link href="/areas/brierley-hill" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Brierley Hill</Link>. Whether
      you are moving up to a Sedgley semi or relocating a family home near Russells Hall, the
      removal company Dudley residents trust will keep the move affordable and on time.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides affordable, fully insured house and office removals across Dudley, DY1 to DY3. From the terraces of Netherton to the hilltop semis of Sedgley, our Black Country crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
