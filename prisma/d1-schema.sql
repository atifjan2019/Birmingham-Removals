-- Birmingham Removals — Cloudflare D1 schema
-- Apply with: wrangler d1 execute birmingham-removals --file=prisma/d1-schema.sql
-- (or via the Cloudflare dashboard D1 console)

CREATE TABLE IF NOT EXISTS Customer (
  id         TEXT PRIMARY KEY,
  fullName   TEXT NOT NULL,
  phone      TEXT NOT NULL,
  email      TEXT NOT NULL,
  createdAt  TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_customer_email ON Customer(email);

CREATE TABLE IF NOT EXISTS Booking (
  id            TEXT PRIMARY KEY,
  customerId    TEXT NOT NULL,
  moveType      TEXT NOT NULL,
  fromPostcode  TEXT NOT NULL,
  toPostcode    TEXT NOT NULL,
  moveDate      TEXT NOT NULL,
  bedrooms      INTEGER NOT NULL DEFAULT 1,
  extras        TEXT,            -- JSON string
  status        TEXT NOT NULL DEFAULT 'New',
  price         REAL,
  jobCost       REAL,
  expenses      REAL,
  profit        REAL,
  createdAt     TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt     TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (customerId) REFERENCES Customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_booking_customer ON Booking(customerId);
CREATE INDEX IF NOT EXISTS idx_booking_status ON Booking(status);
CREATE INDEX IF NOT EXISTS idx_booking_created ON Booking(createdAt);

CREATE TABLE IF NOT EXISTS AdminUser (
  id       TEXT PRIMARY KEY,
  email    TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ActivityLog (
  id        TEXT PRIMARY KEY,
  action    TEXT NOT NULL,
  details   TEXT,
  entityId  TEXT,
  actor     TEXT,
  createdAt TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_activity_created ON ActivityLog(createdAt);
CREATE INDEX IF NOT EXISTS idx_activity_action ON ActivityLog(action);
