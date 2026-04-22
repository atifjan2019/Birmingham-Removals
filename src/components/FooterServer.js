import { getSiteSettings } from "@/lib/siteSettings";
import Footer from "./Footer";

export default async function FooterServer(props) {
  const settings = await getSiteSettings();
  return <Footer {...props} settings={settings} />;
}
