import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Wolverhampton";
const SLUG = "wolverhampton";
const POSTCODES = "WV1, WV2, WV3";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Fixed-price Wolverhampton removals across WV1, WV2 and WV3, from city ring road flats to Tettenhall family homes. Insured Birmingham crews, free 30-minute quote.`,
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
  { icon: Home, name: "House Removals Wolverhampton", desc: "Complete house moves across Wolverhampton, from the Victorian villas of Tettenhall and Penn to the terraced rows around Whitmore Reans and the inter-war semis of Wednesfield and Bilston. Our crews set out from Birmingham early to make the most of your day, with stair-slides, blanket-wrap and furniture straps carried as standard for period staircases and tight landings." },
  { icon: Building2, name: "Flat Removals Wolverhampton", desc: "Apartment and flat moves in the WV1 city centre, the developments near the ring road and Queen Square, and the student blocks close to the university campus. Lift access, entry fobs and loading bays are confirmed before we travel, so there is no waiting around or last-minute scramble on completion day." },
  { icon: Truck, name: "Man and Van Wolverhampton", desc: "A flexible man and van service for single rooms, WV2 student lets near the university and small flat clearances around Bilston and Wednesfield. A cost-effective pick when a full Luton crew would be more than you need, ideal for partial moves, eBay collections or shifting furniture between addresses across the WV postcodes." },
  { icon: Building2, name: "Office Removals Wolverhampton", desc: "Commercial moves for offices around Queen Square, the units off the Penn Road and the business space near i54 and the ring road. We plan around the one-way system and out-of-hours slots keep your operation running through the changeover, with IT, desks and filing crated, labelled and reconnected on the same day where possible." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with double-walled cartons and proper edge protection, well suited to the period homes in Tettenhall, Compton and Penn where original staircases, fireplaces and stained glass need a careful approach. We can pack the day before or on the morning of your move, and supply boxes in advance if you would rather do it yourself." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage combined with your Wolverhampton move, ideal when completion dates slip or you are bridging between homes along the A449 or A454. Goods are held safely at our Birmingham facility, fully inventoried and insured, until your new place is ready and we redeliver at a time that suits you." },
];

const whyUs = [
  { title: "Familiar with the WV Ring Road", desc: "Wolverhampton&apos;s ring road and the one-way sections around Queen Square and Molineux catch out crews who do not know them. Our drivers plan the run up from Birmingham via the A449 and the city-centre access before move day, so the van is positioned correctly the first time." },
  { title: "Insured From Door to Door", desc: "Every Wolverhampton job carries £10m goods-in-transit and £5m public liability cover, whether it is a city-centre flat off Queen Square or a detached period home out in leafy Tettenhall." },
  { title: "Fixed Pricing, Honest Mileage", desc: "Wolverhampton is a manageable trip from our Birmingham base, and your quote reflects it fairly with no padded distance fees or weekend premiums. The written figure is what you pay, ring-road access and all." },
  { title: "Recommended Across the City", desc: "A 4.9-star Google rating earned across the West Midlands, with a steady stream of Wolverhampton repeat customers and referrals from Penn, Compton, Wednesfield and Tettenhall." },
];

const faqs = [
  { q: "How much does a removal in Wolverhampton cost?", a: "A 2 to 3 bedroom Wolverhampton move usually falls between £380 and £850 depending on volume, access and where you are heading. A city-centre flat with good lift access sits at the lower end, while a Tettenhall or Penn period home with long paths and steep stairs is quoted once we have noted the layout. As a Birmingham-based company we factor the short trip to WV postcodes fairly rather than loading the price. Ask for a free itemised quote and we will return it within 30 minutes." },
  { q: "Do you cover the Wolverhampton postcodes WV1, WV2 and WV3?", a: "Yes. We cover WV1 across the city centre, Whitmore Reans and Wednesfield, WV2 around the university, All Saints and Bilston, and WV3 taking in Penn, Compton, Merridale and Tettenhall. There is no surcharge anywhere within these postcodes, and we are happy to quote for outlying WV areas too." },
  { q: "How do you handle parking, the ring road and access in the city centre?", a: "The pedestrianised areas around Queen Square and Dudley Street, the inner ring road and the one-way sections near Molineux all mean loading needs planning. We book early-morning slots or arrange a bay suspension with the City of Wolverhampton Council where access is restricted, and our drivers know which approaches keep the van close to your door without blocking traffic." },
  { q: "Do you handle inter-city moves between Wolverhampton and Birmingham?", a: "Yes, that corridor is one of our busiest. Moves between Wolverhampton and Birmingham, served by the A449, the rail line and the Metro, or onward to other cities, are quoted at a fixed price with full wrapping and protection for the journey. No hidden mileage charges apply, and we can handle the move in a single run for most 2 to 3 bedroom homes." },
  { q: "Can you access period homes in Tettenhall and Penn?", a: "Yes. The Victorian and Edwardian villas in Tettenhall and Penn often have gravel drives, mature gardens, tiled paths and original staircases with tight bends. Our crews carry stair-slides, corner protectors and full blanket-wrap as standard, and we protect banisters, stained glass and decorative tiling so both your furniture and the fabric of the house stay safe." },
  { q: "Can you do a same-day removal in Wolverhampton?", a: "Frequently, yes, depending on van availability. Same-day man and van work across WV1 to WV3 is common, so call before 10 am. Full-house moves are best booked at least 48 hours ahead so we can assign the right crew and van size." },
  { q: "Do you offer storage if my completion date slips?", a: "Yes. Chains in Wolverhampton can move at different speeds, so we offer secure, inventoried storage at our Birmingham facility for anything from a few days to several months. Your goods stay insured throughout and we redeliver to your new WV address whenever you are ready." },
];

const LocalArea = (
  <>
    <p>
      Wolverhampton sits at the north-western edge of the West Midlands, around 13 miles from
      Birmingham city centre and connected by the A4123 Birmingham New Road, the A449 and A454,
      the main railway line and the Metro extension that runs through to Birmingham. The WV1, WV2
      and WV3 postcodes cover the bustling city centre, the university quarter and the leafier
      suburbs of Penn, Compton and Tettenhall. As a significant independent market in its own
      right, Wolverhampton keeps our crews busy with everything from compact city-centre flats to
      large detached family homes.
    </p>
    <p>
      The heart of the city is anchored by Queen Square and the surrounding pedestrianised
      shopping streets, with the inner ring road looping around the centre and the Molineux
      Stadium close by to the north. The streets around the centre and Whitmore Reans are densely
      built, mixing Victorian terraces with post-war housing and modern apartment developments
      near the ring road. Access here takes planning, and our drivers know the one-way sections,
      the bay-suspension process and the quietest times to load, so a city-centre move never
      becomes a battle with traffic.
    </p>
    <p>
      The wider housing stock ranges enormously. There are grand Victorian and Edwardian villas
      in leafy Tettenhall and Penn, dense terraced streets in Whitmore Reans and around All
      Saints, comfortable inter-war semis spreading out through Wednesfield and Bilston, and
      newer developments dotted across the city and out towards i54. That spread keeps our man
      and van service busy with student lets near the university, while full crews take on the
      larger detached and semi-detached family homes in the western suburbs where gravel drives,
      mature gardens and original staircases call for extra care.
    </p>
    <p>
      Because Wolverhampton anchors the north of the conurbation, we regularly run moves between
      it and the towns in between. Customers often relocate between Wolverhampton and{" "}
      <Link href="/areas/dudley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Dudley</Link> or{" "}
      <Link href="/areas/west-bromwich" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">West Bromwich</Link> along
      the New Road corridor. We now also have local guides for{" "}
      <Link href="/areas/tettenhall-regis" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Tettenhall Regis</Link>,{" "}
      <Link href="/areas/tettenhall-wightwick" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Tettenhall Wightwick</Link>,{" "}
      <Link href="/areas/penn" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Penn</Link> and{" "}
      <Link href="/areas/oxley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Oxley</Link>, while the rail and Metro links make moves to and from Birmingham a
      daily occurrence for us. The A449 and A454 give us quick, reliable routes in and out of the
      city in any direction, whatever the destination.
    </p>
    <p>
      Whether you&apos;re moving into a city-centre flat near Queen Square, downsizing from a
      Tettenhall villa, or relocating an office off the Penn Road, our Wolverhampton crews manage
      the packing, lifting and paperwork end to end. We arrive from Birmingham early, work
      methodically through the day and treat every WV property, period or modern, with the same
      care we would give our own. The result is a fixed-price, fully insured move with no
      surprises and no stress.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers fully insured, fixed-price house and office moves across Wolverhampton WV1, WV2 and WV3, from ring-road apartments and Queen Square flats to the period villas of Tettenhall and Penn. Our experienced crew travels up from Birmingham, knows the city ring road inside out and handles every lift, wrap and load with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
