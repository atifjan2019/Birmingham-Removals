import Link from "next/link";
import { Home, Building2, Truck, Package, Warehouse } from "lucide-react";
import AreaTemplate from "@/components/AreaTemplate";
import { makeMeta } from "@/lib/metadata";

const NAME = "City Centre";
const SLUG = "city-centre";
const POSTCODES = "B1, B2, B3, B4, B5";

export const metadata = makeMeta({
  title: `Removals ${NAME} | Birmingham Removals - Fixed Prices`,
  description: `Apartment removals across Birmingham City Centre B1 to B5, from the Jewellery Quarter to Digbeth. We handle lifts, loading bays and permits. Free quote in 30 minutes.`,
  path: `/areas/${SLUG}`,
  keywords: [
    "removals city centre birmingham",
    "apartment removals birmingham",
    "man and van city centre",
    "B1 removals",
    "office removals city centre",
    "removal company city centre",
    "jewellery quarter removals",
    "digbeth removals",
  ],
});

const services = [
  { icon: Building2, name: "Apartment Removals City Centre", desc: "Specialist apartment moves throughout B1 to B5, from the high-rise blocks around Brindleyplace to the converted lofts of the Jewellery Quarter. We book service lifts and loading bays in advance to keep things moving." },
  { icon: Truck, name: "Man and Van City Centre", desc: "Quick, flexible man and van runs for studio and one-bed flats around Colmore Row and Snow Hill, perfect for professionals relocating with light loads at short notice." },
  { icon: Home, name: "Studio & 1-Bed Moves", desc: "Plenty of city-centre flats are studios and one-beds with restricted lift times. We work to the building&apos;s booking slots and protect communal corridors and lift interiors as standard." },
  { icon: Building2, name: "Office Removals City Centre", desc: "Out-of-hours commercial moves for the offices along Colmore Row and Snow Hill, planned around building security, loading docks and goods lifts to avoid disrupting your business." },
  { icon: Package, name: "Packing Service", desc: "Full or part packing for apartments where space is tight, using flat-pack-friendly boxes and proper wrapping for screens, glassware and designer furniture common in city living." },
  { icon: Warehouse, name: "Storage & Removals", desc: "Combined storage and removals for B1 to B5, ideal for the gap between leases or when downsizing into a smaller central apartment before the next place is ready." },
];

const whyUs = [
  { title: "Loading Bay & Lift Planning", desc: "City-centre moves live or die by access. We confirm service-lift booking slots, loading-bay windows and dock heights at developments like Brindleyplace and The Cube before move day, so the crew is never left waiting." },
  { title: "Parking Permits & Restrictions", desc: "We know the controlled parking zones around Colmore Row, the bus-gate timings on Snow Hill and how to arrange a Birmingham City Council bay suspension where a loading bay is not available." },
  { title: "Fully Insured as Standard", desc: "£10m goods-in-transit and £5m public liability cover on every job, with extra care taken to protect communal lobbies, lift interiors and shared corridors in managed buildings." },
  { title: "Used to High-Rise Living", desc: "From the towers of Brindleyplace to the warehouse conversions of Digbeth, we move flats above ground level every week and know how to handle long carries, narrow corridors and tight lift dimensions." },
];

const faqs = [
  { q: "How much does a removal in Birmingham City Centre cost?", a: "A typical studio or one-bed apartment move in the city centre costs between £280 and £600, depending on floor level, lift access and loading distance. Larger two and three-bed apartments are quoted once we know the building. We aim to send a free itemised quote within 30 minutes." },
  { q: "Which city-centre postcodes do you cover?", a: "We cover B1, B2, B3, B4 and B5, taking in the Jewellery Quarter, Brindleyplace, Colmore Row, Snow Hill, Digbeth and the streets around the Bullring. There is no travel surcharge within the central postcodes." },
  { q: "Can you deal with loading bays and parking permits on Colmore Row?", a: "Yes. Colmore Row and the surrounding streets sit in controlled parking zones with strict loading rules, so we either book a building loading bay or arrange a Birmingham City Council bay suspension in advance, so the van has a legal, close space on the day." },
  { q: "Do you offer same-day removals in the City Centre?", a: "Yes, subject to availability and the building&apos;s lift booking rules. Same-day man and van jobs for studios and one-beds are common, so call before 10 am. Larger apartment moves often depend on a service-lift slot, which we book ahead with the building manager." },
  { q: "How do you handle high-rise apartments with lift restrictions?", a: "Most managed blocks restrict moving hours and require service-lift bookings. We confirm the slot with the concierge or building management, pad the lift, and plan the order of loading so we make the most of the booked time without holding up other residents." },
];

const LocalArea = (
  <>
    <p>
      Birmingham city centre packs an enormous amount into the B1 to B5 postcodes, from the
      canalside bars of Brindleyplace and the business towers of Colmore Row to the historic
      Jewellery Quarter and the warehouses and music venues of Digbeth. It is a fast-growing
      place to live, with thousands of new apartments built over the last two decades.
    </p>
    <p>
      Almost all moves here are apartments rather than houses, which brings its own challenges:
      service lifts that must be booked, loading bays with tight time windows, controlled parking
      zones and bus gates around Snow Hill and Colmore Row. We plan every central move around
      these realities, confirming lift slots and permits before the van leaves the yard so the
      day runs to schedule.
    </p>
    <p>
      Many of our city-centre customers are moving in from leafier suburbs such as{" "}
      <Link href="/areas/edgbaston" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Edgbaston</Link> or
      out towards areas like{" "}
      <Link href="/areas/handsworth" className="text-[#F97316] underline underline-offset-2 hover:text-[#EA580C]">Handsworth</Link> as
      their needs change. Whether you are moving into a Jewellery Quarter loft or a Digbeth
      conversion, the removal company City Centre residents recommend will handle the lifts,
      permits and tight corners for you.
    </p>
  </>
);

export default function Page() {
  return (
    <AreaTemplate
      slug={SLUG}
      name={NAME}
      postcodes={POSTCODES}
      heroIntro="Birmingham Removals delivers fully insured apartment and office removals across the City Centre, B1 to B5. From Jewellery Quarter lofts to Digbeth conversions, our crew handles service lifts, loading bays and parking permits every week."
      services={services}
      localArea={LocalArea}
      whyUs={whyUs}
      faqs={faqs}
    />
  );
}
