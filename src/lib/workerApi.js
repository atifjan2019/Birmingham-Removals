const DEFAULT_WORKER_API_URL = "https://birmingham-removals-api.webspires.workers.dev";

function apiBase() {
  return (process.env.WORKER_API_URL || DEFAULT_WORKER_API_URL).replace(/\/+$/, "");
}

// No hardcoded fallback — the admin PIN must come from the environment. An
// empty value will be rejected by the worker (fail closed) rather than using a
// known default.
function adminPin() {
  return process.env.ADMIN_PIN || process.env.WORKER_ADMIN_PIN || "";
}

async function workerFetch(
  path,
  options = {},
  { admin = false, timeoutMs = 8000, revalidate, tags } = {}
) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (admin) {
    headers.set("X-Admin-Pin", adminPin());
  }

  // Never let an unreachable/slow worker hang the request — this was the
  // dominant homepage TTFB / LCP cost. Reads can additionally be cached so
  // public pages don't hit the API on every request.
  const cacheOpts =
    typeof revalidate === "number"
      ? { next: { revalidate, ...(tags ? { tags } : {}) } }
      : { cache: "no-store" };

  const response = await fetch(`${apiBase()}${path}`, {
    ...options,
    headers,
    ...cacheOpts,
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const details = payload?.error?.details ? `: ${Object.values(payload.error.details).join(", ")}` : "";
    const message = `${payload?.error?.message || `Worker API request failed with ${response.status}`}${details}`;
    throw new Error(message);
  }

  return payload.data;
}

export async function listBookings() {
  const all = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const page = await workerFetch(`/bookings?limit=${limit}&offset=${offset}`, {}, { admin: true });
    // A 204/empty response returns null — guard so the admin pages degrade
    // gracefully instead of throwing on `...null`.
    if (!Array.isArray(page) || page.length === 0) break;
    all.push(...page);

    if (page.length < limit) break;
    offset += limit;
  }

  return all;
}

export async function createWorkerBooking(data) {
  return workerFetch("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateWorkerBooking(id, data) {
  return workerFetch(`/bookings/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, { admin: true });
}

export async function deleteWorkerBooking(id) {
  return workerFetch(`/bookings/${encodeURIComponent(id)}`, {
    method: "DELETE",
  }, { admin: true });
}

export async function listCustomers() {
  return workerFetch("/customers", {}, { admin: true });
}

export async function deleteWorkerCustomer(id) {
  return workerFetch(`/customers/${encodeURIComponent(id)}`, {
    method: "DELETE",
  }, { admin: true });
}

export async function listActivity() {
  return workerFetch("/activity", {}, { admin: true });
}

export async function recordWorkerActivity(data) {
  return workerFetch("/activity", {
    method: "POST",
    body: JSON.stringify(data),
  }, { admin: true });
}

export async function getWorkerSettings() {
  // Public, on every page: short timeout so a dead API fails fast to the
  // fallback. This fetch lives in the root layout, so its revalidate window
  // governs ISR regeneration for EVERY public page. Settings change only when
  // an admin saves them, and that save calls revalidateTag("site-settings") +
  // revalidatePath("/", "layout") (see actions/settings.js) which propagates
  // the change instantly — so we use a long 24h window here purely as a
  // fallback ceiling. A short window (e.g. 600s) put the whole site on a
  // 10-min ISR cycle and caused excessive Vercel ISR write usage.
  // The tag lets the settings save bust this single shared data-cache entry
  // (used by every page AND /api/site-image/*) without touching anything else.
  //
  // Timeout: the /settings payload embeds the logo, footer logo and favicon as
  // base64 (~515 KB total), which takes ~1s warm and more from a cold worker.
  // A 1.5s timeout aborted that transfer often enough that force-dynamic admin
  // pages fell back to defaults — showing the OLD phone (BUSINESS.phoneDisplay)
  // and an empty logoUrl (→ broken /images/logo.webp). 8s tolerates the large
  // payload; public pages are ISR-cached so the longer ceiling only affects
  // rare cache-miss regenerations, and correct data beats failing fast to wrong
  // data. (Fix the root cause later by not embedding images in this payload.)
  return workerFetch("/settings", {}, {
    timeoutMs: 8000,
    revalidate: 86400,
    tags: ["site-settings"],
  });
}

export async function getWorkerSettingsFresh() {
  // Uncached read, used only by the settings server action to diff a save
  // against what is actually stored so no-op saves can skip the (expensive)
  // full-site revalidation. Never use this on public pages — the no-store
  // fetch would make them dynamic.
  return workerFetch("/settings", {}, { admin: true, timeoutMs: 5000 });
}

export async function updateWorkerSettings(patch) {
  return workerFetch("/settings", {
    method: "PUT",
    body: JSON.stringify(patch),
  }, { admin: true });
}
