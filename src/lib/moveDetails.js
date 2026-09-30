// The questions on the move details form, in one place so the form, the
// server-side checks and the admin view all read the same lists.

export const PROPERTY_TYPES = [
  { id: "house", label: "House" },
  { id: "flat", label: "Flat" },
  { id: "other", label: "Office or other" },
];

export const FLOORS = [
  { id: "ground", label: "Ground" },
  { id: "1", label: "1st" },
  { id: "2", label: "2nd" },
  { id: "3", label: "3rd" },
  { id: "4+", label: "4th or higher" },
];

// Common items, grouped by room. A customer taps a count rather than typing,
// which is quicker on a phone and gives the office a list it can price from.
export const ITEM_GROUPS = [
  {
    id: "living",
    label: "Living room",
    items: ["Sofa (2-seater)", "Sofa (3-seater)", "Corner sofa", "Armchair", "Coffee table", "TV", "TV stand", "Bookcase or shelving"],
  },
  {
    id: "bedroom",
    label: "Bedrooms",
    items: ["Single bed", "Double bed", "King-size bed", "Mattress", "Wardrobe", "Chest of drawers", "Bedside table", "Dressing table"],
  },
  {
    id: "kitchen",
    label: "Kitchen and dining",
    items: ["Fridge freezer", "Washing machine", "Tumble dryer", "Dishwasher", "Cooker", "Microwave", "Dining table", "Dining chairs"],
  },
  {
    id: "other",
    label: "Office, garden and other",
    items: ["Desk", "Office chair", "Filing cabinet", "Bicycle", "Garden furniture", "Piano"],
  },
];

export const BOX_RANGES = [
  { id: "none", label: "None" },
  { id: "1-10", label: "1 to 10" },
  { id: "11-20", label: "11 to 20" },
  { id: "21-40", label: "21 to 40" },
  { id: "40+", label: "More than 40" },
];

export const MOVER_OPTIONS = [
  { id: "1", label: "1 person" },
  { id: "2", label: "2 people" },
  { id: "3", label: "3 people" },
  { id: "4+", label: "4 or more" },
  { id: "unsure", label: "Not sure, please advise" },
];

// Photos of the items, or a list the customer already has as a document.
export const MAX_FILES = 12;
export const MAX_FILE_BYTES = 15 * 1024 * 1024;
export const FILE_ACCEPT = "image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx,.rtf,.odt,.ods,.pages,.numbers";
// The API decides what a file is from the end of its name, and these are the
// endings it takes. Keep the two lists in step with worker-api/src/index.ts.
const IMAGE_NAME = /\.(jpe?g|png|webp|gif|heic|heif|avif|bmp)$/i;
const DOCUMENT_NAME = /\.(pdf|txt|csv|docx?|xlsx?|rtf|odt|ods|pages|numbers)$/i;

export function isImageFile(file) {
  // SVG is an image that can carry script, and the API does not take it.
  if ((file.type || "") === "image/svg+xml" || /\.svg$/i.test(file.name || "")) return false;
  return (file.type || "").startsWith("image/") || IMAGE_NAME.test(file.name || "");
}

/**
 * Whether a photo can go up under its own name. One that cannot (a .jfif or
 * .tif, or a name with no ending at all) is turned into a .jpg first.
 */
export function hasImageName(file) {
  return IMAGE_NAME.test(file.name || "");
}

export function isAcceptedFile(file) {
  return isImageFile(file) || DOCUMENT_NAME.test(file.name || "");
}

export const MOVE_TYPE_LABELS = {
  house: "House move",
  office: "Office move",
  flat: "Studio or flat",
  items: "Single items",
};

/** The answers' top-level keys: the unit the form saves, merges and restores by. */
export const DETAIL_KEYS = ["from", "to", "items", "boxes", "itemsNotes", "dismantle", "dismantleNotes", "movers", "notes"];

/** A blank set of answers. The API stores and returns exactly this shape. */
export function emptyDetails() {
  return {
    from: { type: "", floor: "", lift: "" },
    to: { type: "", floor: "", lift: "" },
    items: {},
    boxes: "",
    itemsNotes: "",
    dismantle: "",
    dismantleNotes: "",
    movers: "",
    notes: "",
  };
}

/**
 * What is still missing before the details can be sent, keyed by section.
 * The form shows these; the API runs the same rules again on its side, so a
 * request that skips the form cannot send half an answer.
 */
export function validateDetails(form, fileCount) {
  const errors = {};

  for (const side of ["from", "to"]) {
    const place = form[side] || {};
    if (!place.type) errors[side] = "Choose the type of property.";
    else if (place.type !== "house") {
      if (!place.floor) errors[side] = "Tell us which floor it is on.";
      else if (place.floor !== "ground" && !place.lift) errors[side] = "Tell us whether there is a lift.";
    }
  }

  const tapped = Object.values(form.items || {}).some((n) => n > 0);
  if (!tapped && String(form.itemsNotes || "").trim().length < 3 && fileCount === 0) {
    errors.items = "Tap some items, type a list, or add photos or a file, whichever is easiest.";
  }

  if (!form.dismantle) errors.dismantle = "Choose yes or no.";
  else if (form.dismantle === "yes" && String(form.dismantleNotes || "").trim().length < 2) {
    errors.dismantle = "Tell us which items need taking apart or putting together.";
  }

  if (!form.movers) errors.movers = "Choose how many people you need, or pick Not sure.";

  return errors;
}

const labelOf = (list, id) => list.find((option) => option.id === id)?.label || "";

function describePlace(place) {
  if (!place?.type) return "Not answered";
  const type = labelOf(PROPERTY_TYPES, place.type);
  if (place.type === "house") return type;
  if (!place.floor) return `${type}, floor not given`;
  if (place.floor === "ground") return `${type}, ground floor`;
  const lift = place.lift === "yes" ? "lift available" : place.lift === "no" ? "no lift" : "lift not answered";
  return `${type}, ${labelOf(FLOORS, place.floor)} floor, ${lift}`;
}

/**
 * The answers as label and value rows, in the order the form asks them, for
 * the admin screen and the email to the office. `list`, where present, is the
 * same value as separate lines. Rows with nothing to say are left out.
 */
export function describeDetails(details) {
  const d = { ...emptyDetails(), ...(details || {}) };
  const items = Object.entries(d.items || {})
    .filter(([, count]) => count > 0)
    .map(([name, count]) => `${count} x ${name}`);

  return [
    { label: "Moving from", value: describePlace(d.from) },
    { label: "Moving to", value: describePlace(d.to) },
    { label: "Items", value: items.length ? items.join(", ") : "None ticked", list: items },
    { label: "Boxes and bags", value: labelOf(BOX_RANGES, d.boxes) || "Not answered" },
    { label: "Also moving", value: String(d.itemsNotes || "").trim() },
    {
      label: "Dismantling",
      value:
        d.dismantle === "yes"
          ? `Yes: ${String(d.dismantleNotes || "").trim()}`
          : d.dismantle === "no"
            ? "Nothing to take apart or put together"
            : "Not answered",
    },
    { label: "People needed", value: labelOf(MOVER_OPTIONS, d.movers) || "Not answered" },
    { label: "Other notes", value: String(d.notes || "").trim() },
  ].filter((row) => row.value !== "");
}
