import { ShieldCheck, Mail, KeyRound } from "lucide-react";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { getSiteSettings } from "@/lib/siteSettings";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const sessionUser = sessionToken ? await decrypt(sessionToken) : null;

  let adminDetails = null;
  if (sessionUser?.userId) {
    try {
      adminDetails = await prisma.adminUser.findUnique({
        where: { id: sessionUser.userId },
        select: { email: true },
      });
    } catch (e) {
      console.error("[settings] adminUser lookup failed:", e?.message);
    }
  }

  const settings = await getSiteSettings();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
          Site Settings
        </h1>
        <p className="text-muted mt-1">Manage branding, contact info and social links shown across the site.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SettingsForm initial={settings} />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Admin Profile
            </h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                <span className="text-gray-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> Email
                </span>
                <span className="font-medium text-gray-900 truncate max-w-[150px]" title={adminDetails?.email}>
                  {adminDetails?.email || "PIN admin"}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 bg-emerald-50/80 border border-emerald-100 px-3 rounded-lg text-emerald-700">
                <span className="font-medium">Role</span>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Master Admin
                </span>
              </div>
            </div>

            <button disabled className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed shadow-sm">
              <KeyRound className="w-4 h-4 opacity-50" /> Change Password
            </button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900">
            <p className="font-semibold mb-1">How it works</p>
            <p className="text-amber-800/90 leading-relaxed">
              Logo and favicon are stored as embedded images in the database, so no external file storage is needed.
              Logo limit 500&nbsp;KB, favicon 100&nbsp;KB. Changes go live immediately across the site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
