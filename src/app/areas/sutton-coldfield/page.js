import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Sutton Coldfield";
const SLUG = "sutton-coldfield";
const POSTCODES = "B72, B73, B74, B75, B76";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "Premium House Removals", desc: "Premium house moves across the Royal Town, from Edwardian villas in Boldmere to executive new-build detached homes in Four Oaks and Mere Green." },
  { icon: Building2, name: "Antique & High-Value Handling", desc: "Specialist handling for antiques, grand pianos, fine art and bespoke furniture, the standard expectation in Sutton Coldfield's premium property market." },
  { icon: Truck, name: "Man and Van Sutton Coldfield", desc: "Flexible, vetted man and van service in Sutton Coldfield for single-room moves, storage transfers and smaller loads across B72, B73, B74, B75 and B76." },
  { icon: Building2, name: "Office Removals Sutton Coldfield", desc: "Professional office removals for Sutton Coldfield town centre businesses and The Parade retail units, with weekend and evening scheduling to avoid disruption." },
  { icon: Package, name: "Full Packing Service", desc: "White-glove packing for Sutton Coldfield moves, including bespoke crating for artwork, specialist piano moving, wardrobe packing service and full inventory documentation." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Premium secure storage alongside your Sutton Coldfield removal, with climate-controlled options available for antiques, wine and sensitive items." },
];

const whyUs = [
  { title: "Sutton Coldfield Property Specialists", desc: "We move homes across the Royal Town regularly, from the gated avenues of Four Oaks to Mere Green village. Our crews handle high-value properties with the discretion and precision they deserve." },
  { title: "£10m Fully Insured on Every Job", desc: "Goods-in-transit and public liability cover at the level required for Sutton Coldfield's high-value property market. Every item is documented before loading." },
  { title: "Transparent Premium Pricing", desc: "Our Sutton Coldfield quotes are detailed, written and fixed. No hidden costs, no day-rate ambiguity, just a professional service priced fairly for the work involved." },
  { title: "5-Star Rated in Sutton Coldfield", desc: "Our reputation in B72–B76 is built on word of mouth. Sutton Coldfield residents refer us to friends and family because we deliver the quality they expect, every time." },
];

const faqs = [
  { q: "How much does a removal in Sutton Coldfield cost?", a: "A 3–4 bedroom Sutton Coldfield house move typically costs £600–£1,400 depending on volume, access and destination. Larger Four Oaks detached homes with outbuildings and garages are quoted individually after an assessment. We return detailed, fixed quotes within 30 minutes of your enquiry." },
  { q: "Do you cover all Sutton Coldfield postcodes, B72 to B76?", a: "Yes, we cover all Sutton Coldfield postcodes: B72 (Wylde Green, Boldmere), B73 (Sutton town centre, Walmley), B74 (Four Oaks, Streetly), B75 (Mere Green, Sutton Coldfield north) and B76 (Marston Green, Minworth). No travel surcharge applies to any of these postcodes." },
  { q: "Can you move a grand piano or antique furniture in Sutton Coldfield?", a: "Yes, specialist handling of pianos, antiques, fine art and high-value furniture is a core part of our Sutton Coldfield service. We use bespoke piano boards, crating materials and furniture blankets. High-value items are logged with photographs before loading and we can arrange additional insurance cover on request." },
  { q: "Do you offer same-day removals in Sutton Coldfield?", a: "For man and van jobs in Sutton Coldfield, same-day availability is possible, so call before midday. Full house moves in B72–B76 typically need 48–72 hours' planning to allocate the right van, crew size and access arrangements, particularly for larger detached properties." },
  { q: "Can you handle gated property access in Four Oaks, Sutton Coldfield?", a: "Yes, we work with gated properties throughout Sutton Coldfield regularly. Before move day we confirm access codes, intercom procedures and any size restrictions on entry vehicles. Our crews are briefed to be discreet, punctual and respectful of security arrangements throughout." },
];

const LocalArea = (
  <>
    <p>
      Sutton Coldfield, officially the Royal Town of Sutton Coldfield, occupies the B72
      through B76 postcodes in north-east Birmingham, approximately 7 miles from the city
      centre. It is consistently ranked among the most affluent areas in the West Midlands and
      one of the highest-demand property markets in the Birmingham commuter belt. The town
      centre on The Parade (B73) offers independent retailers, restaurants and professional
      services.
    </p>
    <p>
      The centrepiece of Sutton Coldfield is Sutton Park, a National Nature Reserve covering
      over 2,400 acres, making it one of the largest urban parks in Europe. The park is a
      significant reason families choose Sutton Coldfield as their long-term home, and we
      regularly move families into B74 and B75 specifically because of its proximity.
    </p>
    <p>
      Property types here require specialist knowledge. In Four Oaks (B74), large detached homes
      sit on generous plots behind electric gates, with long driveways, outbuildings and
      sometimes basement levels. Furniture pieces are frequently bespoke, oversized or antique,
      requiring specialist blanket-wrapping, custom crating or a piano board. In Mere Green
      (B75) and along Rectory Road, Edwardian and inter-war detached homes have wide hallways
      but can have tight turning staircases on the upper floors.
    </p>
    <p>
      Sutton Coldfield is served by the Birmingham Road (A5127), Lichfield Road and Chester
      Road as its main arterial routes. We handle frequent cross-boundary moves to{" "}
      <Link href="/areas/erdington" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Erdington</Link>,{" "}
      <Link href="/areas/harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link> and{" "}
      <Link href="/areas/solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>, plus detailed pages for{" "}
      <Link href="/areas/sutton-four-oaks" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Four Oaks</Link>,{" "}
      <Link href="/areas/sutton-mere-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Mere Green</Link>,{" "}
      <Link href="/areas/sutton-walmley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Walmley</Link> and{" "}
      <Link href="/areas/sutton-trinity" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Trinity</Link>.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides premium, fully insured removals across the Royal Town of Sutton Coldfield (B72–B76). From Boldmere semis to Four Oaks executive homes, our DBS-checked crews deliver the discretion and care your home deserves."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
