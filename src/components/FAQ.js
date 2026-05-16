const faqs = [
  {
    q: "How much do Birmingham removals cost?",
    a: "Typical 2-bed moves start around £350, and 3-bed homes from £550. We give a fixed, all-in quote within 30 minutes of your enquiry,no hidden charges.",
  },
  {
    q: "How far in advance should I book?",
    a: "1–2 weeks is ideal, especially for end-of-month weekends. That said, we regularly handle same-day and next-day bookings across Birmingham and the wider West Midlands.",
  },
  {
    q: "Are you insured?",
    a: "Yes,£10m Goods-in-Transit insurance and £5m Public Liability cover is included on every single move.",
  },
  {
    q: "Do you cover areas outside Birmingham?",
    a: "Yes,Solihull, Sutton Coldfield, Dudley, West Bromwich, Wolverhampton and Coventry are all covered daily. Long-distance moves from Birmingham to London, Manchester and beyond are quoted free.",
  },
  {
    q: "Do you offer packing services?",
    a: "Yes,full pack, partial pack or fragile-only. All materials (boxes, wrap, tape, wardrobe cartons) are included in the packing service price.",
  },
  {
    q: "Can you store my stuff between moves?",
    a: "Yes,our secure, CCTV-monitored Birmingham storage facility offers flexible short and long-term contracts, with collection and delivery available.",
  },
  {
    q: "What payment do you accept?",
    a: "Bank transfer, card or cash. A small deposit secures your date, balance on completion.",
  },
];

// Server component: native <details> accordion — zero client JS, no framer-motion.
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
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-4">
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
