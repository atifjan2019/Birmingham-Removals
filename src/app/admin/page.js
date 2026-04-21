import { ArrowRight, TrendingUp, Users, Calendar, DollarSign, Package, PoundSterling, BarChart3 } from "lucide-react";
import Link from "next/link";
import { listBookings, listCustomers } from "@/lib/workerApi";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [bookings, customers] = await Promise.all([listBookings(), listCustomers()]);
  const totalBookings = bookings.length;
  const totalCustomers = customers.length;
  const completedMoves = bookings.filter((booking) => booking.status === "Completed").length;

  // Current month boundaries
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const monthName = now.toLocaleString('en-GB', { month: 'long', year: 'numeric' });

  // Monthly financials (completed bookings this month)
  const completedThisMonth = bookings.filter((booking) => {
    const updatedAt = new Date(booking.updatedAt);
    return booking.status === "Completed" && updatedAt >= monthStart && updatedAt <= monthEnd;
  });
  const monthlyRevenue = completedThisMonth.reduce((sum, booking) => sum + (booking.jobCost || 0), 0);
  const monthlyProfit = completedThisMonth.reduce((sum, booking) => sum + (booking.profit || 0), 0);

  // All-time totals
  const totalRevenue = bookings
    .filter((booking) => booking.status === "Completed")
    .reduce((sum, booking) => sum + (booking.jobCost || 0), 0);

  // Upcoming bookings (nearest move date first, exclude completed/abandoned)
  const upcomingBookings = bookings
    .filter((booking) => ["New", "Upcoming"].includes(booking.status) && new Date(booking.moveDate) >= new Date())
    .sort((a, b) => new Date(a.moveDate) - new Date(b.moveDate))
    .slice(0, 5);

  const stats = [
    { name: "Revenue (All Time)", value: `£${totalRevenue.toFixed(0)}`, icon: DollarSign, trend: "Live" },
    { name: `Revenue (${monthName})`, value: `£${monthlyRevenue.toFixed(0)}`, icon: PoundSterling, trend: `This Month`, color: "emerald" },
    { name: `Profit (${monthName})`, value: `£${monthlyProfit.toFixed(0)}`, icon: TrendingUp, trend: monthlyProfit >= 0 ? "Positive" : "Loss", color: monthlyProfit >= 0 ? "emerald" : "red" },
    { name: "Completed Moves", value: completedMoves.toString(), icon: Package, trend: "Live" },
  ];

  const quickStats = [
    { name: "Total Bookings", value: totalBookings },
    { name: "Total Customers", value: totalCustomers },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
            Dashboard Overview
          </h1>
          <p className="text-muted mt-2">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <Link href="/admin/reports" className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10 shrink-0">
          <BarChart3 className="w-4 h-4" /> View Reports
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const trendColor = stat.color === "red" ? "text-red-600 bg-red-50" : "text-emerald-600 bg-emerald-50";
          return (
            <div key={stat.name} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${trendColor}`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-gray-500 text-xs font-medium mb-1">{stat.name}</h3>
              <p className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-space)]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickStats.map((s) => (
          <div key={s.name} className="bg-white px-5 py-3 rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">{s.name}</span>
            <span className="text-lg font-bold text-gray-900">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Recent Bookings & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-space)]">Upcoming Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-muted font-medium">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Route</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{booking.customer?.fullName}</td>
                    <td className="px-6 py-3 text-gray-600 text-xs">{booking.fromPostcode} → {booking.toPostcode}</td>
                    <td className="px-6 py-3 text-gray-600">
                      {booking.moveDate ? new Date(booking.moveDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                        booking.status === "Upcoming" ? "bg-blue-50 text-blue-600" :
                        booking.status === "Abandoned" ? "bg-gray-100 text-gray-500" :
                        "bg-amber-50 text-amber-600"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right font-semibold text-gray-900">
                      {booking.jobCost ? `£${booking.jobCost.toFixed(0)}` : "—"}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-muted">No recent bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Link href="/admin/reports" className="block bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-lg shadow-gray-900/20 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5" />
                <h2 className="text-lg font-bold font-[family-name:var(--font-space)]">Reports</h2>
              </div>
              <p className="text-white/70 text-sm mb-4">Filter by date range to see revenue, expenses, and profit breakdowns.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/90">
                Open Reports <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </Link>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 font-[family-name:var(--font-space)] mb-4">Today&apos;s Schedule</h2>
            <div className="space-y-4 text-sm text-muted">
              Check the bookings page to filter today&apos;s active moves.
            </div>
            <Link href="/admin/bookings" className="mt-6 w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors flex justify-center items-center">
              View Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
