import Link from "next/link";

// Visible breadcrumb trail. Pair this with the BreadcrumbList JSON-LD so the
// crumb path is present both in the markup and the structured data.
// `items`: [{ name, href }]. The final item is treated as the current page.
export default function Breadcrumbs({ items = [], className = "" }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden="true" className="opacity-40 select-none">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span aria-current="page" className="font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="opacity-80 hover:opacity-100 hover:underline underline-offset-2 transition-opacity"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Thin light bar wrapper for placing breadcrumbs between the navbar and a hero.
export function BreadcrumbBar({ items }) {
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumbs items={items} className="text-slate-500" />
      </div>
    </div>
  );
}
