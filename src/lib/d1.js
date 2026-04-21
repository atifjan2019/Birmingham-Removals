// Cloudflare D1 HTTP REST client.
// Used from Vercel/Node runtime — D1 native binding isn't available outside
// Cloudflare Workers, so we talk to the REST API directly.
//
// Env vars required:
//   CLOUDFLARE_ACCOUNT_ID
//   CLOUDFLARE_D1_DATABASE_ID
//   CLOUDFLARE_D1_TOKEN   (API token with "D1:Edit" permission on the DB)

const API_BASE = "https://api.cloudflare.com/client/v4";

function endpoint() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const dbId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  if (!accountId || !dbId) {
    throw new Error(
      "Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_D1_DATABASE_ID env var"
    );
  }
  return `${API_BASE}/accounts/${accountId}/d1/database/${dbId}/query`;
}

function token() {
  const t = process.env.CLOUDFLARE_D1_TOKEN;
  if (!t) throw new Error("Missing CLOUDFLARE_D1_TOKEN env var");
  return t;
}

export async function d1Query(sql, params = []) {
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql, params }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    const msg =
      json?.errors?.map((e) => e.message).join("; ") ||
      `D1 HTTP ${res.status}`;
    throw new Error(`D1 query failed: ${msg}`);
  }

  // Cloudflare returns { result: [{ results: [...], success, meta }] }
  const first = Array.isArray(json.result) ? json.result[0] : null;
  return {
    rows: first?.results || [],
    meta: first?.meta || {},
  };
}

export async function d1All(sql, params = []) {
  const { rows } = await d1Query(sql, params);
  return rows;
}

export async function d1First(sql, params = []) {
  const rows = await d1All(sql, params);
  return rows[0] || null;
}

export async function d1Run(sql, params = []) {
  const { meta } = await d1Query(sql, params);
  return meta;
}
