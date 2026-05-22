// FAQ content grouped by category. Used in two modes:
//   <FAQ />             -> homepage: a curated flat subset (items marked featured)
//   <FAQ categorized /> -> /faq page: every question under category headings
// Answers may contain inline HTML links to relevant service/area pages.
const FAQ_CATEGORIES = [
  {
    category: "Pricing & Quotes",
    items: [
      {
        q: "How much do Birmingham removals cost?",
        a: 'Typical 2-bed moves start around £350, and 3-bed homes from £550. We give a fixed, all-in quote within 30 minutes of your enquiry, with no hidden charges. See <a href="/services/house-removals">house removals</a> for a full price guide, or <a href="/quote">get a free quote</a>.',
        featured: true,
      },
      {
        q: "Are your prices really fixed?",
        a: "Yes. The figure on your written quote is the price you pay. We confirm everything before the day, so there are no surprise hourly add-ons, fuel surcharges or stair fees once the work is done. If your inventory changes significantly before the move, we simply re-quote in advance so you always know the cost upfront.",
        featured: true,
      },
      {
        q: "What payment methods do you accept?",
        a: "Bank transfer, card or cash. A small deposit secures your date, with the balance due on completion. We never ask for large upfront payments.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Plans change, and we are flexible. Your deposit holds your date and can usually be moved to a new date at no charge if you give us reasonable notice. We will set out the exact terms in writing when you book so there are no surprises.",
      },
    ],
  },
  {
    category: "Booking & Scheduling",
    items: [
      {
        q: "How far in advance should I book my removal?",
        a: "For a normal weekday move, 1 to 2 weeks is plenty. End-of-month dates, Fridays and weekends book up fastest, so aim for 3 to 4 weeks ahead for those if you can. We also keep capacity for same-day and short-notice jobs, so it is always worth calling even at the last minute.",
        featured: true,
      },
      {
        q: "Do you offer same-day or short-notice removals?",
        a: "Yes. We hold capacity for same-day and next-day moves across Birmingham and the West Midlands, which is ideal for chain delays, last-minute completions or urgent house clearances. Call us as early in the day as possible and we will tell you straight away what we can fit in.",
        featured: true,
      },
      {
        q: "Do you provide a move manager or single point of contact?",
        a: "Yes. From your first quote through to move day, you deal with one named coordinator who knows your job. For office and larger home moves they build the plan, brief the crew and stay reachable on the day, so you are never passed around a call centre.",
      },
    ],
  },
  {
    category: "On Moving Day",
    items: [
      {
        q: "How long does a house move take?",
        a: "It depends on the size of your home and the access at both ends. As a rough guide, a 1-bed flat usually takes 2 to 4 hours, a 2-bed house 4 to 6 hours, and a 3-bed house most of the day. Larger 4 and 5-bed homes are typically a full day and occasionally spread over two days. We give you a realistic timing when we quote.",
        featured: true,
      },
      {
        q: "Do you provide parking permits or arrange parking suspensions?",
        a: "Yes. Where a property has no driveway or off-street loading, we can arrange a parking bay suspension with Birmingham City Council so the van can park directly outside on move day. Suspensions usually need around 10 working days notice, so let us know early and we will sort the paperwork and costs as part of your quote.",
      },
      {
        q: "How do you protect carpets and walls during a move?",
        a: "Our crews carry floor runners, carpet protectors, door and banister guards, and blankets for furniture and corners. We wrap and pad items before they leave the room and lay protection along the route, so both your old and new home are looked after throughout the move.",
      },
      {
        q: "What vehicles do you use and how big are they?",
        a: "We run a fleet from smaller transit vans for single rooms and man and van jobs up to 3.5 tonne Luton vans with tail-lifts for full house moves, and we use multiple vehicles for larger homes. When we quote we match the right van size and crew to your inventory and access.",
      },
    ],
  },
  {
    category: "Insurance & Protection",
    items: [
      {
        q: "Are you insured?",
        a: "Yes. £10m Goods-in-Transit insurance and £5m Public Liability cover is included on every single move, and our crews are DBS-checked and directly employed.",
        featured: true,
      },
      {
        q: "What happens if it rains or something gets damaged?",
        a: "Bad weather does not stop us. Our crews protect doorways, floors and furniture with covers and blankets and work safely whatever the conditions. In the rare event something is damaged, you are protected by our £10m Goods-in-Transit insurance and £5m Public Liability cover, so any valid claim is handled quickly and fairly.",
      },
      {
        q: "What is BAR and why does it matter for my move?",
        a: "BAR is the British Association of Removers, the industry's professional trade body. Members are vetted, work to a code of practice and carry proper insurance, which gives you protection and recourse a non-member cannot offer. We are BAR registered, so you can book with confidence.",
      },
    ],
  },
  {
    category: "Specialist Services",
    items: [
      {
        q: "Do you offer packing materials and a packing service?",
        a: 'Yes. You can buy materials on their own, including double-walled boxes, bubble wrap, tape, wardrobe cartons and mattress covers, or book our full <a href="/services/packing-service">packing service</a> where our team packs everything safely for you. Materials are included in the price of the packing service.',
        featured: true,
      },
      {
        q: "Can I pack my own boxes and have you move them?",
        a: "Absolutely. Many customers pack their own boxes and leave the heavy lifting and furniture to us. We just ask that boxes are sealed and not overloaded so they are safe to carry and stack. If you would rather not pack at all, our packing team can do as much or as little as you like.",
      },
      {
        q: "Do you move pianos and other specialist items?",
        a: 'Yes. We move upright and grand pianos, safes, large appliances, gym equipment, antiques and other heavy or awkward items using a trained specialist crew and the right equipment. See <a href="/services/piano-and-specialist-items">piano and specialist item removals</a>, and please mention any specialist items when you enquire so we send the correct team.',
      },
      {
        q: "Do you offer international removals?",
        a: "We specialise in moves within the UK, covering local Birmingham moves and long-distance relocations nationwide. For international moves we can point you towards a trusted BAR Overseas member, and we are happy to handle the UK collection and storage side of an international move.",
      },
    ],
  },
  {
    category: "Coverage",
    items: [
      {
        q: "Which areas of Birmingham do you cover?",
        a: 'We cover the whole of Birmingham, including <a href="/areas/edgbaston">Edgbaston</a>, <a href="/areas/harborne">Harborne</a>, <a href="/areas/moseley">Moseley</a>, Kings Heath, Selly Oak, <a href="/areas/sutton-coldfield">Sutton Coldfield</a>, Solihull and Erdington. If you are not sure whether we reach your postcode, just call and we will confirm in seconds.',
        featured: true,
      },
      {
        q: "Do you move to or from outside Birmingham?",
        a: 'Yes. As well as the wider West Midlands (Dudley, West Bromwich, Wolverhampton and Coventry), we handle <a href="/services/long-distance-removals">long-distance removals</a> from Birmingham to London, Manchester, Bristol, Edinburgh and beyond, quoted free.',
      },
    ],
  },
  {
    category: "Storage",
    items: [
      {
        q: "Can you store my belongings between moves?",
        a: 'Yes. Our secure, CCTV-monitored Birmingham <a href="/services/storage-solutions">storage facility</a> offers flexible short and long-term contracts, with collection and delivery available.',
      },
      {
        q: "Do you move items into storage if I cannot get into my new house?",
        a: 'Yes. If your completion slips or there is a gap between moving out and moving in, we can move your belongings into <a href="/services/storage-solutions">storage</a> and then deliver them to your new home when you are ready, all as one managed service.',
      },
    ],
  },
];

function FaqDetails({ f }) {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-slate-50 open:border-[#F97316] open:bg-white open:shadow-md transition-all">
      <summary className="w-full cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
        <span className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-base sm:text-lg">
          {f.q}
        </span>
        <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#0B1E3F] border border-slate-200 group-open:bg-[#F97316] group-open:text-white group-open:rotate-45 transition-transform text-xl leading-none">
          +
        </span>
      </summary>
      <p
        className="px-6 pb-6 text-slate-600 leading-relaxed [&_a]:text-[#F97316] [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2"
        dangerouslySetInnerHTML={{ __html: f.a }}
      />
    </details>
  );
}

// Server component: native <details> accordion with zero client JS.
export default function FAQ({ categorized = false }) {
  const allItems = FAQ_CATEGORIES.flatMap((c) => c.items);
  const rendered = categorized ? allItems : allItems.filter((f) => f.featured);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rendered.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
    })),
  };

  return (
    <section className="py-24 sm:py-28 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1E3F] leading-tight">
            Frequently asked questions
          </h2>
        </div>

        {categorized ? (
          <div className="space-y-12">
            {FAQ_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <h3 className="font-[family-name:var(--font-space)] text-xl font-extrabold text-[#0B1E3F] mb-4">
                  {cat.category}
                </h3>
                <div className="space-y-3">
                  {cat.items.map((f, i) => (
                    <FaqDetails key={i} f={f} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {rendered.map((f, i) => (
              <FaqDetails key={i} f={f} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
