import { notFound } from "next/navigation";
import { Phone, Truck, MapPin, Calendar } from "lucide-react";
import { getSiteSettings, telHref } from "@/lib/siteSettings";
import { getMoveDetails, workerPublicBase } from "@/lib/workerApi";
import { MOVE_TYPE_LABELS } from "@/lib/moveDetails";
import MoveDetailsForm from "./MoveDetailsForm";

// A private page reached from a link in the enquiry email, never from search.
export const metadata = {
  title: "Your move details",
  robots: { index: false, follow: false },
};

// Each visit reads the enquiry's saved answers afresh: nothing here is shared
// between customers, so nothing here is cached.
export const dynamic = "force-dynamic";

// A details link's token: 32 random bytes as base64url.
const TOKEN = /^[A-Za-z0-9_-]{43}$/;

// Sample enquiry for the local design preview at /move-details/preview, which
// saves nothing and only exists outside production.
const PREVIEW = {
  enquiry: {
    moveType: "flat",
    fromPostcode: "B15 2TT",
    toPostcode: "B29 6BD",
    moveDate: "2026-10-17",
  },
};

/**
 * What a details link opens: the enquiry it belongs to, with any answers and
 * files already saved. Null for a link that matches no enquiry; `failed` when
 * the API could not be reached, which is not the customer's link being wrong.
 */
async function loadMoveDetails(token) {
  if (process.env.NODE_ENV !== "production" && token === "preview") return { ...PREVIEW, preview: true };
  if (!TOKEN.test(token)) return null;
  try {
    return await getMoveDetails(token);
  } catch (error) {
    console.error("[MOVE DETAILS] Could not load:", error.message);
    return { failed: true };
  }
}

export default async function MoveDetailsPage({ params }) {
  const { token } = await params;
  const loaded = await loadMoveDetails(token);
  if (!loaded) notFound();

  const settings = await getSiteSettings();
  const phone = settings.showPhone === false ? "" : settings.phone || "";
  const { enquiry, preview = false, failed = false } = loaded;
  const moveDate =
    !failed && enquiry.moveDate && !Number.isNaN(new Date(enquiry.moveDate).getTime())
      ? new Date(enquiry.moveDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
      : "";

  const summary = failed
    ? []
    : [
        { icon: Truck, text: MOVE_TYPE_LABELS[enquiry.moveType] || enquiry.moveType },
        enquiry.fromPostcode && enquiry.toPostcode ? { icon: MapPin, text: `${enquiry.fromPostcode} to ${enquiry.toPostcode}` } : null,
        moveDate ? { icon: Calendar, text: moveDate } : null,
      ].filter((chip) => chip?.text);

  return (
    <div className="min-h-screen bg-surface">
      {preview ? (
        <p className="bg-amber-100 px-4 py-2 text-center text-xs font-semibold text-amber-900">
          Design preview. Nothing on this page is sent to the office.
        </p>
      ) : null}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* A plain link, not next/link. Leaving through the router and coming
              Back would rebuild this page from the copy the router kept from
              the first load, with none of the answers given since. A plain link
              makes Back a fresh load of a page that is never cached. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" aria-label="Birmingham Removals home" className="flex items-center">
            {settings.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.logoUrl} alt="Birmingham Removals" width="167" height="48" className="h-10 w-auto max-w-[180px] object-contain" />
            ) : (
              <span className="font-[family-name:var(--font-space)] text-lg font-extrabold text-primary">
                Birmingham <span className="text-accent">Removals</span>
              </span>
            )}
          </a>
          {phone ? (
            <a
              href={telHref(phone)}
              className="flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-accent" />
              {phone}
            </a>
          ) : null}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        {failed ? (
          <>
            <h1 className="font-[family-name:var(--font-space)] text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
              We could not open your details just now
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Nothing you have already sent is lost. Please try this link again in a minute
              {phone ? (
                <>
                  , or call us on{" "}
                  <a href={telHref(phone)} className="font-semibold text-primary underline underline-offset-4">
                    {phone}
                  </a>
                </>
              ) : null}
              .
            </p>
          </>
        ) : (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Enquiry received</p>
            <h1 className="mt-2 font-[family-name:var(--font-space)] text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
              A few details about your move
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Answer these and we can give you a fixed price without the back and forth on WhatsApp. It takes a
              couple of minutes.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {summary.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-primary"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <MoveDetailsForm
                enquiry={enquiry}
                token={token}
                apiBase={workerPublicBase()}
                initial={{
                  details: loaded.details || null,
                  version: loaded.version ?? 0,
                  submittedAt: loaded.submittedAt || null,
                  updatedAt: loaded.updatedAt || null,
                  files: loaded.files || [],
                }}
                preview={preview}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
