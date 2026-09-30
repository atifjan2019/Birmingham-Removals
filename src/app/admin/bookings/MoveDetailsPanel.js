"use client";

import { Component, useEffect, useId, useRef, useState } from "react";
import { Check, ClipboardList, Copy, FileText, ImageIcon, Loader2, Mail, RefreshCw } from "lucide-react";
import { loadBookingMoveDetails, openBookingFile, emailMoveDetailsLink } from "@/app/actions/moveDetailsAdmin";
import { describeDetails } from "@/lib/moveDetails";

const LOAD_FAILED = "The move details could not be loaded.";

// "Unauthorized" is what the server actions answer once the admin session has
// run out, which can happen while a booking sits open.
function explain(error, fallback) {
  if (error === "Unauthorized") return "You have been signed out. Sign in again and reopen the booking.";
  return error || fallback;
}

// The API keeps its times in UTC without saying so ("2026-09-30 07:15:00").
// Read as written, a browser would take that for local time and show it an
// hour out all summer.
function parseApiDate(value) {
  if (!value) return null;
  const text = String(value).trim().replace(" ", "T");
  const date = new Date(/(Z|[+-]\d{2}:?\d{2})$/i.test(text) ? text : `${text}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

const formatWhen = (date) =>
  date.toLocaleString("en-GB", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

function formatSize(bytes) {
  const size = Number(bytes) || 0;
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

/** Where the customer has got to with the form, as the line at the top of the panel. */
function describeProgress({ started, updatedAt, submittedAt }) {
  if (submittedAt) {
    return {
      tone: "sent",
      text: `Sent by the customer on ${formatWhen(submittedAt)}`,
      edited: updatedAt && updatedAt > submittedAt ? `Edited since, last saved ${formatWhen(updatedAt)}` : "",
    };
  }
  if (started) {
    return {
      tone: "started",
      text: updatedAt ? `In progress, last saved ${formatWhen(updatedAt)}` : "In progress",
      edited: "",
    };
  }
  return { tone: "none", text: "Not started", edited: "" };
}

/**
 * The API's answer, made ready to draw. The panel is written against the
 * agreed response, but a field that arrives in some other form is dropped
 * here rather than left to break the screen.
 */
function readMoveDetails(data) {
  let details = data?.details ?? null;
  if (typeof details === "string") {
    try {
      details = JSON.parse(details);
    } catch {
      details = null;
    }
  }
  if (!details || typeof details !== "object" || Array.isArray(details)) details = null;

  const token = typeof data?.token === "string" ? data.token : "";
  const files = (Array.isArray(data?.files) ? data.files : [])
    .filter((file) => file && file.id)
    .map((file) => ({
      id: String(file.id),
      name: typeof file.name === "string" && file.name ? file.name : "File",
      size: file.size,
      isImage: Boolean(file.isImage),
      // A preview is only ever a small inline JPEG, which is what the API
      // stores. A photo without one shows as a tile, the way a document does.
      thumb:
        file.isImage && typeof file.thumb === "string" && file.thumb.startsWith("data:image/jpeg;base64,")
          ? file.thumb
          : "",
    }));

  return {
    // Built in the browser so the link is for the site the office is signed in to.
    link: token ? `${window.location.origin}/move-details/${encodeURIComponent(token)}` : "",
    rows: details ? describeDetails(details) : [],
    files,
    progress: describeProgress({
      // Photos can be added before any answer is saved.
      started: Boolean(details) || files.length > 0,
      updatedAt: parseApiDate(data?.updatedAt),
      submittedAt: parseApiDate(data?.submittedAt),
    }),
  };
}

function Heading() {
  return (
    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
      <ClipboardList aria-hidden="true" className="w-5 h-5 text-primary shrink-0" />
      Move details from customer
    </h3>
  );
}

const PROGRESS_DOT = {
  sent: "bg-emerald-500",
  started: "bg-amber-500",
  none: "bg-gray-300",
};

/**
 * The status line, with a refresh beside it: the office is often on the phone
 * to the customer while they fill the form in, and wants to see it arrive.
 */
function ProgressLine({ progress, busy, onRefresh }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-2.5 min-w-0">
        <span aria-hidden="true" className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${PROGRESS_DOT[progress.tone]}`} />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900">{progress.text}</div>
          {progress.edited && <div className="mt-0.5 text-xs font-medium text-amber-700">{progress.edited}</div>}
        </div>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={busy}
        aria-label="Refresh the move details"
        className="shrink-0 -mt-1 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-60"
      >
        <RefreshCw aria-hidden="true" className={`w-3.5 h-3.5 ${busy ? "animate-spin" : ""}`} />
        <span className="hidden sm:inline">Refresh</span>
      </button>
    </div>
  );
}

/**
 * Emails the customer their link, after a second press that names the
 * address, so a slip of the mouse sends nothing.
 */
export function EmailLinkButton({ bookingId, email }) {
  const [step, setStep] = useState("idle"); // idle, confirm, sending, sent, failed
  const [message, setMessage] = useState("");

  const send = async () => {
    setStep("sending");
    const result = await emailMoveDetailsLink(bookingId).catch(() => null);
    if (result?.success) {
      setStep("sent");
      setMessage(`Sent to ${result.to}.`);
    } else {
      setStep("failed");
      setMessage(result?.error || "The email was not sent. Try again in a moment.");
    }
  };

  if (!email) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {step === "confirm" ? (
        <>
          <span className="text-gray-700">
            Email the link to <strong className="break-all">{email}</strong>?
          </span>
          <button
            type="button"
            onClick={send}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 font-semibold text-white hover:bg-primary/90"
          >
            <Mail aria-hidden="true" className="w-4 h-4" />
            Send email
          </button>
          <button
            type="button"
            onClick={() => setStep("idle")}
            className="rounded-lg px-3 py-1.5 font-semibold text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setStep("confirm")}
          disabled={step === "sending"}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-1.5 font-semibold text-primary hover:bg-primary/10 disabled:opacity-60"
        >
          {step === "sending" ? <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin" /> : <Mail aria-hidden="true" className="w-4 h-4" />}
          {step === "sending" ? "Sending" : step === "sent" ? "Email it again" : "Email the link to the customer"}
        </button>
      )}
      {message && step !== "confirm" ? (
        <span role="status" className={step === "failed" ? "font-medium text-red-600" : "font-medium text-emerald-700"}>
          {message}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The customer's own link to the form, the one in their enquiry email, to
 * paste into WhatsApp or an email. An enquiry from before the emails carried
 * the link has no other way to get it. Shown at the top of Booking Details.
 */
export function CustomerLink({ link }) {
  const fieldId = useId();
  const fieldRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopyFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Some browsers refuse the clipboard. The link is selected instead, so
      // it can still be copied by hand.
      const range = document.createRange();
      if (fieldRef.current) range.selectNodeContents(fieldRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      setCopyFailed(true);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div id={fieldId} className="block text-xs text-muted font-semibold uppercase tracking-wider mb-2">
        Move details link (the one in their email)
      </div>
      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
        {/* The whole address, wrapped, so it can be read and checked; a click
            selects all of it. */}
        <p
          ref={fieldRef}
          aria-labelledby={fieldId}
          className="w-full min-w-0 flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-xl bg-white text-sm text-gray-700 font-mono break-all select-all"
        >
          {link}
        </p>
        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
        >
          {copied ? <Check aria-hidden="true" className="w-4 h-4" /> : <Copy aria-hidden="true" className="w-4 h-4" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
      <p className={`mt-2 text-xs ${copyFailed ? "font-medium text-red-600" : "text-gray-500"}`}>
        {copyFailed
          ? "Could not copy it for you. The link is selected, so copy it from the field."
          : "Private to this customer. Paste it into WhatsApp or an email so they can add or change their move details."}
      </p>
    </div>
  );
}

function Answers({ rows }) {
  return (
    <dl className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-200/70">
      {rows.map((row) => (
        <div key={row.label} className="px-4 py-3 sm:grid sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4">
          <dt className="text-xs text-muted font-semibold uppercase tracking-wider sm:pt-0.5">{row.label}</dt>
          <dd className="mt-1 sm:mt-0 text-sm text-gray-900 whitespace-pre-line [overflow-wrap:anywhere]">
            {row.list?.length ? (
              <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {row.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Files({ files }) {
  const [openingId, setOpeningId] = useState(null);
  const [error, setError] = useState("");
  // Previews the browser could not draw: they fall back to a plain tile.
  const [brokenThumbs, setBrokenThumbs] = useState(() => new Set());

  const openFile = async (file) => {
    if (openingId !== null) return;
    setError("");
    setOpeningId(file.id);

    // A photo is shown in a new tab. Safari only lets a page open a tab from
    // inside the click itself, and the file's address is not known until the
    // server has made one, so the tab is opened empty now and sent to the
    // photo once the address arrives. A document is not shown but downloaded,
    // which needs no tab: one opened for it would be left behind, empty.
    const tab = file.isImage ? window.open("", "_blank") : null;
    if (tab) tab.opener = null;

    let result = null;
    try {
      result = await openBookingFile(file.id);
    } catch {
      // Offline, or the server could not be reached. Reported below.
    }
    setOpeningId(null);

    if (result?.success && result.url) {
      // The API sends a document as a download, so going to its address starts
      // the download and leaves this page where it is.
      if (!file.isImage) window.location.assign(result.url);
      // No tab means the browser refused the empty one; ask for the photo itself.
      else if (!tab) window.open(result.url, "_blank", "noopener");
      else if (!tab.closed) tab.location.replace(result.url);
      return;
    }

    if (tab && !tab.closed) tab.close();
    const reason = explain(result?.error, "Try again in a moment.").replace(/\.$/, "");
    setError(`Could not open ${file.name}. ${reason}.`);
  };

  return (
    <div>
      <div className="text-xs text-muted font-semibold uppercase tracking-wider mb-2">
        Photos and files ({files.length})
      </div>
      <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {files.map((file) => {
          const Icon = file.isImage ? ImageIcon : FileText;
          return (
            <li key={file.id}>
              <button
                type="button"
                onClick={() => openFile(file)}
                disabled={openingId !== null}
                title={file.name}
                aria-label={`Open ${file.name}`}
                className="relative block w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait"
              >
                {file.thumb && !brokenThumbs.has(file.id) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={file.thumb}
                    alt=""
                    width="200"
                    height="200"
                    decoding="async"
                    onError={() => setBrokenThumbs((current) => new Set(current).add(file.id))}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <span className="flex aspect-square w-full flex-col items-center justify-center gap-1 p-2 text-center">
                    <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
                    <span className="line-clamp-2 text-[11px] font-medium leading-tight text-gray-700 [overflow-wrap:anywhere]">
                      {file.name}
                    </span>
                    <span className="text-[10px] text-muted">{formatSize(file.size)}</span>
                  </span>
                )}
                {openingId === file.id && (
                  <span className="absolute inset-0 flex items-center justify-center bg-white/70">
                    <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-primary" />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function MoveDetails({ bookingId, onLink }) {
  const [view, setView] = useState({ load: "loading" });
  const [busy, setBusy] = useState(true);
  const [reloads, setReloads] = useState(0);

  // Loads when the booking is opened, and again on Refresh or Try again.
  useEffect(() => {
    let cancelled = false;
    loadBookingMoveDetails(bookingId)
      .then((result) => {
        if (cancelled) return;
        const ready = result?.success ? readMoveDetails(result.data) : null;
        setView(ready ? { load: "ready", ...ready } : { load: "error", error: explain(result?.error, LOAD_FAILED) });
        // An older enquiry gets its link when it is first opened here, so the
        // top of Booking Details learns it from this answer.
        if (ready?.link) onLink?.(ready.link);
        setBusy(false);
      })
      .catch(() => {
        // Offline, or an answer the panel could not read.
        if (cancelled) return;
        setView({ load: "error", error: LOAD_FAILED });
        setBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [bookingId, reloads, onLink]);

  const reload = () => {
    setBusy(true);
    // After a failure the message gives way to the loading line. A refresh
    // keeps what is on screen until the new answer arrives.
    setView((current) => (current.load === "error" ? { load: "loading" } : current));
    setReloads((n) => n + 1);
  };

  return (
    <div>
      <Heading />

      {view.load === "loading" && (
        <div role="status" className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin" />
          Loading the move details
        </div>
      )}

      {view.load === "error" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p role="alert" className="text-sm font-medium text-red-700">
            {view.error}
          </p>
          <button
            type="button"
            onClick={reload}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {view.load === "ready" && (
        <div className="space-y-4">
          <ProgressLine progress={view.progress} busy={busy} onRefresh={reload} />
          {view.rows.length > 0 && <Answers rows={view.rows} />}
          {view.files.length > 0 ? (
            <Files files={view.files} />
          ) : (
            view.rows.length > 0 && <p className="text-sm text-gray-500">No photos or files added.</p>
          )}
        </div>
      )}
    </div>
  );
}

// A fault while drawing the customer's answers must not take the rest of the
// booking down with it, and only a class component can catch one.
class PanelBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div>
        <Heading />
        <p className="text-sm text-gray-500">The move details could not be shown.</p>
      </div>
    );
  }
}

/**
 * The customer's move details inside the booking modal: how far they have
 * got, their link, their answers and their photos and files. It loads on its
 * own and keeps its failures to itself.
 */
export default function MoveDetailsPanel({ bookingId, onLink }) {
  return (
    <PanelBoundary>
      <MoveDetails bookingId={bookingId} onLink={onLink} />
    </PanelBoundary>
  );
}
