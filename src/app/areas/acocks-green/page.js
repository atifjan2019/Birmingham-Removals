import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Acocks Green";
const SLUG = "acocks-green";
const POSTCODES = "B27";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Fixed-price removals across Acocks Green B27. House, office and man & van moves from the Village to the Westley Road terraces. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals acocks green",
    "house removals acocks green",
    "man and van acocks green",
    "B27 removals",
    "office removals acocks green",
    "removal company acocks green",
    "removals near acocks green village",
  ],
});

const services = [
  { icon: Home, name: "House Removals Acocks Green", desc: "Full house moves across B27, from the Edwardian terraces off Westley Road to the bay-fronted semis on Sherbourne Road. We handle the long entry halls and steep stairs these homes are known for." },
  { icon: Building2, name: "Flat Removals Acocks Green", desc: "Moves to and from the converted houses and purpose-built blocks around the Village and Yardley Road. Lift access, entry codes and resident-bay parking arranged ahead of the day." },
  { icon: Truck, name: "Man and Van Acocks Green", desc: "Light-load and single-room runs across Acocks Green, popular with the many shared houses and 1-bed flats near the railway station. Hourly-rated and quick to book." },
  { icon: Building2, name: "Office Removals Acocks Green", desc: "Out-of-hours commercial moves for the shops and offices along the Warwick Road and the units near Tyseley, with planning that keeps your business running." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing with sturdy double-walled boxes and proper wrapping. The original fireplaces and bay windows in B27's older terraces get blanket protection as standard." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal for chain gaps and downsizing, a common need around Acocks Green's busy first-time-buyer market. Secure units with flexible access." },
];

const whyUs = [
  { title: "Acocks Green Street Knowledge", desc: "We know the one-way system around the Village, the loading limits along the Warwick Road and which side streets off Westley Road let a Luton van pull in cleanly." },
  { title: "Fully Insured as Standard", desc: "Every B27 move carries £10m goods-in-transit and £5m public liability cover, giving you full peace of mind whether it is a terrace, semi or flat." },
  { title: "Fixed, Transparent Pricing", desc: "Your written quote is the final figure. No stair surcharges for the upstairs flats and no weekend premiums tacked on later." },
  { title: "Rated by Acocks Green Movers", desc: "A 4.9-star Google rating built on hundreds of local moves through B27 and east Birmingham. Neighbours pass our name on, which is the recommendation we value most." },
];

const faqs = [
  { q: "How much does a removal in Acocks Green cost?", a: "A typical 2 to 3 bedroom move in Acocks Green sits between £330 and £760, depending on volume, access and destination. Terraces off Westley Road with long halls and steep stairs are quoted accurately once we have noted the layout. Free, itemised quotes usually arrive within 30 minutes." },
  { q: "Do you cover the Acocks Green postcode, B27?", a: "Yes, we cover the whole of B27, including the Village, the Westley Road and Sherbourne Road terraces, Fox Hollies and the Warwick Road corridor down towards Tyseley. There is no travel surcharge inside B27." },
  { q: "Can you handle parking on the Warwick Road through the Village?", a: "Yes. The Warwick Road through Acocks Green Village is busy with loading restrictions, so we typically load early morning or apply for a short council bay suspension. On the quieter side streets we set down close to the door wherever possible." },
  { q: "Do you offer same-day removals in Acocks Green?", a: "Often, yes, subject to van availability. Same-day man and van jobs around B27 are common, so call before 10am to confirm a slot. Larger full-house moves need roughly 48 hours so the right crew and van can be booked." },
  { q: "Are you experienced with the Edwardian terraces in Acocks Green?", a: "Very much so. The Edwardian terraces off Westley Road and Yardley Road have narrow hallways, tiled paths and tight stair turns. Our crews carry straps, stair-slides and full blanket-wrap to protect both your furniture and the original tiling and woodwork." },
];

const LocalArea = (
  <>
    <p>
      Acocks Green lies around 4 miles south-east of Birmingham city centre, sitting between
      Yardley to the north and Hall Green to the south, with Tyseley and its industrial estate on
      the western edge. The B27 postcode centres on the busy Village, where the Warwick Road,
      Yardley Road and Westley Road meet, and where the railway station gives a fast link into Moor
      Street and Snow Hill.
    </p>
    <p>
      Housing in Acocks Green is dominated by Edwardian and inter-war stock, rows of bay-fronted
      terraces and semis off Westley Road, Sherbourne Road and the Fox Hollies estate, with
      pockets of purpose-built flats near the Village. The strong rental and first-time-buyer
      market keeps our man and van Acocks Green service busy, while the larger family semis suit a
      full-crew move.
    </p>
    <p>
      Local moves regularly run between Acocks Green and neighbouring{" "}
      <Link href="/areas/hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>,{" "}
      <Link href="/areas/moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link> and{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>. Whether
      you&apos;re moving into your first terrace near the station or upsizing to a Fox Hollies semi,
      the removal company Acocks Green residents recommend will keep the day straightforward.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers fully insured house and office removals across Acocks Green B27. From the Edwardian terraces off Westley Road to the flats around the Village, our local crew handles every lift and load with care and a fixed price."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
