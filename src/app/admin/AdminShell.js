"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Settings, LogOut, Users, BarChart3, Menu, X, Activity } from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Activity Log", href: "/admin/activity", icon: Activity },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

function LogoMark({ logoUrl, size }) {
  if (logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoUrl} alt="Logo" className={`${size} w-auto object-contain`} />;
  }
  return (
    <Image src="/images/logo.png" alt="Logo" width={160} height={52} className={`${size} w-auto`} />
  );
}

function NavContent({ pathname, onNavigate }) {
  return (
    <>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100 space-y-1">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </form>
      </div>
    </>
  );
}

export default function AdminShell({ children, logoUrl }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link href="/admin" className="flex items-center">
          <LogoMark logoUrl={logoUrl} size="h-8" />
        </Link>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-[99] md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col shadow-2xl">
            <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
              <Link href="/admin" className="flex items-center">
                <LogoMark logoUrl={logoUrl} size="h-8" />
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <NavContent pathname={pathname} onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex">
        <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col sticky top-0 h-screen shrink-0">
          <div className="px-6 py-8 border-b border-gray-100">
            <Link href="/admin" className="flex items-center">
              <LogoMark logoUrl={logoUrl} size="h-10" />
            </Link>
          </div>
          <NavContent pathname={pathname} onNavigate={() => setSidebarOpen(false)} />
        </aside>

        <main className="flex-1 min-w-0 overflow-auto">
          <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
