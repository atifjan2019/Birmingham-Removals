"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { loadGoogleMaps } from "@/lib/googleMaps";

/**
 * A styled postcode input backed by Google Places Autocomplete.
 *
 * Restricted to UK (country: "gb"). As the user types an address or postcode,
 * Google renders its own suggestion dropdown. When a suggestion is picked we
 * pull the postal_code component out of the result and push it up via onChange
 * (falling back to the formatted address if no postcode is present).
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
    let autocomplete;
    let listener;
    let cancelled = false;

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !google || !inputRef.current) return;

        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "gb" },
          fields: ["address_components", "formatted_address"],
          types: ["geocode"],
        });

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const postcode = place?.address_components?.find((c) =>
            c.types.includes("postal_code")
          )?.long_name;
          const next = postcode || place?.formatted_address || "";
          if (next) onChangeRef.current(next.toUpperCase());
        });
      })
      .catch(() => {
        // If the API fails to load the field still works as a plain text input.
      });

    return () => {
      cancelled = true;
      if (listener) listener.remove();
      // Remove any leftover Google dropdown containers on unmount.
      document
        .querySelectorAll(".pac-container")
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="relative">
      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted z-10" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
      />
    </div>
  );
}
