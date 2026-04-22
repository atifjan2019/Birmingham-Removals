import { getSiteSettings } from "@/lib/siteSettings";
import Navbar from "./Navbar";

export default async function NavbarServer(props) {
  const settings = await getSiteSettings();
  return <Navbar {...props} settings={settings} />;
}
