import { Settings } from "lucide-react";

export default function SettingsPage() {
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
            <h3 className="font-semibold text-gray-900 mb-2">Admin Profile</h3>
            <p className="text-sm text-muted mb-4">You are logged in as the master administrator.</p>
            <button disabled className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
