"use client";

import { User, Phone, Mail, HelpCircle } from "lucide-react";

const referralOptions = [
  { value: "", label: "Select an option" },
  { value: "google", label: "Google Search" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "friend", label: "Friend / Family" },
  { value: "leaflet", label: "Leaflet / Flyer" },
  { value: "repeat", label: "Used you before" },
  { value: "other", label: "Other" },
];

export default function Step4Contact({ data, onChange, errors }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-2 text-gray-900">
        Your Contact Details
      </h3>
      <p className="text-muted text-sm mb-6">
        We&apos;ll use these to send your quote. No spam, no selling your data.
      </p>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="John Smith"
              value={data.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors?.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Phone number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="tel"
              placeholder="07123 456 789"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors?.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="email"
              placeholder="john@example.com"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          {errors?.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Referral */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            How did you hear about us?
          </label>
          <div className="relative">
            <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <select
              value={data.referral || ""}
              onChange={(e) => handleChange("referral", e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all appearance-none"
            >
              {referralOptions.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-white text-gray-900"
                >
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Privacy note */}
        <p className="text-muted/70 text-xs leading-relaxed">
          By submitting this form you agree to us contacting you about your
          quote. We never share your data with third parties. Your information is
          stored securely and used only for providing your removals quote.
        </p>
      </div>
    </div>
  );
}
