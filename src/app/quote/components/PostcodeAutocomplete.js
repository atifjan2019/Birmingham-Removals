"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MapPin } from "lucide-react";

// postcodes.io: a free, open UK postcode service that needs no key. It is
// sent only the letters typed into this box, and answers with postcodes that
// start with them.
const LOOKUP = "https://api.postcodes.io/postcodes";

/**
 * A postcode box that suggests UK postcodes as the customer types. The
 * suggestions are a help, not a gate: if the lookup is slow, down or blocked,
 * the box is still an ordinary text field and the form checks the postcode's
 * shape itself.
 */
export default function PostcodeAutocomplete({
  value,
  onChange,
  placeholder = "e.g. B15 3DH",
  autoFocus = false,
}) {
  const listId = useId();
  const [text, setText] = useState(value || "");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const picked = useRef("");

  // Suggestions for what is typed, a moment after the typing stops. An answer
  // that arrives after more typing is dropped.
  useEffect(() => {
    const query = text.trim();
    // Too short to look up, or just picked from the list: nothing to fetch.
    // (The list itself is cleared where the typing or the pick happens.)
    if (query.length < 2 || query === picked.current) return undefined;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`${LOOKUP}/${encodeURIComponent(query)}/autocomplete?limit=6`, {
          signal: controller.signal,
        });
        const data = response.ok ? await response.json() : null;
        const found = Array.isArray(data?.result) ? data.result : [];
        setOptions(found);
        setActive(-1);
      } catch {
        // No suggestions this time: the box still works as a plain field.
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text]);

  const update = (next) => {
    const upper = next.toUpperCase();
    setText(upper);
    onChange(upper);
  };

  const choose = (postcode) => {
    picked.current = postcode;
    setOptions([]);
    setOpen(false);
    update(postcode);
  };

  const onKeyDown = (event) => {
    if (!open || !options.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index <= 0 ? options.length - 1 : index - 1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      choose(options[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  // Nothing to offer once the only suggestion is exactly what has been typed:
  // the list would just sit over the Continue button.
  const showing = open && options.length > 0 && !(options.length === 1 && options[0] === text.trim());

  return (
    <div className="relative">
      <MapPin aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted z-10" />
      <input
        type="text"
        role="combobox"
        aria-expanded={showing}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showing && active >= 0 ? `${listId}-${active}` : undefined}
        aria-label="Postcode"
        autoComplete="postal-code"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder={placeholder}
        value={text}
        autoFocus={autoFocus}
        onChange={(event) => {
          picked.current = "";
          setOpen(true);
          if (event.target.value.trim().length < 2) setOptions([]);
          update(event.target.value);
        }}
        onFocus={() => setOpen(true)}
        // Late enough for a press on a suggestion to land first.
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-gray-900 text-lg placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
      />
      {showing && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          {options.map((postcode, index) => (
            <li
              key={postcode}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === active}
              // Before the box loses focus, so the press is not lost.
              onMouseDown={(event) => {
                event.preventDefault();
                choose(postcode);
              }}
              onMouseEnter={() => setActive(index)}
              className={`cursor-pointer px-4 py-3 text-base text-gray-900 ${index === active ? "bg-primary/10" : "hover:bg-gray-50"}`}
            >
              {postcode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
