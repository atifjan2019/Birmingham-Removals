// How the move details form puts its own answers together with the server's
// copy when both have changed: answers given on another device, in another
// tab, or saved by this page with the reply lost on the way back. Each answer
// is merged on its own, and each item on the list counts as an answer of its
// own, so two people ticking different items do not undo each other.
// No browser code here, so the rules can be checked on their own.

import { DETAIL_KEYS, emptyDetails } from "./moveDetails.js";

// An item on the list, as an answer of its own: "items:Desk".
const ITEM = "items:";
// Dismantling is one answer in two parts, yes or no and which items, under the
// path "dismantle". The API keeps the items only while the answer is yes, so
// kept apart, a note hidden by a "no" given elsewhere would look like a change
// of its own, and a new note would be taken for a clash.
const DISMANTLE = "dismantle";
const MAX_ITEM_NAME = 60;
// Kept in step with the text boxes' maxLength and the API's limits.
const TEXT_LIMITS = { itemsNotes: 2000, dismantleNotes: 1000, notes: 2000 };
const PLACE_TYPES = ["house", "flat", "other"];
const FLOOR_IDS = ["ground", "1", "2", "3", "4+"];

/** Whether `path` names an answer the form has: a question, or an item on the list. */
export function isAnswerPath(path) {
  if (typeof path !== "string") return false;
  if (path.startsWith(ITEM)) return path.length > ITEM.length && path.length <= ITEM.length + MAX_ITEM_NAME;
  return path !== "items" && path !== "dismantleNotes" && DETAIL_KEYS.includes(path);
}

/** One answer, read by path. An item that is not on the list counts as none. */
export function readAnswer(details, path) {
  if (path.startsWith(ITEM)) return details?.items?.[path.slice(ITEM.length)] || 0;
  if (path === DISMANTLE) return { dismantle: details?.dismantle ?? "", dismantleNotes: details?.dismantleNotes ?? "" };
  return details?.[path];
}

/** A copy of `details` with the given [path, value] answers written in. */
export function writeAnswers(details, answers) {
  const next = { ...details, items: { ...(details?.items || {}) } };
  for (const [path, value] of answers) {
    if (path.startsWith(ITEM)) {
      const name = path.slice(ITEM.length);
      if (value > 0) next.items[name] = value;
      else delete next.items[name];
    } else if (path === DISMANTLE) {
      next.dismantle = value?.dismantle ?? "";
      next.dismantleNotes = value?.dismantleNotes ?? "";
    } else {
      next[path] = value;
    }
  }
  return next;
}

// An answer in the form the API stores it in, as text, so that an answer and
// its stored copy always compare equal (the API drops a floor for a house,
// and a lift for a ground floor, for instance).
function answerText(path, value) {
  if (path.startsWith(ITEM)) {
    const count = typeof value === "number" && Number.isFinite(value) ? Math.min(Math.trunc(value), 99) : 0;
    return String(Math.max(0, count));
  }
  if (path === "from" || path === "to") {
    const place = value && typeof value === "object" ? value : {};
    const type = PLACE_TYPES.includes(place.type) ? place.type : "";
    const floor = type === "" || type === "house" ? "" : FLOOR_IDS.includes(place.floor) ? place.floor : "";
    const lift = floor === "" || floor === "ground" ? "" : ["yes", "no"].includes(place.lift) ? place.lift : "";
    return `${type}/${floor}/${lift}`;
  }
  if (path === DISMANTLE) {
    const answer = ["yes", "no"].includes(value?.dismantle) ? value.dismantle : "";
    return `${answer}/${answer === "yes" ? cutText(value?.dismantleNotes, TEXT_LIMITS.dismantleNotes) : ""}`;
  }
  const limit = TEXT_LIMITS[path];
  return limit ? cutText(value, limit) : typeof value === "string" ? value : "";
}

// As the API cuts text: to its limit, without leaving half an emoji behind.
function cutText(value, limit) {
  if (typeof value !== "string") return "";
  const cut = value.slice(0, limit);
  return /[\uD800-\uDBFF]$/.test(cut) ? cut.slice(0, -1) : cut;
}

// cyrb53, a small fast string hash (public domain). A fingerprint only ever
// has to tell apart the few answers one question has had on one enquiry.
function hashText(text) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

/** A short fingerprint of one answer, small enough to keep a list of on the device. */
export function answerHash(path, value) {
  return hashText(answerText(path, value));
}

/** The answers a change to the form alters: the questions it changes, and each item whose count it changes. */
export function changedPaths(before, change) {
  const paths = [];
  if ("dismantle" in change || "dismantleNotes" in change) {
    const after = { ...before, ...change };
    if (answerHash(DISMANTLE, readAnswer(before, DISMANTLE)) !== answerHash(DISMANTLE, readAnswer(after, DISMANTLE))) {
      paths.push(DISMANTLE);
    }
  }
  for (const [key, value] of Object.entries(change)) {
    if (key === "dismantle" || key === "dismantleNotes") continue;
    if (key !== "items") {
      if (answerHash(key, before[key]) !== answerHash(key, value)) paths.push(key);
      continue;
    }
    const old = before.items || {};
    const now = value || {};
    for (const name of new Set([...Object.keys(old), ...Object.keys(now)])) {
      if ((old[name] || 0) !== (now[name] || 0)) paths.push(ITEM + name);
    }
  }
  return paths;
}

/**
 * Lays answers not yet confirmed by the server over the server's copy.
 * `server` is that copy's details; `mine` holds the unconfirmed answers;
 * `pending` maps each of their paths to `known`, the fingerprints of what the
 * server may hold for that answer without anyone else having changed it: the
 * answer it was changed from, then each one sent for it since. For each:
 * - the server already holds the same answer: it is confirmed;
 * - the server holds one of the known answers: the unconfirmed one is kept,
 *   because nobody else has touched it;
 * - anything else: it was changed somewhere else as well. The server's answer
 *   stays, because it is confirmed and may already have been sent to the
 *   office, and the unconfirmed one is handed back as a clash for the page
 *   to show.
 * `ours` says the server's copy was made by this same page: one of its own
 * saves landed without the reply getting back. Then nothing can clash, since
 * every unconfirmed answer is newer than that save, and all are kept.
 * Returns { details, kept, confirmed, clashed: [{ path, value }] }.
 */
export function layOver(server, mine, pending, { ours = false } = {}) {
  const base = { ...emptyDetails(), ...(server || {}) };
  const keep = [];
  const confirmed = [];
  const clashed = [];
  for (const [path, known] of pending) {
    const mineNow = readAnswer(mine, path);
    const theirs = answerHash(path, readAnswer(base, path));
    if (theirs === answerHash(path, mineNow)) confirmed.push(path);
    else if (ours || known.includes(theirs)) keep.push([path, mineNow]);
    else clashed.push({ path, value: mineNow });
  }
  return { details: writeAnswers(base, keep), kept: keep.map(([path]) => path), confirmed, clashed };
}

const ANSWER_LABELS = {
  from: "Where you are moving from",
  to: "Where you are moving to",
  boxes: "How many boxes and bags",
  itemsNotes: "Anything not on the list",
  dismantle: "Taking apart and putting together",
  movers: "How many people you need",
  notes: "Anything else we should know",
};

/**
 * Clashes in words, for the page: the question, and for a typed answer the
 * text typed on this device, so it can be copied back if it was wanted.
 * Items are listed together.
 */
export function describeClashes(clashes) {
  const rows = [];
  const items = clashes.filter((c) => c.path.startsWith(ITEM)).map((c) => c.path.slice(ITEM.length));
  for (const { path, value } of clashes) {
    if (path.startsWith(ITEM)) continue;
    const text = path === DISMANTLE ? (value?.dismantle === "yes" ? value.dismantleNotes : "") : value;
    const typed = (path in TEXT_LIMITS || path === DISMANTLE) && typeof text === "string" && text.trim() ? text.trim() : "";
    rows.push({ key: path, label: ANSWER_LABELS[path] || path, typed });
  }
  if (items.length) rows.push({ key: "items", label: `The items you ticked: ${items.join(", ")}`, typed: "" });
  return rows;
}
