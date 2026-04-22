import { getSiteSettings } from "@/lib/siteSettings";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }) {
  const settings = await getSiteSettings();
  return <AdminShell logoUrl={settings.logoUrl}>{children}</AdminShell>;
}
