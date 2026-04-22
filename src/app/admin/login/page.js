import Link from "next/link";
import { getSiteSettings } from "@/lib/siteSettings";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const settings = await getSiteSettings();
  const logoSrc = settings.logoUrl;
  const useUploadedLogo = logoSrc && !logoSrc.startsWith("/");

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 cursor-pointer">
          {useUploadedLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="Logo" className="h-12 w-auto max-w-[260px] object-contain" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-[#F97316]/25">
                B
              </div>
              <span className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900 tracking-tight">
                Birmingham Removals
              </span>
            </>
          )}
        </Link>

        <div className="glass-card p-8 sm:p-10 shadow-xl border-gray-200/60">
          <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-space)] mb-2 text-center">
            Admin Portal
          </h1>
          <p className="text-muted text-center mb-8 text-sm">
            Enter your PIN to manage bookings and customer data.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
