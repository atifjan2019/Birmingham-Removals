import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "Moseley";
const SLUG = "moseley";
const POSTCODES = "B13";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Fixed-Price Movers`,
  description: `Professional removals in ${NAME}. Fixed-price quotes, DBS-checked crew, full insurance. House, office and man & van moves. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
});

const services = [
  { icon: Home, name: "House Removals Moseley", desc: "Full house moves throughout Moseley, from Victorian terraces off St Mary's Row to family semis on Wake Green Road. Careful planning, fixed pricing and on-time delivery." },
  { icon: Building2, name: "Flat Removals Moseley", desc: "Specialist flat removals from Moseley's converted Victorian villas and purpose-built blocks. We liaise on parking, lift and entry access well before move day." },
  { icon: Truck, name: "Man and Van Moseley", desc: "Flexible man and van in Moseley for single-room moves, studio relocations and light loads, popular for the frequent tenant changeovers throughout B13." },
  { icon: Building2, name: "Office Removals Moseley", desc: "Discreet out-of-hours office and studio removals for Moseley's creative businesses, therapists and independent traders on St Mary's Row and beyond." },
  { icon: Package, name: "Packing Service", desc: "Full or part-packing using specialist materials, particularly valuable in Moseley where period homes are filled with art, vinyl, vintage furniture and fragile collectibles." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Flexible secure storage alongside your Moseley removal, useful during the area's active buy-to-let and rental market where gaps between tenancies are common." },
];

const whyUs = [
  { title: "Deep Local Knowledge of Moseley", desc: "We know the on-street permit zones around Moseley Village, the tight access on Salisbury Road and the best loading spots on the Alcester Road corridor, and we plan every move around them." },
  { title: "Fully Insured, Every Job", desc: "£10m goods-in-transit cover on every Moseley removal, protecting the vintage furniture, art and musical instruments that are the norm in B13 homes." },
  { title: "Transparent, Fixed Quotes", desc: "No surprise charges for converted-flat access, shared driveways or narrow Victorian doorways. Your quote is your final price." },
  { title: "5-Star Rated, Locally Trusted", desc: "Hundreds of five-star Google reviews, many from Moseley residents who found us through a neighbour's recommendation. Word-of-mouth in B13 is our biggest source of bookings." },
];

const faqs = [
  { q: "How much does a removal in Moseley cost?", a: "A 2–3 bedroom house move in Moseley typically costs £350–£850, depending on property access, volume and destination. Victorian terraces with long paths and original staircases are priced once we know the layout. Contact us for a free, detailed quote returned within 30 minutes." },
  { q: "Do you cover the Moseley postcode B13?", a: "Yes, we cover all of B13 including Moseley Village, the Wake Green Road corridor, Oxford Road, Salisbury Road, Billesley Lane and all streets between the Alcester Road (A435) and the Moseley Road (B4217). No travel surcharge applies to B13." },
  { q: "Can you handle parking on Moseley's permit streets?", a: "Yes. Many streets in Moseley Village operate residents' permit zones, particularly around St Mary's Row and the village centre. We apply for Birmingham City Council parking suspensions where needed and plan loading to avoid school-run and market-day congestion." },
  { q: "Do you offer same-day removals in Moseley?", a: "Yes, subject to availability. Call us before 10 am for the best chance of a same-day man and van slot in Moseley. Full house moves require at least 48 hours to plan properly." },
  { q: "Can you move a vinyl collection and vintage furniture from a Moseley terrace?", a: "Absolutely, and we do it often. Moseley homes are packed with records, antique furniture and art. We use specialist vinyl crates, picture-frame boxes and furniture blankets on every job. Fragile and high-value items are documented and wrapped individually before loading." },
];

const LocalArea = (
  <>
    <p>
      Moseley sits in the B13 postcode approximately 3 miles south of Birmingham city centre,
      sandwiched between Balsall Heath to the north, Kings Heath to the south and the Edgbaston
      boundary to the west. Its village centre, centred on St Mary&apos;s Row and the Fighting
      Cocks junction on the Alcester Road (A435), is one of Birmingham&apos;s most recognisable
      independent high streets. Moseley Park sits behind the Victorian terraces, while Moseley
      Bog, the ancient woodland where J.R.R. Tolkien played as a child, lies to the south-east.
    </p>
    <p>
      The housing stock is overwhelmingly Victorian and Edwardian: red-brick terraces on Oxford
      Road and Salisbury Road, wide bay-fronted semis off Wake Green Road and Billesley Lane,
      and converted Victorian villas split into flats throughout the village. These properties
      present specific challenges: shared driveways with narrow vehicle access, shared hallways
      in flat conversions, and staircases that turn sharply on the landing. Our man and van
      Moseley service is purpose-built for these situations.
    </p>
    <p>
      Many of our Moseley customers are professionals and creatives with substantial collections
      of books, vinyl, vintage furniture and artworks. We carry picture-frame boxes, vinyl
      record crates, furniture blankets and mirror packs on every job. High-value items are
      photographed and logged before loading.
    </p>
    <p>
      Moseley borders several areas we cover extensively. Families regularly move between Moseley
      and{" "}
      <Link href="/areas/kings-heath" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Kings Heath</Link>,{" "}
      <Link href="/areas/edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link> and{" "}
      <Link href="/areas/hall-green" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Hall Green</Link>.
      Students moving out of{" "}
      <Link href="/areas/selly-oak" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Selly Oak</Link>{" "}
      often settle here, and that route is one we handle weekly.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers professional, fully insured house, flat and office removals across Moseley B13. From Victorian terraces off the Alcester Road to family semis on Wake Green Road, our local crew handles every move with care."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
