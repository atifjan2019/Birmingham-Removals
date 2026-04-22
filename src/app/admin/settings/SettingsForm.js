"use client";

import { useActionState, useState, useRef } from "react";
import { Phone, Mail, MapPin, Loader2, AlertCircle } from "lucide-react";
import { updateSiteSettings } from "@/app/actions/settings";

const svg = (props) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

const ImageIcon = (p) => (
  <svg {...svg(p)}><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
);
const Upload = (p) => (
  <svg {...svg(p)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
);
const Trash2 = (p) => (
  <svg {...svg(p)}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
);
const CheckCircle2 = (p) => (
  <svg {...svg(p)}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
);
const Facebook = (p) => (
  <svg {...svg(p)}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Instagram = (p) => (
  <svg {...svg(p)}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const Twitter = (p) => (
  <svg {...svg(p)}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Linkedin = (p) => (
  <svg {...svg(p)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const Youtube = (p) => (
  <svg {...svg(p)}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
);
const Music2 = (p) => (
  <svg {...svg(p)}><circle cx="8" cy="18" r="4" /><path d="M12 18V2l7 4" /></svg>
);
const MessageCircle = (p) => (
  <svg {...svg(p)}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></svg>
);

const SOCIALS = [
  { key: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourhandle" },
  { key: "twitter", label: "Twitter / X", icon: Twitter, placeholder: "https://x.com/yourhandle" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/..." },
  { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@yourchannel" },
  { key: "tiktok", label: "TikTok", icon: Music2, placeholder: "https://tiktok.com/@yourhandle" },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle, placeholder: "https://wa.me/447365380090" },
];

function ImageUploader({ name, label, currentSrc, accept, hint, onRemove, removeName }) {
  const [preview, setPreview] = useState(currentSrc || "");
  const [removed, setRemoved] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setRemoved(false);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleRemove = () => {
    setPreview("");
    setRemoved(true);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
          {preview ? (
            <img src={preview} alt={label} className="w-full h-full object-contain" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-300" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Choose file
              <input
                ref={inputRef}
                type="file"
                name={name}
                accept={accept}
                className="hidden"
                onChange={handleFile}
              />
            </label>
            {(preview || currentSrc) && (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
          <p className="text-xs text-muted mt-2">{hint}</p>
        </div>
      </div>
      <input type="hidden" name={removeName} value={removed ? "1" : ""} />
    </div>
  );
}

function TextInput({ name, label, defaultValue, placeholder, type = "text", icon: Icon, multiline }) {
  const Common = (
    <>
      {Icon && <Icon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />}
    </>
  );
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-900 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Common}
        {multiline ? (
          <textarea
            id={name}
            name={name}
            rows={2}
            defaultValue={defaultValue || ""}
            placeholder={placeholder}
            className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            defaultValue={defaultValue || ""}
            placeholder={placeholder}
            className={`w-full ${Icon ? "pl-9" : "pl-3"} pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all`}
          />
        )}
      </div>
    </div>
  );
}

export default function SettingsForm({ initial }) {
  const [state, formAction, pending] = useActionState(updateSiteSettings, {});

  return (
    <form action={formAction} className="space-y-6">
      {/* Brand Identity */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1 font-[family-name:var(--font-space)]">Brand Identity</h2>
        <p className="text-sm text-muted mb-5">Logo appears in the header & footer; favicon appears in browser tabs.</p>

        <div className="space-y-6">
          <ImageUploader
            name="logo"
            removeName="removeLogo"
            label="Logo"
            currentSrc={initial.logoUrl}
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            hint="PNG, JPG, WebP or SVG. Max 500 KB. Recommended height ~60px."
          />
          <ImageUploader
            name="favicon"
            removeName="removeFavicon"
            label="Favicon"
            currentSrc={initial.faviconUrl}
            accept="image/png,image/x-icon,image/svg+xml,image/vnd.microsoft.icon"
            hint="ICO, PNG or SVG. Max 100 KB. Square (32×32 or 64×64) works best."
          />
          <ImageUploader
            name="footerLogo"
            removeName="removeFooterLogo"
            label="Footer Logo"
            currentSrc={initial.footerLogoUrl}
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            hint="Optional. Used in the dark footer instead of the main logo. PNG, JPG, WebP or SVG. Max 500 KB."
          />
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1 font-[family-name:var(--font-space)]">Contact Information</h2>
        <p className="text-sm text-muted mb-5">Used in the navbar, footer, contact page and structured data.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            name="phone"
            label="Phone"
            icon={Phone}
            type="tel"
            defaultValue={initial.phone}
            placeholder="07365 380090"
          />
          <TextInput
            name="email"
            label="Email"
            icon={Mail}
            type="email"
            defaultValue={initial.email}
            placeholder="info@birminghamremovals.uk"
          />
          <div className="md:col-span-2">
            <TextInput
              name="address"
              label="Address"
              icon={MapPin}
              defaultValue={initial.address}
              placeholder="Birmingham, West Midlands, UK"
              multiline
            />
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-1 font-[family-name:var(--font-space)]">Social Links</h2>
        <p className="text-sm text-muted mb-5">Leave blank to hide an icon from the footer.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SOCIALS.map((s) => (
            <TextInput
              key={s.key}
              name={s.key}
              label={s.label}
              icon={s.icon}
              type="url"
              defaultValue={initial[s.key]}
              placeholder={s.placeholder}
            />
          ))}
        </div>
      </section>

      {/* Save bar */}
      <div className="sticky bottom-4 z-10">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex items-center justify-between gap-4">
          <div className="text-sm">
            {state?.error && (
              <span className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" /> {state.error}
              </span>
            )}
            {state?.success && !pending && (
              <span className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Saved.
              </span>
            )}
            {!state?.error && !state?.success && (
              <span className="text-muted">Changes apply across the site immediately.</span>
            )}
          </div>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-primary/20"
          >
            {pending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving…
              </>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
