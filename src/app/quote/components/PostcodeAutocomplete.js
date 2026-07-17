"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { loadGoogleMaps } from "@/lib/googleMaps";

/**
 * A styled postcode input backed by Google Places Autocomplete.
 *
 * Restricted to UK (country: "gb"). As the user types an address or postcode,
 * Google renders its own suggestion dropdown; picking one pulls the postcode
 * out of the result and reports it via onChange.
 *
 * The input is UNCONTROLLED (defaultValue, not value). Google Autocomplete
 * writes directly to the input's DOM value, and a React-controlled value fights
 * that — it suppresses the prediction dropdown. Keeping it uncontrolled lets
 * Google work while onChange still keeps the parent's state in sync for
 * validation and the next step.
 *
 * Attachment polls until both the input and the Places library are ready, which
 * avoids load/mount ordering races (and React StrictMode's double-invoke in
 * dev) that could otherwise leave the widget unattached.
 */
export default function PostcodeAutocomplete({
  value,
  onChange,
  placeholder = "e.g. B15 3DH",
  autoFocus = false,
}) {
  const inputRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const node = inputRef.current;
    let cancelled = false;
    let listener;
    let pollTimer;
    let tries = 0;

    const attach = () => {
      if (cancelled) return;
      const el = inputRef.current;
      const places = window.google?.maps?.places;
      if (!el || !places) {
        if (tries++ < 100) pollTimer = setTimeout(attach, 100);
        return;
      }
      if (el.dataset.acReady === "1") return;
      el.dataset.acReady = "1";

      const autocomplete = new places.Autocomplete(el, {
        componentRestrictions: { country: "gb" },
        fields: ["address_components", "formatted_address"],
        types: ["geocode"],
      });

      listener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const postcode = place?.address_components?.find((c) =>
          c.types.includes("postal_code")
        )?.long_name;
        const next = (
          postcode ||
          place?.formatted_address ||
          el.value ||
          ""
        ).toUpperCase();
        el.value = next;
        onChangeRef.current(next);
      });
    };

    // Kick off the script load, then poll for readiness regardless of how the
    // promise settles (a resolved-but-already-loaded script never re-fires).
    loadGoogleMaps().finally(attach);

    return () => {
      cancelled = true;
      if (pollTimer) clearTimeout(pollTimer);
      if (listener) listener.remove();
      if (node) delete node.dataset.acReady;
    };
  }, []);

  return (
    <div className="relative">
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted z-10" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
      />
    </div>
  );
}
