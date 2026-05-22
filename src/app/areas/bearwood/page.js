import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Bearwood";
const SLUG = "bearwood";
const POSTCODES = "B66, B67";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals - Fixed Prices`,
  description: `Fixed-price removals across Bearwood B66 and B67. House, office and man & van moves from the Bearwood Road shops to the Lightwoods Park streets. Free 30-minute quote.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals bearwood",
    "house removals bearwood",
    "man and van bearwood",
    "B66 removals",
    "B67 removals",
    "office removals bearwood",
    "removal company bearwood",
    "removals near lightwoods park",
  ],
});

const services = [
  { icon: Home, name: "House Removals Bearwood", desc: "Full house moves throughout Bearwood, from the Victorian terraces off Bearwood Road to the larger semis around Lightwoods Park. We work with the long entries and shared passages typical of these homes." },
  { icon: Building2, name: "Flat Removals Bearwood", desc: "Moves to and from the converted houses and flats above the Bearwood Road shops and along Sandon Road. Entry codes, narrow stairwells and parking are sorted before the day." },
  { icon: Truck, name: "Man and Van Bearwood", desc: "Quick single-room and light-load runs across B66 and B67, popular with the area's many young renters and house-shares near Harborne Road. Hourly-rated and easy to book." },
  { icon: Building2, name: "Office Removals Bearwood", desc: "Out-of-hours commercial moves for the independent shops, studios and offices along Bearwood High Street, planned to avoid the daytime trade and bus-route congestion." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with double-walled cartons and proper wrapping. The original fireplaces, cornicing and bay windows in Bearwood's Victorian terraces are wrapped with care." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for chain breaks and the gaps that crop up between rentals, a frequent need in busy, transient B67. Clean, secure units with flexible access." },
];

const whyUs = [
  { title: "Bearwood Street Knowledge", desc: "We know the bus-route restrictions and clearways along Bearwood Road, the resident bays on Sandon Road and which terraces have rear access off the back entries for easier loading." },
  { title: "Fully Insured as Standard", desc: "Every B66 and B67 move carries £10m goods-in-transit and £5m public liability cover, protecting your belongings across terraces, flats and shops alike." },
  { title: "Fixed, Transparent Pricing", desc: "Your written quote is the price you pay. No stair surcharges for the flats above the High Street and no weekend premiums added later." },
  { title: "Trusted on the Birmingham Border", desc: "A 4.9-star Google rating from years of moves through Bearwood, Smethwick and the Harborne border. Most of our Bearwood work comes through recommendations from past customers." },
];

const faqs = [
  { q: "How much does a removal in Bearwood cost?", a: "A typical 2 to 3 bedroom move in Bearwood runs between £330 and £760, depending on volume, access and destination. Terraces off Bearwood Road with long entries and steep stairs are quoted accurately once we have noted the layout. Free, itemised quotes usually come back within 30 minutes." },
  { q: "Which postcodes do you cover around Bearwood?", a: "We cover all of B66 and B67, taking in Bearwood High Street, the streets around Lightwoods Park, Sandon Road, Three Shires Oak Road and the Smethwick and Harborne borders. There is no travel surcharge inside those postcodes." },
  { q: "Can you handle parking and access on Bearwood Road?", a: "Yes. Bearwood Road is a busy bus route with clearway and loading restrictions, so we usually load early or apply for a short bay suspension where needed. Many terraces also have rear entries we can use, which we check during the quote." },
  { q: "Do you offer same-day removals in Bearwood?", a: "Often, yes, subject to van availability. Same-day man and van jobs around B66 and B67 are common, so call before 10am to confirm a slot. Larger full-house moves need around 48 hours so we can allocate the right crew and van." },
  { q: "Are you used to moving flats above the Bearwood Road shops?", a: "Very much so. The flats above the High Street shops often have narrow, winding stairs and a single shared street door. Our crews bring straps, corner guards and door wedges, and plan the carry route to keep things quick and clean through tight communal access." },
];

const LocalArea = (
  <>
    <p>
      Bearwood sits around 3 miles west of Birmingham city centre, straddling the boundary between
      Birmingham and Sandwell, with Smethwick to the north and Harborne just across the city line to
      the south. Although the postcodes are B66 and B67, Bearwood looks and feels firmly part of
      Birmingham&apos;s western suburbs, centred on the busy, independent shops of Bearwood High
      Street and Bearwood Road.
    </p>
    <p>
      Housing here is overwhelmingly late-Victorian and Edwardian, dense rows of bay-fronted
      terraces off Bearwood Road, Sandon Road and Three Shires Oak Road, many with original tiled
      paths and rear entries, plus larger semis lining the streets around Lightwoods Park. The
      strong rental market and house-shares keep our man and van Bearwood service busy, while the
      family terraces and semis suit a full-crew move.
    </p>
    <p>
      Local moves often run between Bearwood and neighbouring{" "}
      <Link href="/areas/harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>,{" "}
      <Link href="/areas/edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link> and{" "}
      <Link href="/areas/quinton" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Quinton</Link>. Whether
      you&apos;re renting your first flat above the High Street or buying a terrace near Lightwoods
      Park, the removal company Bearwood residents trust will keep your move calm and on schedule.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides fully insured house and office removals across Bearwood B66 and B67. From the flats above Bearwood Road to the Victorian terraces near Lightwoods Park, our local crew handles every move with care and a fixed price."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
