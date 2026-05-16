const DEFAULT_WORKER_API_URL = "https://birmingham-removals-api.webspires.workers.dev";
const DEFAULT_ADMIN_PIN = "524862";

function apiBase() {
  return (process.env.WORKER_API_URL || DEFAULT_WORKER_API_URL).replace(/\/+$/, "");
}

function adminPin() {
  return process.env.ADMIN_PIN || process.env.WORKER_ADMIN_PIN || DEFAULT_ADMIN_PIN;
}

async function workerFetch(
  path,
  options = {},
  { admin = false, timeoutMs = 8000, revalidate } = {}
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
      ? { next: { revalidate } }
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
  // fallback, and cached for 10 min so pages aren't blocked per-request.
  return workerFetch("/settings", {}, { timeoutMs: 1500, revalidate: 600 });
}

export async function updateWorkerSettings(patch) {
  return workerFetch("/settings", {
    method: "PUT",
    body: JSON.stringify(patch),
  }, { admin: true });
}
