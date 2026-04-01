"use client";

import { useState } from "react";
import { createBooking } from "@/app/actions/booking";
import { CalendarDays, MapPin, User, Mail, Phone, Home } from "lucide-react";

export default function ManualBookingModal({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      moveType: formData.get("moveType"),
      fromPostcode: formData.get("fromPostcode"),
      toPostcode: formData.get("toPostcode"),
      moveDate: formData.get("moveDate"),
      bedrooms: parseInt(formData.get("bedrooms")) || 1,
      extras: [], // Can add checkboxes later if needed locally
    };

    const result = await createBooking(data);

    if (result.success) {
      setLoading(false);
      onClose(); // Close and let parent refresh via revalidatePath sent by server action
    } else {
      setError(result.error || "Failed to create booking manually.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold font-[family-name:var(--font-space)] text-gray-900">Add Manual Booking</h2>
            <p className="text-xs text-muted mt-1">Bypass the frontend funnel and create a booking directly.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

          <form id="manual-booking-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Customer Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2"><User className="w-4 h-4"/> Customer Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                  <input required name="fullName" type="text" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <input required name="email" type="email" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="07123 456 789" />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Move Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2"><Home className="w-4 h-4"/> Move Logistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Move Type</label>
                  <select name="moveType" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-primary outline-none bg-white">
                    <option value="house">House Removal</option>
                    <option value="office">Office Relocation</option>
                    <option value="man-and-van">Man & Van Service</option>
                    <option value="packing">Packing Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From Postcode</label>
                  <div className="relative">
                    <input required name="fromPostcode" type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl outline-none uppercase" placeholder="NE1 1AD" />
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To Postcode</label>
                  <div className="relative">
                    <input required name="toPostcode" type="text" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl outline-none uppercase" placeholder="NE2 4BC" />
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Move Date</label>
                  <div className="relative">
                    <input required name="moveDate" type="date" className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl outline-none uppercase" />
                    <CalendarDays className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Bedrooms / Size</label>
                  <input required name="bedrooms" type="number" min="0" max="10" defaultValue="2" className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold transition-colors">
            Cancel
          </button>
          <button 
            type="submit" 
            form="manual-booking-form"
            disabled={loading}
            className={`px-6 py-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors font-semibold ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? "Creating..." : "Create Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
