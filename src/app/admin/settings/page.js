import { Settings, ShieldCheck, Mail, KeyRound } from "lucide-react";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;
  const sessionUser = sessionToken ? await decrypt(sessionToken) : null;
  
  let adminDetails = null;
  if (sessionUser?.userId) {
    adminDetails = await prisma.adminUser.findUnique({
      where: { id: sessionUser.userId },
      select: { email: true, createdAt: true }
    });
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
          System Settings
        </h1>
        <p className="text-muted mt-1">Configure pricing, service areas, and operations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <Settings className="w-12 h-12 text-gray-300 mb-4 animate-[spin_6s_linear_infinite]" />
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-space)]">Settings Module Coming Soon</h2>
            <p className="text-muted text-sm mt-2 max-w-md">
              Dynamic pricing metrics, availability blocking, and custom service areas will be configurable here in the next update.
            </p>
          </div>

        </div>

        {/* Sidebar Settings Info */}
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
                  {adminDetails?.email || "Unknown"}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-1 bg-emerald-50/80 border border-emerald-100 px-3 rounded-lg text-emerald-700">
                <span className="font-medium">Role</span>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Master Admin
                </span>
              </div>
            </div>

            <button disabled className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed shadow-sm hover:bg-gray-50 transition-colors">
              <KeyRound className="w-4 h-4 opacity-50" /> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
