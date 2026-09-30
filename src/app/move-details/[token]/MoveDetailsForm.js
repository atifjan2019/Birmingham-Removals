"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Home,
  Building2,
  Warehouse,
  Check,
  Plus,
  Minus,
  X,
  ImagePlus,
  ChevronDown,
  Loader2,
  CircleCheck,
  Save,
  FileText,
  RotateCw,
} from "lucide-react";
import {
  PROPERTY_TYPES,
  FLOORS,
  ITEM_GROUPS,
  BOX_RANGES,
  MOVER_OPTIONS,
  MAX_FILES,
  MAX_FILE_BYTES,
  FILE_ACCEPT,
  isImageFile,
  hasImageName,
  isAcceptedFile,
  emptyDetails,
  validateDetails,
} from "@/lib/moveDetails";
import {
  loadDraft,
  writeDraft,
  clearDraft,
  loadFiles,
  saveFile,
  deleteFile,
  clearFiles,
  sweepOldCopies,
  downscalePhoto,
  makeThumbnail,
} from "@/lib/moveDetailsDraft";
import {
  readAnswer,
  writeAnswers,
  answerHash,
  changedPaths,
  layOver,
  describeClashes,
} from "@/lib/moveDetailsMerge";
import { createMoveDetailsApi } from "@/lib/moveDetailsClient";
import { submitMoveDetails } from "@/app/actions/moveDetails";

const PROPERTY_ICONS = { house: Home, flat: Building2, other: Warehouse };

// The quote funnel already asked what kind of move it is, so the "from"
// property starts on the matching answer and the customer only confirms it.
const TYPE_FROM_MOVE = { house: "house", flat: "flat", office: "other" };

const SECTION_ORDER = ["from", "to", "items", "dismantle", "movers"];

function Section({ id, n, title, hint, error, children }) {
  return (
    <fieldset id={id} className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
        >
          {n}
        </span>
        <div>
          <h2
            tabIndex={-1}
            className="font-[family-name:var(--font-space)] text-lg font-bold leading-snug text-primary outline-none sm:text-xl"
          >
            {title}
          </h2>
          {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
        </div>
      </div>
      {children}
      {error ? (
        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** A radio button drawn as a card. The input stays in the page for keyboards and screen readers. */
function Choice({ name, value, current, onChange, icon: Icon, stacked = false, children }) {
  const selected = current === value;
  return (
    <label
      className={`relative flex cursor-pointer rounded-xl border-2 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 ${
        stacked ? "flex-col items-center gap-2 px-2 py-4 text-center" : "items-center gap-2.5 px-4 py-3"
      } ${selected ? "border-primary bg-primary/5" : "border-slate-200 bg-white hover:border-slate-300"}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {Icon ? (
        <Icon aria-hidden="true" className={`h-6 w-6 shrink-0 ${selected ? "text-primary" : "text-slate-400"}`} />
      ) : null}
      <span className={`text-sm font-semibold ${selected ? "text-primary" : "text-slate-700"}`}>{children}</span>
      {selected && !stacked ? <Check aria-hidden="true" className="ml-auto h-4 w-4 shrink-0 text-primary" /> : null}
    </label>
  );
}

function PropertyFields({ side, value, onChange }) {
  const needsFloor = value.type === "flat" || value.type === "other";
  const needsLift = needsFloor && value.floor && value.floor !== "ground";
  const set = (patch) => onChange({ ...value, ...patch });

  return (
    <>
      <div role="radiogroup" aria-label="Type of property" className="grid grid-cols-3 gap-2.5">
        {PROPERTY_TYPES.map((t) => (
          <Choice
            key={t.id}
            name={`${side}-type`}
            value={t.id}
            current={value.type}
            icon={PROPERTY_ICONS[t.id]}
            stacked
            onChange={(type) => set(type === "house" ? { type, floor: "", lift: "" } : { type })}
          >
            {t.label}
          </Choice>
        ))}
      </div>

      {needsFloor ? (
        <div className="mt-5">
          <p id={`${side}-floor-label`} className="mb-2 text-sm font-semibold text-slate-700">
            Which floor is it on?
          </p>
          <div role="radiogroup" aria-labelledby={`${side}-floor-label`} className="flex flex-wrap gap-2">
            {FLOORS.map((f) => (
              <Choice
                key={f.id}
                name={`${side}-floor`}
                value={f.id}
                current={value.floor}
                onChange={(floor) => set(floor === "ground" ? { floor, lift: "" } : { floor })}
              >
                {f.label}
              </Choice>
            ))}
          </div>
        </div>
      ) : null}

      {needsLift ? (
        <div className="mt-5">
          <p id={`${side}-lift-label`} className="mb-2 text-sm font-semibold text-slate-700">
            Is there a lift we can use?
          </p>
          <div role="radiogroup" aria-labelledby={`${side}-lift-label`} className="grid grid-cols-2 gap-2.5 sm:max-w-xs">
            <Choice name={`${side}-lift`} value="yes" current={value.lift} onChange={(lift) => set({ lift })}>
              Yes
            </Choice>
            <Choice name={`${side}-lift`} value="no" current={value.lift} onChange={(lift) => set({ lift })}>
              No
            </Choice>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ItemGroups({ items, onChange }) {
  const [open, setOpen] = useState(ITEM_GROUPS[0].id);
  const step = (name, by) => {
    const next = Math.max(0, Math.min(99, (items[name] || 0) + by));
    onChange({ ...items, [name]: next });
  };

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200">
      {ITEM_GROUPS.map((group) => {
        const count = group.items.reduce((n, name) => n + (items[name] || 0), 0);
        const isOpen = open === group.id;
        return (
          <div key={group.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`items-${group.id}`}
              onClick={() => setOpen(isOpen ? "" : group.id)}
              className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-3.5 text-left transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <span className="text-sm font-semibold text-primary">{group.label}</span>
              <span className="flex items-center gap-2">
                {count ? (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
                    {count}
                    <span className="sr-only"> selected</span>
                  </span>
                ) : null}
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </span>
            </button>
            {isOpen ? (
              <ul id={`items-${group.id}`} className="grid gap-x-8 px-4 py-2 sm:grid-cols-2">
                {group.items.map((name) => {
                  const n = items[name] || 0;
                  return (
                    <li key={name} className="flex items-center justify-between gap-3 py-1.5">
                      <span className={`text-sm ${n ? "font-semibold text-primary" : "text-slate-700"}`}>{name}</span>
                      <span className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => step(name, -1)}
                          disabled={n === 0}
                          aria-label={`One fewer: ${name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-35"
                        >
                          <Minus aria-hidden="true" className="h-4 w-4" />
                        </button>
                        <output aria-label={`${name} count`} className="w-7 text-center text-sm font-bold tabular-nums text-primary">
                          {n}
                        </output>
                        <button
                          type="button"
                          onClick={() => step(name, 1)}
                          aria-label={`One more: ${name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                        >
                          <Plus aria-hidden="true" className="h-4 w-4" />
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** How the photos and files stand, in words, for a screen reader. */
function describeFiles(files) {
  if (!files.length) return "";
  const uploading = files.filter((f) => f.status === "uploading").length;
  const failed = files.filter((f) => f.status === "failed").length;
  return [
    `${files.length} of ${MAX_FILES} added.`,
    uploading ? `${uploading} uploading.` : "",
    failed ? `${failed} not uploaded.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Photos of the items, or a list the customer already has as a document.
 * Each one uploads as soon as it is added, and shows where it has got to.
 */
function FilePicker({ files, busy, error, onAdd, onRemove, onRetry }) {
  const full = files.length >= MAX_FILES;
  return (
    <div>
      <input
        id="move-files"
        type="file"
        accept={FILE_ACCEPT}
        multiple
        disabled={full}
        className="peer sr-only"
        onChange={(e) => {
          onAdd(Array.from(e.target.files || []));
          e.target.value = "";
        }}
      />
      <label
        htmlFor="move-files"
        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 ${
          full
            ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
            : "cursor-pointer border-slate-300 bg-slate-50 hover:border-primary hover:bg-primary/5"
        }`}
      >
        <ImagePlus aria-hidden="true" className="h-7 w-7 text-primary" />
        <span className="text-sm font-semibold text-primary">{busy ? "Adding" : "Add photos or files"}</span>
        <span className="text-xs text-muted">
          Photos of each room or the big items, or a list you already have as a PDF, Word, Excel or text file. Up
          to {MAX_FILES}.
        </span>
      </label>

      {error ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}

      {/* Spoken as it changes: a photo starting, finishing or failing is otherwise silent. */}
      <p role="status" className={files.length ? "mt-3 text-xs font-medium text-muted" : "sr-only"}>
        {describeFiles(files)}
      </p>

      {files.length ? (
        <ul className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {files.map((f) => (
            <li key={f.id} className="relative">
              {f.image && f.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.thumb}
                  alt={f.name}
                  width="200"
                  height="200"
                  decoding="async"
                  className="aspect-square w-full rounded-lg border border-slate-200 object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-2 text-center">
                  <FileText aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
                  <span className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-700 [overflow-wrap:anywhere]">
                    {f.name}
                  </span>
                  <span className="text-[10px] text-muted">{formatSize(f.size)}</span>
                </div>
              )}

              {f.status === "uploading" ? (
                <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/70">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              ) : null}
              {f.status === "failed" ? (
                <button
                  type="button"
                  onClick={() => onRetry(f.id)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg bg-white/90 text-xs font-semibold text-red-600"
                >
                  <RotateCw aria-hidden="true" className="h-4 w-4" />
                  Not uploaded. Retry
                  <span className="sr-only">: {f.name}</span>
                </button>
              ) : null}

              <button
                type="button"
                data-remove-file
                onClick={(e) => onRemove(f.id, e.currentTarget)}
                aria-label={`Remove ${f.name}`}
                className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow ring-2 ring-white"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

/** A file as the API returns it, in the shape the picker draws. `id` is the form's own id for it where it has one. */
const fromServerFile = (f) => ({
  id: f.clientId || f.id,
  serverId: f.id,
  name: f.name,
  image: Boolean(f.isImage),
  thumb: f.thumb || "",
  size: f.size,
  status: "uploaded",
});

// Which section's error a changed answer clears.
const ERROR_KEY = {
  from: "from",
  to: "to",
  items: "items",
  itemsNotes: "items",
  dismantle: "dismantle",
  dismantleNotes: "dismantle",
  movers: "movers",
};

const FIRST_RETRY_MS = 5000;
const SAVE_DELAY_MS = 1200;
const MAX_SENT_IDS = 20;
// Fingerprints kept for each unconfirmed answer: the answer it was changed
// from, and the latest of the ones sent for it.
const MAX_KNOWN = 40;
// A save told "changed elsewhere" this many times running stops, rather than
// going round for ever; the answers stay on the device.
const MAX_CONFLICTS_IN_ROW = 5;
// Photos go up two at a time: enough to feel quick, without a dozen large
// requests fighting over a phone's connection.
const UPLOADS_AT_ONCE = 2;

function syncLabel(sync, onDevice) {
  if (sync === "saving") return "Saving.";
  if (sync === "saved") return "Saved.";
  if (sync === "merged") return "Saved. Answers you gave on another device or in another tab have been added.";
  if (sync === "offline") {
    return onDevice
      ? "No connection. Saved on this device, and sent to us when you are back online."
      : "No connection. Keep this page open and your answers will be sent when you are back online.";
  }
  if (sync === "stuck") return onDevice ? "Saved on this device." : "Not saved yet. Keep this page open.";
  return "";
}

/**
 * Answers given here that were changed somewhere else as well, where the
 * other answer was kept. Typed text is shown back, so it can be copied into
 * the answer again if it was the one wanted.
 */
function ClashNotice({ clashes, onDismiss, ref }) {
  const rows = describeClashes(clashes);
  if (!rows.length) return null;
  return (
    <div ref={ref} tabIndex={-1} role="status" className="outline-none rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-900">
      <p className="font-semibold">
        {rows.length === 1 ? "This answer was" : "These answers were"} also changed in another tab or on another
        device, so we have kept the {rows.length === 1 ? "one" : "ones"} given there:
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {rows.map((row) => (
          <li key={row.key}>
            {row.label}
            {row.typed ? (
              <span className="mt-0.5 block whitespace-pre-line text-amber-800">
                What you typed here: &ldquo;{row.typed}&rdquo;
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-2">Check them, and change them if they are not right.</p>
      <button type="button" onClick={onDismiss} className="mt-2 font-semibold underline underline-offset-4">
        OK
      </button>
    </div>
  );
}

/**
 * Whether the answers were changed after they were last sent, going by the
 * server's times (a save after a send is always stamped later than it).
 */
const changedSinceSent = (d) => Boolean(d?.submittedAt && d?.updatedAt && d.updatedAt > d.submittedAt);

// Focus moves once the render that shows its target has happened.
const focusSoon = (target) => requestAnimationFrame(() => target()?.focus());

export default function MoveDetailsForm({ enquiry, token, apiBase, initial, preview = false }) {
  // The design preview has no server behind it; everything else does.
  const api = useMemo(() => (preview ? null : createMoveDetailsApi(apiBase, token)), [preview, apiBase, token]);

  const [form, setForm] = useState(() => ({
    ...emptyDetails(),
    from: { type: TYPE_FROM_MOVE[enquiry.moveType] || "", floor: "", lift: "" },
    ...(initial?.details || {}),
  }));
  const [files, setFiles] = useState(() => (initial?.files || []).map(fromServerFile));
  const [restored, setRestored] = useState(Boolean(initial?.details) || (initial?.files?.length ?? 0) > 0);
  const [sync, setSync] = useState("idle");
  const [onDevice, setOnDevice] = useState(true);
  const [addingFiles, setAddingFiles] = useState(false);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  // Sent, and not changed since: the thank-you message. Changed since (here or
  // on another device, and not sent again): the form, with a reminder to send.
  const [done, setDone] = useState(Boolean(initial?.submittedAt) && !changedSinceSent(initial));
  const [clashes, setClashes] = useState([]);
  const [unsent, setUnsent] = useState(changedSinceSent(initial)); // changed since the details were sent

  // The answers and files as they stand right now. Saves and uploads finish
  // long after the render that started them, so they read these, not state.
  const formRef = useRef(form);
  const filesRef = useRef(files);
  // Answers changed here that the server has not confirmed, by path ("notes",
  // "from", or "items:Desk" for one item on the list): `change`, the number of
  // the change that last touched it, and `known`, fingerprints of what the
  // server may hold for it without anyone else having changed it (the answer
  // it was changed from, then each one sent for it). See moveDetailsMerge.js.
  const dirty = useRef(new Map());
  // Answers this page held unconfirmed and no longer does, to come out of the
  // device's copy: path -> fingerprint of the answer the page held.
  const released = useRef(new Map());
  const changes = useRef(0);
  const version = useRef(initial?.version ?? 0); // the server's version the rest of the form matches
  const sentIds = useRef([]); // this page's saves since its answers were last all confirmed
  const ownSaves = useRef(new Set()); // saves made from this browser, to tell them from another device's
  const pageSaves = useRef(new Set()); // saves made by this page itself
  const clashCount = useRef(0); // clashes found so far, so a send can tell a new one
  const sentBefore = useRef(Boolean(initial?.submittedAt));
  const saveTimer = useRef(null);
  const retryIn = useRef(FIRST_RETRY_MS);
  const conflictsInRow = useRef(0);
  const saving = useRef(null); // the save in flight, so saves never overtake each other
  const sending = useRef(false); // the send is on its way
  const uploads = useRef(new Map()); // file id -> upload in flight
  const aborters = useRef(new Map()); // file id -> stops that upload
  const uploadSlots = useRef({ busy: 0, waiting: [] });
  const failedIds = useRef(new Set());
  const removedIds = useRef(new Set());
  const uploadedAt = useRef(new Map()); // file id -> when this page saw its upload finish
  const reads = useRef(0); // re-reads of the server started
  const readApplied = useRef(0); // the latest one taken in
  const readTimer = useRef(null);
  const readRetryIn = useRef(FIRST_RETRY_MS);
  const justMerged = useRef(false);
  const mounted = useRef(true);
  const refreshRef = useRef(null); // refresh(), for the code above where it is defined
  const doneHeading = useRef(null);
  const formElement = useRef(null);
  const clashNotice = useRef(null);
  const submitError = useRef(null);

  const updateFiles = useCallback((change) => {
    const next = change(filesRef.current);
    filesRef.current = next;
    setFiles(next);
  }, []);

  const addClashes = useCallback((found) => {
    if (!found.length) return;
    clashCount.current += found.length;
    setClashes((list) => [...list.filter((c) => !found.some((f) => f.path === c.path)), ...found]);
  }, []);

  // An answer the page no longer holds unconfirmed: confirmed, or given up for
  // the server's. It is noted with the answer the page held, which is what the
  // device's copy is matched against when it is taken out of it.
  const release = useCallback((path, value = readAnswer(formRef.current, path)) => {
    dirty.current.delete(path);
    released.current.set(path, answerHash(path, value));
  }, []);

  // The device's copy: this page's unconfirmed answers, merged into what any
  // other tab on the same link has stored, with what is needed to lay them
  // back over the server's copy later.
  const keepOnDevice = useCallback(() => {
    const put = {};
    for (const [path, entry] of dirty.current) {
      put[path] = { value: readAnswer(formRef.current, path), known: entry.known };
    }
    const drop = Object.fromEntries(released.current);
    released.current.clear();
    setOnDevice(writeDraft(token, { put, drop, sentIds: sentIds.current }));
  }, [token]);

  // Takes in a copy of the answers from the server if it is newer than the one
  // the page is based on, with the page's unconfirmed answers laid over it
  // (layOver in moveDetailsMerge.js). An older copy, a reply that took the long
  // way round, is never taken: answers already saved would go back on the page.
  // Returns null when the copy was not taken, or how many answers clashed.
  const adoptAnswers = useCallback(
    (current) => {
      if (!current || (current.version ?? 0) <= version.current) return null;
      const pending = new Map([...dirty.current].map(([path, entry]) => [path, entry.known]));
      // Made by one of this page's own saves whose reply never came back:
      // everything unconfirmed here is newer than it.
      const merged = layOver(current.details, formRef.current, pending, { ours: pageSaves.current.has(current.saveId) });
      for (const path of merged.confirmed) release(path);
      for (const { path, value } of merged.clashed) release(path, value);
      formRef.current = merged.details;
      version.current = current.version;
      setForm(merged.details);
      addClashes(merged.clashed);
      keepOnDevice();
      return { clashed: merged.clashed.length };
    },
    [release, addClashes, keepOnDevice]
  );

  // A save or a send setting off: an id for it, and a fingerprint of each
  // unconfirmed answer it carries, since any of them can reach the server
  // without the reply getting back.
  const markSent = useCallback(() => {
    const saveId = newId();
    const earlier = sentIds.current;
    sentIds.current = [...earlier, saveId].slice(-MAX_SENT_IDS);
    ownSaves.current.add(saveId);
    pageSaves.current.add(saveId);
    const hashes = new Map();
    for (const [path, entry] of dirty.current) {
      const hash = answerHash(path, readAnswer(formRef.current, path));
      hashes.set(path, hash);
      if (!entry.known.includes(hash)) {
        const [from, ...sent] = entry.known;
        entry.known = [from, ...[...sent, hash].slice(-(MAX_KNOWN - 1))];
      }
    }
    keepOnDevice();
    return { saveId, earlier, carried: changes.current, hashes };
  }, [keepOnDevice]);

  // The server has confirmed a save or a send. Each answer it carried that has
  // not been changed since is confirmed; one changed since stays unconfirmed,
  // changed now from the answer just confirmed.
  const confirmSent = useCallback(
    (sent, confirmedVersion) => {
      version.current = Math.max(version.current, confirmedVersion ?? 0);
      for (const [path, entry] of [...dirty.current]) {
        if (entry.change <= sent.carried) release(path);
        else if (sent.hashes.has(path)) {
          const at = entry.known.indexOf(sent.hashes.get(path));
          if (at > 0) entry.known = entry.known.slice(at);
        }
      }
      if (dirty.current.size === 0) sentIds.current = [];
      keepOnDevice();
    },
    [release, keepOnDevice]
  );

  // Answers are kept in two places. The device's copy is written on every
  // change, so a refresh or a dropped connection loses nothing; the server's
  // copy follows a moment later, so the office can see a half-finished form
  // and the customer can carry on from another device. Each save names the
  // version it started from: if the answers have been changed elsewhere since,
  // the server sends back its copy instead, this page's changes are laid over
  // it answer by answer and the save goes again. A page left open can
  // therefore never replace newer answers with old ones.
  const pushToServer = useCallback(
    async ({ keepalive = false } = {}) => {
      if (!api) return true;
      // A send carries the answers itself, and a save beside it could only get
      // in its way; if the send does not go through, it saves them after.
      if (sending.current) return false;
      // The save made as the page goes away cannot wait for one in flight.
      if (!keepalive) while (saving.current) await saving.current;
      if (dirty.current.size === 0 || sending.current) return true;
      clearTimeout(saveTimer.current);

      const sent = markSent();
      setSync("saving");

      const run = api
        .save(
          { details: formRef.current, baseVersion: version.current, saveId: sent.saveId, sentIds: sent.earlier },
          { keepalive }
        )
        .then(
          (saved) => {
            if (saved.conflict) {
              // Changed since this page last looked: somewhere else, or by one
              // of this page's own saves that overtook this one. The newer copy
              // is taken in, this page's answers laid over it, and it goes again.
              conflictsInRow.current += 1;
              adoptAnswers(saved.current);
              if (!ownSaves.current.has(saved.current?.saveId)) justMerged.current = true;
              if (saved.current?.submittedAt) {
                sentBefore.current = true;
                if (dirty.current.size) setUnsent(true);
              }
              clearTimeout(saveTimer.current);
              if (dirty.current.size === 0) {
                // Nothing of this page's is left to save: the server already
                // had it, or had a newer answer, which the page now shows.
                conflictsInRow.current = 0;
                setSync(justMerged.current ? "merged" : "saved");
                justMerged.current = false;
              } else if (conflictsInRow.current >= MAX_CONFLICTS_IN_ROW) setSync("stuck");
              else saveTimer.current = setTimeout(() => pushToServer(), 0);
              return false;
            }
            conflictsInRow.current = 0;
            retryIn.current = FIRST_RETRY_MS;
            confirmSent(sent, saved.version);
            if (dirty.current.size) setSync("saving");
            else {
              setSync(justMerged.current ? "merged" : "saved");
              justMerged.current = false;
            }
            return true;
          },
          (error) => {
            if (error?.status >= 400 && error.status < 500) {
              // The server will not take this however often it is sent; the
              // reason is shown when the form is sent.
              setSync("stuck");
            } else {
              setSync("offline");
              clearTimeout(saveTimer.current);
              saveTimer.current = setTimeout(() => pushToServer(), retryIn.current);
              retryIn.current = Math.min(retryIn.current * 2, 60000);
            }
            return false;
          }
        );
      saving.current = run;
      const ok = await run;
      if (saving.current === run) saving.current = null;
      return ok;
    },
    [api, markSent, confirmSent, adoptAnswers]
  );

  const pushSoon = useCallback(() => {
    if (!api) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => pushToServer(), SAVE_DELAY_MS);
  }, [api, pushToServer]);

  const patch = (change) => {
    const paths = changedPaths(formRef.current, change);
    if (paths.length) {
      changes.current += 1;
      for (const path of paths) {
        const entry = dirty.current.get(path);
        if (entry) entry.change = changes.current;
        else {
          // What it is changed from: the server's answer, since an answer with
          // no unconfirmed change on this page is the server's.
          dirty.current.set(path, {
            change: changes.current,
            known: [answerHash(path, readAnswer(formRef.current, path))],
          });
        }
      }
      if (sentBefore.current) setUnsent(true);
    }
    const next = { ...formRef.current, ...change };
    formRef.current = next;
    setForm(next);
    if (paths.length) {
      keepOnDevice();
      pushSoon();
    }
    const cleared = Object.keys(change).map((key) => ERROR_KEY[key]).filter((key) => key && errors[key]);
    if (cleared.length) setErrors((e) => ({ ...e, ...Object.fromEntries(cleared.map((key) => [key, undefined])) }));
  };

  // Photos go up a couple at a time. Each has its own id, sent with every
  // attempt, so one that is tried again after its reply was lost is answered
  // with the file already stored instead of being stored twice.
  const startUpload = useCallback(
    (item) => {
      // Already on its way: a retry from elsewhere must not send it twice.
      if (uploads.current.has(item.id)) return uploads.current.get(item.id);
      // Nothing to send: a file the page only knows from the server's list.
      if (!item.file) return Promise.resolve(Boolean(item.serverId));
      failedIds.current.delete(item.id);
      const setStatus = (status) =>
        updateFiles((current) => current.map((f) => (f.id === item.id ? { ...f, status } : f)));
      if (!api) {
        setStatus("uploaded");
        return Promise.resolve(true);
      }
      setStatus("uploading");

      const slots = uploadSlots.current;
      const takeSlot = () =>
        slots.busy < UPLOADS_AT_ONCE
          ? ((slots.busy += 1), Promise.resolve())
          : new Promise((resolve) => slots.waiting.push(resolve));
      const freeSlot = () => {
        const next = slots.waiting.shift();
        if (next) next();
        else slots.busy -= 1;
      };

      // A file removed while it was on its way up has to come off the server
      // too, whether or not the upload was seen to finish: the server keeps a
      // file that arrived in full even when its reply never got back. If it
      // cannot be removed, the page is read again from the server so the file
      // shows, because what the customer sees has to be what the office will get.
      const takeBack = async () => {
        try {
          await api.remove(item.id);
        } catch {
          removedIds.current.delete(item.id);
          setFileError(`${item.name} could not be removed just now. Please try again.`);
          refreshRef.current?.();
        }
        return true;
      };

      const run = takeSlot()
        .then(() => {
          // Removed while it waited its turn: nothing has been sent.
          if (removedIds.current.has(item.id)) return { skipped: true };
          const upload = api.upload({ file: item.file, name: item.name, thumb: item.thumb, clientId: item.id });
          aborters.current.set(item.id, upload.abort);
          return upload.promise;
        })
        .finally(() => {
          aborters.current.delete(item.id);
          freeSlot();
        })
        .then(
          (stored) => {
            if (stored.skipped) return true;
            deleteFile(token, item.id);
            if (removedIds.current.has(item.id)) return takeBack();
            uploadedAt.current.set(item.id, Date.now());
            updateFiles((current) =>
              current.map((f) =>
                f.id === item.id ? { ...fromServerFile(stored), id: f.id, thumb: stored.thumb || f.thumb } : f
              )
            );
            return true;
          },
          (error) => {
            if (removedIds.current.has(item.id)) return takeBack();
            // A re-read of the server found it there while this attempt was
            // failing: it arrived, and only the reply was lost.
            if (filesRef.current.find((f) => f.id === item.id)?.serverId) return true;
            // Too many, too large, the wrong type, or removed in another tab or
            // on another device: it will never go up, so it is dropped and the
            // page says why. The send checks for "dropped" (handleSubmit).
            if ([409, 410, 413, 415].includes(error.status)) {
              deleteFile(token, item.id);
              updateFiles((current) => current.filter((f) => f.id !== item.id));
              setFileError(
                error.status === 410
                  ? `${item.name} was removed in another tab or on another device.`
                  : `${item.name}: ${error.message}`
              );
              return "dropped";
            }
            failedIds.current.add(item.id);
            setStatus("failed");
            return false;
          }
        )
        .finally(() => {
          if (uploads.current.get(item.id) === run) uploads.current.delete(item.id);
        });
      uploads.current.set(item.id, run);
      return run;
    },
    [api, token, updateFiles]
  );

  // The server's list of files as of a re-read that set off at `startedAt`.
  // A file the page shows and the list leaves out was removed somewhere else,
  // unless it is still on its way up, or its upload finished after the list
  // was made. A file the list has and the page thought had not gone up got
  // there with its reply lost: it is shown as uploaded, and not sent again.
  const adoptFiles = useCallback(
    (serverFiles, startedAt) => {
      const stored = (serverFiles || []).map(fromServerFile).filter((f) => !removedIds.current.has(f.id));
      const listed = new Set(stored.map((f) => f.id));
      for (const f of filesRef.current) {
        if (!listed.has(f.id) || f.serverId) continue;
        failedIds.current.delete(f.id);
        deleteFile(token, f.id);
      }
      updateFiles((current) => [
        ...stored.map((f) => ({ ...f, thumb: f.thumb || current.find((c) => c.id === f.id)?.thumb || "" })),
        ...current.filter(
          (f) => !listed.has(f.id) && (!f.serverId || (uploadedAt.current.get(f.id) ?? 0) > startedAt)
        ),
      ]);
    },
    [token, updateFiles]
  );

  // Answers left on the device by an earlier visit, or by another tab open on
  // the same link, that the server never confirmed. Each goes back on the page
  // where the page still holds an answer it was changed from; where the answer
  // has been changed somewhere else since, the server's stays and the page
  // says so. Run when the page opens and after each fresh read of the server,
  // so that what it compares with is up to date. On an enquiry already sent,
  // answers put back show the form rather than being saved behind the thanks.
  const takeFromDevice = useCallback(() => {
    const local = loadDraft(token);
    if (!local) return;
    for (const id of local.sentIds) ownSaves.current.add(id);
    const pending = new Map();
    const stored = [];
    for (const [path, entry] of Object.entries(local.answers)) {
      if (dirty.current.has(path)) continue; // this page's own, or already taken
      pending.set(path, entry.known);
      stored.push([path, entry.value]);
    }
    if (!pending.size) return;
    const values = Object.fromEntries(stored);
    const merged = layOver(formRef.current, writeAnswers(formRef.current, stored), pending);
    for (const path of merged.confirmed) released.current.set(path, answerHash(path, values[path]));
    for (const { path, value } of merged.clashed) released.current.set(path, answerHash(path, value));
    if (merged.kept.length) {
      changes.current += 1;
      for (const path of merged.kept) dirty.current.set(path, { change: changes.current, known: pending.get(path) });
      formRef.current = merged.details;
      setForm(merged.details);
      setRestored(true);
      if (sentBefore.current) {
        setUnsent(true);
        setDone(false);
      }
      pushSoon();
    }
    addClashes(merged.clashed);
    keepOnDevice();
  }, [token, addClashes, keepOnDevice, pushSoon]);

  // What the page was built from can be out of date by the time it is on
  // screen: a page restored from the browser's history, or left open while
  // the answers were finished on another device. So the server is read again
  // when the page opens, when it comes back into view and when the connection
  // returns; a read that fails is tried again while the page is in view.
  const refresh = useCallback(async () => {
    if (!api || !mounted.current) return;
    clearTimeout(readTimer.current);
    reads.current += 1;
    const readNo = reads.current;
    const startedAt = Date.now();
    let current;
    try {
      current = await api.load();
    } catch {
      // No connection yet, as when a phone wakes before its network does.
      if (mounted.current && document.visibilityState === "visible") {
        clearTimeout(readTimer.current);
        readTimer.current = setTimeout(() => refreshRef.current?.(), readRetryIn.current);
        readRetryIn.current = Math.min(readRetryIn.current * 2, 60000);
      }
      return;
    }
    // A read that set off before one already taken in has nothing newer to say.
    if (!mounted.current || readNo < readApplied.current) return;
    readApplied.current = readNo;
    readRetryIn.current = FIRST_RETRY_MS;
    const wasSent = sentBefore.current;
    if (current.submittedAt) sentBefore.current = true;
    // Nothing is taken in under a send that is on its way: its reply decides.
    if (sending.current) return;
    const taken = adoptAnswers(current);
    if (taken && dirty.current.size === 0) {
      // Whatever was waiting to be saved turned out to be on the server already.
      setSync((now) => (now === "idle" ? now : "saved"));
      // Sent from another device since this page opened.
      if (current.submittedAt && !wasSent && !taken.clashed) setDone(true);
    }
    // The server answered, so the connection is back: anything waiting is
    // saved now rather than when the next retry comes round.
    if (dirty.current.size) {
      retryIn.current = FIRST_RETRY_MS;
      pushSoon();
    }
    // Sent, then changed (here, or on another device), and not sent again.
    if (current.submittedAt) setUnsent(changedSinceSent(current) || dirty.current.size > 0);
    adoptFiles(current.files, startedAt);
    takeFromDevice();
  }, [api, adoptAnswers, adoptFiles, takeFromDevice, pushSoon]);
  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  // Answers the device kept go back on the page first, compared with the
  // server's answers the page was just built from; then the server is read
  // again. No clock is read to decide between the two. The browser's own
  // form restore is switched off on the form below: it restores radio
  // buttons by position, and questions here appear and disappear, so it
  // ticks the wrong ones.
  useEffect(() => {
    mounted.current = true;
    sweepOldCopies();
    takeFromDevice();
    refresh();
    return () => {
      mounted.current = false;
      clearTimeout(readTimer.current);
    };
  }, [takeFromDevice, refresh]);

  // A photo or file added before a reload, and not yet uploaded, is still on
  // the device: bring it back and send it. One the server already has (its
  // upload finished, but the page closed before it was crossed off here) is
  // known by its id and only crossed off.
  useEffect(() => {
    let cancelled = false;
    loadFiles(token).then((waiting) => {
      if (cancelled) return;
      const items = [];
      const full = [];
      for (const w of waiting) {
        const current = filesRef.current;
        const match = current.find((f) => f.id === w.id);
        if (match?.serverId) {
          deleteFile(token, w.id);
          continue;
        }
        if (match) continue;
        if (current.length + items.length >= MAX_FILES) {
          deleteFile(token, w.id);
          full.push(w.name);
          continue;
        }
        items.push({
          id: w.id,
          serverId: "",
          name: w.name,
          image: w.image,
          thumb: w.thumb,
          size: w.file.size,
          file: w.file,
          status: "uploading",
        });
      }
      if (full.length) {
        setFileError(`${full.join(", ")} could not be added back: this enquiry already has ${MAX_FILES} photos and files.`);
      }
      if (!items.length) return;
      updateFiles((current) => [...current, ...items]);
      setRestored(true);
      // Files that never reached the office, on an enquiry already sent: the
      // form is shown with the reminder to send, as for answers put back.
      if (sentBefore.current) {
        setUnsent(true);
        setDone(false);
      }
      items.forEach(startUpload);
    });
    return () => {
      cancelled = true;
    };
  }, [token, startUpload, updateFiles]);

  // The last save as the page goes away, another try when the connection
  // returns, and a fresh look at the server when the page comes back into view.
  useEffect(() => {
    if (!api) return undefined;
    const flush = () => {
      // Not while the send is on its way: it carries the answers itself.
      if (dirty.current.size && !sending.current) pushToServer({ keepalive: true });
    };
    const retryUploads = () =>
      filesRef.current.filter((f) => failedIds.current.has(f.id) && f.file).forEach(startUpload);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
      else refresh();
    };
    const onOnline = () => {
      pushToServer();
      refresh();
      retryUploads();
    };
    // A page brought back from the browser's back-forward cache.
    const onPageShow = (event) => {
      if (event.persisted) refresh();
    };
    // Closing the tab mid-upload: the photo is safe on the device, but it only
    // goes up when the link is opened again, so it is worth a warning.
    const onBeforeUnload = (event) => {
      if (uploads.current.size === 0) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("pagehide", flush);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("online", onOnline);
      clearTimeout(saveTimer.current);
      flush();
    };
  }, [api, pushToServer, refresh, startUpload]);

  const addFiles = async (picked) => {
    const problems = [];
    const accepted = [];
    for (const f of picked) {
      if (!isAcceptedFile(f)) problems.push(`${f.name} is not a type we can take: add photos, or a PDF, Word, Excel or text file.`);
      else if (!isImageFile(f) && f.size > MAX_FILE_BYTES) problems.push(`${f.name} is larger than 15 MB.`);
      else accepted.push(f);
    }
    if (accepted.length > MAX_FILES - filesRef.current.length) problems.push(`Only ${MAX_FILES} photos and files can be added.`);
    setFileError(problems.join(" "));
    if (!accepted.length) return;

    if (errors.items) setErrors((e) => ({ ...e, items: undefined }));
    setAddingFiles(true);
    for (const original of accepted) {
      if (filesRef.current.length >= MAX_FILES) break;
      const image = isImageFile(original);
      // A photo is shrunk where it is large. One whose name the API would not
      // know as a photo (.jfif, .tif, no ending at all) is always re-saved as a
      // JPEG, so it can go up as a .jpg.
      const renamed = image && !hasImageName(original);
      const file = image ? await downscalePhoto(original, { force: renamed }) : original;
      if (!file) {
        setFileError(`${original.name} is not a photo this browser can read. Try a JPEG or PNG, or a screenshot of it.`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        setFileError(`${original.name} is larger than 15 MB.`);
        continue;
      }
      // A photo that was re-saved is a JPEG now, whatever it was called before.
      const name =
        file !== original && file.type === "image/jpeg"
          ? `${original.name.replace(/\.[^.]+$/, "") || "photo"}.jpg`
          : original.name;
      const item = {
        id: newId(),
        serverId: "",
        name,
        image,
        thumb: image ? await makeThumbnail(file) : "",
        size: file.size,
        file,
        status: "uploading",
      };
      if (filesRef.current.length >= MAX_FILES) break;
      updateFiles((current) => [...current, item]);
      // On the device first, so a refresh before the upload finishes loses nothing.
      await saveFile(token, item);
      if (!removedIds.current.has(item.id)) startUpload(item);
    }
    setAddingFiles(false);
  };

  const retryFile = (id) => {
    const item = filesRef.current.find((f) => f.id === id);
    if (item?.file) startUpload(item);
  };

  const removeFile = async (id, button) => {
    const item = filesRef.current.find((f) => f.id === id);
    if (!item) return;
    // Focus would otherwise fall to the top of the page with the tile: it
    // goes to the next tile's remove button, or to the picker when none is left.
    const buttons = [...(formElement.current?.querySelectorAll("[data-remove-file]") || [])];
    const next = buttons[buttons.indexOf(button) + 1] || buttons[buttons.indexOf(button) - 1];
    removedIds.current.add(id);
    failedIds.current.delete(id);
    // An upload still on its way is stopped, and nothing goes on waiting for
    // it. startUpload then takes the server's copy away, if it got that far.
    uploads.current.delete(id);
    aborters.current.get(id)?.();
    updateFiles((current) => current.filter((f) => f.id !== id));
    setFileError("");
    deleteFile(token, id);
    (next || document.getElementById("move-files"))?.focus();
    if (!api) return;
    // Removed on the server too, by its own id or, for a file whose upload
    // never reported back, by the form's id. Either way the server notes the
    // form's id as removed, so the same upload still landing, or a copy
    // waiting in another tab or on another device, is refused.
    try {
      await api.remove(item.serverId || item.id);
    } catch {
      // Perhaps still on the server, so it goes back on the page: what the
      // customer sees has to be what the office will get.
      removedIds.current.delete(id);
      if (!item.serverId) failedIds.current.add(id);
      updateFiles((current) => [...current, item.serverId ? item : { ...item, status: "failed" }]);
      setFileError(`${item.name} could not be removed just now. Please try again.`);
    }
  };

  const showSection = (key) => {
    const section = document.getElementById(`section-${key}`);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
    section?.querySelector("h2")?.focus({ preventScroll: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    const found = validateDetails(formRef.current, filesRef.current.length);
    setErrors(found);

    const first = SECTION_ORDER.find((key) => found[key]);
    if (first) {
      showSection(first);
      return;
    }

    // The form is switched off while it sends (the fieldset below), so nothing
    // can be changed or added behind a send that is already on its way.
    setSubmitting(true);
    const clashesBefore = clashCount.current;
    try {
      if (preview) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        dirty.current.clear();
        clearDraft(token);
        clearFiles(token);
        setDone(true);
        return;
      }

      // Anything still on its way up has to land before the details are sent.
      const outcomes = [];
      while (uploads.current.size) outcomes.push(...(await Promise.all([...uploads.current.values()])));
      const retry = filesRef.current.filter((f) => failedIds.current.has(f.id) && f.file);
      if (retry.length) outcomes.push(...(await Promise.all(retry.map(startUpload))));
      // A file turned away on the way (the enquiry already has twelve, say) is
      // not left out of the send without the customer seeing why.
      if (outcomes.includes("dropped")) {
        setErrors({ items: "Not every photo or file could be added. The reason is shown above." });
        showSection("items");
        return;
      }
      const stuck = filesRef.current.filter((f) => failedIds.current.has(f.id)).length;
      if (stuck) {
        setErrors({
          items:
            stuck === 1
              ? "One photo or file could not be uploaded. Check your connection and try again, or remove it."
              : `${stuck} photos or files could not be uploaded. Check your connection and try again, or remove them.`,
        });
        showSection("items");
        return;
      }

      // The send carries the answers itself, so a save still waiting is not needed.
      clearTimeout(saveTimer.current);
      while (saving.current) await saving.current;
      // A save or a fresh look at the server on the way here found an answer
      // changed elsewhere as well. The customer sees which before anything goes.
      if (clashCount.current !== clashesBefore) {
        setErrors({ submit: "Some answers were also changed on another device. Please check them, then send again." });
        focusSoon(() => clashNotice.current);
        return;
      }
      sending.current = true;

      for (let attempt = 0; ; attempt += 1) {
        const sent = markSent();
        const result = await submitMoveDetails(token, {
          details: formRef.current,
          baseVersion: version.current,
          saveId: sent.saveId,
          sentIds: sent.earlier,
        });

        if (result?.success) {
          confirmSent(sent, result.version);
          // The device's copies of files are not cleared here: each goes when its
          // own upload lands, and another tab on this link may still be sending one.
          sentBefore.current = true;
          conflictsInRow.current = 0;
          setUnsent(false);
          setClashes([]);
          setSync("idle");
          setDone(true);
        } else if (result?.conflict && result.current) {
          adoptAnswers(result.current);
          // One of this page's own saves got there first: there is nothing
          // new to check, so it goes again.
          if (ownSaves.current.has(result.current.saveId) && attempt === 0) continue;
          // Changed on another device since this page last looked. The two are
          // put together and shown, for the customer to check before sending.
          setErrors({
            submit:
              "Your answers were also changed on another device. We have put the two together: please check them, then send again.",
          });
          focusSoon(() => (clashCount.current !== clashesBefore ? clashNotice.current : submitError.current));
        } else {
          setErrors({ ...(result?.fields || {}), submit: result?.error || "We could not send your details. Please try again, or call us." });
          const missing = SECTION_ORDER.find((key) => result?.fields?.[key]);
          if (missing) showSection(missing);
          else focusSoon(() => submitError.current);
          // The server found something missing that the page thought was there
          // (a photo removed on another device, say): look again.
          if (missing) refreshRef.current?.();
        }
        break;
      }
    } catch {
      setErrors({ submit: "We could not send your details. Please check your connection and try again." });
      focusSoon(() => submitError.current);
    } finally {
      sending.current = false;
      // Not sent, so the save that was waiting is wanted after all.
      if (dirty.current.size) pushSoon();
      setSubmitting(false);
    }
  };

  // Sending, and coming back to change an answer, each replace what is on the
  // page. Focus is moved with it, which is also what gets the change announced.
  const wasDone = useRef(done);
  useEffect(() => {
    if (wasDone.current === done) return;
    wasDone.current = done;
    if (done) doneHeading.current?.focus();
    else formElement.current?.querySelector("h2")?.focus();
  }, [done]);

  if (done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <CircleCheck aria-hidden="true" className="mx-auto h-14 w-14 text-success" />
        <h2
          ref={doneHeading}
          tabIndex={-1}
          className="mt-4 font-[family-name:var(--font-space)] text-2xl font-bold text-primary outline-none"
        >
          Thank you. We have your details.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          We will go through them and call you with your price. Your move is booked once you have agreed the price
          and the date with us.
        </p>
        {clashes.length ? (
          <div className="mx-auto mt-6 max-w-md">
            <ClashNotice
              clashes={clashes}
              onDismiss={() => {
                setClashes([]);
                focusSoon(() => doneHeading.current);
              }}
            />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setErrors({});
            setDone(false);
          }}
          className="mt-6 text-sm font-semibold text-primary underline underline-offset-4 hover:text-accent"
        >
          Change my answers
        </button>
      </div>
    );
  }

  const errorCount = SECTION_ORDER.filter((key) => errors[key]).length;

  return (
    <form ref={formElement} onSubmit={handleSubmit} noValidate autoComplete="off">
      {/* Switched off as a whole while it sends, so nothing changes behind the send. */}
      <fieldset disabled={submitting} className="min-w-0 space-y-4 transition-opacity disabled:opacity-60 sm:space-y-5">
      <legend className="sr-only">Your move details</legend>
      <p className="flex items-start gap-2 text-sm text-slate-600">
        <Save aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-success" />
        <span>
          {restored && !clashes.length
            ? "Welcome back. Everything you entered before is still here."
            : "Everything you enter is saved as you go, so a refresh or a closed page loses nothing."}{" "}
          <span aria-live="polite" className="font-semibold text-slate-700">
            {syncLabel(sync, onDevice)}
          </span>
        </span>
      </p>

      {unsent ? (
        <p role="status" className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
          Some answers here have changed since your details were sent. Send them again so we see the changes.
        </p>
      ) : null}
      <ClashNotice
        ref={clashNotice}
        clashes={clashes}
        onDismiss={() => {
          setClashes([]);
          focusSoon(() => formElement.current?.querySelector("h2"));
        }}
      />

      <Section
        id="section-from"
        n={1}
        title={`Where you are moving from${enquiry.fromPostcode ? ` (${enquiry.fromPostcode})` : ""}`}
        error={errors.from}
      >
        <PropertyFields side="from" value={form.from} onChange={(from) => patch({ from })} />
      </Section>

      <Section
        id="section-to"
        n={2}
        title={`Where you are moving to${enquiry.toPostcode ? ` (${enquiry.toPostcode})` : ""}`}
        error={errors.to}
      >
        <PropertyFields side="to" value={form.to} onChange={(to) => patch({ to })} />
      </Section>

      <Section
        id="section-items"
        n={3}
        title="What we are moving"
        hint="Tap what you have, type a list, or add photos or a file. Whichever is easiest: you do not need to do all of them."
        error={errors.items}
      >
        <ItemGroups items={form.items} onChange={(items) => patch({ items })} />

        <div className="mt-5">
          <p id="boxes-label" className="mb-2 text-sm font-semibold text-slate-700">
            Roughly how many boxes and bags?
          </p>
          <div role="radiogroup" aria-labelledby="boxes-label" className="flex flex-wrap gap-2">
            {BOX_RANGES.map((b) => (
              <Choice key={b.id} name="boxes" value={b.id} current={form.boxes} onChange={(boxes) => patch({ boxes })}>
                {b.label}
              </Choice>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="items-notes" className="mb-2 block text-sm font-semibold text-slate-700">
            Anything not on the list
          </label>
          <textarea
            id="items-notes"
            maxLength={2000}
            rows={3}
            value={form.itemsNotes}
            onChange={(e) => patch({ itemsNotes: e.target.value })}
            placeholder="For example: 2 large mirrors, an exercise bike, a fish tank"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-slate-700">Photos, or a list you already have</p>
          <FilePicker files={files} busy={addingFiles} error={fileError} onAdd={addFiles} onRemove={removeFile} onRetry={retryFile} />
        </div>
      </Section>

      <Section
        id="section-dismantle"
        n={4}
        title="Taking apart and putting together"
        hint="Beds, wardrobes and large tables often need taking apart to get through a door."
        error={errors.dismantle}
      >
        <p id="dismantle-label" className="mb-2 text-sm font-semibold text-slate-700">
          Does anything need dismantling or reassembling?
        </p>
        <div role="radiogroup" aria-labelledby="dismantle-label" className="grid grid-cols-2 gap-2.5 sm:max-w-xs">
          <Choice name="dismantle" value="yes" current={form.dismantle} onChange={(dismantle) => patch({ dismantle })}>
            Yes
          </Choice>
          <Choice
            name="dismantle"
            value="no"
            current={form.dismantle}
            onChange={(dismantle) => patch({ dismantle, dismantleNotes: "" })}
          >
            No
          </Choice>
        </div>
        {form.dismantle === "yes" ? (
          <div className="mt-5">
            <label htmlFor="dismantle-notes" className="mb-2 block text-sm font-semibold text-slate-700">
              Which items?
            </label>
            <textarea
              id="dismantle-notes"
              maxLength={1000}
              rows={2}
              value={form.dismantleNotes}
              onChange={(e) => patch({ dismantleNotes: e.target.value })}
              placeholder="For example: double bed and wardrobe to take apart and rebuild"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        ) : null}
      </Section>

      <Section
        id="section-movers"
        n={5}
        title="How many people you need"
        hint="Not sure? Pick the last option and we will advise from your list."
        error={errors.movers}
      >
        <div role="radiogroup" aria-label="How many people you need" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {MOVER_OPTIONS.map((m) => (
            <div key={m.id} className={m.id === "unsure" ? "col-span-2 sm:col-span-4" : ""}>
              <Choice name="movers" value={m.id} current={form.movers} onChange={(movers) => patch({ movers })}>
                {m.label}
              </Choice>
            </div>
          ))}
        </div>
      </Section>

      <Section id="section-notes" n={6} title="Anything else we should know" hint="Optional. Parking, narrow stairs, fragile items, a key to collect.">
        <label htmlFor="notes" className="sr-only">
          Anything else we should know
        </label>
        <textarea
          id="notes"
          maxLength={2000}
          rows={3}
          value={form.notes}
          onChange={(e) => patch({ notes: e.target.value })}
          placeholder="For example: permit parking only, the van can stop outside for 20 minutes"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </Section>

      {errorCount ? (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorCount === 1 ? "One answer is missing above." : `${errorCount} answers are missing above.`}
        </p>
      ) : null}
      {errors.submit ? (
        <p ref={submitError} tabIndex={-1} role="alert" className="outline-none rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errors.submit}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || addingFiles}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            Sending
          </>
        ) : (
          "Send my move details"
        )}
      </button>
      <p className="text-center text-sm text-muted">
        This is not a booking yet. We confirm the price and the date with you first.
      </p>
      <p className="text-center text-xs leading-relaxed text-muted">
        We use what you send only to price and plan your move. Your photos and files are stored privately with
        our hosting provider, and only our office team can open them. Ask us at any time and we will delete
        them. Anything that has not reached us yet is kept in this browser for up to seven days.
      </p>
      </fieldset>
    </form>
  );
}
