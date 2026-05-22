import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Great Barr";
const SLUG = "great-barr";
const POSTCODES = "B42, B43, B44";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Fixed-price removals across Great Barr B42, B43 and B44. House, office and man & van moves from the Scott Arms to the Red House Park streets. Free 30-minute quote.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals great barr",
    "house removals great barr",
    "man and van great barr",
    "B43 removals",
    "B44 removals",
    "office removals great barr",
    "removal company great barr",
    "removals near scott arms",
  ],
});

const services = [
  { icon: Home, name: "House Removals Great Barr", desc: "Full house moves across Great Barr, from the inter-war semis along Walsall Road to the larger detached homes off Chapel Lane near Red House Park. We plan around the area's wide grass verges and shared drives." },
  { icon: Home, name: "Estate & Bungalow Moves", desc: "Moves to and from the Pheasey estate and the many bungalows around Aldridge Road and Beacon Road. Single-level loading is quick, and we know which closes a Luton van can turn in." },
  { icon: Truck, name: "Man and Van Great Barr", desc: "Light-load and single-room runs across B42, B43 and B44, handy for the flats and maisonettes near the Scott Arms and the Hamstead border. Hourly-rated and quick to arrange." },
  { icon: Building2, name: "Office Removals Great Barr", desc: "Out-of-hours commercial moves for the shops and offices around the Scott Arms junction and the units off the Newton Road, keeping disruption to your business low." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing using double-walled cartons and proper wrapping. The bay windows and 1930s glasswork common in Great Barr's semis are wrapped and protected as standard." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for chain delays and downsizing, a frequent need among Great Barr's many long-term family homeowners. Secure units with flexible access." },
];

const whyUs = [
  { title: "Great Barr Road Knowledge", desc: "We know the traffic around the Scott Arms island, the bus lanes along the Walsall Road and which Pheasey closes have the turning room and verge access for a full-size Luton van." },
  { title: "Fully Insured as Standard", desc: "Every B42, B43 and B44 move carries £10m goods-in-transit and £5m public liability cover, protecting belongings across semis, bungalows and detached homes." },
  { title: "Fixed, Transparent Pricing", desc: "The written quote is the final price. No verge or driveway surcharges, no weekend premiums and nothing added on the day." },
  { title: "Trusted Across North Birmingham", desc: "A 4.9-star Google rating built on years of moves through Great Barr, Kingstanding and Perry Barr. The bulk of our work here comes from neighbour recommendations." },
];

const faqs = [
  { q: "How much does a removal in Great Barr cost?", a: "A typical 2 to 3 bedroom move in Great Barr sits between £340 and £790, depending on volume, access and destination. Bungalows and semis with driveway parking tend to sit at the lower end, while larger detached homes off Chapel Lane are priced once we have seen the layout. Free, itemised quotes usually arrive within 30 minutes." },
  { q: "Which postcodes do you cover around Great Barr?", a: "We cover all of B42, B43 and B44, taking in the Scott Arms area, Pheasey, Red House Park, the Walsall Road corridor and the Kingstanding and Perry Barr borders. There is no travel surcharge anywhere within those postcodes." },
  { q: "Can you manage parking and access near the Scott Arms?", a: "Yes. The Scott Arms junction and the Walsall Road are busy with bus lanes and loading limits, so we load away from the main road where possible or arrange a short bay suspension. On the estates we usually set down right on the drive or verge." },
  { q: "Do you offer same-day removals in Great Barr?", a: "Often, yes, subject to van availability. Same-day man and van jobs around B43 and B44 are common, so call before 10am to confirm a slot. Larger full-house moves need around 48 hours so the right crew and van can be booked." },
  { q: "Are you experienced moving the 1930s semis in Great Barr?", a: "Very much so. The inter-war semis along the Walsall Road and Aldridge Road have bay windows, original glasswork and tight half-landings. Our crews carry straps, stair-slides and full blanket-wrap to protect both your furniture and the original features throughout." },
];

const LocalArea = (
  <>
    <p>
      Great Barr lies around 5 miles north-west of Birmingham city centre, spread across the
      boundary between Birmingham and Sandwell with Walsall to the north. The B42, B43 and B44
      postcodes meet near the busy Scott Arms junction, where the Walsall Road, Newton Road and
      Queslett Road converge, the commercial heart of the area and a key landmark for anyone
      navigating it.
    </p>
    <p>
      Housing in Great Barr is largely inter-war and post-war, broad streets of 1930s bay-fronted
      semis along the Walsall Road and Aldridge Road, the substantial Pheasey estate of semis and
      bungalows, and larger detached homes off Chapel Lane near Red House Park and Great Barr Hall.
      Many properties have driveways and verges, which makes loading straightforward, while the
      flats near the Scott Arms keep our man and van Great Barr service busy.
    </p>
    <p>
      Local moves regularly run between Great Barr and neighbouring{" "}
      <Link href="/areas/erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>,{" "}
      <Link href="/areas/handsworth" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Handsworth</Link> and{" "}
      <Link href="/areas/sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link>. Whether
      you&apos;re downsizing into a Pheasey bungalow or moving up to a detached near Red House Park,
      the removal company Great Barr families rely on will keep the day running smoothly.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers fully insured house and office removals across Great Barr B42, B43 and B44. From the 1930s semis along the Walsall Road to the bungalows of Pheasey, our local crew handles every move with care and a fixed price."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
