import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Solihull";
const SLUG = "solihull";
const POSTCODES = "B91, B92, B93";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals — Fixed Prices`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Solihull", desc: "Premium house removals across Solihull B91, B92 and B93 — from Edwardian semis in Olton to large executive detached homes in Monkspath and Tudor Grange." },
  { icon: Building2, name: "Luxury & Executive Moves", desc: "Specialist removals for high-value Solihull properties — careful handling of bespoke furniture, antiques, art and oversized items in premium homes throughout B91–B93." },
  { icon: Truck, name: "Man and Van Solihull", desc: "Reliable, vetted man and van in Solihull for smaller loads, storage transfers and quick relocations across B91, B92 and B93 and into neighbouring Shirley and Knowle." },
  { icon: Building2, name: "Office Removals Solihull", desc: "Professional office and commercial removals for Solihull town centre businesses, Lode Lane offices and tech park units — flexible scheduling to suit your operation." },
  { icon: Package, name: "Full Packing Service", desc: "White-glove packing for Solihull moves — every item documented, wrapped and crated to the standard expected in one of the West Midlands' most prestigious postcodes." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure, climate-controlled storage alongside your Solihull removal — chain-break solutions, downsizer storage and temporary storage for renovation moves." },
];

const whyUs = [
  { title: "Solihull Property Specialists", desc: "We operate across B91–B93 regularly — from the Edwardian bay-fronted semis of Olton to the gated new-build estates of Monkspath. We know every road, access point and parking restriction." },
  { title: "Fully Insured to Premium Standards", desc: "£10m goods-in-transit and £5m public liability on every Solihull job. High-value items documented with photographs before loading — full accountability throughout." },
  { title: "Premium Service, Transparent Pricing", desc: "Our Solihull quotes are detailed, written and fixed. The high-quality service we deliver in B91–B93 comes without the inflated prices charged by some 'luxury' removal operators." },
  { title: "Trusted by Solihull Residents", desc: "A consistently 4.9-star rated service across all Birmingham and Solihull postcodes. Solihull customers return to us for subsequent moves and recommend us to neighbours." },
];

const faqs = [
  { q: "How much does a removal in Solihull cost?", a: "A 3–4 bedroom Solihull house move typically costs £600–£1,200. Large detached homes in Monkspath or Tudor Grange with outbuildings and double garages are quoted individually after a video or in-person assessment. Smaller flat and man and van moves in B91–B93 start from £150. Free, fixed quotes returned within 30 minutes." },
  { q: "Do you cover the Solihull postcodes B91, B92 and B93?", a: "Yes — all of B91 (Solihull town centre, Olton, Elmdon), B92 (Sheldon, Marston Green, Elmdon Heath) and B93 (Dorridge, Knowle, Bentley Heath). We also regularly move clients between Solihull and Birmingham postcodes including B28, B14 and B23 as single-quote, single-crew jobs." },
  { q: "Can you move from a new-build estate in Monkspath, Solihull?", a: "Yes — Monkspath is one of Solihull's most active areas for us. The estates here (including Monkspath Hall Road, the Stratford Road corridor and the newer Bellway and Redrow sites) have specific access arrangements including shared drives, allocated visitor parking and sometimes lift or stair-only access. We co-ordinate with your developer or estate management in advance." },
  { q: "Do you offer same-day removals in Solihull?", a: "For man and van moves in B91–B93, same-day availability is possible — call before midday. Full house removals in Solihull typically require 48–72 hours' planning to assign the appropriate crew size, vehicle and access arrangements." },
  { q: "Can you move us near Birmingham Airport (BHX) or the NEC in Solihull?", a: "Yes — the Birmingham Airport (BHX) area (B26/B40) and the National Exhibition Centre sit just outside the core B91–B93 postcodes but are within our standard coverage area. We move clients in and around the airport employment corridor, the NEC catchment and the B37 Birmingham Business Park area with no surcharge." },
];

const LocalArea = (
  <>
    <p>
      Solihull covers the B91, B92 and B93 postcodes in the West Midlands metropolitan borough,
      sitting approximately 8 miles south-east of Birmingham city centre. It is one of the most
      prosperous local authority areas in England outside London, consistently ranking in the
      top 10 for average household income, educational attainment and quality of life. The town
      centre — anchored by the Touchwood Shopping Centre and Solihull School — is a compact,
      affluent retail and commercial hub.
    </p>
    <p>
      The property market in Solihull is one of the strongest in the West Midlands. In Olton
      (B91 south), the streets of Edwardian and interwar semis attract families seeking
      good-value period homes close to Olton railway station (Chiltern Railways). In Monkspath —
      on the southern edge of B91 — premium new-build estates of four and five-bedroom executive
      homes have transformed what was countryside into one of the region&apos;s most sought-after
      family addresses.
    </p>
    <p>
      Solihull&apos;s proximity to Birmingham Airport (BHX, B26) and the National Exhibition
      Centre (NEC, B40) makes it a preferred base for corporate relocations and international
      moves — professionals moving to the area for roles at BHX, Jaguar Land Rover, KPMG or other
      major M42-corridor employers regularly use our service.
    </p>
    <p>
      Moves between Solihull and{" "}
      <Link href="/areas/hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>,{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>,{" "}
      <Link href="/areas/sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link> and{" "}
      <Link href="/areas/erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>{" "}
      are among our most frequent cross-boundary jobs — quoted as a single move with one crew
      and our full insurance cover.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides premium, fully insured house and office removals across Solihull B91, B92 and B93. From Edwardian semis in Olton to executive new-builds in Monkspath and Tudor Grange, our DBS-checked crew delivers the professional moving service Solihull's high-value property market demands."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
