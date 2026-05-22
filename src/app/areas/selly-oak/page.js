import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Selly Oak";
const SLUG = "selly-oak";
const POSTCODES = "B29";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "Student & House Removals Selly Oak", desc: "Fast, affordable end-of-term and September-rush student moves throughout Selly Oak and Bournbrook. Last-minute bookings welcome, and we know the student calendar." },
  { icon: Truck, name: "Man and Van Selly Oak", desc: "Single-room, single-floor and light-load moves across Selly Oak. Our man and van service is ideal for the frequent short-hop relocations within B29 and into B15, B17 or B30." },
  { icon: Building2, name: "HMO & Shared House Moves", desc: "Specialist moves for shared houses and HMOs throughout Selly Oak, with individual rooms quoted separately, co-ordinated on moving day so each tenant's belongings stay separate." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing in Selly Oak homes using double-walled boxes and protective wrapping. Particularly useful for students with fragile equipment, monitors and musical instruments." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Short-term secure storage combined with your Selly Oak removal, ideal for bridging the gap between tenancy end dates and new property start dates." },
  { icon: Building2, name: "Office Removals Selly Oak", desc: "Reliable office moves for Selly Oak businesses near the University corridor. Out-of-hours scheduling and full insurance on every job." },
];

const whyUs = [
  { title: "Selly Oak Student Move Specialists", desc: "We handle dozens of student moves every July and September across Selly Oak and Bournbrook. We know the drill: parking on Bristol Road, tight terraced entries and last-minute bookings." },
  { title: "Fully Insured on Every Job", desc: "£10m goods-in-transit and £5m public liability on every removal in Selly Oak, whether it's a single room or a 6-bed shared house clearance." },
  { title: "Honest, Upfront Pricing", desc: "No hidden fees for awkward terraced access, bike storage or narrow staircases. Your written quote is your final price, always." },
  { title: "5-Star Rated Removal Company", desc: "Hundreds of verified Google reviews from across Birmingham, including many Selly Oak students and families who book us year after year." },
];

const faqs = [
  { q: "How much does a student removal in Selly Oak cost?", a: "A single-room student move within Selly Oak or from B29 to another Birmingham postcode typically costs £100–£250 depending on volume and distance. A full 5–6 bedroom shared house clear-out with multiple drop-off addresses runs £400–£700. Contact us for a tailored quote. We price by load, not per hour." },
  { q: "Do you cover the Selly Oak postcode B29?", a: "Yes. We operate daily across all of B29: Selly Oak village, Bournbrook, the streets off Bristol Road (A38), Oak Tree Lane and the Harborne Lane corridors. There is no travel surcharge for B29 postcodes." },
  { q: "Can you handle parking restrictions on Bristol Road in Selly Oak?", a: "Bristol Road (A38) has bus lanes, double yellows and peak-hour restrictions that catch out inexperienced crews. We plan loading times to avoid peak hours and, where needed, apply for Birmingham City Council bay suspensions in advance." },
  { q: "Do you offer same-day or last-minute removals in Selly Oak?", a: "Yes, last-minute bookings are a Selly Oak speciality for us. Call before midday and we'll do our best to get a van to you the same day, particularly for 1–3 room loads. Larger moves need 48 hours' notice so we can allocate the right crew and van size." },
  { q: "Can you move from a Victorian terrace with no parking outside?", a: "Absolutely. Narrow-frontage Victorian terraces with no direct parking are the norm in Selly Oak. We carry sack trucks, furniture straps and stair-slides on every job and are experienced at quick loading from double-yellow areas, keeping disruption to neighbours minimal." },
];

const LocalArea = (
  <>
    <p>
      Selly Oak occupies the B29 postcode roughly 3 miles south-west of Birmingham city centre,
      straddling the Bristol Road (A38). The area is best known for its large student population,
      driven by its proximity to the University of Birmingham&apos;s main Edgbaston campus and
      the Bournbrook student quarter. But Selly Oak is far more than a student town. The streets
      around Selly Oak Park and Oak Tree Lane are home to long-established families and
      professionals.
    </p>
    <p>
      The dominant housing type is the Victorian and Edwardian terrace: bay-fronted houses with
      narrow front paths, steep internal staircases and minimal kerbside parking. Many have been
      converted into HMOs, creating constant movement of residents, particularly in June, July
      and September when tenancies end and begin. Our man and van Selly Oak service is purpose-built
      for this market: quick, affordable and familiar with multi-room moves where each tenant&apos;s
      belongings need to stay separate.
    </p>
    <p>
      Selly Oak is well-connected to all the neighbouring areas we cover. Families and students
      frequently move between Selly Oak and{" "}
      <Link href="/areas/harborne" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Harborne</Link>,{" "}
      <Link href="/areas/edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link>,{" "}
      <Link href="/areas/moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>,{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link> and{" "}
      <Link href="/areas/northfield" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Northfield</Link>.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals provides fast, fully insured house, student and man & van removals across Selly Oak B29. From Bournbrook HMOs to family homes off Oak Tree Lane, our local crew handles every move."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
