const faqs = [
  {
    q: "How much do Birmingham removals cost?",
    a: "Typical 2-bed moves start around £350, and 3-bed homes from £550. We give a fixed, all-in quote within 30 minutes of your enquiry, with no hidden charges.",
  },
  {
    q: "How far in advance should I book?",
    a: "1 to 2 weeks is ideal, especially for end-of-month weekends. That said, we regularly handle same-day and next-day bookings across Birmingham and the wider West Midlands.",
  },
  {
    q: "Are you insured?",
    a: "Yes. £10m Goods-in-Transit insurance and £5m Public Liability cover is included on every single move.",
  },
  {
    q: "Do you cover areas outside Birmingham?",
    a: "Yes. Solihull, Sutton Coldfield, Dudley, West Bromwich, Wolverhampton and Coventry are all covered daily. Long-distance moves from Birmingham to London, Manchester and beyond are quoted free.",
  },
  {
    q: "Do you offer packing services?",
    a: "Yes. Full pack, partial pack or fragile-only. All materials (boxes, wrap, tape, wardrobe cartons) are included in the packing service price.",
  },
  {
    q: "Can you store my stuff between moves?",
    a: "Yes. Our secure, CCTV-monitored Birmingham storage facility offers flexible short and long-term contracts, with collection and delivery available.",
  },
  {
    q: "What payment do you accept?",
    a: "Bank transfer, card or cash. A small deposit secures your date, with the balance due on completion.",
  },
  {
    q: "Which areas of Birmingham do you cover?",
    a: "We cover the whole of Birmingham, including Edgbaston, Harborne, Moseley, Kings Heath, Selly Oak, Sutton Coldfield, Solihull and Erdington. We also move customers right across the wider West Midlands, including Dudley, West Bromwich, Wolverhampton and Coventry. If you are not sure whether we reach your postcode, just call and we will confirm in seconds.",
  },
  {
    q: "How long does a house move take?",
    a: "It depends on the size of your home and the access at both ends. As a rough guide, a 1-bed flat usually takes 2 to 4 hours, a 2-bed house 4 to 6 hours, and a 3-bed house most of the day. Larger 4 and 5-bed homes are typically a full day and occasionally spread over two days. We will give you a realistic timing when we quote.",
  },
  {
    q: "Do you provide parking permits or arrange parking suspensions?",
    a: "Yes. Where a property has no driveway or off-street loading, we can arrange a parking bay suspension with Birmingham City Council so the van can park directly outside on move day. Suspensions usually need to be booked around 10 working days in advance, so let us know early and we will sort the paperwork and costs as part of your quote.",
  },
  {
    q: "Are your prices really fixed?",
    a: "Yes. The figure on your written quote is the price you pay. We confirm everything before the day, so there are no surprise hourly add-ons, fuel surcharges or stair fees once the work is done. If your inventory changes significantly before the move, we will simply re-quote in advance so you always know the cost upfront.",
  },
  {
    q: "Do you move pianos and other specialist items?",
    a: "Yes. We move upright and grand pianos, safes, large appliances, gym equipment, antiques and other heavy or awkward items using a trained specialist crew and the right equipment such as piano trolleys, straps and stair climbers. Please mention any specialist items when you enquire so we can send the correct team and cover them properly.",
  },
  {
    q: "How far in advance should I book my removal?",
    a: "For a normal weekday move, 1 to 2 weeks is plenty. End-of-month dates, Fridays and weekends book up fastest, so aim for 3 to 4 weeks ahead for those if you can. We also keep capacity for same-day and short-notice jobs, so it is always worth calling even at the last minute.",
  },
  {
    q: "Do you offer packing materials and a packing service?",
    a: "Yes. You can buy materials on their own, including double-walled boxes, bubble wrap, tape, wardrobe cartons and mattress covers, or book our full packing service where our team packs everything safely for you. Materials are included in the price of the packing service, and a typical 3-bed full pack adds roughly £150 to £300 depending on volume.",
  },
  {
    q: "What happens if it rains or something gets damaged?",
    a: "Bad weather does not stop us. Our crews protect doorways, floors and furniture with covers and blankets and work safely whatever the conditions. In the rare event something is damaged, you are protected by our £10m Goods-in-Transit insurance and £5m Public Liability cover, so any valid claim is handled quickly and fairly.",
  },
  {
    q: "Do you offer same-day or short-notice removals?",
    a: "Yes. We hold capacity for same-day and next-day moves across Birmingham and the West Midlands, which is ideal for chain delays, last-minute completions or urgent house clearances. Call us as early in the day as possible and we will tell you straight away what we can fit in.",
  },
];

// Server component: native <details> accordion with zero client JS, no framer-motion.
export default function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-200 bg-slate-50 open:border-[#F97316] open:bg-white open:shadow-md transition-all"
            >
              <summary className="w-full cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4">
                <span className="font-[family-name:var(--font-space)] font-bold text-[#0B1E3F] text-base sm:text-lg">
                  {f.q}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#0B1E3F] border border-slate-200 group-open:bg-[#F97316] group-open:text-white group-open:rotate-45 transition-transform text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
