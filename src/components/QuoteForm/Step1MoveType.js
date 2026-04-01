"use client";

import { Home, Building2, DoorOpen, Package } from "lucide-react";

const moveTypes = [
  {
    id: "house",
    icon: Home,
    title: "House Move",
    description: "Full house relocation",
  },
  {
    id: "office",
    icon: Building2,
    title: "Office Move",
    description: "Business relocation",
  },
  {
    id: "studio",
    icon: DoorOpen,
    title: "Studio / Flat",
    description: "Smaller property move",
  },
  {
    id: "single",
    icon: Package,
    title: "Single Items",
    description: "Individual pieces",
  },
];

export default function Step1MoveType({ value, onChange, error }) {
  return (
    <div>
      <h3 className="font-[family-name:var(--font-space)] text-2xl font-bold mb-2 text-gray-900">
        What are you moving?
      </h3>
      <p className="text-muted text-sm mb-6">
        Select the type of move and we&apos;ll tailor your quote.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {moveTypes.map((type) => {
          const selected = value === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onChange(type.id)}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center ${
                selected
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-gray-200 bg-gray-50/50 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                  selected ? "bg-primary/20" : "bg-primary/10"
                }`}
              >
                <type.icon
                  className={`w-7 h-7 transition-colors ${
                    selected ? "text-primary" : "text-primary/70"
                  }`}
                />
              </div>
              <div>
                <div
                  className={`font-semibold text-sm ${
                    selected ? "text-primary" : "text-gray-900"
                  }`}
                >
                  {type.title}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  {type.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-4">{error}</p>
      )}
    </div>
  );
}
