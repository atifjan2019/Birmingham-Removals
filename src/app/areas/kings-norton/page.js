import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Kings Norton";
const SLUG = "kings-norton";
const POSTCODES = "B30, B38";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Fixed-price removals across Kings Norton B30 and B38. House, office and man & van moves from the historic Green to the Pool Farm estate. Free 30-minute quote.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals kings norton",
    "house removals kings norton",
    "man and van kings norton",
    "B30 removals",
    "B38 removals",
    "office removals kings norton",
    "removal company kings norton",
    "removals near kings norton green",
  ],
});

const services = [
  { icon: Home, name: "House Removals Kings Norton", desc: "Complete house moves throughout Kings Norton, from the 1930s semis along Pershore Road South to the larger family homes near Wychall Reservoir. We plan around the area's many cul-de-sacs and shared drives." },
  { icon: Home, name: "Estate & New-Build Moves", desc: "Moves to and from the Pool Farm, Primrose and Hawkesley estates, plus the modern developments off Camp Lane. We know which roads take a Luton van and where to set down on a tight close." },
  { icon: Truck, name: "Man and Van Kings Norton", desc: "Single-item and small-load runs across B30 and B38, popular with the maisonettes and 1-bed flats around The Green and Cotteridge. Quick, hourly-rated and no minimum fuss." },
  { icon: Building2, name: "Office Removals Kings Norton", desc: "Out-of-hours commercial moves for the trade units on Lifford Lane and the offices around Kings Norton Business Centre, keeping downtime to a minimum." },
  { icon: Package, name: "Packing Service", desc: "Full and part-packing with double-walled cartons and proper wrapping. Ideal for the period cottages around the conservation area by St Nicolas' Church, where care matters." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for chain delays, a frequent need in Bournville-border B30 where completion dates often slip. Clean, secure containers and flexible access." },
];

const whyUs = [
  { title: "Kings Norton Road Knowledge", desc: "We know the rat-runs off Redditch Road, the parking pinch around The Green and the railway-bridge height limit on Lifford Lane that catches larger vans out." },
  { title: "Fully Insured as Standard", desc: "Every B30 and B38 move carries £10m goods-in-transit and £5m public liability cover, protecting your belongings on estate and period properties alike." },
  { title: "Fixed, Transparent Pricing", desc: "One written price covers the whole job. No stair charges for upstairs maisonettes, no weekend premiums, no extras sprung on you on the day." },
  { title: "Trusted Across South Birmingham", desc: "A 4.9-star Google rating built on years of moves through Kings Norton, Cotteridge and the wider south-west of the city. Most of our work comes from word of mouth." },
];

const faqs = [
  { q: "How much does a removal in Kings Norton cost?", a: "A typical 2 to 3 bedroom move in Kings Norton runs between £340 and £780, depending on volume, access and where you are heading. Estate homes with parking right outside tend to sit at the lower end, while period cottages near The Green with longer carries are priced once we have seen the layout. Free itemised quotes usually come back within 30 minutes." },
  { q: "Which postcodes do you cover around Kings Norton?", a: "We cover all of B30 and B38, taking in Kings Norton Green, the Pool Farm and Primrose estates, Hawkesley, Wychall and the Cotteridge and Bournville borders. There is no travel surcharge anywhere within those postcodes." },
  { q: "Can you manage parking and access near Kings Norton Green?", a: "Yes. The Green and the streets off Pershore Road South get tight, so we usually load early or arrange a short bay suspension where the council allows. We also flag the low railway bridge on Lifford Lane in advance so the right van is sent." },
  { q: "Do you offer same-day removals in Kings Norton?", a: "Often, yes, subject to van availability. Same-day man and van jobs around B30 and B38 are common, so call before 10am for a slot. Larger full-house moves need around 48 hours so we can match the right crew and van size." },
  { q: "Are you used to moving from the estate maisonettes in B38?", a: "Very much so. The maisonettes and low-rise blocks across Pool Farm and Hawkesley have shared stairwells and narrow landings, so our crews bring straps, corner protectors and door wedges as standard and work cleanly through communal areas." },
];

const LocalArea = (
  <>
    <p>
      Kings Norton sits roughly 5 miles south-west of Birmingham city centre, strung along the
      Pershore Road South corridor between Cotteridge to the north and the city boundary near
      Wythall to the south. The historic core around The Green, with St Nicolas&apos; Church and
      its medieval Saracen&apos;s Head, is one of the oldest surviving village centres in the city
      and gives the area a real sense of place.
    </p>
    <p>
      The housing is a real mix. You will find inter-war semis along the main roads, large council
      and ex-council estates at Pool Farm, Primrose and Hawkesley in B38, period cottages around
      the conservation area, and pockets of modern new-builds off Camp Lane and Wharf Road. Our
      man and van Kings Norton service suits the many flats and maisonettes, while our full-crew
      teams handle the 4 and 5-bed family homes near Wychall Reservoir with ease.
    </p>
    <p>
      Plenty of local moves run between Kings Norton and neighbouring{" "}
      <Link href="/areas/northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>,{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link> and{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>. Whether
      you&apos;re upsizing on a quiet close near Wychall or downsizing into a Cotteridge-border
      flat, the removal company Kings Norton families rely on will make the day a calm one.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides fully insured house and office removals across Kings Norton B30 and B38. From the historic streets around The Green to the Pool Farm and Hawkesley estates, our local crew handles every move with care and a fixed price."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
