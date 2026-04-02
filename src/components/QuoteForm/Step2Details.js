"use client";

import { MapPin } from "lucide-react";

export default function Step2Details({ data, onChange, errors }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-2 text-gray-900">
        Where are you moving?
      </h3>
      <p className="text-muted text-sm mb-6">
        Enter your postcodes so we can calculate the distance.
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
      </div>
    </div>
  );
}
