"use client";

import { Shield, Award, Users, ThumbsUp, Clock, BadgeCheck } from "lucide-react";

const badges = [
  { icon: Shield, label: "£10m Goods-in-Transit Insurance" },
  { icon: BadgeCheck, label: "DBS-Checked Crews" },
  { icon: Award, label: "BAR Registered" },
  { icon: Users, label: "5,200+ Happy Customers" },
  { icon: ThumbsUp, label: "4.9 Google Rating" },
  { icon: Clock, label: "Same-Day Available" },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-[#F97316]" />
              </div>
              <span className="text-xs lg:text-sm font-semibold text-slate-700 leading-tight">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
