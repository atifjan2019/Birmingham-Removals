"use client";

import { useState } from "react";
import { calculateQuote, EXTRA_PRICES } from "@/lib/quoteCalculator";
import {
  Home,
  Building2,
  DoorOpen,
  Package,
  MapPin,
  Calendar,
  BedDouble,
  User,
  Phone,
  Mail,
  Loader2,
  Send,
} from "lucide-react";

const moveTypeLabels = {
  house: { label: "House Move", icon: Home },
  office: { label: "Office Move", icon: Building2 },
  studio: { label: "Studio / Flat", icon: DoorOpen },
  single: { label: "Single Items", icon: Package },
};

const extraLabels = {
  packing: "Packing Service",
  dismantling: "Furniture Dismantling",
  storage: "Storage (1 Month)",
  cleaning: "End of Tenancy Clean",
};

export default function Step5Summary({ formData, onSubmit }) {
  const [submitting, setSubmitting] = useState(false);

  const quote = calculateQuote(
    formData.moveType,
    formData.bedrooms || 1,
    formData.extras || []
  );

  const moveInfo = moveTypeLabels[formData.moveType] || moveTypeLabels.house;
  const MoveIcon = moveInfo.icon;

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmitting(false);
    onSubmit();
  };

  return (
    <div>
      <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-2">
        Review Your Quote
      </h3>
      <p className="text-muted text-sm mb-6">
        Check everything looks right, then hit submit. We&apos;ll be in touch
        within 2 hours.
      </p>

      <div className="space-y-4">
        {/* Move Type */}
        <div className="glass-card p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MoveIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted">Move Type</div>
            <div className="font-semibold text-foreground text-sm">
              {moveInfo.label}
            </div>
          </div>
        </div>

        {/* Locations & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <div>
              <div className="text-xs text-muted">From</div>
              <div className="font-semibold text-foreground text-sm">
                {formData.fromPostcode || "—"}
              </div>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-accent shrink-0" />
            <div>
              <div className="text-xs text-muted">To</div>
              <div className="font-semibold text-foreground text-sm">
                {formData.toPostcode || "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <div>
              <div className="text-xs text-muted">Move Date</div>
              <div className="font-semibold text-foreground text-sm">
                {formData.moveDate
                  ? new Date(formData.moveDate).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </div>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-3">
            <BedDouble className="w-5 h-5 text-primary shrink-0" />
            <div>
              <div className="text-xs text-muted">Bedrooms</div>
              <div className="font-semibold text-foreground text-sm">
                {formData.bedrooms === 0
                  ? "Studio"
                  : formData.bedrooms >= 6
                  ? "6+"
                  : formData.bedrooms || 1}
              </div>
            </div>
          </div>
        </div>

        {/* Extras */}
        {formData.extras && formData.extras.length > 0 && (
          <div className="glass-card p-4">
            <div className="text-xs text-muted mb-2">Extra Services</div>
            <div className="flex flex-wrap gap-2">
              {formData.extras.map((extra) => (
                <span
                  key={extra}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {extraLabels[extra]} (+£{EXTRA_PRICES[extra]})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="glass-card p-4 space-y-2">
          <div className="text-xs text-muted mb-2">Contact Details</div>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted" />
            <span className="text-foreground">{formData.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted" />
            <span className="text-foreground">{formData.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted" />
            <span className="text-foreground">{formData.email}</span>
          </div>
        </div>

        {/* Price Estimate */}
        <div className="glass-card p-6 text-center border-primary/20">
          <div className="text-sm text-muted mb-2">Estimated Quote</div>
          <div className="font-[family-name:var(--font-space)] text-4xl font-bold">
            <span className="text-primary">£{quote.min}</span>
            <span className="text-muted mx-2">—</span>
            <span className="text-primary">£{quote.max}</span>
          </div>
          <div className="text-xs text-muted mt-2">
            Final price confirmed after our team reviews your details
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Quote Request
            </>
          )}
        </button>
      </div>
    </div>
  );
}
