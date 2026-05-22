import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Erdington";
const SLUG = "erdington";
const POSTCODES = "B23, B24";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Erdington", desc: "Full house moves throughout Erdington, from Victorian terraces near Six Ways to interwar semis on Stockland Green. Affordable, fully insured, on-time." },
  { icon: Building2, name: "Flat Removals Erdington", desc: "Flat and apartment removals across Erdington and Stockland Green, from ground-floor ex-council conversions to modern blocks on the Chester Road (A452) corridor." },
  { icon: Truck, name: "Man and Van Erdington", desc: "Fast, affordable man and van in Erdington for single-room moves, furniture deliveries and short-notice relocations throughout B23, B24 and into neighbouring postcodes." },
  { icon: Building2, name: "Office Removals Erdington", desc: "Cost-effective office and commercial removals for Erdington High Street businesses and light industrial units near Tyburn Road, with flexible timing to suit your operation." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing across Erdington homes. We supply double-walled boxes, bubble wrap and furniture blankets, everything needed for a damage-free move." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Short and long-term storage alongside your Erdington removal, useful for downsizers, chain-break situations or relocations with a gap between move-out and move-in." },
];

const whyUs = [
  { title: "Erdington Area Knowledge", desc: "We know the Six Ways junction, the Slade Road permit zones and the quickest routes across B23 and B24 to avoid the Gravelly Hill Interchange (Spaghetti Junction) bottlenecks." },
  { title: "Fully Insured, Every Job", desc: "£10m goods-in-transit and £5m public liability cover on every Erdington removal, whether flat, house or office, regardless of size." },
  { title: "Transparent, Fixed Pricing", desc: "Erdington is one of our most competitive-priced areas, with affordable man and van rates and full removal quotes with no hidden charges." },
  { title: "Same-Day Availability", desc: "Erdington sits close to our base, making same-day removals realistic. Call before noon and we'll do our best to have a van with you today." },
];

const faqs = [
  { q: "How much does a removal in Erdington cost?", a: "A 2–3 bedroom Erdington house move typically costs £300–£700. Smaller 1-bedroom flats and man and van jobs in B23/B24 start from £120. We price by load and distance, not by the hour, so you know exactly what you'll pay before move day. Free quotes within 30 minutes." },
  { q: "Do you cover the Erdington postcodes B23 and B24?", a: "Yes, all of B23 (Erdington, Gravelly Hill, Stockland Green, Kingsbury Road corridor) and B24 (Gravelly Hill North, Tyburn Road area, Short Heath). Both postcodes are within our standard Birmingham coverage with no travel surcharge." },
  { q: "Can you help with access near the Gravelly Hill Interchange?", a: "Yes. The M6/A38M Gravelly Hill Interchange (Spaghetti Junction) sits on the southern border of Erdington and causes significant traffic on Tyburn Road, Aston Lane and Gravelly Hill North. We route our vans around it and plan arrival times to avoid peak-hour gridlock." },
  { q: "Do you offer same-day removals in Erdington?", a: "Yes, Erdington is one of the areas where same-day removals are regularly possible. Call before midday and we'll confirm availability. We're particularly quick to respond for 1–3 room loads in B23 and B24." },
  { q: "Can you move from a Castle Vale property in Erdington?", a: "Absolutely. Castle Vale, formerly a post-war housing estate and now largely private, has a mix of houses, maisonettes and bungalows. We're very familiar with the estate layout, access roads and parking arrangements and have completed many Castle Vale removals to locations across Birmingham and beyond." },
];

const LocalArea = (
  <>
    <p>
      Erdington covers the B23 and B24 postcodes in north Birmingham, sitting approximately
      5 miles north of the city centre. It&apos;s one of Birmingham&apos;s largest and most
      diverse residential districts, stretching from the Victorian streets around Erdington
      village and the Six Ways roundabout in the south, through the interwar housing of
      Stockland Green, to the Gravelly Hill North and Tyburn Road corridors that border Castle
      Vale to the east.
    </p>
    <p>
      Close to Erdington village and the High Street you find Victorian and Edwardian terraces,
      workers&apos; housing built during Birmingham&apos;s industrial expansion. Moving
      toward Stockland Green and the Chester Road, the housing transitions to 1930s and 1950s
      semis. Castle Vale, on the B24 eastern edge, is now predominantly private ownership,
      a mix of bungalows, terraces and semi-detached properties, many extended and improved.
    </p>
    <p>
      One of the key challenges for removals in Erdington is traffic management around the
      Gravelly Hill Interchange, &quot;Spaghetti Junction&quot;. Its proximity means Tyburn
      Road, Gravelly Hill North and Aston Lane can become very congested during peaks. Our crews
      plan all Erdington removals around these pinch points, and early starts on Chester Road are
      often the best option for moves heading south into the city or east toward{" "}
      <Link href="/areas/sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link>.
    </p>
    <p>
      We frequently move clients between Erdington and{" "}
      <Link href="/areas/sutton-coldfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sutton Coldfield</Link>,{" "}
      <Link href="/areas/hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link> and across the city. Our prices are fair, our vans are modern and our
      crews are trained to handle every property type in B23 and B24 with care.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers affordable, fully insured house, flat and office removals across Erdington B23 and B24. From Six Ways terraces to Stockland Green semis and Castle Vale homes, our local crew is here to make your move easy."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
