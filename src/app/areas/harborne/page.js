import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Harborne";
const SLUG = "harborne";
const POSTCODES = "B17";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals — Fixed Prices`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Harborne", desc: "Full house moves across Harborne — from period semis off War Lane to family homes near Queen's Park. Every job is planned, packed and delivered without stress." },
  { icon: Building2, name: "Flat Removals Harborne", desc: "Specialist flat removals in Harborne's converted Victorian houses and modern apartment developments. Parking, lift access and entry codes arranged well in advance." },
  { icon: Truck, name: "Man and Van Harborne", desc: "Flexible man and van service in Harborne for single-room moves, student relocations and light loads — ideal for the many 1- and 2-bed properties throughout B17." },
  { icon: Building2, name: "Office Removals Harborne", desc: "Out-of-hours office removals for Harborne's clinics, consultancies and High Street businesses — zero disruption to your working day." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing service using double-walled boxes and specialist wrapping. We protect china, artwork and antiques — common in Harborne's older period homes." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removal in Harborne — perfect for chain breaks or bridging gaps between completion dates in this busy family-move market." },
];

const whyUs = [
  { title: "Harborne Street-Level Knowledge", desc: "We know the permit zones on Harborne High Street, the narrow access on Metchley Lane and which side roads allow double-parking for loading without causing issues." },
  { title: "Fully Insured as Standard", desc: "£10m goods-in-transit and £5m public liability cover on every Harborne job — protecting the period furniture and family heirlooms so common in B17 homes." },
  { title: "Fixed, Transparent Pricing", desc: "No weekend premiums, no stair surcharges, no surprises. Your written quote is your final price — always." },
  { title: "5-Star Rated in Harborne", desc: "We've built a 4.9-star Google rating on the back of hundreds of Harborne and Birmingham-wide reviews. Families recommend us to their neighbours — that's our best advert." },
];

const faqs = [
  { q: "How much does a removal in Harborne cost?", a: "A typical Harborne 2–3 bedroom house move costs between £350–£800 depending on volume, access and destination. Victorian semis with original staircases and long paths are quoted accurately once we've noted the property layout. Contact us for a free, itemised quote — usually returned within 30 minutes." },
  { q: "Do you cover the Harborne postcode — B17?", a: "Yes. We cover all of B17 including Harborne village, the streets around Queen's Park, the War Lane corridor and the Lordswood Road area bordering Quinton. There is no travel surcharge for the B17 postcode." },
  { q: "Can you help with parking restrictions on Harborne High Street?", a: "Absolutely. Harborne High Street operates permit and double-yellow restrictions throughout the day. We plan loading either early morning or apply for a Birmingham City Council bay suspension where needed, so your removal doesn't create a headache for neighbours or the crew." },
  { q: "Do you offer same-day removals in Harborne?", a: "Yes, subject to van availability. Same-day man and van jobs in Harborne are common — call before 10 am and we'll confirm a slot. Larger full-house moves require at least 48 hours' notice so we can allocate the right van size and crew." },
  { q: "Can you handle moves from a Victorian semi in Harborne?", a: "Yes — Victorian semis in Harborne typically have tiled paths, bay-windowed front rooms and tight staircase bends. Our crews carry furniture straps, stair-slides and full blanket-wrap as standard, protecting both your furniture and the original woodwork and plasterwork throughout." },
];

const LocalArea = (
  <>
    <p>
      Harborne sits around 3 miles south-west of Birmingham city centre, tucked between
      Edgbaston to the east and Quinton to the west. The B17 postcode covers a tight-knit
      residential village that has become one of the most desirable places to live in Birmingham —
      thanks to its independent High Street, Queen&apos;s Park, well-regarded schools and strong
      sense of community.
    </p>
    <p>
      The housing in Harborne is overwhelmingly Victorian and Edwardian — bay-fronted semis and
      detached homes line the streets off War Lane, Lordswood Road and Metchley Lane. Many
      properties have original tiled paths, steep front steps and original banisters that
      require care. Our man and van Harborne service is popular for the many 1- and 2-bed
      conversions dotted through the area, while our full-crew service handles 4-bedroom family
      homes with ease.
    </p>
    <p>
      Families frequently move between Harborne and{" "}
      <Link href="/areas/edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link>,{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link> and{" "}
      <Link href="/areas/moseley" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Moseley</Link>. Whether
      you&apos;re upsizing to a detached near Queen&apos;s Park or downsizing to a village-centre
      apartment, our removal company Harborne residents have trusted for over a decade will make
      it seamless.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers professional, fully insured house and office removals across Harborne B17. From Victorian semis off War Lane to modern apartments near Harborne High Street, our experienced local crew handles every lift, wrap and load with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
