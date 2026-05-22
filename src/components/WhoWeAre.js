import Link from "next/link";

// Short, entity-clear intro paragraph placed high on the homepage so search and
// answer engines can index who/what/where in one block.
export default function WhoWeAre() {
  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-[family-name:var(--font-space)] text-2xl sm:text-3xl font-extrabold text-[#0B1E3F] mb-4">
          Birmingham&apos;s trusted removals company since 2015
        </h2>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Birmingham Removals is a family-run, BAR-registered removals company that has
          completed over 5,200 moves since 2015, with a 4.9-star average from more than 312
          reviews. Our DBS-checked, directly employed crews handle{" "}
          <Link href="/services/house-removals" className="text-[#F97316] font-semibold hover:underline">house</Link>,{" "}
          <Link href="/services/office-removals" className="text-[#F97316] font-semibold hover:underline">office</Link>,{" "}
          <Link href="/services/man-and-van" className="text-[#F97316] font-semibold hover:underline">man and van</Link> and{" "}
          <Link href="/services/packing-service" className="text-[#F97316] font-semibold hover:underline">packing</Link>{" "}
          moves across Birmingham, Solihull, Sutton Coldfield and the wider West Midlands, with
          fixed prices and full insurance on every job.
        </p>
      </div>
    </section>
  );
}
