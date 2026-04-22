"use client";

import { useActionState, useState, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Music2,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { updateSiteSettings } from "@/app/actions/settings";

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
