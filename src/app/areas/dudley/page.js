import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Dudley";
const SLUG = "dudley";
const POSTCODES = "DY1, DY2, DY3";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Black Country removals across Dudley DY1 to DY3, covering Brierley Hill, Netherton and Sedgley. Affordable fixed prices, same-day quotes and a free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals dudley",
    "house removals dudley",
    "man and van dudley",
    "DY1 removals",
    "DY2 removals",
    "office removals dudley",
    "removal company dudley",
    "brierley hill removals",
    "netherton removals",
  ],
});

const services = [
  { icon: Home, name: "House Removals Dudley", desc: "Full house moves throughout DY1, DY2 and DY3, from the tight Victorian terraced streets of Netherton and Castle Hill to the larger semis climbing the ridge at Sedgley. We pack, lift and shift the whole property, handling steep front steps, narrow halls and awkward staircase bends so you never have to lift a box yourself." },
  { icon: Truck, name: "Man and Van Dudley", desc: "Affordable man and van runs right across the Black Country, ideal for single rooms, flat clearances, student moves and quick local relocations around Brierley Hill, Merry Hill and central Dudley. Perfect when you only need a van, a strong crew and an hour or two rather than a full-day removal." },
  { icon: Home, name: "Family Home Removals", desc: "A great many Dudley moves are 3 and 4-bed family homes off the Wolverhampton Road, around Russells Hall and out towards Sedgley, often with garages, sheds and gardens to clear as well. Our larger Luton vans carry the volume in fewer trips, keeping the job efficient and the price down." },
  { icon: Building2, name: "Office Removals Dudley", desc: "Commercial, retail and office moves for businesses around Dudley town centre, the Waterfront at Brierley Hill and the units near Merry Hill. We arrange relocations out of hours and at weekends to keep your trading downtime and disruption to an absolute minimum." },
  { icon: Package, name: "Packing Service", desc: "Full or part packing using strong double-walled boxes and proper wrapping for glassware, mirrors, white goods and the heirlooms common in older Black Country homes. We take the pressure off busy households so the only thing left to do on move day is lock up." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Secure storage paired with your Dudley move, useful for chain delays, downsizing or while a DY3 property in Sedgley or a terrace in Netherton is being decorated before you settle in. Store for a few days or several months, with your move slotted in around it." },
];

const whyUs = [
  { title: "Black Country Route Knowledge", desc: "We know the steep hills around Sedgley and Castle Hill, the busy A461 through the town centre, the A4123 Wolverhampton Road, the access into the Waterfront at Brierley Hill and the tighter terraced streets of Netherton where parking takes proper planning. Local knowledge means fewer delays on the day." },
  { title: "Affordable Fixed Pricing", desc: "Dudley is a value-focused part of the Black Country and we price accordingly. No weekend premiums, no stair charges for the hilltop streets and no hidden extras, just a clear written quote that holds from first contact to final box." },
  { title: "Fully Insured as Standard", desc: "Every DY1 to DY3 job carries £10m goods-in-transit and £5m public liability cover, whether you are moving a one-bed flat near Merry Hill or a large family home out at Russells Hall. Your belongings are protected from the moment they leave the house." },
  { title: "Same-Day Quotes", desc: "Need to move fast? We turn around free quotes the same day and can often confirm a van quickly for local Black Country moves around Dudley town, Brierley Hill, Netherton and Sedgley. Many quotes are itemised and back with you inside 30 minutes." },
];

const faqs = [
  { q: "How much does a removal in Dudley cost?", a: "A typical 2 to 3 bedroom Dudley move costs between £300 and £720 depending on volume, access and where you are heading. Smaller flat moves and man and van jobs near Merry Hill or Brierley Hill can come in lower, while larger family homes around Russells Hall or Sedgley are quoted accurately once we have noted the layout and any steep steps. Free itemised quotes are usually returned within 30 minutes." },
  { q: "Do you cover the Dudley postcodes, DY1, DY2 and DY3?", a: "Yes. We cover all of DY1, DY2 and DY3, taking in Dudley town centre, Castle Hill, Brierley Hill, Netherton, Sedgley and Russells Hall. We also reach the wider Black Country and beyond, with no travel surcharge anywhere within these postcodes." },
  { q: "Can you access Merry Hill and the Brierley Hill Waterfront for loading?", a: "Yes. We move households and businesses around the Merry Hill shopping centre and the Waterfront at Brierley Hill regularly. There is usually generous parking and loading space near the Waterfront offices and apartments, and for the residential streets behind Merry Hill we confirm the best van position and any time restrictions before the day so loading runs smoothly." },
  { q: "Is parking and access difficult on the steep Dudley streets?", a: "Some Sedgley, Castle Hill and Netherton streets are steep, narrow and terraced, so we plan the van position carefully and use stair-slides, furniture straps and extra crew for tricky inclines and tight halls. Where a terrace has no off-street parking we position the van as close as we safely can and shuttle from there." },
  { q: "How far is Dudley from your Birmingham base?", a: "Dudley sits around 10 miles north-west of Birmingham city centre, a straightforward run out along the A456 and A4123. It is comfortably within our core working area, so there is no long-distance surcharge and we can often reach you the same day for smaller jobs." },
  { q: "Do you offer same-day removals in Dudley?", a: "Yes, subject to availability. Same-day man and van jobs around Brierley Hill, Netherton and central Dudley are common, so call before 10 am and we will try to fit you in. Larger full-house moves need at least 48 hours so we can send the right size of van and the right crew." },
  { q: "Can you move us from Dudley into Birmingham or further across the Black Country?", a: "Of course. We handle plenty of moves between Dudley and Birmingham as well as across to Wolverhampton and West Bromwich. Longer moves are quoted by the job with a fixed price, so there are no surprises on mileage or time once we have agreed it in writing." },
];

const LocalArea = (
  <>
    <p>
      Dudley is the historic heart of the Black Country, sitting around 10 miles north-west of
      Birmingham city centre and reached easily along the A461 and the A4123 Wolverhampton Road.
      The town is dominated by Dudley Castle and Dudley Zoo on Castle Hill, with the National
      Trust&apos;s Dudley Canal and the Black Country Living Museum close by, all reminders of an
      area that helped power the Industrial Revolution. The DY1, DY2 and DY3 postcodes spread out
      from the town centre across the ridge at Sedgley and down towards Netherton, taking in some
      of the most characterful streets in the West Midlands.
    </p>
    <p>
      Just to the south, Brierley Hill and the Merry Hill shopping centre form one of the largest
      retail and leisure destinations in the region, with the Waterfront development bringing
      offices, apartments and restaurants to the canalside. We move households and businesses
      around Merry Hill and the Waterfront regularly, where parking and loading tend to be
      straightforward, as well as in the older residential streets behind them where access needs
      a little more planning. Netherton, with its canal heritage and tight Victorian terraces,
      sits between the two and keeps our man and van crews busy with flat clearances and smaller
      local moves.
    </p>
    <p>
      The housing across Dudley is a true Black Country mix. Solid Victorian terraces line the
      streets of Netherton, Castle Hill and the town centre, while inter-war and post-war semis
      climb the hills around Sedgley, often with steep front steps and long paths that reward an
      experienced crew. Out at Russells Hall and along the Wolverhampton Road you will find larger
      family estates and a steady supply of newer-build homes with garages, gardens and lofts to
      clear. That variety is exactly why our full-crew removals and larger Luton vans get so much
      use here, alongside the lighter man and van service for flats and quick relocations.
    </p>
    <p>
      Because the Black Country towns sit so close together, plenty of households move between
      Dudley and neighbouring{" "}
      <Link href="/areas/west-bromwich" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">West Bromwich</Link>, or
      head north towards{" "}
      <Link href="/areas/wolverhampton" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Wolverhampton</Link> along
      the A4123. We also cover nearby{" "}
      <Link href="/areas/stourbridge" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Stourbridge</Link>,{" "}
      <Link href="/areas/kingswinford" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kingswinford</Link>,{" "}
      <Link href="/areas/sedgley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Sedgley</Link> and{" "}
      <Link href="/areas/brierley-hill" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Brierley Hill</Link>. We handle these short cross-town moves day in and day out, as well as longer
      relocations into Birmingham and beyond, all on the same clear fixed pricing.
    </p>
    <p>
      Whether you are moving up to a Sedgley semi on the ridge, relocating a family home near
      Russells Hall, clearing a Netherton terrace or shifting an office at the Brierley Hill
      Waterfront, the removal company Dudley residents trust will keep the move affordable, fully
      insured and on time. Our crews know the steep streets, the busy A461 and the quieter side
      roads, so your move day runs smoothly from the first box to the last.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides affordable, fully insured house and office removals across Dudley, DY1 to DY3, taking in Brierley Hill, Netherton, Sedgley and the Merry Hill area. From steep terraced streets on Castle Hill to hilltop semis in Sedgley, our experienced Black Country crew handles every lift, wrap and load with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
