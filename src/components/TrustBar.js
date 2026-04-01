"use client";

const items = [
  "500+ Moves Completed",
  "5-Star Google Rating",
  "Same Day Available",
  "Fully Insured",
  "Free Quotes",
  "Newcastle Based",
];

export default function TrustBar() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section className="relative py-5 border-y border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center text-sm text-muted mx-4">
            <span className="font-semibold text-foreground">{item}</span>
            <span className="ml-8 text-primary/40">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}
