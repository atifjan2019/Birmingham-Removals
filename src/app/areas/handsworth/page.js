import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Handsworth";
const SLUG = "handsworth";
const POSTCODES = "B20, B21";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Affordable removals in Handsworth B20 and B21, from terraces off Soho Road to large family homes near Handsworth Park. Fixed prices, free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals handsworth",
    "house removals handsworth",
    "man and van handsworth",
    "B20 removals",
    "B21 removals",
    "office removals handsworth",
    "removal company handsworth",
    "soho road removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Handsworth", desc: "Full house moves throughout B20 and B21, from the large bay-fronted Edwardian homes around Handsworth Park to the long terraced rows off Grove Lane. We plan, pack and shift every room with care." },
  { icon: Truck, name: "Man and Van Handsworth", desc: "Budget-friendly man and van runs across Handsworth, ideal for the many shared houses and single-room moves around the Soho Road and Booth Street. Quick, flexible and easy to book." },
  { icon: Building2, name: "Flat Removals Handsworth", desc: "Confident flat and maisonette moves in B21, including the conversions near Holyhead Road and the apartment blocks off Hamstead Road. We sort entry codes and stair access in advance." },
  { icon: Building2, name: "Office Removals Handsworth", desc: "Out-of-hours commercial moves for the shops, faith centres and small businesses lining Soho Road, keeping trading downtime to an absolute minimum." },
  { icon: Package, name: "Packing Service", desc: "Full or part packing using strong double-walled boxes, ideal for big extended-family households. We wrap kitchenware, wardrobes and electricals so nothing shifts in transit." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure short and long-term storage paired with your Handsworth move, handy for chain delays or while a B20 property is being renovated before you settle in." },
];

const whyUs = [
  { title: "Handsworth Road Knowledge", desc: "We know the busy bus-lane timings on Soho Road, the tight terraced parking off Grove Lane and which side streets near Handsworth Park give the crew room to load without blocking traffic." },
  { title: "Fair, Honest Pricing", desc: "Handsworth is a value-conscious area and we price for it. No weekend premiums, no stair surcharges and no hidden extras, just a fixed written quote you can rely on." },
  { title: "Fully Insured on Every Job", desc: "£10m goods-in-transit and £5m public liability cover come as standard across B20 and B21, whether you are moving a one-bed flat or a six-bedroom family home." },
  { title: "Used to Larger Family Moves", desc: "Many Handsworth homes house big extended families with a lot to shift. Our larger vans and full crews handle high-volume moves in a single trip wherever possible." },
];

const faqs = [
  { q: "How much does a removal in Handsworth cost?", a: "A typical 2 to 3 bedroom move in Handsworth costs between £320 and £750 depending on volume, access and where you are heading. Larger Edwardian family homes near Handsworth Park are quoted accurately once we have noted the layout. We usually return a free itemised quote within 30 minutes." },
  { q: "Do you cover the Handsworth postcodes, B20 and B21?", a: "Yes. We cover all of B20 and B21, including the streets around Handsworth Park, the Soho Road corridor, Grove Lane, Holyhead Road and the Hamstead Road area bordering Great Barr. There is no travel surcharge within these postcodes." },
  { q: "Can you deal with parking on Soho Road?", a: "Absolutely. Soho Road has bus lanes and loading restrictions through the day, so we usually load early or arrange a Birmingham City Council bay suspension where needed. On the tighter terraced streets we position the van to keep the road clear for neighbours." },
  { q: "Do you offer same-day removals in Handsworth?", a: "Yes, subject to van availability. Same-day man and van jobs around the Soho Road are common, so call before 10 am and we will try to confirm a slot. Larger full-house moves need at least 48 hours so we can send the right van and crew." },
  { q: "Can you handle a large extended-family move in Handsworth?", a: "Definitely. Many B20 and B21 homes are sizeable with a lot of furniture and belongings. We bring larger Luton vans and a full crew so high-volume moves can usually be completed in one trip, keeping the day calm and well organised." },
];

const LocalArea = (
  <>
    <p>
      Handsworth sits roughly 2 miles north-west of Birmingham city centre, with the B20 and
      B21 postcodes wrapping around the green expanse of Handsworth Park. It is one of the
      city&apos;s most diverse and characterful neighbourhoods, anchored by the bustling Soho
      Road shopping strip and well connected by bus and rail into town.
    </p>
    <p>
      The housing is a real mix. You will find grand bay-fronted Edwardian and Victorian villas
      on the leafier roads near the park, long rows of red-brick terraces off Grove Lane and
      Booth Street, and pockets of flats and maisonettes around Hamstead Road and Holyhead Road.
      Many homes here are large family properties, so our full-crew service and bigger vans get
      plenty of use, while the man and van option suits the shared houses and one-bed conversions.
    </p>
    <p>
      Households often move between Handsworth and{" "}
      <Link href="/areas/great-barr" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Great Barr</Link> or
      head into the{" "}
      <Link href="/areas/city-centre" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">City Centre</Link> for
      apartment living. Whether you are upsizing to a villa near Handsworth Park or relocating a
      busy household across B21, the removal company Handsworth families trust will keep your move
      smooth from start to finish.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals offers affordable, fully insured house and office removals across Handsworth B20 and B21. From terraced homes off Soho Road to large family villas near Handsworth Park, our local crew handles every lift and load with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
