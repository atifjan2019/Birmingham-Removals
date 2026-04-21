// Thin Prisma-API-compatible shim backed by Cloudflare D1 (HTTP).
// Supports exactly the operations our server actions + admin pages use.
// Keeps all existing `prisma.<model>.<op>({...})` call sites working unchanged.

import { d1All, d1First, d1Run } from "./d1";

const DATE_COLS = {
  Customer: ["createdAt", "updatedAt"],
  Booking: ["createdAt", "updatedAt", "moveDate"],
  AdminUser: [],
  ActivityLog: ["createdAt"],
};

const JSON_COLS = {
  Booking: ["extras"],
};

// ---------- helpers ----------

function uuid() {
  // D1 has no UUID type; we generate on app side.
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function nowIso() {
  return new Date().toISOString().replace("T", " ").replace("Z", "").split(".")[0];
}

function toDbValue(col, val, model) {
  if (val === undefined) return undefined;
  if (val === null) return null;
  if (DATE_COLS[model]?.includes(col)) {
    if (val instanceof Date) return val.toISOString().replace("T", " ").replace("Z", "").split(".")[0];
    // accept ISO strings
    return String(val).replace("T", " ").replace("Z", "").split(".")[0];
  }
  if (JSON_COLS[model]?.includes(col)) {
    return typeof val === "string" ? val : JSON.stringify(val ?? null);
  }
  if (typeof val === "boolean") return val ? 1 : 0;
  return val;
}

function fromDbRow(model, row) {
  if (!row) return row;
  const out = { ...row };
  for (const c of DATE_COLS[model] || []) {
    if (out[c] != null) {
      // D1 stores as 'YYYY-MM-DD HH:MM:SS' — convert to Date
      const s = String(out[c]).includes("T") ? out[c] : String(out[c]).replace(" ", "T") + "Z";
      const d = new Date(s);
      if (!isNaN(d.getTime())) out[c] = d;
    }
  }
  for (const c of JSON_COLS[model] || []) {
    if (typeof out[c] === "string" && out[c].length) {
      try {
        out[c] = JSON.parse(out[c]);
      } catch {}
    } else if (out[c] == null) {
      out[c] = [];
    }
  }
  return out;
}

// Build a WHERE clause from a Prisma-style `where` object. Returns { sql, params }.
function buildWhere(where, model) {
  if (!where || !Object.keys(where).length) return { sql: "", params: [] };
  const parts = [];
  const params = [];
  for (const [k, v] of Object.entries(where)) {
    if (v && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date)) {
      if ("in" in v) {
        if (!v.in.length) {
          parts.push("0 = 1");
        } else {
          parts.push(`${k} IN (${v.in.map(() => "?").join(",")})`);
          params.push(...v.in.map((x) => toDbValue(k, x, model)));
        }
      } else {
        if ("gte" in v) { parts.push(`${k} >= ?`); params.push(toDbValue(k, v.gte, model)); }
        if ("gt"  in v) { parts.push(`${k} > ?`);  params.push(toDbValue(k, v.gt, model)); }
        if ("lte" in v) { parts.push(`${k} <= ?`); params.push(toDbValue(k, v.lte, model)); }
        if ("lt"  in v) { parts.push(`${k} < ?`);  params.push(toDbValue(k, v.lt, model)); }
        if ("not" in v) { parts.push(`${k} != ?`); params.push(toDbValue(k, v.not, model)); }
        if ("equals" in v) { parts.push(`${k} = ?`); params.push(toDbValue(k, v.equals, model)); }
      }
    } else {
      parts.push(`${k} = ?`);
      params.push(toDbValue(k, v, model));
    }
  }
  return { sql: parts.length ? "WHERE " + parts.join(" AND ") : "", params };
}

function buildOrder(orderBy) {
  if (!orderBy) return "";
  const entries = Array.isArray(orderBy) ? orderBy : [orderBy];
  const parts = [];
  for (const e of entries) {
    for (const [k, dir] of Object.entries(e)) {
      parts.push(`${k} ${String(dir).toUpperCase() === "ASC" ? "ASC" : "DESC"}`);
    }
  }
  return parts.length ? "ORDER BY " + parts.join(", ") : "";
}

function buildLimit(take, skip) {
  const parts = [];
  if (take != null) parts.push(`LIMIT ${Number(take) | 0}`);
  if (skip != null) parts.push(`OFFSET ${Number(skip) | 0}`);
  return parts.join(" ");
}

function pickSelect(row, select) {
  if (!select || !row) return row;
  const out = {};
  for (const k of Object.keys(select)) if (select[k]) out[k] = row[k];
  return out;
}

// ---------- generic CRUD factory ----------

function makeModel({ table, modelKey }) {
  return {
    async findFirst({ where = {}, orderBy, select } = {}) {
      const w = buildWhere(where, modelKey);
      const o = buildOrder(orderBy);
      const sql = `SELECT * FROM ${table} ${w.sql} ${o} LIMIT 1`.trim();
      const row = await d1First(sql, w.params);
      return row ? (select ? pickSelect(fromDbRow(modelKey, row), select) : fromDbRow(modelKey, row)) : null;
    },

    async findUnique({ where = {}, select } = {}) {
      return this.findFirst({ where, select });
    },

    async findMany({ where = {}, orderBy, take, skip, select, distinct } = {}) {
      const w = buildWhere(where, modelKey);
      const o = buildOrder(orderBy);
      const l = buildLimit(take, skip);
      const sql = `SELECT * FROM ${table} ${w.sql} ${o} ${l}`.trim();
      let rows = await d1All(sql, w.params);
      rows = rows.map((r) => fromDbRow(modelKey, r));
      if (distinct && distinct.length) {
        const seen = new Set();
        rows = rows.filter((r) => {
          const key = distinct.map((c) => r[c]).join("\u0001");
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
      if (select) rows = rows.map((r) => pickSelect(r, select));
      return rows;
    },

    async count({ where = {} } = {}) {
      const w = buildWhere(where, modelKey);
      const row = await d1First(`SELECT COUNT(*) AS c FROM ${table} ${w.sql}`.trim(), w.params);
      return Number(row?.c || 0);
    },

    async create({ data }) {
      const now = nowIso();
      const row = { id: data.id || uuid(), ...data };
      if (DATE_COLS[modelKey]?.includes("createdAt") && !row.createdAt) row.createdAt = now;
      if (DATE_COLS[modelKey]?.includes("updatedAt") && !row.updatedAt) row.updatedAt = now;

      const cols = Object.keys(row);
      const vals = cols.map((c) => toDbValue(c, row[c], modelKey));
      const sql = `INSERT INTO ${table} (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`;
      await d1Run(sql, vals);
      return this.findUnique({ where: { id: row.id } });
    },

    async update({ where, data }) {
      const patch = { ...data };
      if (DATE_COLS[modelKey]?.includes("updatedAt")) patch.updatedAt = nowIso();
      const cols = Object.keys(patch);
      const vals = cols.map((c) => toDbValue(c, patch[c], modelKey));
      const w = buildWhere(where, modelKey);
      const sql = `UPDATE ${table} SET ${cols.map((c) => `${c} = ?`).join(", ")} ${w.sql}`;
      await d1Run(sql, [...vals, ...w.params]);
      return this.findFirst({ where });
    },

    async delete({ where }) {
      const existing = await this.findFirst({ where });
      const w = buildWhere(where, modelKey);
      await d1Run(`DELETE FROM ${table} ${w.sql}`.trim(), w.params);
      return existing;
    },

    async deleteMany({ where = {} } = {}) {
      const w = buildWhere(where, modelKey);
      const meta = await d1Run(`DELETE FROM ${table} ${w.sql}`.trim(), w.params);
      return { count: meta?.changes || 0 };
    },
  };
}

// ---------- model instances + relation handling ----------

const customerBase = makeModel({ table: "Customer", modelKey: "Customer" });
const bookingBase = makeModel({ table: "Booking", modelKey: "Booking" });
const adminUserBase = makeModel({ table: "AdminUser", modelKey: "AdminUser" });
const activityLogBase = makeModel({ table: "ActivityLog", modelKey: "ActivityLog" });

// Attach the related customer for booking rows when include.customer is set.
async function hydrateBookingIncludes(rows, include) {
  if (!include || !rows?.length) return rows;
  if (include.customer) {
    const ids = [...new Set(rows.map((r) => r.customerId).filter(Boolean))];
    if (ids.length) {
      const placeholders = ids.map(() => "?").join(",");
      const customerRows = await d1All(
        `SELECT * FROM Customer WHERE id IN (${placeholders})`,
        ids
      );
      const byId = new Map(customerRows.map((c) => [c.id, fromDbRow("Customer", c)]));
      for (const r of rows) r.customer = byId.get(r.customerId) || null;
    } else {
      for (const r of rows) r.customer = null;
    }
  }
  return rows;
}

async function hydrateCustomerIncludes(rows, include) {
  if (!include || !rows?.length) return rows;
  if (include.bookings) {
    const ids = rows.map((r) => r.id);
    const placeholders = ids.map(() => "?").join(",");
    const bookingRows = ids.length
      ? await d1All(`SELECT * FROM Booking WHERE customerId IN (${placeholders})`, ids)
      : [];
    const grouped = new Map();
    for (const b of bookingRows) {
      const hydrated = fromDbRow("Booking", b);
      if (!grouped.has(b.customerId)) grouped.set(b.customerId, []);
      grouped.get(b.customerId).push(hydrated);
    }
    const select = typeof include.bookings === "object" ? include.bookings.select : null;
    for (const r of rows) {
      let list = grouped.get(r.id) || [];
      if (select) list = list.map((x) => pickSelect(x, select));
      r.bookings = list;
    }
  }
  return rows;
}

const booking = {
  ...bookingBase,
  async findFirst(args = {}) {
    const row = await bookingBase.findFirst(args);
    if (row && args.include) await hydrateBookingIncludes([row], args.include);
    return row;
  },
  async findUnique(args = {}) {
    return this.findFirst(args);
  },
  async findMany(args = {}) {
    const rows = await bookingBase.findMany(args);
    if (args.include) await hydrateBookingIncludes(rows, args.include);
    return rows;
  },
  async create({ data }) {
    return bookingBase.create({ data });
  },
  async aggregate({ where = {}, _sum = {} } = {}) {
    const cols = Object.keys(_sum).filter((k) => _sum[k]);
    if (!cols.length) return { _sum: {} };
    const w = buildWhere(where, "Booking");
    const selectList = cols.map((c) => `SUM(${c}) AS ${c}`).join(", ");
    const row = await d1First(`SELECT ${selectList} FROM Booking ${w.sql}`.trim(), w.params);
    const out = {};
    for (const c of cols) out[c] = row?.[c] != null ? Number(row[c]) : null;
    return { _sum: out };
  },
};

const customer = {
  ...customerBase,
  async findFirst(args = {}) {
    const row = await customerBase.findFirst(args);
    if (row && args.include) await hydrateCustomerIncludes([row], args.include);
    return row;
  },
  async findUnique(args = {}) {
    return this.findFirst(args);
  },
  async findMany(args = {}) {
    const rows = await customerBase.findMany(args);
    if (args.include) await hydrateCustomerIncludes(rows, args.include);
    return rows;
  },
};

const prisma = {
  customer,
  booking,
  adminUser: adminUserBase,
  activityLog: activityLogBase,

  // Prisma client parity for any code that may call these.
  async $connect() {},
  async $disconnect() {},
};

export default prisma;
