import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "West Bromwich";
const SLUG = "west-bromwich";
const POSTCODES = "B70, B71";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals - Fixed Prices`,
  description: `Fixed-price removals in West Bromwich B70 and B71, from terraces near the Hawthorns to New Square flats. Insured Birmingham crews, free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals west bromwich",
    "house removals west bromwich",
    "man and van west bromwich",
    "B70 removals",
    "office removals west bromwich",
    "removal company west bromwich",
    "removals near the hawthorns",
  ],
});

const services = [
  { icon: Home, name: "House Removals West Bromwich", desc: "Full house moves across West Bromwich, from the terraced streets off Hall Green Road to the post-war semis around Charlemont Farm. Our crews load up and head out from Birmingham well ahead of your slot." },
  { icon: Building2, name: "Flat Removals West Bromwich", desc: "Flat and apartment moves around New Square, the Kenrick Park student blocks and the high-rise homes off Carters Green. We confirm lift booking, fob access and loading bays before the van arrives." },
  { icon: Truck, name: "Man and Van West Bromwich", desc: "A nimble man and van option for single rooms, B71 student lets and small flat clearances near the Sandwell College campus. Ideal when a full Luton crew is more than the job needs." },
  { icon: Building2, name: "Office Removals West Bromwich", desc: "Commercial relocations for the units along the Expressway, Kelvin Way trading estate and the offices around West Bromwich High Street. Evening and weekend moves keep your trading hours intact." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing using double-walled cartons and edge protection. Handy for the older Victorian terraces near Dartmouth Park where stairwells are tight and original features deserve a careful wrap." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage paired with your West Bromwich move, useful when a Black Country chain slips or completion dates do not line up. We hold goods safely at our Birmingham facility until you are ready." },
];

const whyUs = [
  { title: "We Know the B70 and B71 Routes", desc: "From the one-way system around the Ringway to the access lanes behind New Square and the parking around the Hawthorns on match days, our drivers plan around West Bromwich congestion before they set off from Birmingham." },
  { title: "Fully Insured on Every Job", desc: "£10m goods-in-transit and £5m public liability cover travels with every West Bromwich move, whether it is a single van load or a full four-bedroom relocation." },
  { title: "Fixed Prices, No Distance Tricks", desc: "West Bromwich is a short hop from our Birmingham base, so there are no inflated mileage charges. Your written quote is the figure you pay, with no weekend or stair surcharges." },
  { title: "Trusted Across Sandwell", desc: "A 4.9-star Google rating built on repeat moves throughout Sandwell. West Bromwich families pass our name to neighbours and that word of mouth is how most of our work arrives." },
];

const faqs = [
  { q: "How much does a removal in West Bromwich cost?", a: "A 2 to 3 bedroom move in West Bromwich typically runs between £320 and £760 depending on volume and access. Because B70 and B71 sit close to our Birmingham base there is no meaningful distance premium. Send us your details and we will return an itemised quote, usually within 30 minutes." },
  { q: "Which postcodes do you cover around West Bromwich?", a: "We cover all of B70 and B71, taking in the town centre, New Square, Carters Green, Hateley Heath, Stone Cross and the streets bordering Oldbury and Hill Top. There is no travel surcharge inside these postcodes." },
  { q: "Can you deal with parking near the town centre and the Hawthorns?", a: "Yes. The pedestrianised High Street and the bays around New Square have restrictions, and the Hawthorns area gets busy on Albion match days. We schedule loading early or arrange a bay suspension with Sandwell Council where it is needed." },
  { q: "Do you offer same-day removals in West Bromwich?", a: "Often, yes, subject to van availability. Same-day man and van jobs in B70 and B71 are common, so call before 10 am for the best chance of a slot. Larger full-house moves are best booked 48 hours ahead." },
  { q: "Can you handle a long-distance move out of West Bromwich?", a: "Certainly. Plenty of our West Bromwich customers are relocating beyond the Black Country, whether down south or up north. We quote inter-city and long-distance moves with the same fixed pricing and provide protective wrapping for the full journey." },
];

const LocalArea = (
  <>
    <p>
      West Bromwich sits at the heart of Sandwell, around 5 miles north-west of Birmingham city
      centre and linked to it by the Metro tram line and the A41. The B70 and B71 postcodes cover
      a busy Black Country town built around its High Street, the New Square shopping centre and
      the famous Hawthorns, home to West Bromwich Albion right on the Birmingham border.
    </p>
    <p>
      Housing here is varied. There are tight Victorian terraces near Dartmouth Park, sweeping
      inter-war estates around Charlemont and Stone Cross, and newer apartment blocks near the
      town centre and Kenrick Park. That mix keeps our man and van service busy with flats and
      student lets, while full crews handle the larger family homes out towards Hateley Heath and
      Hill Top.
    </p>
    <p>
      West Bromwich shares its borders with several areas we cover regularly, so cross-town moves
      are routine for us. Customers often shift between West Bromwich and{" "}
      <Link href="/areas/handsworth" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Handsworth</Link>,{" "}
      <Link href="/areas/dudley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Dudley</Link> and{" "}
      <Link href="/areas/wolverhampton" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Wolverhampton</Link>. Whether
      you&apos;re moving into a terrace off Hall Green Road or out to a quieter Sandwell estate, our
      West Bromwich crews handle the lifting, wrapping and paperwork from start to finish.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals brings fully insured, fixed-price house and office moves to West Bromwich B70 and B71. From terraces near the Hawthorns to apartments at New Square, our crews travel out from Birmingham and handle every lift with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
