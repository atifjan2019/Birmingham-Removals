import { Package } from "lucide-react";

const packingService = {
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
        "Packing is the most time-consuming part of any move, and for most people it is also the most stressful. Our packing service takes that job off your list completely, so you can focus on everything else moving day demands.",
        "Our trained packers use double-walled boxes, acid-free tissue, bubble wrap and custom wardrobe cartons. Every item is individually wrapped and cushioned to prevent transit damage, then placed into the right box for its weight and shape.",
        "Whether you want a <strong>full-home pack</strong>, a partial pack, or a fragile-only service, it is entirely up to you. We tailor the service to your home, your budget and the time you have before completion day.",
      ],
    },
    {
      heading: "How Much Does Packing Cost?",
      paragraphs: [
        "A professional packing service in Birmingham starts from around <strong>£80</strong> for a studio or 1-bed flat and rises to between £250 and £500 for a full pack of a 3-bed home. The exact figure depends on the number of rooms, the volume of belongings and how many fragile items need specialist wrapping. <strong>All materials are included</strong> in every quote, so there is nothing extra to buy.",
      ],
      table: {
        headers: ["Packing Tier", "From", "Best For"],
        rows: [
          ["Fragile-only", "£80", "Artwork, glass, electronics"],
          ["Part pack", "£150", "Kitchens, wardrobes, fragiles"],
          ["Full pack", "£250 to £500", "Whole 3-bed home"],
        ],
      },
    },
    {
      heading: "Three Packing Tiers Explained",
      list: [
        "<strong>Full packing</strong> - we pack every item in your home, from the loft to the kitchen cupboards, wrapping and boxing the lot so all you do is point us at the front door.",
        "<strong>Part packing</strong> - you pack what you can in your own time, and we handle the awkward jobs: kitchens, fragile items and wardrobes. A popular middle ground that keeps costs down.",
        "<strong>Fragile-only</strong> - we focus on the items that need the most care, including artwork, antiques, glassware and electronics, while you take care of the rest.",
      ],
    },
    {
      heading: "Our Packing Materials",
      paragraphs: [
        "Quality materials are the difference between a box that survives the journey and one that does not. Everything below is included in the price of your pack:",
      ],
      list: [
        "Double-walled boxes in small, medium, large and extra-large sizes",
        "Wardrobe cartons for hanging clothes",
        "Mirror and picture packs",
        "Dish packs for crockery and glassware",
        "Foam rolls",
        "Bubble wrap",
        "Acid-free tissue paper",
        "Packing tape",
        "Labels for easy room-by-room unpacking",
      ],
    },
    {
      heading: "What We Won't Pack",
      paragraphs: [
        "For safety and legal reasons there are a handful of items we are unable to pack or transport. Please set these aside and move them yourself:",
      ],
      list: [
        "Hazardous materials such as paint, aerosols, gas bottles and chemicals",
        "Open liquids",
        "Plants",
        "Pets",
        "Perishable food",
      ],
    },
    {
      heading: "Unpacking at Your New Home",
      paragraphs: [
        "Our service does not have to end the moment the boxes are loaded. We also offer an <strong>unpacking service at your destination</strong>, not just packing at the origin. Our team will unwrap your belongings, place them in the rooms you choose and clear away all the empty boxes and packaging, leaving you free to settle in straight away.",
        "Unpacking pairs perfectly with our <a href=\"/services/house-removals\">house removals</a> service, giving you a complete door-to-door move where we pack, transport and unpack everything for you.",
      ],
    },
    {
      heading: "Areas We Cover",
      paragraphs: [
        "We provide our packing service right across Birmingham and the surrounding suburbs, including <a href=\"/areas/harborne\">Harborne</a>, <a href=\"/areas/edgbaston\">Edgbaston</a> and <a href=\"/areas/sutton-coldfield\">Sutton Coldfield</a>. Wherever you are moving from, our packers can be on your doorstep with everything they need.",
      ],
    },
  ],
  faqs: [
    {
      q: "Do I need to provide boxes?",
      a: "No, all materials are included. We bring double-walled boxes, tape, bubble wrap, acid-free tissue and wardrobe cartons, so there is nothing for you to buy in advance.",
    },
    {
      q: "Can you pack fragile items like china?",
      a: "Yes, our trained packers use double-layer wrap, acid-free tissue and custom dividers in dish packs for glassware, china and crockery, so even the most delicate items travel safely.",
    },
    {
      q: "How long does packing take?",
      a: "A typical 3-bed home is fully packed in around 4 to 6 hours by a two-person crew. Smaller flats take less time, while larger homes with lots of fragile items may take longer.",
    },
    {
      q: "Can you just pack certain rooms?",
      a: "Yes, part packing is popular. You pack what you can yourself and we handle the kitchens, wardrobes and fragile rooms, which keeps costs down while removing the trickiest jobs.",
    },
    {
      q: "How far in advance do you come to pack?",
      a: "For a full pack we usually arrive the day before your move, or on the morning of moving day for smaller homes. Fragile-only and part packs can often be done the day before to spread the workload.",
    },
    {
      q: "What happens to the boxes after the move?",
      a: "If you book our unpacking service we remove and recycle all the empty boxes and packaging once we are finished. If you unpack yourself, we are happy to collect the materials afterwards for eco-friendly recycling.",
    },
    {
      q: "Can I mix DIY packing with your packing?",
      a: "Absolutely. Our part pack tier is designed exactly for this. You pack the straightforward items in your own time and we take care of the kitchen, wardrobes and anything fragile.",
    },
    {
      q: "Do you pack fragile antiques and artwork?",
      a: "Yes. Antiques, artwork and other valuables are wrapped in acid-free tissue and bubble wrap, then protected with mirror and picture packs or custom crating where needed. This is the focus of our fragile-only tier.",
    },
    {
      q: "Are packed items insured?",
      a: "Yes. Items packed by our trained team are covered by our goods-in-transit insurance for the journey to your new home. Additional cover is available on request, so please ask when you book.",
    },
  ],
};

export default packingService;
