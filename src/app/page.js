import { getSiteSettings } from "@/lib/siteSettings";
import HomeClient from "./HomeClient";

export default async function Home() {
  const settings = await getSiteSettings();
  return <HomeClient settings={settings} />;
}
