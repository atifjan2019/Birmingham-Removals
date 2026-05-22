import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Coventry";
const SLUG = "coventry";
const POSTCODES = "CV1, CV2, CV3";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals - Fixed Prices`,
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
  { icon: Home, name: "House Removals Coventry", desc: "Full house moves across Coventry, from the inter-war semis of Earlsdon and Cheylesmore to the newer estates out at Tile Hill. Our crews leave Birmingham early to reach CV postcodes in good time for your slot." },
  { icon: Building2, name: "Flat Removals Coventry", desc: "Apartment and flat moves around the city-centre ring road, the FarGo Village area and the student blocks near both universities. We confirm lift access, entry codes and loading bays before the van sets off." },
  { icon: Truck, name: "Man and Van Coventry", desc: "A flexible man and van service made for Coventry&apos;s large student population, ideal for single rooms, CV1 lets near the cathedral quarter and small flat clearances. A budget-friendly choice for lighter loads." },
  { icon: Building2, name: "Office Removals Coventry", desc: "Commercial relocations for offices in the city centre, the units around the Ricoh and the business parks off the A45 and Tollbar End. Evening and weekend moves keep your trading hours protected." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with double-walled cartons and specialist wrapping. Well suited to the bay-fronted Edwardian homes in Earlsdon and Stoke where original features and tight hallways call for extra care." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage alongside your Coventry move, useful for the common gap between term-end and a new tenancy, or when a sale completion slips. We hold your goods safely at our Birmingham facility until you are ready." },
];

const whyUs = [
  { title: "We Plan the Coventry Run", desc: "The Coventry ring road and the one-way junctions around the city centre are notorious. Our drivers map the route up the A45 from Birmingham and the access at your door before move day, so nothing stalls." },
  { title: "Fully Insured, Every Mile", desc: "Each Coventry move carries £10m goods-in-transit and £5m public liability cover, protecting your belongings across the whole journey from Birmingham and back." },
  { title: "Fixed Prices for the Distance", desc: "Coventry is a longer trip than our Birmingham neighbours, so we quote it openly and fairly. The written price covers the mileage with no surprise add-ons, weekend or otherwise." },
  { title: "Rated Across the West Midlands", desc: "A 4.9-star Google rating built on moves throughout the region, with a strong line of Coventry student and family customers who book us again and recommend us on." },
];

const faqs = [
  { q: "How much does a removal in Coventry cost?", a: "A 2 to 3 bedroom Coventry move generally falls between £420 and £900 depending on volume, access and your destination. As Coventry is roughly 20 miles from our Birmingham base, the quote reflects the distance fairly rather than hiding it in extras. Ask for a free itemised quote, returned within 30 minutes." },
  { q: "Which Coventry postcodes do you cover?", a: "We cover CV1 across the city centre and university quarter, CV2 taking in Stoke, Walsgrave and Wyken, and CV3 around Cheylesmore, Stivichall and Whitley. We also reach out to Kenilworth and the surrounding villages." },
  { q: "How do you manage parking and the city-centre access?", a: "Coventry&apos;s ring road and the pedestrianised city core mean loading needs planning. We book early slots, use the nearest legal loading points, or arrange a bay suspension with Coventry City Council where access is tight." },
  { q: "Do you offer same-day removals in Coventry?", a: "Sometimes, subject to van availability and the travel distance. Same-day man and van jobs in CV1 to CV3 can be arranged if you call early, ideally before 9 am. Larger full-house moves to Coventry are best booked at least 48 hours ahead." },
  { q: "Can you handle a long-distance move to or from Coventry?", a: "Yes, long-distance and inter-city moves are a regular part of our work. Whether you are relocating from Coventry down to London or up north, or moving in from another city, we quote a fixed price and wrap everything thoroughly for the longer haul." },
];

const LocalArea = (
  <>
    <p>
      Coventry lies at the eastern edge of the West Midlands, around 20 miles from Birmingham and
      reached most directly along the A45. The CV1, CV2 and CV3 postcodes cover the rebuilt city
      centre with its cathedral and two universities, the eastern suburbs of Stoke and Walsgrave,
      and the leafier southern areas of Cheylesmore and Stivichall.
    </p>
    <p>
      Coventry&apos;s housing reflects its history. There are post-war homes across much of the city,
      bay-fronted Edwardian streets in Earlsdon and Stoke, and a large stock of student flats and
      shared houses near the university campuses. That student demand keeps our man and van
      service busy through the academic year, while full crews handle family moves out towards
      Tile Hill, Whitley and the Warwickshire fringe.
    </p>
    <p>
      As the largest city in the wider region we serve, Coventry sits a little apart from our
      Birmingham heartland, but we run moves to and from it every week. Customers frequently
      relocate between Coventry and{" "}
      <Link href="/areas/solihull" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Solihull</Link>, often
      via the A45, and onward across Birmingham itself. Whether you&apos;re moving into a city-centre
      flat near the cathedral or out to a Cheylesmore semi, our Coventry crews handle the packing,
      lifting and paperwork from door to door.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals brings fully insured, fixed-price house and office moves to Coventry CV1, CV2 and CV3. From cathedral-quarter student flats to Cheylesmore family homes, our crew travels along the A45 from Birmingham and handles every lift with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
