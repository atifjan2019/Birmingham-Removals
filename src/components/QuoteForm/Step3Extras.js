"use client";

import { Package, Wrench, Warehouse, Sparkles } from "lucide-react";

const extras = [
  {
    id: "packing",
    icon: Package,
    title: "Packing Service",
    description: "We pack everything for you",
    price: 120,
  },
  {
    id: "dismantling",
    icon: Wrench,
    title: "Furniture Dismantling",
    description: "Beds, wardrobes & desks",
    price: 80,
  },
  {
    id: "storage",
    icon: Warehouse,
    title: "Storage (1 Month)",
    description: "Secure storage facility",
    price: 150,
  },
  {
    id: "cleaning",
    icon: Sparkles,
    title: "End of Tenancy Clean",
    description: "Professional deep clean",
    price: 200,
  },
];

export default function Step3Extras({ selected, onChange }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>
      <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-2 text-gray-900">
        Need any extras?
      </h3>
      <p className="text-muted text-sm mb-6">
        Select any additional services. These are optional, skip if you
        don&apos;t need them.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {extras.map((extra) => {
          const isSelected = selected.includes(extra.id);
          return (
            <button
              key={extra.id}
              type="button"
              onClick={() => toggle(extra.id)}
              className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "bg-primary/15" : "bg-gray-100"
                }`}
              >
                <extra.icon
                  className={`w-6 h-6 transition-colors ${
                    isSelected ? "text-primary" : "text-muted"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-semibold text-sm ${
                      isSelected ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {extra.title}
                  </span>
                  <span className="text-xs font-bold text-primary shrink-0">
                    +£{extra.price}
                  </span>
                </div>
                <span className="text-xs text-muted">{extra.description}</span>
              </div>
              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-gray-300 bg-transparent"
                }`}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
