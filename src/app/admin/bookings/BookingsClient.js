"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, MoreVertical, CheckCircle2, Clock, CalendarDays, Trash2, ChevronRight } from "lucide-react";
import { updateBookingStatus, deleteBooking, updateBookingFinancials } from "@/app/actions/booking";
import { PoundSterling } from "lucide-react";

function ActionButton({ bookingId, currentStatus }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpdate = async (status) => {
    setLoading(true);
    await updateBookingStatus(bookingId, status);
    setLoading(false);
    setOpen(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setLoading(true);
      await deleteBooking(bookingId);
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        disabled={loading}
        className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100">
          <div className="p-1">
            {currentStatus !== "New" && (
              <button
                onClick={(e) => { e.stopPropagation(); handleUpdate("New"); }}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Mark as New
              </button>
            )}
            {currentStatus !== "Upcoming" && (
              <button
                onClick={(e) => { e.stopPropagation(); handleUpdate("Upcoming"); }}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Clock className="w-4 h-4 text-blue-500" /> Mark as Upcoming
              </button>
            )}
            {currentStatus !== "Completed" && (
              <button
                onClick={(e) => { e.stopPropagation(); handleUpdate("Completed"); }}
                className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Mark as Completed
              </button>
            )}
          </div>
          <div className="p-1">
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingDetailsModal({ booking, onClose }) {
  const [status, setStatus] = useState(booking?.status || "New");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [jobCost, setJobCost] = useState(booking?.jobCost || "");
  const [expenses, setExpenses] = useState(booking?.expenses || "");
  const [savingFinancials, setSavingFinancials] = useState(false);
  const [financialsSaved, setFinancialsSaved] = useState(false);
  const saveTimeout = useRef(null);

  const calculatedProfit = (parseFloat(jobCost) || 0) - (parseFloat(expenses) || 0);

  // Auto-save financials with debounce
  useEffect(() => {
    if (status !== "Completed") return;
    const jc = parseFloat(jobCost);
    const ex = parseFloat(expenses);
    if (isNaN(jc) && isNaN(ex)) return;

    setFinancialsSaved(false);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      setSavingFinancials(true);
      await updateBookingFinancials(booking?.id, jobCost, expenses);
      setSavingFinancials(false);
      setFinancialsSaved(true);
      setTimeout(() => setFinancialsSaved(false), 2000);
    }, 1000);

    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [jobCost, expenses, status]);

  if (!booking) return null;

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    setStatus(newStatus);
    await updateBookingStatus(booking.id, newStatus);
    setUpdating(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to permanently delete this booking? This cannot be undone.")) {
      setDeleting(true);
      await deleteBooking(booking.id);
      setDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold font-[family-name:var(--font-space)] text-gray-900">Booking Details</h2>
            <p className="text-xs text-muted mt-1 font-mono uppercase tracking-wider">ID: {booking.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Customer</div>
              <div className="font-semibold text-gray-900">{booking.customer?.fullName}</div>
              <div className="text-sm text-gray-600 mt-1">{booking.customer?.phone}</div>
              <div className="text-sm text-gray-600">{booking.customer?.email}</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">Move Details</div>
              <div className="font-semibold text-gray-900 capitalize">{booking.moveType?.replace(/-/g, ' ')}{booking.bedrooms > 0 ? ` • ${booking.bedrooms} Bed` : ''}</div>
              <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-muted" />
                {booking.moveDate ? new Date(booking.moveDate).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : "N/A"}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Logistics</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-muted mb-1">Pickup Address</div>
                <div className="font-bold text-gray-900">{booking.fromPostcode}</div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-300 hidden sm:block shrink-0" />
              <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-xs text-muted mb-1">Dropoff Address</div>
                <div className="font-bold text-gray-900">{booking.toPostcode}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Status</h3>
            <div className="flex flex-wrap gap-2">
              {["New", "Upcoming", "Completed", "Abandoned"].map((s) => {
                const active = status === s;
                const colors = {
                  New: active ? "bg-amber-500 text-white border-amber-500 shadow-amber-200" : "bg-white text-amber-700 border-amber-200 hover:bg-amber-50",
                  Upcoming: active ? "bg-blue-500 text-white border-blue-500 shadow-blue-200" : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50",
                  Completed: active ? "bg-emerald-500 text-white border-emerald-500 shadow-emerald-200" : "bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50",
                  Abandoned: active ? "bg-gray-500 text-white border-gray-500 shadow-gray-200" : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50",
                };
                return (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    disabled={updating || active}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${colors[s]} ${active ? "shadow-md cursor-default" : "cursor-pointer"} ${updating ? "opacity-50" : ""}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Financial Section - shown when Completed */}
          {status === "Completed" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                <PoundSterling className="w-5 h-5 text-emerald-500" /> Job Financials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1.5">Total Job Cost</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">£</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={jobCost}
                      onChange={(e) => setJobCost(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 outline-none text-sm font-semibold text-gray-900 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1.5">Expenses</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">£</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={expenses}
                      onChange={(e) => setExpenses(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-1 focus:ring-amber-200 outline-none text-sm font-semibold text-gray-900 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1.5">Profit</label>
                  <div className={`flex items-center gap-1 px-4 py-2.5 rounded-xl border-2 font-bold text-lg ${calculatedProfit >= 0 ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"}`}>
                    £{calculatedProfit.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 h-5 flex items-center">
                {savingFinancials && <span className="text-amber-500 font-medium animate-pulse">Saving...</span>}
                {financialsSaved && <span className="text-emerald-500 font-medium">✓ Saved automatically</span>}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Additional Details</h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="text-xs text-muted mb-1 font-semibold uppercase tracking-wider">Extras Requested</div>
              {booking.extras && booking.extras.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {booking.extras.map((ex, i) => (
                    <span key={i} className="inline-flex px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md capitalize">
                      {ex}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">None</div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2.5 text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors font-semibold text-sm disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting..." : "Delete Booking"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl shadow-lg shadow-gray-900/20 hover:bg-gray-800 transition-colors font-semibold"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

import ManualBookingModal from "./ManualBookingModal";

export default function BookingsClient({ initialBookings }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAddingManual, setIsAddingManual] = useState(false);

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
        <button onClick={() => setIsAddingManual(true)} className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 shrink-0">
          + Add Booking manually
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        {/* Filters and Search */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-t-2xl bg-white">
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
          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="bg-gray-50 p-1 rounded-lg border border-gray-200 flex text-sm font-medium">
              {["All", "New", "Upcoming", "Completed", "Abandoned"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${statusFilter === status
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

        {/* Responsive Card List */}
        <div className="p-4 space-y-3 pb-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const firstLetter = booking.customer?.fullName?.[0]?.toUpperCase() || "?";
              const formattedDate = booking.moveDate
                ? new Date(booking.moveDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : "N/A";
              const shortId = booking.id.split('-')[0];

              return (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className="group bg-white rounded-xl border border-gray-100 shadow-[0_1px_4px_-1px_rgba(0,0,0,0.04)] hover:border-primary/30 hover:shadow-[0_4px_20px_-4px_rgba(227,30,36,0.1)] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Mobile: stacked | Desktop: single row */}
                  <div className="flex flex-col lg:flex-row lg:items-center gap-0 lg:gap-6 p-4">
                    
                    {/* Row 1: Avatar + Name + Status (always visible) */}
                    <div className="flex items-center justify-between lg:justify-start gap-3 lg:w-[220px] shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {firstLetter}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{booking.customer?.fullName || "Unknown"}</div>
                          <div className="text-[11px] text-gray-400 font-mono tracking-wider">#{shortId}</div>
                        </div>
                      </div>
                      {/* Status badge - visible on mobile next to name, hidden on lg */}
                      <div className="flex items-center gap-2 lg:hidden">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          booking.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          booking.status === "Upcoming" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                          booking.status === "Abandoned" ? "bg-gray-100 text-gray-500 border border-gray-200" :
                          "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {(booking.status === "New" || booking.status === "Abandoned") && <span className={`w-1.5 h-1.5 rounded-full ${booking.status === "New" ? "bg-amber-500 animate-pulse" : "bg-gray-400"}`} />}
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {/* Row 2 (mobile) / inline (desktop): Details grid */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 lg:mt-0 pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6">
                      <div>
                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Route</div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {booking.fromPostcode} <span className="text-gray-300">→</span> {booking.toPostcode}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5 capitalize">
                          {booking.moveType?.replace(/-/g, ' ')}{booking.bedrooms > 0 ? ` • ${booking.bedrooms} Bed` : ''}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Date</div>
                        <div className="text-sm font-medium text-gray-900">{formattedDate}</div>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Contact</div>
                        <div className="text-sm font-medium text-gray-900">{booking.customer?.phone || "—"}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5 truncate">{booking.customer?.email || "—"}</div>
                      </div>
                    </div>

                    {/* Status (desktop only) */}
                    <div className="hidden lg:flex items-center shrink-0">
                      <div className="flex flex-col items-end gap-1">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          booking.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          booking.status === "Upcoming" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                          booking.status === "Abandoned" ? "bg-gray-100 text-gray-500 border border-gray-200" :
                          "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          {(booking.status === "New" || booking.status === "Abandoned") && <span className={`w-1.5 h-1.5 rounded-full ${booking.status === "New" ? "bg-amber-500 animate-pulse" : "bg-gray-400"}`} />}
                          {booking.status}
                        </span>
                        {booking.status === "Completed" && booking.profit != null && (
                          <span className={`text-[11px] font-bold ${booking.profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                            £{booking.profit.toFixed(2)} profit
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold">No bookings found</p>
              <p className="text-sm text-gray-400 mt-1">Try tweaking your search or filters.</p>
            </div>
          )}
        </div>

        {/* Entry count */}
        <div className="px-4 pb-4 flex items-center justify-between text-sm text-gray-400">
          <span>Showing {filteredBookings.length} entries</span>
        </div>
      </div>

      <BookingDetailsModal key={selectedBooking?.id} booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      {isAddingManual && <ManualBookingModal onClose={() => setIsAddingManual(false)} />}
    </div>
  );
}
