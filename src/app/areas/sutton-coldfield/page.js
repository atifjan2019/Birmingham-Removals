import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta, areaTitle } from "@/lib/metadata";

const NAME = "Sutton Coldfield";
const SLUG = "sutton-coldfield";
const POSTCODES = "B72, B73, B74, B75, B76";

export const metadata = makeMeta({
  title: areaTitle(NAME),
  absoluteTitle: true,
  description: `Removals in Sutton Coldfield B72 to B76, from Four Oaks to Walmley. Fixed-price house and office movers, DBS-checked crew, free quote in 30 minutes.`,
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
  { q: "Which Sutton Coldfield streets are hardest for a removal lorry?", a: "The Victorian terraces in Boldmere and Wylde Green, where parking is on-street only and the roads are narrow, and the streets around the stations once commuter parking fills them. For those we use a Luton van, start early and, where needed, arrange a bay suspension. Four Oaks, Walmley and Mere Green are mostly drives and wide roads, which is straightforward." },
  { q: "Do you move people into Sutton Coldfield for the grammar schools?", a: "Yes, it is one of our most common Sutton jobs. Families moving in from Erdington, Great Barr, Kingstanding and across Birmingham for the Bishop Vesey, Sutton Girls and Arthur Terry catchments are priced as a local fixed move, and we can time the move around the start of term and hold goods in storage if the sale completes early." },
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
      <Link href="/areas/solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>, with local pages for{" "}
      <Link href="/areas/sutton-four-oaks" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Four Oaks</Link>,{" "}
      <Link href="/areas/sutton-mere-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Mere Green</Link> and{" "}
      <Link href="/areas/sutton-walmley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Walmley</Link>.
    </p>
    <p>
      Each part of Sutton moves differently. <Link href="/areas/sutton-four-oaks" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Four Oaks</Link> and the roads around Sutton Park are the biggest houses, gated and set back on long drives, usually a two-vehicle job with a full day booked. <Link href="/areas/boldmere" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Boldmere</Link> and <Link href="/areas/wylde-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Wylde Green</Link> are Victorian terraces and 1930s semis with on-street parking, where the crew claims the kerb early and carries from the road. <Link href="/areas/sutton-walmley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Walmley</Link> and Minworth are 1990s and newer estates with drives and parking courts, and the town centre has apartments above The Parade and along the Birmingham Road with lifts and loading bays we book ahead.
    </p>
    <p>
      The A5127 Birmingham Road and the Lichfield Road carry traffic through the town all day, and Sutton Park's gates close at dusk, which matters if a route uses the park roads. The Cross-City line stations at Sutton Coldfield, Four Oaks, Wylde Green and Butlers Lane fill the surrounding streets with commuter parking from early morning, so for a house near a station we aim to have the lorry positioned before eight. The A38 and the M6 Toll at Junction T3 give quick routes north to Lichfield and Tamworth, and the A452 and A38 run into Birmingham.
    </p>
    <p>
      Most of our Sutton Coldfield work is families moving in from Erdington, Kingstanding and the city for the grammar schools and the park, people moving between Sutton's own districts as their families grow, and retirees leaving large Four Oaks houses for apartments in Mere Green and the town centre. The larger houses mean more <Link href="/services/piano-and-specialist-items" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">pianos, antiques and art</Link> than anywhere else we cover, and many moves use our <Link href="/services/storage-solutions" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">storage</Link> while a chain completes.
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
      mapQuery="Sutton Coldfield, B72"
    />
  );
}
