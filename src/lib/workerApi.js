const DEFAULT_WORKER_API_URL = "https://birmingham-removals-api.webspires.workers.dev";
const DEFAULT_ADMIN_PIN = "524862";

function apiBase() {
  return (process.env.WORKER_API_URL || DEFAULT_WORKER_API_URL).replace(/\/+$/, "");
}

function adminPin() {
  return process.env.ADMIN_PIN || process.env.WORKER_ADMIN_PIN || DEFAULT_ADMIN_PIN;
}

async function workerFetch(path, options = {}, { admin = false } = {}) {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (admin) {
    headers.set("X-Admin-Pin", adminPin());
  }

  const response = await fetch(`${apiBase()}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.message || `Worker API request failed with ${response.status}`;
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
