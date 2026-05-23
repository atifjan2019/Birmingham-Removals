import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Coventry";
const SLUG = "coventry";
const POSTCODES = "CV1, CV2, CV3";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Fixed-price Coventry removals across CV1, CV2 and CV3, from city-centre student flats to Cheylesmore family homes. Insured Birmingham crews, free 30-minute quote.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals coventry",
    "house removals coventry",
    "man and van coventry",
    "CV1 removals",
    "office removals coventry",
    "removal company coventry",
    "removals near coventry cathedral",
  ],
});

const services = [
  { icon: Home, name: "House Removals Coventry", desc: "Full house moves across Coventry, from the inter-war semis of Earlsdon and Cheylesmore to the post-war terraces of Stoke and the newer estates out at Tile Hill. Our crews leave Birmingham early to reach the CV1, CV2 and CV3 postcodes in good time, planning the run up the A45 and around the ring road so your slot starts on schedule." },
  { icon: Building2, name: "Flat Removals Coventry", desc: "Apartment and flat moves around the city-centre ring road, the cathedral quarter, FarGo Village and the purpose-built blocks near both Coventry University and the University of Warwick. We confirm lift access, entry codes and the nearest loading bay before the van leaves Birmingham, so there is no scramble for parking on the day." },
  { icon: Truck, name: "Man and Van Coventry", desc: "A flexible man and van service made for Coventry&apos;s large student population, ideal for single rooms in CV1 lets near the cathedral, shared houses in Earlsdon and small flat clearances. A budget-friendly choice for lighter loads, with the same insured crew and careful handling as our full house moves." },
  { icon: Building2, name: "Office Removals Coventry", desc: "Commercial relocations for offices in the city centre, the units around the former Ricoh Arena and the business parks off the A45 and out at Tollbar End near the M6 and M69. Evening and weekend moves keep your trading hours protected, with IT and workstation handling built into the plan." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with double-walled cartons and specialist wrapping. Well suited to the bay-fronted Edwardian homes in Earlsdon and Stoke where original features, narrow hallways and tight staircase bends call for extra care, as well as quick student pack-downs at the end of term." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage alongside your Coventry move, useful for the common gap between term-end and a new tenancy near the universities, or when a sale completion slips. We hold your goods safely at our Birmingham facility until you are ready, then deliver back into Coventry whenever it suits." },
];

const whyUs = [
  { title: "We Plan the Coventry Run", desc: "The Coventry ring road and the one-way junctions around the city centre are notorious for catching out drivers who do not know them. Our crews map the route up the A45 from Birmingham, the ring-road exit closest to your door and the access at both ends before move day, so nothing stalls." },
  { title: "Fully Insured, Every Mile", desc: "Each Coventry move carries £10m goods-in-transit and £5m public liability cover, protecting your belongings across the whole journey from Birmingham along the A45, around the ring road and back again." },
  { title: "Fixed Prices for the Distance", desc: "Coventry is a longer trip than our Birmingham neighbours, so we quote it openly and fairly. The written price covers the mileage with no surprise add-ons, weekend or otherwise, and no last-minute fuel or distance surcharges." },
  { title: "Rated Across the West Midlands", desc: "A 4.9-star Google rating built on moves throughout the region, with a strong line of Coventry student and family customers who book us again and recommend us to neighbours, landlords and university friends." },
];

const faqs = [
  { q: "How much does a removal in Coventry cost?", a: "A 2 to 3 bedroom Coventry move generally falls between £420 and £900 depending on volume, access and your destination. As Coventry sits roughly 20 miles from our Birmingham base, the quote reflects the distance up the A45 fairly rather than hiding it in extras. A single-room student man and van job in CV1 costs far less. Ask for a free itemised quote, usually returned within 30 minutes." },
  { q: "Which Coventry postcodes do you cover?", a: "We cover CV1 across the city centre, cathedral quarter and university area, CV2 taking in Stoke, Walsgrave and Wyken, and CV3 around Cheylesmore, Stivichall, Finham and Whitley. We also reach out to Tile Hill, Canley, Kenilworth and the surrounding Warwickshire villages, with no hidden charge for crossing the city boundary." },
  { q: "How do you manage the ring road and city-centre access?", a: "Coventry&apos;s ring road and the pedestrianised city core mean loading needs careful planning. We pick the ring-road junction nearest your address, book early slots, use the closest legal loading point, or arrange a bay suspension with Coventry City Council where access by the cathedral or in the lanes is tight." },
  { q: "Do you handle student moves near the universities?", a: "Yes, student moves are a regular part of our Coventry work. We move single rooms and shared houses around Coventry University in the city centre and the University of Warwick out towards Canley and Gibbet Hill, including the purpose-built halls and private blocks. End-of-term clearances and storage between tenancies are easy to arrange." },
  { q: "Can you handle a long-distance move to or from Coventry along the A45 or M6?", a: "Yes, long-distance and inter-city moves are a regular part of our work. Whether you are relocating from Coventry down to London, up the M6 to the North West or simply along the A45 to Birmingham, we quote a fixed price and wrap everything thoroughly for the longer haul. The M6 and M69 give us quick access in and out of the city." },
  { q: "Do you offer same-day removals in Coventry?", a: "Sometimes, subject to van availability and the travel distance. Same-day man and van jobs in CV1 to CV3 can be arranged if you call early, ideally before 9 am. Larger full-house moves to Coventry are best booked at least 48 hours ahead so we can allocate the right van size and crew." },
  { q: "Do you protect period features in older Coventry homes?", a: "Yes. The Edwardian and inter-war homes in Earlsdon, Stoke and Cheylesmore often have tiled paths, bay windows, original banisters and tight hallways. Our crews carry furniture straps, stair-slides and full blanket-wrap as standard, protecting both your belongings and the original woodwork and plasterwork throughout the move." },
];

const LocalArea = (
  <>
    <p>
      Coventry lies at the eastern edge of the West Midlands, around 20 miles from Birmingham and
      reached most directly along the A45, with the M6 and M69 looping the city for longer journeys.
      The CV1, CV2 and CV3 postcodes cover the rebuilt city centre with its famous cathedral and
      pedestrianised core, the two universities, the eastern suburbs of Stoke, Walsgrave and Wyken,
      and the leafier southern areas of Cheylesmore, Stivichall and Finham. As an independent
      market city with its own distinct identity, Coventry generates steady removals demand quite
      separate from our Birmingham heartland.
    </p>
    <p>
      The city centre is defined by its ring road, a tight elevated loop with closely spaced
      junctions that catches out unfamiliar drivers and shapes how every move into the cathedral
      quarter and CV1 has to be planned. Loading near the cathedral, the Lower Precinct and the
      lanes around FarGo Village needs the right junction, an early slot and sometimes a bay
      suspension. Our crews know which ring-road exit drops closest to each street and how to keep
      a removal van off the busy one-way system while the load goes in and out.
    </p>
    <p>
      Coventry&apos;s housing reflects its long history of growth and post-war rebuilding. There
      are extensive post-war estates across much of the city, bay-fronted Edwardian and inter-war
      streets in Earlsdon and Stoke, solid family semis in Cheylesmore and Stivichall, and a large
      stock of newer developments and apartments in and around the centre. Earlsdon in particular
      is prized for its Victorian and Edwardian terraces, independent shops and village feel, while
      Tile Hill and Canley to the west mix council-built homes with rapidly expanding student
      accommodation. Our suburb guides now cover{" "}
      <Link href="/areas/earlsdon" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Earlsdon</Link>,{" "}
      <Link href="/areas/cheylesmore" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Cheylesmore</Link>,{" "}
      <Link href="/areas/wainbody" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Wainbody</Link>,{" "}
      <Link href="/areas/bablake" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Bablake</Link> and{" "}
      <Link href="/areas/whoberley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Whoberley</Link>.
    </p>
    <p>
      Both universities drive a great deal of our Coventry work. Coventry University sits right in
      the heart of the city, ringed by purpose-built halls and converted CV1 flats, while the
      University of Warwick lies to the south-west towards Canley and Gibbet Hill, surrounded by
      shared student houses. That demand keeps our man and van service busy through the academic
      year, especially around the September intake and the end-of-term clearances in summer, while
      full crews handle family moves out towards Whitley, the Warwickshire fringe and beyond.
    </p>
    <p>
      As the largest city in the wider region we serve, Coventry sits a little apart from
      Birmingham, but we run moves to and from it every week along the A45 and the M6. Customers
      frequently relocate between Coventry and{" "}
      <Link href="/areas/solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>, often
      via the A45 past the airport and the NEC, and onward across Birmingham itself. Whether
      you&apos;re moving into a city-centre flat near the cathedral, a student house near the
      universities or out to a Cheylesmore semi, our Coventry crews handle the packing, lifting,
      ring-road logistics and paperwork from door to door.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals brings fully insured, fixed-price house and office moves to Coventry CV1, CV2 and CV3, covering everything from cathedral-quarter student flats to Earlsdon terraces and Cheylesmore family homes. Our experienced crews travel up the A45 from Birmingham, navigate the ring road with ease and handle every lift, wrap and load with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
