/**
 * The five icons the home page repeats (36 map pins, 31 arrows, 26 stars, 14
 * ticks, 10 diagonal arrows) as one in-page SVG sprite. Each use is a short
 * <svg><use/></svg> instead of the full lucide markup, which took about
 * 80 KB of HTML and the same again in the hydration payload. The paths are
 * lucide's own (map-pin, arrow-right, star, circle-check, arrow-up-right).
 * The stroke, fill and size attributes every icon shares live in one CSS rule
 * (.ico in globals.css) instead of being repeated on each element.
 *
 *   <IconSprite />                         once, early in the page
 *   <SpriteIcon name="map-pin" className="w-5 h-5" />
 */
const ICONS = {
  "map-pin": (
    <>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  star: (
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  ),
  "circle-check": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
};

export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden="true">
      {Object.entries(ICONS).map(([name, body]) => (
        <symbol key={name} id={`i-${name}`} viewBox="0 0 24 24">
          {body}
        </symbol>
      ))}
    </svg>
  );
}

export default function SpriteIcon({ name, className, ...props }) {
  return (
    <svg viewBox="0 0 24 24" className={className ? `ico ${className}` : "ico"} aria-hidden="true" {...props}>
      <use href={`#i-${name}`} />
    </svg>
  );
}
