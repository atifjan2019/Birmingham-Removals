import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Quinton";
const SLUG = "quinton";
const POSTCODES = "B32";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals - Fixed Prices`,
  description: `Reliable removals across Quinton B32, from 1930s semis on Quinton Road to homes near the Hagley Road West and the M5. Fixed prices and a free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals quinton",
    "house removals quinton",
    "man and van quinton",
    "B32 removals",
    "office removals quinton",
    "removal company quinton",
    "hagley road west removals",
    "ridgacre removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Quinton", desc: "Complete house moves across B32, from the classic 1930s bay-fronted semis along Quinton Road to the larger detached homes on the Ridgacre estate. Planned, packed and delivered without fuss." },
  { icon: Truck, name: "Man and Van Quinton", desc: "Flexible man and van runs in Quinton for single rooms, light loads and quick relocations, well suited to the maisonettes and smaller homes near the Hagley Road West shops." },
  { icon: Home, name: "Family Home Removals", desc: "Quinton is a settled, family-heavy area, so we handle plenty of 3 and 4-bed semis off Worlds End Lane and Howley Grange Road, complete with sheds, garages and loft contents." },
  { icon: Building2, name: "Office Removals Quinton", desc: "Discreet out-of-hours commercial moves for the businesses along Hagley Road West and the Quinton Expressway corridor, with minimal disruption to your trading hours." },
  { icon: Package, name: "Packing Service", desc: "Full or part packing with sturdy double-walled boxes and proper wrapping for glassware, mirrors and white goods, ideal for long-settled family homes with a lot accumulated over the years." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removals for B32, useful during chain delays or while downsizing from a larger Quinton semi before the next move completes." },
];

const whyUs = [
  { title: "Quinton Access Know-How", desc: "We know the fast-moving Hagley Road West, the junction pressures near the M5 at Quinton, and the quieter cul-de-sacs off Ridgacre Road where the crew can park close to the door." },
  { title: "Fixed, Transparent Pricing", desc: "Your written quote is your final price. No weekend premiums, no stair charges and no surprises on the day, whatever the size of your B32 move." },
  { title: "Fully Insured as Standard", desc: "Every Quinton job carries £10m goods-in-transit and £5m public liability cover, protecting your furniture from the front step to the new property." },
  { title: "Local to the West of the City", desc: "Working B32 and the borders with Harborne and Bearwood week in, week out means we route efficiently and avoid the worst of the Hagley Road traffic." },
];

const faqs = [
  { q: "How much does a removal in Quinton cost?", a: "A typical 2 to 3 bedroom Quinton move runs between £320 and £760 depending on volume, access and destination. The common 1930s semis with garages and lofts are quoted accurately once we have seen the layout. We aim to send a free itemised quote within 30 minutes." },
  { q: "Do you cover the Quinton postcode, B32?", a: "Yes, we cover all of B32, including Quinton Road, the Ridgacre estate, Worlds End Lane, Howley Grange Road and the streets along Hagley Road West towards the Halesowen border. There is no travel surcharge within B32." },
  { q: "Is parking and access easy on the Hagley Road West?", a: "The Hagley Road West is a busy main route, so for homes fronting it we usually load early or use a side road and walk the path. On the residential estates off Ridgacre Road, access is straightforward and the van can normally sit right outside." },
  { q: "Do you offer same-day removals in Quinton?", a: "Yes, subject to availability. Same-day man and van jobs in B32 are common, so call before 10 am and we will try to fit you in. Full-house moves need at least 48 hours so we can allocate the right van and crew." },
  { q: "Can you handle a 1930s semi with a garage and loft in Quinton?", a: "Easily. Quinton has a lot of inter-war semis where the garage and loft hold years of belongings. Our crews bring straps, blankets and the right vehicle size to clear the whole property efficiently, including awkward loft hatches and garden equipment." },
];

const LocalArea = (
  <>
    <p>
      Quinton lies on the western edge of Birmingham, around 5 miles from the city centre and
      pressed up against the Halesowen and Black Country boundary. The B32 postcode is defined by
      the Hagley Road West running through its heart and the M5 junction at its western end,
      making it a popular base for commuters who want quick links in every direction.
    </p>
    <p>
      Housing in Quinton is largely suburban and inter-war, with neat 1930s bay-fronted semis
      lining roads such as Quinton Road and Worlds End Lane, alongside the larger detached homes
      of the Ridgacre estate and pockets of maisonettes near the local shops. These are settled
      family homes, often with garages, gardens and lofts that hold plenty, so our full-crew
      moves and larger vans see regular use here.
    </p>
    <p>
      Residents frequently move between Quinton and neighbouring{" "}
      <Link href="/areas/harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link> or
      cross the boundary towards{" "}
      <Link href="/areas/bearwood" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Bearwood</Link>. Whether
      you are upsizing to a Ridgacre detached or moving closer to the Hagley Road West shops, the
      removal company Quinton families rely on will make the day stress-free.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides reliable, fully insured house and office removals across Quinton B32. From 1930s semis on Quinton Road to homes near the Hagley Road West and the M5, our local crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
