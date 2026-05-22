import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Edgbaston";
const SLUG = "edgbaston";
const POSTCODES = "B15, B16";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Edgbaston", desc: "Full house moves across Edgbaston, from compact Victorian terraces to the grand detached properties of the Calthorpe Estate. We plan every detail in advance." },
  { icon: Building2, name: "Flat Removals Edgbaston", desc: "Specialist flat removals across the Hagley Road mansion conversions and modern apartment blocks in Edgbaston. Lift access, parking and floor plans arranged beforehand." },
  { icon: Truck, name: "Man and Van Edgbaston", desc: "Flexible man and van service in Edgbaston for smaller loads, single-room moves or student relocations near the University of Birmingham." },
  { icon: Building2, name: "Office Removals Edgbaston", desc: "Out-of-hours and weekend office removals across Edgbaston business parks and consulting suites, with zero downtime for your practice or firm." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing in Edgbaston homes using double-walled boxes and specialist wrapping. We protect antiques, artwork and fragile items as standard." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Short and long-term secure storage combined with your Edgbaston removal, ideal during chain delays or property completions." },
];

const whyUs = [
  { title: "Deep Local Knowledge of Edgbaston", desc: "We know every restricted bay on Harborne Road, every narrow gate on the Calthorpe Estate and the fastest routes through Five Ways at any time of day." },
  { title: "Fully Insured on Every Job", desc: "£10m goods-in-transit and £5m public liability cover comes as standard, critical for the high-value furniture and antiques common in Edgbaston homes." },
  { title: "Transparent, Fixed Pricing", desc: "No hidden charges for stairs, parking permit costs or weekend slots. Your written quote is the price you pay." },
  { title: "5-Star Rated Removal Company", desc: "Hundreds of verified Google reviews from Edgbaston and across Birmingham. We maintain a 4.9-star average because our crews care about the details." },
];

const faqs = [
  { q: "How much does a removal in Edgbaston cost?", a: "Most Edgbaston house moves (2–3 bedrooms) run between £400–£900 depending on volume, access and distance. Hagley Road mansion flat moves with lift access can be quoted more precisely once we know your floor and van size. Contact us for a free, itemised quote." },
  { q: "Do you cover the Edgbaston postcode, B15 and B16?", a: "Yes. We operate daily across B15 (central Edgbaston, Calthorpe Estate, Five Ways) and B16 (Edgbaston western fringe toward Ladywood and Bearwood Road). Both postcodes are within our standard Birmingham coverage, with no travel surcharge." },
  { q: "Can you help with parking restrictions in Edgbaston?", a: "Absolutely. Hagley Road and Harborne Road both operate permit zones and can be busy with residents and medical centre traffic. We liaise with Birmingham City Council to obtain suspension permits where required and time our arrival to avoid peak hours." },
  { q: "Do you offer same-day removals in Edgbaston?", a: "Yes, subject to van availability. We regularly handle same-day man and van jobs across Edgbaston, particularly for studio and 1-bedroom moves. Call us before 10 am for the best chance of a same-day slot." },
  { q: "Can you move large furniture from a Victorian villa in Edgbaston?", a: "Definitely. Edgbaston's Victorian and Edwardian villas often have wide hallways and tall ceilings that are easier to navigate than modern properties, but their staircase turns can be tight. Our crew carries furniture straps, stair-slides and blanket-wrap as standard to protect both your belongings and the original woodwork." },
];

const LocalArea = (
  <>
    <p>
      Edgbaston sits just 1.5 miles south-west of Birmingham city centre, bordered by Five
      Ways to the north-east and Harborne to the west. The postcode districts B15 and B16
      cover some of the most sought-after residential streets in Birmingham, from the leafy
      avenues of the Calthorpe Estate to the grand Hagley Road corridor. As a removal company
      in Edgbaston we navigate these routes every week, so we know exactly where parking bays
      are suspended for medical appointments and which access roads serve the larger properties.
    </p>
    <p>
      The housing stock here is varied and often large. The Calthorpe Estate contains Victorian
      and Edwardian detached villas with sweeping driveways, wide hallways and original staircases
      that reward an experienced crew. Further toward the B16 boundary near Ladywood you&apos;ll
      find Edwardian semis, 1930s blocks and converted mansion flats, each with its own access
      challenge. Our man and van Edgbaston service is popular for flat-to-flat and room moves in
      these conversions, while our full removal crews handle 4- and 5-bedroom estate properties.
    </p>
    <p>
      We also regularly move families between Edgbaston and the neighbouring areas we cover,
      including{" "}
      <Link href="/areas/harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>,{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link>,{" "}
      <Link href="/areas/moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link> and{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>.
      Whether you&apos;re upsizing from a Moseley terrace to an Edgbaston semi or downsizing from the
      Calthorpe Estate to a Harborne village apartment, we make the move seamless.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides professional, fully insured house and office removals across Edgbaston B15 and B16. Whether you're leaving a Calthorpe Estate villa, a Hagley Road apartment or a Victorian terrace off Bristol Road, our experienced crew handles every lift, wrap and load with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
