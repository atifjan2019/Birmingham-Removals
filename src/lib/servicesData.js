import {
  Home,
  Building2,
  Truck,
  Package,
  Warehouse,
  Piano,
} from "lucide-react";

const servicesData = [
  {
    slug: "house-removals",
    icon: Home,
    title: "House Removals",
    shortDesc:
      "Full house moves across Birmingham,from city-centre flats in the Jewellery Quarter to family homes in Sutton Coldfield. Zero stress, fully insured.",
    heroHeading: "House Removals in Birmingham",
    heroSubtext:
      "Moving home is a milestone, not a headache. Our Birmingham crews handle the packing, lifting, transport and reassembly so you can focus on settling in.",
    sections: [
      {
        heading: "Why Choose Us for Your House Move?",
        paragraphs: [
          "Birmingham Removals has helped thousands of families relocate across the West Midlands. Whether you're moving from a Victorian terrace in Moseley or a detached home in Edgbaston, our trained crew treats every box and piece of furniture like it's our own.",
          "We run a complete door-to-door service. The team arrives on time, protective-wraps everything, loads securely and carefully unloads at your new address,no item too large or awkward.",
          "Every house move includes comprehensive transit insurance, flexible scheduling including weekends and evenings, and a fixed, no-surprises price agreed up front.",
        ],
      },
      {
        heading: "What's Included in Every House Move",
        list: [
          "Free no-obligation quote within 30 minutes",
          "DBS-checked, trained removal team",
          "Protective wrapping for all furniture",
          "Transit insurance included as standard",
          "Weekend and evening availability",
          "Disassembly and reassembly of beds, wardrobes, desks",
          "Birmingham-wide local knowledge for faster routes",
        ],
      },
      {
        heading: "Areas We Cover",
        paragraphs: [
          "We cover the whole of Birmingham and the West Midlands,Edgbaston, Harborne, Moseley, Kings Heath, Selly Oak, Sutton Coldfield, Solihull, Erdington, Kings Norton, Handsworth, Bearwood, Great Barr, city-centre, Dudley, West Bromwich, Wolverhampton and Coventry. Moving across the street or across the country, we've got you.",
        ],
      },
    ],
    faqs: [
      { q: "How far in advance should I book?", a: "We recommend 1–2 weeks ahead, especially around end-of-month and end-of-tenancy weekends. Last-minute and same-day moves are often possible,just call." },
      { q: "Do you disassemble furniture?", a: "Yes,beds, wardrobes, desks and tables are taken apart and reassembled at no extra charge." },
      { q: "Is my move insured?", a: "Every move includes comprehensive Goods in Transit insurance. Additional cover is available for high-value items." },
      { q: "Can you handle tight access and stairs?", a: "Yes. Our crews handle narrow stairs, high-rise lifts and awkward doorways daily,no hidden surcharges." },
      { q: "What size van do you use?", a: "We operate Luton vans and 7.5t trucks. Larger homes get multiple vehicles so everything moves in a single trip." },
    ],
  },
  {
    slug: "office-removals",
    icon: Building2,
    title: "Office Removals",
    shortDesc:
      "Zero-downtime office moves across Birmingham. We work evenings and weekends so your business keeps running.",
    heroHeading: "Office Removals in Birmingham",
    heroSubtext:
      "Relocating your business? We plan fast, organised office moves that minimise downtime and keep your operations running smoothly across the Midlands.",
    sections: [
      {
        heading: "Professional Office Relocations",
        paragraphs: [
          "Every hour of downtime costs money. Our office-removal service is engineered for speed and zero disruption,shut down Friday, open Monday in your new space, fully set up.",
          "From IT equipment and server racks to desks, filing cabinets and boardroom furniture, we handle everything. Our crew is experienced with commercial environments and takes extra care with sensitive electronics and confidential documentation.",
          "Out-of-hours moves,evenings, weekends, bank holidays,come standard. No disruption to your day-to-day business.",
        ],
      },
      {
        heading: "Our Office Moving Process",
        list: [
          "Pre-move site survey and planning",
          "Dedicated move coordinator on your project",
          "IT equipment safely packed and transported",
          "Furniture disassembly and reassembly",
          "Colour-coded labelling for efficient unpacking",
          "Out-of-hours and weekend availability",
          "Full commercial insurance cover",
        ],
      },
    ],
    faqs: [
      { q: "Can you move outside normal business hours?", a: "Yes,evenings, weekends and bank holidays are standard for our commercial clients." },
      { q: "Do you handle IT equipment?", a: "Yes,our team is trained to safely pack and transport computers, servers, monitors, printers and networking kit." },
      { q: "How do you handle confidential documents?", a: "Sealed crates with tamper-evident seals. All staff are DBS-checked and trained in data handling." },
      { q: "Can you handle multi-floor offices?", a: "Yes. We coordinate with building management for lift access and use stair-climbers where needed." },
    ],
  },
  {
    slug: "man-and-van",
    icon: Truck,
    title: "Man & Van",
    shortDesc:
      "Quick moves and single items across Birmingham, Solihull and the Black Country. Same-day bookings available.",
    heroHeading: "Man and Van Service in Birmingham",
    heroSubtext:
      "Affordable, reliable, available at short notice. Perfect for student moves, single items and small relocations across the West Midlands.",
    sections: [
      {
        heading: "Fast and Flexible Man and Van Hire",
        paragraphs: [
          "Not every move needs a full crew. Our man-and-van service is the sweet spot for shifting a few items, moving between flats, or handling a quick student relocation.",
          "Our drivers are fully trained removers,not just delivery drivers. Every item is loaded, secured and transported with the same care as a full house move.",
          "Same-day availability covers Birmingham, Solihull, Sutton Coldfield, Dudley, West Bromwich and the wider West Midlands. Call and we can often be with you within a couple of hours.",
        ],
      },
      {
        heading: "Perfect For",
        list: [
          "Student moves across Selly Oak, Edgbaston and the Universities",
          "Single-item deliveries (sofas, beds, appliances)",
          "eBay, Gumtree and Facebook Marketplace pickups",
          "Small office and desk relocations",
          "Storage unit drop-offs and collections",
          "Furniture shop deliveries",
          "Same-day and next-day moves",
        ],
      },
    ],
    faqs: [
      { q: "Can I book same-day?", a: "Yes, subject to availability. Call as early as possible for the best chance." },
      { q: "How much does man and van cost?", a: "Competitive hourly rates starting from £35/hour. Free quote on your exact job in 30 minutes." },
      { q: "Will the driver help load and unload?", a: "Absolutely,our drivers are trained movers and will carry items up stairs." },
      { q: "What size is the van?", a: "Luton van with 1,500ft³ capacity,fits the contents of a typical 1–2 bed flat in one trip." },
    ],
  },
  {
    slug: "packing-service",
    icon: Package,
    title: "Packing Service",
    shortDesc:
      "Professional packing with premium materials. We wrap, box and protect so nothing gets damaged in transit.",
    heroHeading: "Professional Packing Service",
    heroSubtext:
      "Leave the packing to the experts. Premium materials, proven techniques, and your belongings arrive in perfect condition.",
    sections: [
      {
        heading: "Leave the Packing to the Professionals",
        paragraphs: [
          "Packing is the most time-consuming part of any move. Our packing service takes that job off your list completely.",
          "Our trained packers use double-walled boxes, acid-free tissue, bubble wrap and custom wardrobe cartons. Every item is individually wrapped to prevent transit damage.",
          "Full-home pack, partial pack, or fragile-only,it's entirely up to you.",
        ],
      },
      {
        heading: "What We Provide",
        list: [
          "Professional packing team",
          "All materials included in the price",
          "Specialist wrap for fragile and valuable items",
          "Custom wardrobe cartons for hanging clothes",
          "Room-labelled boxes for easy unpacking",
          "Unpacking service at your new home",
          "Eco-friendly recycling of all materials post-move",
        ],
      },
    ],
    faqs: [
      { q: "Do I need to provide boxes?", a: "No,all materials are included. We bring boxes, tape, bubble wrap, tissue and wardrobe cartons." },
      { q: "Can you pack fragile items like china?", a: "Yes,trained packers use double-layer wrap and custom dividers for glassware, china and art." },
      { q: "How long does packing take?", a: "A typical 3-bed home is fully packed in 4–6 hours by a two-person crew." },
      { q: "Can you just pack certain rooms?", a: "Yes,partial packing is popular for kitchens and fragile rooms only." },
    ],
  },
  {
    slug: "storage-solutions",
    icon: Warehouse,
    title: "Storage Solutions",
    shortDesc:
      "Secure, clean, climate-controlled storage near Birmingham city centre. Short or long-term, fully insured.",
    heroHeading: "Storage Solutions in Birmingham",
    heroSubtext:
      "Move-in date not lined up? Need to store belongings between homes? Our 24/7-monitored facility keeps everything safe for as long as you need.",
    sections: [
      {
        heading: "Secure and Flexible Storage",
        paragraphs: [
          "Sometimes moves don't line up perfectly. Our Birmingham storage facility bridges the gap,store for a week, a month or a year.",
          "Facilities are clean, dry, CCTV-monitored 24/7 and alarmed. Every unit has its own lock and only you hold the key.",
          "Flexible terms, no long contracts. We can even collect your items, store them and deliver to your new address when you're ready.",
        ],
      },
      {
        heading: "Storage Features",
        list: [
          "24/7 CCTV monitoring",
          "Clean, dry, climate-controlled units",
          "Individual unit locks, key access",
          "Short and long-term contracts",
          "Collection and delivery service",
          "Fully insured storage",
          "Unit sizes from 25 to 250 sq ft",
        ],
      },
    ],
    faqs: [
      { q: "How much does storage cost?", a: "From £25/week for a small unit. Contact us for a tailored quote." },
      { q: "Can you collect and deliver?", a: "Yes,we collect, store, and deliver to your new address whenever you're ready." },
      { q: "Is the storage insured?", a: "Yes,insurance is included. Additional cover is available on request." },
      { q: "Can I access items any time?", a: "Yes, during business hours. Extended access by appointment." },
    ],
  },
  {
    slug: "piano-and-specialist-items",
    icon: Piano,
    title: "Piano & Specialist Items",
    shortDesc:
      "Heavy, awkward or priceless items? Our specialist team moves pianos, antiques and fragile goods with expert care.",
    heroHeading: "Piano & Specialist Item Removals",
    heroSubtext:
      "Trust our trained specialists to safely move pianos, antiques, artwork and high-value items across Birmingham and the Midlands.",
    sections: [
      {
        heading: "Specialist Handling for Precious Items",
        paragraphs: [
          "Moving a piano, antique, or valuable artwork takes specialist knowledge and kit. Our trained team has the experience and equipment for even the trickiest items.",
          "Piano skids, heavy-duty straps, custom padding and specialist vehicles,every precious item gets individual attention from start to finish.",
          "From an upright in a terraced house to a grand piano in a concert hall, we've moved them all across the West Midlands.",
        ],
      },
      {
        heading: "Items We Specialise In",
        list: [
          "Upright and grand pianos",
          "Antique furniture and heirlooms",
          "Fine art, sculptures, framed prints",
          "Hot tubs and garden structures",
          "Gym equipment and heavy machinery",
          "Safes and security cabinets",
          "Pool tables and large instruments",
        ],
      },
    ],
    faqs: [
      { q: "Can you move a grand piano?", a: "Yes,specialist equipment and experienced handlers for both upright and grand pianos." },
      { q: "Do you insure specialist items?", a: "Yes,comprehensive transit insurance. Additional cover is available for very high-value items." },
      { q: "Can you navigate narrow staircases?", a: "Yes,we assess access beforehand and use specialist kit where needed." },
      { q: "How much to move a piano?", a: "Priced individually on piano type, distance and access. Free quote on request." },
    ],
  },
];

export default servicesData;

export function getServiceBySlug(slug) {
  return servicesData.find((s) => s.slug === slug) || null;
}

export function getAllServiceSlugs() {
  return servicesData.map((s) => s.slug);
}
