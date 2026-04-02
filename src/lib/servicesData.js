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
      "Full house moves across Newcastle, from studio flats in Heaton to family homes in Gosforth. We handle everything with care.",
    heroHeading: "House Removals in Newcastle",
    heroSubtext:
      "Moving home is one of life's biggest milestones. Let our experienced team take the stress out of your move so you can focus on settling into your new place.",
    sections: [
      {
        heading: "Why Choose Us for Your House Move?",
        paragraphs: [
          "At Newcastle Removals, we have helped hundreds of families relocate across Newcastle and the wider North East. Whether you are moving from a terraced house in Jesmond or a detached home in Gosforth, our trained team ensures every piece of furniture, box, and personal belonging arrives safely at your new address.",
          "We provide a complete door-to-door service. Our crew arrives on time, wraps and protects your furniture, loads everything securely, and carefully unloads at your new home. No item is too large or too awkward for our experienced movers.",
          "Every house move includes full transit insurance, giving you total peace of mind. We also offer flexible scheduling, including weekends and evenings, so your move fits around your life."
        ],
      },
      {
        heading: "What's Included in Every House Move",
        list: [
          "Free no-obligation quote",
          "Fully trained, DBS-checked removal team",
          "Protective wrapping for all furniture",
          "Transit insurance included as standard",
          "Flexible weekend and evening availability",
          "Disassembly and reassembly of beds, wardrobes, and desks",
          "Local knowledge of Newcastle streets for faster routes",
        ],
      },
      {
        heading: "Areas We Cover",
        paragraphs: [
          "We cover all of Newcastle upon Tyne and the surrounding areas including Jesmond, Gosforth, Heaton, Fenham, Kenton, Byker, Wallsend, Gateshead, Whitley Bay, Tynemouth, Ponteland, and more. Whether you are moving across the street or to the other side of the region, we can help."
        ],
      },
    ],
    faqs: [
      { q: "How far in advance should I book?", a: "We recommend booking at least 1 to 2 weeks ahead, especially during busy periods like end of month. However, we also accommodate last-minute moves when possible." },
      { q: "Do you disassemble furniture?", a: "Yes. Our team will disassemble and reassemble beds, wardrobes, desks, and other furniture as part of our standard service at no extra charge." },
      { q: "Is my move insured?", a: "Absolutely. Every house move includes comprehensive transit insurance covering all your belongings during the move." },
      { q: "Can you move items upstairs?", a: "Yes. Our movers handle stairs, narrow hallways, and awkward access points on a daily basis. There are no hidden staircase surcharges." },
      { q: "What size van do you use?", a: "We use a range of Luton vans and large removal trucks depending on the size of your move. For bigger homes, we can deploy multiple vehicles." },
    ],
  },
  {
    slug: "office-removals",
    icon: Building2,
    title: "Office Removals",
    shortDesc:
      "Minimal disruption office relocations. We work evenings and weekends so your business keeps running without a hitch.",
    heroHeading: "Office Removals in Newcastle",
    heroSubtext:
      "Relocating your business? We specialise in fast, organised office moves that minimise downtime and keep your operations running smoothly.",
    sections: [
      {
        heading: "Professional Office Relocations",
        paragraphs: [
          "We understand that every hour of downtime costs your business money. That is why our office removal service is designed for speed and efficiency. We plan every detail in advance so your team can shut down on Friday and be fully operational in the new space by Monday.",
          "From packing IT equipment and server rooms to moving desks, filing cabinets, and boardroom furniture, we handle it all. Our movers are experienced with commercial environments and take extra care with sensitive electronics and documentation.",
          "We also offer out-of-hours moves including evenings, weekends, and bank holidays, so there is zero disruption to your day-to-day business."
        ],
      },
      {
        heading: "Our Office Moving Process",
        list: [
          "Pre-move site survey and planning",
          "Dedicated move coordinator assigned to your project",
          "IT equipment safely packed and transported",
          "Furniture disassembly and reassembly",
          "Labelling system for efficient unpacking",
          "Out-of-hours and weekend availability",
          "Full commercial insurance coverage",
        ],
      },
    ],
    faqs: [
      { q: "Can you move outside normal business hours?", a: "Yes. We regularly carry out office moves during evenings, weekends, and bank holidays to avoid disrupting your business operations." },
      { q: "Do you handle IT equipment?", a: "Yes. Our team is experienced in safely packing and transporting computers, monitors, servers, printers, and networking equipment." },
      { q: "How do you handle confidential documents?", a: "We use sealed crates and tamper-evident packaging for sensitive documents. Our staff are DBS checked and trained in data handling best practices." },
      { q: "Can you handle multi-floor offices?", a: "Absolutely. We have equipment for multi-floor moves including stair climbers and goods lifts coordination with building management." },
    ],
  },
  {
    slug: "man-and-van",
    icon: Truck,
    title: "Man & Van",
    shortDesc:
      "Need a quick move or a few items shifting? Our man and van service covers Newcastle, Gateshead, and beyond. Same day available.",
    heroHeading: "Man and Van Service in Newcastle",
    heroSubtext:
      "Affordable, reliable, and available at short notice. Our man and van service is perfect for smaller moves, single items, or student relocations.",
    sections: [
      {
        heading: "Fast and Flexible Man and Van Hire",
        paragraphs: [
          "Not every move requires a full removal team. Our man and van service is the ideal solution when you need to move a few items, shift furniture between rooms, or handle a quick student flat move.",
          "Our drivers are fully trained removal professionals, not just delivery drivers. They will carefully load, secure, and transport your belongings with the same care as a full house move.",
          "We offer same-day availability across Newcastle, Gateshead, Sunderland, and the wider Tyne and Wear area. Just call us and we can often be with you within a couple of hours."
        ],
      },
      {
        heading: "Perfect For",
        list: [
          "Student moves and flat relocations",
          "Single item deliveries (sofas, beds, appliances)",
          "eBay, Gumtree, and Facebook Marketplace pickups",
          "Small office moves and desk relocations",
          "Storage unit drop-offs and collections",
          "Furniture shop deliveries",
          "Same-day and next-day moves",
        ],
      },
    ],
    faqs: [
      { q: "Can I book same-day?", a: "Yes. Subject to availability, we can often accommodate same-day bookings. Call us as early as possible for the best chance." },
      { q: "How much does man and van cost?", a: "We offer competitive hourly rates starting from £30/hour. Contact us for a free, no-obligation quote based on your specific requirements." },
      { q: "Will the driver help load and unload?", a: "Absolutely. Our drivers are trained movers and will help with loading, unloading, and carrying items up stairs." },
      { q: "What size is the van?", a: "We use large Luton vans that can accommodate the contents of a 1 to 2 bedroom flat in a single trip." },
    ],
  },
  {
    slug: "packing-service",
    icon: Package,
    title: "Packing Service",
    shortDesc:
      "Professional packing with premium materials. We wrap, box, and protect your belongings so nothing gets damaged in transit.",
    heroHeading: "Professional Packing Service",
    heroSubtext:
      "Let our expert packers handle everything. We use premium materials and proven techniques to ensure your belongings arrive in perfect condition.",
    sections: [
      {
        heading: "Leave the Packing to the Professionals",
        paragraphs: [
          "Packing is often the most time-consuming and stressful part of any move. Our professional packing service takes that burden off your shoulders completely.",
          "Our trained packers use high-quality materials including double-walled cardboard boxes, acid-free tissue paper, bubble wrap, and custom wardrobe boxes. Every item is individually wrapped and secured to prevent damage during transit.",
          "We can pack your entire home the day before your move, or focus on specific rooms and fragile items. The choice is yours."
        ],
      },
      {
        heading: "What We Provide",
        list: [
          "Professional packing team",
          "All packing materials included in the price",
          "Specialist wrapping for fragile and valuable items",
          "Custom wardrobe boxes for hanging clothes",
          "Clearly labelled boxes by room for easy unpacking",
          "Unpacking service available at your new home",
          "Eco-friendly material recycling after your move",
        ],
      },
    ],
    faqs: [
      { q: "Do I need to provide boxes?", a: "No. All packing materials are included in our service. We bring everything we need including boxes, tape, bubble wrap, and tissue paper." },
      { q: "Can you pack fragile items like china?", a: "Yes. Our packers are specially trained in handling delicate items. We use double-layered wrapping and custom dividers for glassware and china." },
      { q: "How long does packing take?", a: "A typical 3-bedroom house can be fully packed in 4 to 6 hours by our two-person packing team." },
      { q: "Can you just pack certain rooms?", a: "Absolutely. We offer partial packing if you would prefer to handle some rooms yourself. Many customers ask us to focus on kitchens and fragile items." },
    ],
  },
  {
    slug: "storage-solutions",
    icon: Warehouse,
    title: "Storage Solutions",
    shortDesc:
      "Secure, clean storage facilities near Newcastle. Short or long term, flexible access, and fully insured.",
    heroHeading: "Storage Solutions in Newcastle",
    heroSubtext:
      "Whether you need short-term storage between moves or a long-term solution, our secure facilities keep your belongings safe.",
    sections: [
      {
        heading: "Secure and Flexible Storage",
        paragraphs: [
          "Sometimes your move-in date does not line up with your move-out date, or maybe you just need somewhere safe to keep your belongings while you sort things out. Our storage service bridges that gap.",
          "Our storage facilities are clean, dry, and monitored 24/7 with CCTV and alarm systems. Every unit is individually locked and only you have access to your belongings.",
          "We offer flexible terms with no long-term contracts. Store your items for a week, a month, or as long as you need. We can even collect your items, store them, and deliver them to your new address when you are ready."
        ],
      },
      {
        heading: "Storage Features",
        list: [
          "24/7 CCTV monitored facilities",
          "Clean, dry, and climate-controlled units",
          "Individual unit locks with key access",
          "Flexible short and long-term contracts",
          "Collection and delivery service available",
          "Fully insured storage",
          "Various unit sizes to suit your needs",
        ],
      },
    ],
    faqs: [
      { q: "How much does storage cost?", a: "Prices depend on the size of the unit and duration. Contact us for a personalised quote. We offer competitive rates with no hidden fees." },
      { q: "Can you collect and deliver from storage?", a: "Yes. We can collect your items, transport them to our facility, and then deliver them to your new address whenever you are ready." },
      { q: "Is the storage insured?", a: "Yes. All items in our storage facilities are covered by our insurance policy. You can also arrange additional cover if needed." },
      { q: "Can I access my items at any time?", a: "Yes. We offer flexible access during business hours. Extended access can be arranged by prior appointment." },
    ],
  },
  {
    slug: "piano-and-specialist-items",
    icon: Piano,
    title: "Piano & Specialist Items",
    shortDesc:
      "Heavy, awkward, or valuable items? Our specialist team handles pianos, antiques, and fragile goods with expert precision.",
    heroHeading: "Piano & Specialist Item Removals",
    heroSubtext:
      "Trust our trained specialists to safely move pianos, antiques, artwork, and other high-value or awkward items with expert care.",
    sections: [
      {
        heading: "Specialist Handling for Precious Items",
        paragraphs: [
          "Moving a piano, antique dresser, or valuable artwork requires specialist knowledge and equipment. Our trained team has the experience and tools to handle even the most challenging items.",
          "We use piano skids, heavy-duty straps, custom padding, and specialist vehicles to transport your most precious possessions. Every item receives individual attention and care from start to finish.",
          "Whether it is an upright piano in a narrow terraced house or a grand piano in a concert hall, we have moved them all safely across the North East."
        ],
      },
      {
        heading: "Items We Specialise In",
        list: [
          "Upright and grand pianos",
          "Antique furniture and heirlooms",
          "Fine art, sculptures, and framed prints",
          "Hot tubs and garden structures",
          "Gym equipment and heavy machinery",
          "Safes and security cabinets",
          "Pool tables and large musical instruments",
        ],
      },
    ],
    faqs: [
      { q: "Can you move a grand piano?", a: "Yes. We have specialist piano moving equipment and experienced handlers who regularly move both upright and grand pianos across the North East." },
      { q: "Do you insure specialist items?", a: "Yes. All specialist items are covered by our comprehensive transit insurance. For particularly high-value items, we can arrange additional cover." },
      { q: "Can you navigate narrow staircases?", a: "Yes. Our team regularly handles piano moves through narrow hallways and staircases. We assess access beforehand and use specialist equipment where needed." },
      { q: "How much does it cost to move a piano?", a: "Piano moves are priced individually based on the type of piano, distance, and access conditions. Contact us for a free, no-obligation quote." },
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
