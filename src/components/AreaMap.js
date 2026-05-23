// Keyless Google Maps embed for area pages. Uses the public maps.google.com
// search URL so no API key, billing or runtime JS is required. The iframe is
// lazy-loaded so it does not block the LCP, and the figure carries accessible
// labels for screen readers and crawlers.
export default function AreaMap({ query, areaName, postcode }) {
  if (!query) return null;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const label = `Google Map showing removals coverage in ${areaName}${
    postcode ? `, ${postcode}` : ""
  }`;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-[#F97316]/10 text-[#9A3412] text-xs font-bold uppercase tracking-wider mb-3">
            On the Map
          </span>
          <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl font-extrabold text-[#0B1E3F]">
            Our coverage in {areaName}
          </h2>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <iframe
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${areaName}`}
            aria-label={label}
            width="100%"
            height="360"
            style={{ border: 0, display: "block" }}
          />
          <figcaption className="sr-only">{label}</figcaption>
        </figure>
      </div>
    </section>
  );
}
