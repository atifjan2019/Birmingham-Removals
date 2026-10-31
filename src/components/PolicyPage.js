import Navbar from "@/components/NavbarServer";
import Footer from "@/components/FooterServer";
import { BreadcrumbBar } from "@/components/Breadcrumbs";

const H2 = "mt-12 font-[family-name:var(--font-space)] text-2xl font-bold text-[#0B1E3F]";
export const policyLink = "text-[#9A3412] underline underline-offset-2 hover:text-[#EA580C]";

export function PolicyHeading({ children }) {
  return <h2 className={H2}>{children}</h2>;
}

export function PolicyText({ children }) {
  return <p className="mt-4 leading-relaxed text-slate-700">{children}</p>;
}

export function PolicyList({ items }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-slate-700">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function PolicyPage({ title, crumb, updated, intro, children }) {
  return (
    <>
      <Navbar />
      <BreadcrumbBar items={[{ name: "Home", href: "/" }, { name: crumb }]} />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-space)] text-4xl font-extrabold text-[#0B1E3F]">{title}</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated {updated}</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
