// What the move details form keeps on the device: the answers the server has
// not confirmed yet, and any photo or file that has not reached it. The
// server is where everything ends up; this copy is what makes a refresh, a
// closed tab or a dropped connection lose nothing in the meantime. Answers
// live in localStorage; photos and files are too big for that, so they wait
// in IndexedDB until they are uploaded. Both are removed as soon as the server
// has them, and anything left behind is deleted after a week. Every function
// fails soft: where storage is blocked or full the form still works, it just
// has less to fall back on.

import { answerHash, isAnswerPath } from "./moveDetailsMerge.js";

const PREFIX = "move-details:";
const VERSION = 3;
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_SENT_IDS = 20;
const DB_NAME = "move-details";
const STORE = "photos"; // holds documents too; the name predates them

/* ─── Answers ─── */

function readCopy(key) {
  const raw = window.localStorage.getItem(PREFIX + key);
  if (!raw) return null;
  const copy = JSON.parse(raw);
  const usable =
    copy &&
    copy.v === VERSION &&
    copy.answers &&
    typeof copy.answers === "object" &&
    Date.now() - (copy.savedAt || 0) <= MAX_AGE_MS;
  if (!usable) {
    window.localStorage.removeItem(PREFIX + key);
    return null;
  }
  const answers = {};
  for (const [path, entry] of Object.entries(copy.answers)) {
    if (!isAnswerPath(path) || !entry || !("value" in entry) || !Array.isArray(entry.known)) continue;
    answers[path] = { value: entry.value, known: entry.known.filter((hash) => typeof hash === "string") };
  }
  return {
    answers,
    sentIds: Array.isArray(copy.sentIds) ? copy.sentIds.filter((id) => typeof id === "string") : [],
    savedAt: copy.savedAt || 0,
  };
}

/**
 * The unconfirmed answers kept for a link, or null: `answers` maps each
 * answer's path to its `value` and `known`, the fingerprints the form lays it
 * back with (see layOver in moveDetailsMerge.js). `sentIds` names the saves
 * made from this browser, so a form can tell its own saves from another
 * device's.
 */
export function loadDraft(key) {
  try {
    return readCopy(key);
  } catch {
    return null;
  }
}

/**
 * Writes a page's unconfirmed answers into the copy. Every tab open on the
 * same link shares it, so it is merged rather than replaced: `put` (path ->
 * { value, known }) is written over what is stored for those answers, and
 * `drop` (path -> fingerprint of the answer the page held) takes out answers
 * the page has seen confirmed or given up, but only while the copy still
 * holds that same answer, since another tab may have stored a newer one.
 * Returns false where the copy could not be written (storage blocked or full).
 */
export function writeDraft(key, { put = {}, drop = {}, sentIds = [] }) {
  try {
    let copy = null;
    try {
      copy = readCopy(key);
    } catch {
      // Unreadable: started again below.
    }
    const answers = { ...(copy?.answers || {}) };
    for (const [path, hash] of Object.entries(drop)) {
      if (answers[path] && answerHash(path, answers[path].value) === hash) delete answers[path];
    }
    Object.assign(answers, put);
    if (Object.keys(answers).length === 0) {
      window.localStorage.removeItem(PREFIX + key);
      return true;
    }
    const ids = [...new Set([...(copy?.sentIds || []), ...sentIds])].slice(-MAX_SENT_IDS);
    window.localStorage.setItem(
      PREFIX + key,
      JSON.stringify({ v: VERSION, savedAt: Date.now(), sentIds: ids, answers })
    );
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // Nothing to clear where storage is blocked.
  }
}

/* ─── Photos and files ─── */

function openDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const store = request.result.createObjectStore(STORE, { keyPath: "key" });
      store.createIndex("draft", "draft");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("IndexedDB is blocked"));
  });
}

function done(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

/** Gives up on storage that never answers, which some browsers do, so the form is never left waiting on it. */
function within(ms, promise, fallback) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve(fallback), ms))]);
}

export function saveFile(draftKey, item) {
  const save = (async () => {
    try {
      const db = await openDb();
      const transaction = db.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).put({
        key: `${draftKey}:${item.id}`,
        draft: draftKey,
        id: item.id,
        name: item.name,
        image: Boolean(item.image),
        thumb: item.thumb || "",
        blob: item.file,
        addedAt: Date.now(),
      });
      await done(transaction);
      db.close();
      return true;
    } catch {
      return false;
    }
  })();
  return within(3000, save, false);
}

export function loadFiles(draftKey) {
  const load = (async () => {
    try {
      const db = await openDb();
      const rows = await new Promise((resolve, reject) => {
        const request = db.transaction(STORE, "readonly").objectStore(STORE).index("draft").getAll(draftKey);
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
      db.close();
      return rows
        .filter((row) => row.blob && Date.now() - (row.addedAt || 0) <= MAX_AGE_MS)
        .sort((a, b) => a.addedAt - b.addedAt)
        .map((row) => ({ id: row.id, name: row.name, image: row.image !== false, thumb: row.thumb || "", file: row.blob }));
    } catch {
      return [];
    }
  })();
  return within(3000, load, []);
}

export async function deleteFile(draftKey, id) {
  try {
    const db = await openDb();
    const transaction = db.transaction(STORE, "readwrite");
    transaction.objectStore(STORE).delete(`${draftKey}:${id}`);
    await done(transaction);
    db.close();
  } catch {
    // The file is gone from the page either way.
  }
}

export async function clearFiles(draftKey) {
  try {
    const db = await openDb();
    const transaction = db.transaction(STORE, "readwrite");
    const store = transaction.objectStore(STORE);
    const request = store.index("draft").getAllKeys(draftKey);
    request.onsuccess = () => (request.result || []).forEach((key) => store.delete(key));
    await done(transaction);
    db.close();
  } catch {
    // Nothing to clear where storage is blocked.
  }
}

/**
 * Deletes anything a week old, for every link this browser has opened, not
 * only the one on screen: answers and photos that never reached the server
 * should not sit on a shared computer for good.
 */
export async function sweepOldCopies() {
  try {
    const stale = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      let savedAt = 0;
      try {
        savedAt = JSON.parse(window.localStorage.getItem(key) || "{}").savedAt || 0;
      } catch {
        // Unreadable, so it goes.
      }
      if (Date.now() - savedAt > MAX_AGE_MS) stale.push(key);
    }
    stale.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Storage is blocked: there is nothing of ours in it.
  }

  try {
    const db = await within(3000, openDb(), null);
    if (!db) return;
    const transaction = db.transaction(STORE, "readwrite");
    const store = transaction.objectStore(STORE);
    const request = store.openCursor();
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) return;
      if (Date.now() - (cursor.value?.addedAt || 0) > MAX_AGE_MS) cursor.delete();
      cursor.continue();
    };
    await done(transaction);
    db.close();
  } catch {
    // Nothing to sweep.
  }
}

/* ─── Photos: smaller copies ─── */

function toJpeg(canvas, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
}

/**
 * A phone photo is several megabytes; nobody needs that to price a sofa.
 * Shrinks it to 1,600 px on its long side as a JPEG, which keeps storage and
 * the upload small on mobile data. Without `force` it returns the original
 * where the browser cannot decode the file or the result would not be
 * smaller. With `force` the result is always a JPEG, or null where the file
 * cannot be decoded: that is for a photo whose name the API would not accept.
 */
export async function downscalePhoto(file, { force = false, maxSide = 1600, quality = 0.82 } = {}) {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    if (!force && scale === 1 && file.size < 700 * 1024) {
      bitmap.close?.();
      return file;
    }
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await toJpeg(canvas, quality);
    if (force) return blob || null;
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return force ? null : file;
  }
}

/**
 * A small square preview of a photo as a data URL. The site's content security
 * policy allows data: images and not blob: ones, so an object URL would show
 * as a broken image; a 200 px preview is also far lighter for a phone to draw
 * than the photo itself. The API keeps a preview only if it is a JPEG of up to
 * 24,000 characters, so the quality steps down until it fits. Returns "" where
 * the browser cannot decode the file, and the form then shows the file's name
 * instead.
 */
export async function makeThumbnail(file, side = 200, maxLength = 24000) {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    // The middle square of the photo, which is how the form shows it anyway.
    const crop = Math.min(bitmap.width, bitmap.height);
    const size = Math.max(1, Math.min(side, crop));
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas
      .getContext("2d")
      .drawImage(bitmap, (bitmap.width - crop) / 2, (bitmap.height - crop) / 2, crop, crop, 0, 0, size, size);
    bitmap.close?.();
    for (const quality of [0.7, 0.5, 0.3]) {
      const url = canvas.toDataURL("image/jpeg", quality);
      if (url.startsWith("data:image/jpeg;base64,") && url.length <= maxLength) return url;
    }
    return "";
  } catch {
    return "";
  }
}
