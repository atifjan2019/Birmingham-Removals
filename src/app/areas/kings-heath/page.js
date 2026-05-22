import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Kings Heath";
const SLUG = "kings-heath";
const POSTCODES = "B14";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Kings Heath", desc: "Full house moves throughout Kings Heath, from Victorian terraces off Institute Road to interwar semis along Vicarage Road. Planned, packed and delivered without stress." },
  { icon: Building2, name: "Flat Removals Kings Heath", desc: "Specialist flat removals in Kings Heath's converted Victorian properties and modern apartment blocks along the Alcester Road South corridor." },
  { icon: Truck, name: "Man and Van Kings Heath", desc: "Affordable man and van in Kings Heath for single-room moves, sofa deliveries and light loads, with quick turnaround on short-notice bookings throughout B14." },
  { icon: Building2, name: "Office Removals Kings Heath", desc: "Weekend and evening office moves for Kings Heath High Street businesses, clinics and studios, with no downtime and no disruption." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing across Kings Heath homes. We use double-walled boxes, furniture blankets and specialist wrapping to protect every item." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure short and long-term storage combined with your Kings Heath removal, ideal for the busy local property chain market in B14." },
];

const whyUs = [
  { title: "Kings Heath Local Knowledge", desc: "We know the High Street loading restrictions, the parking permit zones around Institute Road and the fastest routes through B14, knowledge that only comes from doing this daily." },
  { title: "Fully Insured on Every Removal", desc: "£10m goods-in-transit and £5m public liability cover on every Kings Heath job, protecting your furniture from the moment we arrive to the moment it's placed in your new home." },
  { title: "Fixed, Honest Pricing", desc: "No stair charges, no narrow-access surcharges, no weekend premiums. The price we quote is the price you pay, in writing, before move day." },
  { title: "5-Star Rated in Birmingham", desc: "We've earned a 4.9-star Google average across hundreds of reviews. Kings Heath customers recommend us by name on local Facebook groups regularly." },
];

const faqs = [
  { q: "How much does a removal in Kings Heath cost?", a: "A typical 2–3 bedroom Kings Heath house move costs between £350–£800. Interwar semis with through-hallways and rear gardens are generally straightforward; Victorian terraces with back-entry access are priced once we've noted the layout. We return free quotes in under 30 minutes." },
  { q: "Do you cover the Kings Heath postcode B14?", a: "Yes, we cover all of B14 including Kings Heath village, Billesley, Brandwood End, the Wheelers Lane corridor and the streets off Vicarage Road and Institute Road. No travel surcharge applies to B14 postcodes." },
  { q: "Can you help with parking on Kings Heath High Street?", a: "Kings Heath High Street has controlled parking zones and active loading bays. We time our arrival for early morning to avoid peak hours and apply for Birmingham City Council bay suspensions on your behalf where a dedicated loading space is required." },
  { q: "Do you offer same-day removals in Kings Heath?", a: "Yes. Call us before 10 am and we'll do our best to arrange a same-day man and van in Kings Heath for loads up to 3 rooms. Full house moves in B14 need 48 hours' notice for the right van size and crew allocation." },
  { q: "Can you move from a terraced house with rear-entry access in Kings Heath?", a: "Absolutely. Kings Heath has many Victorian terraces where furniture has to go through the back entry rather than the front door. Our crew carries sack trucks and furniture straps sized for these narrow passages. We always survey the access route before quoting." },
];

const LocalArea = (
  <>
    <p>
      Kings Heath occupies the B14 postcode approximately 4 miles south of Birmingham city centre,
      straddling the Alcester Road South (A435), the main artery to Redditch and the M42. The
      area is one of south Birmingham&apos;s most popular and densely populated residential
      districts, with a thriving independent High Street, Kings Heath Park and a strong sense of
      community.
    </p>
    <p>
      The housing stock is diverse. The streets immediately off the High Street and around
      Institute Road are predominantly Victorian red-brick terraces, tightly packed, with small
      rear yards, steep staircases and narrow front entries. Further out toward Vicarage Road and
      Wheelers Lane, the housing transitions to interwar semis with wider plots, through-lounges,
      garages and established gardens. Billesley to the south-east has post-war estates. We
      handle every property type in B14 daily.
    </p>
    <p>
      Kings Heath is a hub for first-time buyers and young families. We regularly handle moves
      between Kings Heath and{" "}
      <Link href="/areas/moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>,{" "}
      <Link href="/areas/hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>,{" "}
      <Link href="/areas/harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>,{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link> and{" "}
      <Link href="/areas/northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides professional, fully insured house and flat removals across Kings Heath B14. From the High Street to the streets off Vicarage Road and Institute Road, our experienced crew handles every move with local know-how."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
