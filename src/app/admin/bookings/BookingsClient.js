"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, MoreVertical, CheckCircle2, Clock, CalendarDays, Trash2, ChevronRight } from "lucide-react";
import { updateBookingStatus, deleteBooking } from "@/app/actions/booking";

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
  if (!booking) return null;

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
              <div className="font-semibold text-gray-900 capitalize">{booking.moveType}</div>
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

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-right">
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
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-0 rounded-t-2xl bg-white overflow-hidden">
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
                  className={`px-3 py-1.5 rounded-md transition-colors ${statusFilter === status
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

        {/* Floating Card List */}
        <div className="space-y-4 pb-32">
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
                  className="group flex flex-col xl:flex-row xl:items-center justify-between gap-6 p-4 sm:p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-primary/40 hover:shadow-[0_8px_30px_-4px_rgba(227,30,36,0.12)] transition-all duration-300 cursor-pointer"
                >
                  {/* Left: Avatar & Name */}
                  <div className="flex items-center gap-4 xl:w-[280px] shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg shadow-sm">
                      {firstLetter}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-base">{booking.customer?.fullName || "Unknown"}</div>
                      <div className="text-xs text-muted font-mono mt-0.5 tracking-wider uppercase text-gray-400">ID: {shortId}</div>
                    </div>
                  </div>

                  {/* Middle: Grid Details */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 border-y xl:border-y-0 xl:border-l border-gray-100 py-4 xl:py-0 xl:pl-6">
                    <div>
                      <div className="text-[11px] text-muted font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center">🚚</span> Move Route
                      </div>
                      <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {booking.fromPostcode} <span className="opacity-40 px-1">→</span> {booking.toPostcode}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 capitalize">
                        {booking.moveType?.replace(/-/g, ' ')} {booking.bedrooms > 0 && `• ${booking.bedrooms} Bed`}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-muted font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <CalendarDays className="w-3.5 h-3.5" /> Date
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{formattedDate}</div>
                    </div>

                    <div>
                      <div className="text-[11px] text-muted font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        </span> Contact
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{booking.customer?.phone || "N/A"}</div>
                      <div className="text-xs text-gray-500 mt-1 truncate max-w-[140px]">{booking.customer?.email || "N/A"}</div>
                    </div>
                  </div>

                  {/* Right: Status & Actions */}
                  <div className="flex items-center justify-between xl:justify-end gap-6 shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      booking.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                      booking.status === "Upcoming" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                      "bg-amber-50 text-amber-700 border border-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    }`}>
                      {booking.status === "New" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                      {booking.status}
                    </span>

                    <div className="pl-4 border-l border-gray-100 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                      <ActionButton bookingId={booking.id} currentStatus={booking.status} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center text-muted">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold text-lg">No bookings found</p>
              <p className="text-sm mt-1">Try tweaking your search criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination Dummy */}
        <div className="flex items-center justify-between text-sm text-muted mt-6">
          <span>Showing {filteredBookings.length} entries</span>
        </div>
      </div>

      <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
      {isAddingManual && <ManualBookingModal onClose={() => setIsAddingManual(false)} />}
    </div>
  );
}
