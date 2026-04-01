import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "HTML Sitemap | Swift Removals Newcastle",
  description: "Navigate all pages on the Swift Removals Newcastle website.",
};

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-gray-50 flex flex-col items-center pt-32 pb-16 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="font-[family-name:var(--font-space)] text-3xl sm:text-4xl font-bold mb-8 text-gray-900 border-b pb-4">
            HTML Sitemap
          </h1>
          <ul className="space-y-4">
            <li>
              <Link href="/" className="text-primary hover:underline text-lg font-medium">
                Home (Main Services)
              </Link>
            </li>
            <li>
              <Link href="/quote" className="text-primary hover:underline text-lg font-medium">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
