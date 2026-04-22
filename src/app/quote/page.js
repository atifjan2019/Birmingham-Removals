import { Suspense } from "react";
import QuoteFunnel from "./components/QuoteFunnel";
import { getSiteSettings } from "@/lib/siteSettings";

export default async function QuotePage() {
  const settings = await getSiteSettings();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
          <div className="text-[#F8FAFC] text-lg">Loading...</div>
        </div>
      }
    >
      <QuoteFunnel settings={settings} />
    </Suspense>
  );
}
