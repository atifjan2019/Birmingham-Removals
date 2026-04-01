"use client";

import { useState, useMemo } from "react";
import { PoundSterling, TrendingUp, TrendingDown, BarChart3, Users, Calendar, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ReportsClient({ completedBookings, allBookings }) {
  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
  const todayStr = today.toISOString().split("T")[0];

  const [dateFrom, setDateFrom] = useState(firstOfMonth);
  const [dateTo, setDateTo] = useState(todayStr);
  const [view, setView] = useState("financial"); // "financial" | "leads"

  // Filter completed bookings by date range
  const filteredCompleted = useMemo(() => {
    return completedBookings.filter(b => {
      const d = new Date(b.updatedAt);
      return d >= new Date(dateFrom) && d <= new Date(dateTo + "T23:59:59");
    });
  }, [completedBookings, dateFrom, dateTo]);

  // Filter all bookings by date range for leads
  const filteredAll = useMemo(() => {
    return allBookings.filter(b => {
      const d = new Date(b.createdAt);
      return d >= new Date(dateFrom) && d <= new Date(dateTo + "T23:59:59");
    });
  }, [allBookings, dateFrom, dateTo]);

  // Financial totals
  const totalRevenue = filteredCompleted.reduce((sum, b) => sum + (b.jobCost || 0), 0);
  const totalExpenses = filteredCompleted.reduce((sum, b) => sum + (b.expenses || 0), 0);
  const totalProfit = filteredCompleted.reduce((sum, b) => sum + (b.profit || 0), 0);
  const avgJobValue = filteredCompleted.length > 0 ? totalRevenue / filteredCompleted.length : 0;

  // Lead stats
  const totalLeads = filteredAll.length;
  const newLeads = filteredAll.filter(b => b.status === "New").length;
  const abandonedLeads = filteredAll.filter(b => b.status === "Abandoned").length;
  const completedLeads = filteredAll.filter(b => b.status === "Completed").length;
  const conversionRate = totalLeads > 0 ? ((completedLeads / totalLeads) * 100).toFixed(1) : 0;

  // Quick date filters
  const setThisMonth = () => {
    setDateFrom(firstOfMonth);
    setDateTo(todayStr);
  };
  const setLastMonth = () => {
    const lm = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lmEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    setDateFrom(lm.toISOString().split("T")[0]);
    setDateTo(lmEnd.toISOString().split("T")[0]);
  };
  const setAllTime = () => {
    setDateFrom("2020-01-01");
    setDateTo(todayStr);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">Reports</h1>
        <p className="text-muted mt-1">Financial overview and lead analytics.</p>
      </div>

      {/* Date Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <Filter className="w-4 h-4" /> Date Range:
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
          <span className="text-gray-400">→</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={setThisMonth} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">This Month</button>
          <button onClick={setLastMonth} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">Last Month</button>
          <button onClick={setAllTime} className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">All Time</button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("financial")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === "financial" ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
        >
          <PoundSterling className="w-4 h-4" /> Financials
        </button>
        <button
          onClick={() => setView("leads")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${view === "leads" ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
        >
          <Users className="w-4 h-4" /> Leads
        </button>
      </div>

      {/* Financial View */}
      {view === "financial" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              title="Total Revenue"
              value={`£${totalRevenue.toFixed(2)}`}
              icon={PoundSterling}
              color="emerald"
              subtitle={`${filteredCompleted.length} completed jobs`}
            />
            <SummaryCard
              title="Total Expenses"
              value={`£${totalExpenses.toFixed(2)}`}
              icon={TrendingDown}
              color="amber"
              subtitle="Fuel, labour, etc."
            />
            <SummaryCard
              title="Net Profit"
              value={`£${totalProfit.toFixed(2)}`}
              icon={TrendingUp}
              color={totalProfit >= 0 ? "emerald" : "red"}
              subtitle={totalRevenue > 0 ? `${((totalProfit / totalRevenue) * 100).toFixed(1)}% margin` : "—"}
            />
            <SummaryCard
              title="Avg. Job Value"
              value={`£${avgJobValue.toFixed(2)}`}
              icon={BarChart3}
              color="blue"
              subtitle="Per completed job"
            />
          </div>

          {/* Detailed Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Completed Jobs Breakdown</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left">Customer</th>
                    <th className="px-5 py-3 text-left">Route</th>
                    <th className="px-5 py-3 text-left">Date</th>
                    <th className="px-5 py-3 text-right">Revenue</th>
                    <th className="px-5 py-3 text-right">Expenses</th>
                    <th className="px-5 py-3 text-right">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCompleted.length > 0 ? filteredCompleted.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{b.customer?.fullName || "—"}</td>
                      <td className="px-5 py-3 text-gray-600">{b.fromPostcode} → {b.toPostcode}</td>
                      <td className="px-5 py-3 text-gray-600">
                        {b.moveDate ? new Date(b.moveDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold text-gray-900">£{(b.jobCost || 0).toFixed(2)}</td>
                      <td className="px-5 py-3 text-right text-amber-600 font-medium">£{(b.expenses || 0).toFixed(2)}</td>
                      <td className={`px-5 py-3 text-right font-bold ${(b.profit || 0) >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        £{(b.profit || 0).toFixed(2)}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-5 py-12 text-center text-gray-400">No completed jobs in this date range.</td>
                    </tr>
                  )}
                </tbody>
                {filteredCompleted.length > 0 && (
                  <tfoot className="bg-gray-50 font-bold text-sm">
                    <tr>
                      <td colSpan="3" className="px-5 py-3 text-gray-500 uppercase text-xs tracking-wider">Totals</td>
                      <td className="px-5 py-3 text-right text-gray-900">£{totalRevenue.toFixed(2)}</td>
                      <td className="px-5 py-3 text-right text-amber-600">£{totalExpenses.toFixed(2)}</td>
                      <td className={`px-5 py-3 text-right ${totalProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>£{totalProfit.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Leads View */}
      {view === "leads" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Lead Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <SummaryCard title="Total Leads" value={totalLeads} icon={Users} color="blue" />
            <SummaryCard title="New" value={newLeads} icon={ArrowUpRight} color="amber" />
            <SummaryCard title="Completed" value={completedLeads} icon={TrendingUp} color="emerald" />
            <SummaryCard title="Abandoned" value={abandonedLeads} icon={ArrowDownRight} color="gray" />
            <SummaryCard title="Conversion" value={`${conversionRate}%`} icon={BarChart3} color={parseFloat(conversionRate) >= 50 ? "emerald" : "amber"} />
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">All Leads Breakdown</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3 text-left">Customer</th>
                    <th className="px-5 py-3 text-left">Contact</th>
                    <th className="px-5 py-3 text-left">Type</th>
                    <th className="px-5 py-3 text-left">Route</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAll.length > 0 ? filteredAll.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{b.customer?.fullName || "—"}</td>
                      <td className="px-5 py-3 text-gray-600 text-xs">
                        <div>{b.customer?.phone || "—"}</div>
                        <div className="text-gray-400">{b.customer?.email || "—"}</div>
                      </td>
                      <td className="px-5 py-3 text-gray-600 capitalize">{b.moveType?.replace(/-/g, " ")}</td>
                      <td className="px-5 py-3 text-gray-600">{b.fromPostcode} → {b.toPostcode}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          b.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          b.status === "Upcoming" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                          b.status === "Abandoned" ? "bg-gray-100 text-gray-500 border border-gray-200" :
                          "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-600">
                        {new Date(b.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-5 py-12 text-center text-gray-400">No leads in this date range.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color = "emerald", subtitle }) {
  const colors = {
    emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-100 text-emerald-600",
    amber: "from-amber-500/10 to-amber-500/5 border-amber-100 text-amber-600",
    red: "from-red-500/10 to-red-500/5 border-red-100 text-red-600",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-100 text-blue-600",
    gray: "from-gray-500/10 to-gray-500/5 border-gray-200 text-gray-500",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${colors[color]} flex items-center justify-center border`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-xs text-gray-500 font-medium mb-0.5">{title}</p>
      <p className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-space)]">{value}</p>
      {subtitle && <p className="text-[11px] text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
