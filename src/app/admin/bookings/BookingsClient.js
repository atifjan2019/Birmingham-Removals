"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, CheckCircle2, Clock, CalendarDays } from "lucide-react";

export default function BookingsClient({ initialBookings }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredBookings = initialBookings.filter((booking) => {
    // Map data for easy search
    const customerName = booking.customer?.fullName || "";
    const customerEmail = booking.customer?.email || "";
    
    const matchesSearch = 
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-space)]">
            All Bookings
          </h1>
          <p className="text-muted mt-1">Manage and track your customer moving jobs.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 shrink-0">
          + Add Booking manually
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters and Search */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name, ID or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-50 p-1 rounded-lg border border-gray-200 flex text-sm font-medium">
              {["All", "New", "Upcoming", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    statusFilter === status 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-muted hover:text-gray-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-muted font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID / Customer</th>
                <th className="px-6 py-4 whitespace-nowrap">Contact</th>
                <th className="px-6 py-4 whitespace-nowrap">Move Details</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Price</th>
                <th className="px-6 py-4 whitespace-nowrap text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking.customer?.fullName || "Unknown"}</div>
                      <div className="text-xs text-muted mt-0.5 truncate max-w-[120px]">{booking.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">{booking.customer?.phone || "N/A"}</div>
                      <div className="text-xs text-muted mt-0.5">{booking.customer?.email || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 font-medium">{booking.moveType}</div>
                      <div className="text-xs text-muted mt-0.5">{booking.fromPostcode} ➔ {booking.toPostcode}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4 text-muted" />
                        {booking.moveDate ? new Date(booking.moveDate).toLocaleDateString('en-GB') : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        booking.status === "Upcoming" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                        "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {booking.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
                        {booking.status === "Upcoming" && <Clock className="w-3 h-3" />}
                        {booking.status === "New" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-[family-name:var(--font-space)] font-bold text-gray-900">£{booking.price || "0"}</div>
                      <div className="text-[10px] text-muted tracking-wider uppercase">Est.</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="w-8 h-8 text-gray-300 mb-3" />
                      <p>No bookings found matching your search criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-muted">
          <span>Showing {filteredBookings.length} entries</span>
        </div>
      </div>
    </div>
  );
}
