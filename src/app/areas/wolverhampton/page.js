import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta, areaTitle } from "@/lib/metadata";

const NAME = "Wolverhampton";
const SLUG = "wolverhampton";
const POSTCODES = "WV1, WV2, WV3";

export const metadata = makeMeta({
  title: areaTitle(NAME),
  absoluteTitle: true,
  description: `Fixed-price Wolverhampton removals across WV1 to WV3, from ring road flats to Tettenhall family homes. Insured Birmingham crews, free 30-minute quote.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals wolverhampton",
    "house removals wolverhampton",
    "man and van wolverhampton",
    "WV1 removals",
    "office removals wolverhampton",
    "removal company wolverhampton",
    "removals near molineux",
  ],
});

const services = [
  { icon: Home, name: "House Removals Wolverhampton", desc: "Complete house moves across Wolverhampton, from the Victorian villas of Tettenhall and Penn to the terraced rows around Whitmore Reans. Our crews set out from Birmingham early to make the most of your day." },
  { icon: Building2, name: "Flat Removals Wolverhampton", desc: "Apartment and flat moves in the WV1 city centre, the developments near the ring road and the student blocks close to the university campus. Lift access, fobs and loading bays are confirmed before we travel." },
  { icon: Truck, name: "Man and Van Wolverhampton", desc: "A flexible man and van service for single rooms, WV2 student lets near the university and small flat clearances. A cost-effective pick when a full Luton crew would be more than you need." },
  { icon: Building2, name: "Office Removals Wolverhampton", desc: "Commercial moves for offices around Queen Square, the units off the Penn Road and the business space near i54 and the ring road. Out-of-hours slots keep your operation running through the changeover." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with double-walled cartons and proper edge protection, well suited to the period homes in Tettenhall and Compton where original staircases and fireplaces need a careful approach." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage combined with your Wolverhampton move, ideal when completion dates slip or you are bridging between homes. Goods are held safely at our Birmingham facility until your new place is ready." },
];

const whyUs = [
  { title: "Familiar with the WV Ring Road", desc: "Wolverhampton&apos;s ring road and the one-way sections around Queen Square catch out crews who do not know them. Our drivers plan the run up from Birmingham and the city-centre access before move day." },
  { title: "Insured From Door to Door", desc: "Every Wolverhampton job carries £10m goods-in-transit and £5m public liability cover, whether it is a city-centre flat or a detached home out in Tettenhall." },
  { title: "Fixed Pricing, Honest Mileage", desc: "Wolverhampton is a manageable trip from our Birmingham base, and your quote reflects it fairly with no padded distance fees. The written figure is what you pay, weekends included." },
  { title: "Recommended Across the City", desc: "A 4.9-star Google rating earned across the West Midlands, with a steady stream of Wolverhampton repeat customers and referrals from Penn, Compton and beyond." },
];

const faqs = [
  { q: "How much does a removal in Wolverhampton cost?", a: "A 2 to 3 bedroom Wolverhampton move usually falls between £380 and £850 depending on volume, access and where you are heading. As a Birmingham-based company we factor the short trip to WV postcodes fairly rather than loading the price. Ask for a free itemised quote and we will return it within 30 minutes." },
  { q: "Do you cover the Wolverhampton postcodes WV1, WV2 and WV3?", a: "Yes. We cover WV1 across the city centre and Whitmore Reans, WV2 around the university and All Saints, and WV3 taking in Penn, Compton and the Merridale area. There is no surcharge within these postcodes." },
  { q: "How do you handle parking and access in the city centre?", a: "The pedestrianised areas around Queen Square and Dudley Street, plus the ring road, mean loading needs planning. We book early-morning slots or arrange a bay suspension with the City of Wolverhampton Council where access is restricted." },
  { q: "Can you do a same-day removal in Wolverhampton?", a: "Frequently, yes, depending on van availability. Same-day man and van work across WV1 to WV3 is common, so call before 10 am. Full-house moves are best booked at least 48 hours ahead so we can assign the right crew." },
  { q: "Do you handle inter-city moves between Wolverhampton and Birmingham?", a: "Yes, that corridor is one of our busiest. Moves between Wolverhampton and Birmingham, or onward to other cities, are quoted at a fixed price with full wrapping and protection for the journey. No hidden mileage charges apply." },
  { q: "Can you move a flat near Molineux or the ring road on a match day?", a: "We can, but we would rather not. Streets around Waterloo Road and the ground close or fill hours before kick-off, so we check the fixture list when we quote and offer a different day or an early start that has the van loaded and gone before the roads shut." },
  { q: "Do you cover Tettenhall, Penn, Codsall and Wombourne from the Wolverhampton page?", a: "Yes. The western suburbs and the villages over the Staffordshire border are inside our Wolverhampton coverage, and each has its own page with local detail. The quote is a fixed price wherever in WV you start or finish, with no mileage surcharge for the villages." },
];

const LocalArea = (
  <>
    <p>
      Wolverhampton sits at the north-western edge of the West Midlands, around 13 miles from
      Birmingham city centre and connected by the A4123 Birmingham New Road, the railway and the
      Metro extension. The WV1, WV2 and WV3 postcodes cover the city centre, the university
      quarter and the leafier suburbs of Penn, Compton and Tettenhall.
    </p>
    <p>
      The housing stock ranges widely. There are grand Victorian and Edwardian villas in
      Tettenhall and Penn, dense terraced streets in Whitmore Reans and around All Saints, and
      modern apartments near the ring road and Molineux. That spread keeps our man and van
      service busy with student lets near the university, while full crews take on the larger
      detached and semi-detached family homes in the western suburbs.
    </p>
    <p>
      Because Wolverhampton anchors the north of the conurbation, we regularly run moves between
      it and the towns in between. Customers often relocate between Wolverhampton and{" "}
      <Link href="/areas/dudley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Dudley</Link> or{" "}
      <Link href="/areas/west-bromwich" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">West Bromwich</Link> along
      the New Road corridor, with suburb guides for{" "}
      <Link href="/areas/tettenhall-regis" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Tettenhall Regis</Link>,{" "}
      <Link href="/areas/tettenhall-wightwick" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Tettenhall Wightwick</Link>,{" "}
      <Link href="/areas/penn" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Penn</Link> and{" "}
      <Link href="/areas/oxley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Oxley</Link>. Whether you&apos;re moving into a city-centre flat or out to a Tettenhall
      villa, our Wolverhampton crews manage the packing, lifting and paperwork end to end.
    </p>
    <p>
      The housing dictates the vehicle. In <Link href="/areas/tettenhall-regis" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Tettenhall</Link>, <Link href="/areas/penn" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Penn</Link> and Compton the villas and large semis have drives and wide roads, so a 7.5-tonne lorry parks at the door and a full crew does the job in a day. In Whitmore Reans, All Saints, Blakenhall and Heath Town the terraces have on-street parking only, and the flats around the ring road, Molineux and the university have lifts and loading bays we book, so we send a Luton and start early. The Bilston Road and Willenhall Road sides are post-war estates and newer housing-association homes with parking courts that can be too tight for a lorry.
    </p>
    <p>
      Wolverhampton's ring road is quick but one-way and busy, and the city centre bus and Metro corridors on Bilston Street and Pipers Row are no-go for loading. Match days at Molineux close streets around Waterloo Road, so we check the fixture list when a move is anywhere near the ground. For onward journeys the A449 and A41 reach the M54 and M6 at Junction 10 or Junction 10A in minutes, which makes Wolverhampton a quick base for moves to Shropshire, Staffordshire and the north.
    </p>
    <p>
      The work is the full spread: student and graduate flats near the university that suit a <Link href="/services/man-and-van" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">man and van</Link> job, family moves between the Black Country towns and Wolverhampton's suburbs, and large houses in Tettenhall and Penn with antiques and pianos. We also regularly move households out to Codsall, Wombourne and Albrighton and in from Dudley, Walsall and Birmingham, all as a single fixed price with mileage included.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers fully insured, fixed-price house and office moves across Wolverhampton WV1, WV2 and WV3. From ring-road apartments to Tettenhall villas, our experienced crew travels up from Birmingham and handles every lift with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
