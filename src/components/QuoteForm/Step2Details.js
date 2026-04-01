"use client";

import { MapPin, Calendar, BedDouble, Minus, Plus } from "lucide-react";

export default function Step2Details({ data, onChange, errors }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const adjustBedrooms = (delta) => {
    const next = Math.max(0, Math.min(6, (data.bedrooms || 0) + delta));
    handleChange("bedrooms", next);
  };

  return (
    <div>
      <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-2 text-gray-900">
        Move Details
      </h3>
      <p className="text-muted text-sm mb-6">
        Tell us the key details so we can give you an accurate quote.
      </p>

      <div className="space-y-5">
        {/* From Postcode */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Moving from
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="e.g. NE1 4XF"
              value={data.fromPostcode || ""}
              onChange={(e) =>
                handleChange("fromPostcode", e.target.value.toUpperCase())
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors?.fromPostcode && (
            <p className="text-red-500 text-xs mt-1">{errors.fromPostcode}</p>
          )}
        </div>

        {/* To Postcode */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Moving to
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="e.g. NE3 2PA"
              value={data.toPostcode || ""}
              onChange={(e) =>
                handleChange("toPostcode", e.target.value.toUpperCase())
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors?.toPostcode && (
            <p className="text-red-500 text-xs mt-1">{errors.toPostcode}</p>
          )}
        </div>

        {/* Move Date */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Move date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="date"
              value={data.moveDate || ""}
              onChange={(e) => handleChange("moveDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors?.moveDate && (
            <p className="text-red-500 text-xs mt-1">{errors.moveDate}</p>
          )}
        </div>

        {/* Bedrooms Stepper */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Number of bedrooms
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => adjustBedrooms(-1)}
              className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Minus className="w-5 h-5 text-muted" />
            </button>
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-2">
                <BedDouble className="w-5 h-5 text-primary" />
                <span className="font-[family-name:var(--font-space)] text-2xl font-bold text-gray-900">
                  {data.bedrooms === 0
                    ? "Studio"
                    : data.bedrooms >= 6
                    ? "6+"
                    : data.bedrooms || 1}
                </span>
              </div>
              <span className="text-xs text-muted">
                {data.bedrooms === 0 ? "studio / bedsit" : data.bedrooms === 1 ? "bedroom" : "bedrooms"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => adjustBedrooms(1)}
              className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Plus className="w-5 h-5 text-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
