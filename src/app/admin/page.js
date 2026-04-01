import { ArrowRight, TrendingUp, Users, Calendar, DollarSign, Package } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Fetch real data
  const totalBookings = await prisma.booking.count();
  const totalCustomers = await prisma.customer.count();
  
  // Example simplistic revenue calculation (sum all prices)
  const revenueResult = await prisma.booking.aggregate({
    _sum: { price: true }
  });
  const totalRevenue = revenueResult._sum.price || 0;

  // Fetch recent 5 bookings with customer data
  const recentBookingsData = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { customer: true }
  });

  const stats = [
    { name: "Total Revenue (Est.)", value: `£${totalRevenue}`, icon: DollarSign, trend: "Live" },
    { name: "Total Bookings", value: totalBookings.toString(), icon: Calendar, trend: "Live" },
    { name: "Total Customers", value: totalCustomers.toString(), icon: Users, trend: "Live" },
    { name: "Completed Moves", value: "-", icon: Package, trend: "Live" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
          Dashboard Overview
        </h1>
        <p className="text-muted mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.name}</h3>
              <p className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-space)]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-space)]">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-muted font-medium">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookingsData.length > 0 ? recentBookingsData.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[100px]">{booking.id.split('-')[0]}...</td>
                    <td className="px-6 py-4 text-gray-600">{booking.customer?.fullName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {booking.moveDate ? new Date(booking.moveDate).toLocaleDateString('en-GB') : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{booking.moveType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                        booking.status === "Upcoming" ? "bg-blue-50 text-blue-600" :
                        "bg-amber-50 text-amber-600"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">£{booking.price || "0"}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-muted">No recent bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Info */}
        <div className="space-y-6">
          <div className="bg-primary text-white p-6 rounded-2xl shadow-lg shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-lg font-bold font-[family-name:var(--font-space)] mb-2">Need Help?</h2>
              <p className="text-white/80 text-sm mb-6">Access documentation and settings to manage your service areas and pricing.</p>
              <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform w-full">
                Go to Settings
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-space)] mb-4">Today's Schedule</h2>
            <div className="space-y-4 text-sm text-muted">
              Check the bookings page to filter today's active moves.
            </div>
            <Link href="/admin/bookings" className="mt-6 w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors flex justify-center items-center">
              View Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
