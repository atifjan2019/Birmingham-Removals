import { getSiteSettings } from "@/lib/siteSettings";
import AdminShell from "./AdminShell";

// Keep the entire /admin/* tree out of search indexes and strip the homepage
// canonical inherited from the root layout. The `%s | Admin` template lets each
// admin page declare just its section name (e.g. "Bookings" -> "Bookings | Admin").
export const metadata = {
  title: {
    default: "Admin | Birmingham Removals",
    template: "%s | Admin",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: { canonical: null },
};

export default async function AdminLayout({ children }) {
  const settings = await getSiteSettings();
  return <AdminShell logoUrl={settings.logoUrl}>{children}</AdminShell>;
}
