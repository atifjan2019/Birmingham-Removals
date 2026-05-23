import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Hall Green";
const SLUG = "hall-green";
const POSTCODES = "B28";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Hall Green", desc: "Full house moves across Hall Green, predominantly 1930s semis on Shaftmoor Lane, Robin Hood Lane and Springfield Road. Planned, packed and delivered without stress." },
  { icon: Building2, name: "Flat Removals Hall Green", desc: "Flat removals across Hall Green and the Stratford Road corridor, including purpose-built blocks and converted Victorian terraces throughout B28." },
  { icon: Truck, name: "Man and Van Hall Green", desc: "Flexible man and van in Hall Green for smaller moves, student changeovers and furniture deliveries. Available across B28 and into Acocks Green, Sparkhill and Shirley." },
  { icon: Building2, name: "Office Removals Hall Green", desc: "Small and medium office removals for Hall Green businesses along Stratford Road, reliable, efficient and timed to minimise disruption to your team." },
  { icon: Package, name: "Packing Service", desc: "Professional packing in Hall Green homes, including double-walled boxes, furniture blankets and precision wrapping for fragile items, artwork and electronics." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Storage alongside your Hall Green removal, short-term between exchange and completion, or long-term for downsizers and those in temporary accommodation." },
];

const whyUs = [
  { title: "Hall Green & B28 Expertise", desc: "We know the permit zones near Stratford Road (A34), the best access points for interwar semis with side passages and the quietest routes to avoid the school-run gridlock on Robin Hood Lane." },
  { title: "Fully Insured on Every Move", desc: "£10m goods-in-transit cover on every Hall Green job. Your furniture, electronics and personal items are protected from loading to delivery." },
  { title: "Fair, Fixed Pricing", desc: "Clear, written quotes for every Hall Green removal. No day-rate ambiguity and no charges that appear on move day that weren't in the quote." },
  { title: "Consistent 4.9-Star Reviews", desc: "Hall Green customers regularly leave us 5-star reviews citing punctuality, care with furniture and polite, professional crews. We're proud of our reputation in B28." },
];

const faqs = [
  { q: "How much does a removal in Hall Green cost?", a: "A 2–3 bedroom Hall Green semi typically costs £300–£700 depending on volume and destination. 1930s semis with full through-lounges and garage contents are priced individually. Man and van in B28 starts from £120. Free, fixed quotes returned within 30 minutes." },
  { q: "Do you cover the Hall Green postcode B28?", a: "Yes, all of B28, including Hall Green village, Shaftmoor Lane, Robin Hood Lane, Highfield Road, Springfield Road and the areas bordering Acocks Green (B27) and Shirley. No travel surcharge for any B28 address." },
  { q: "Can you help with a period 1930s semi in Hall Green?", a: "Yes, 1930s interwar semis are the defining property type in Hall Green and we move them daily. They typically have bay-fronted lounges, a side passage, rear gardens and either a single garage or parking on the drive. Our crews are expert at managing large sofas through the front bay and navigating the through-lounge staircase arrangement." },
  { q: "Do you do same-day removals in Hall Green?", a: "Yes, for man and van and smaller loads in B28. Call before midday and we'll confirm availability. Full house moves need 48 hours' planning to assign the right crew size and vehicle." },
  { q: "What roads do you use for removals in Hall Green?", a: "For most Hall Green moves we use the Stratford Road (A34) as the main corridor. For moves toward Kings Heath we use Highfield Road and the Alcester Road connection. For moves east toward Shirley and Solihull we use the Shaftmoor Lane and Baldwins Lane route to avoid the congested Stratford Road / Shirley Road junction." },
];

const LocalArea = (
  <>
    <p>
      Hall Green covers the B28 postcode in south-east Birmingham, approximately 5 miles from
      the city centre along the Stratford Road (A34). It is a predominantly residential suburb,
      developed primarily during the interwar period of the 1920s and 1930s, and is
      characterised by the classic Birmingham semi, the bay-fronted three-bedroom houses that
      define the streetscape of Shaftmoor Lane, Robin Hood Lane and Springfield Road.
    </p>
    <p>
      The 1930s semis that make up the majority of B28&apos;s housing stock have specific
      characteristics we know well: solidly built with plaster walls, often with side passages
      too narrow for larger items, and the front bay window area is frequently the access point
      of choice for three-seater sofas. Our crews are experienced at removing bay window frames
      where necessary (and re-fitting them securely).
    </p>
    <p>
      The Stratford Road (A34) is the primary artery through the area and connects Hall Green
      south to Shirley and the Solihull boundary, north through Sparkhill to Birmingham city
      centre. We navigate the A34 efficiently and take quieter parallel routes like Highfield
      Road and Baldwins Lane to avoid traffic.
    </p>
    <p>
      Hall Green borders several areas where we are very active, including{" "}
      <Link href="/areas/moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>{" "}
      (B13) to the north-west,{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>{" "}
      (B14) to the west and{" "}
      <Link href="/areas/solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>{" "}
      (B91) to the south-east. Cross-boundary moves to{" "}
      <Link href="/areas/erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>{" "}
      and beyond are quoted as a single job with one crew and one truck.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides professional, fully insured house and office removals across Hall Green B28. From 1930s semis on Shaftmoor Lane to flats along the Stratford Road, our local crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
      mapQuery="Hall Green, Birmingham, B28"
    />
  );
}
