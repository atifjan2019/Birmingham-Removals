-- Birmingham Removals Cloudflare D1 schema
-- Remote apply command from worker-api:
-- npm run db:apply:remote

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
  bedrooms      INTEGER NOT NULL DEFAULT 1 CHECK (bedrooms >= 0 AND bedrooms <= 10),
  extras        TEXT,
  status        TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Upcoming', 'Completed', 'Abandoned')),
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
CREATE INDEX IF NOT EXISTS idx_booking_created ON Booking(createdAt DESC);

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

CREATE INDEX IF NOT EXISTS idx_activity_created ON ActivityLog(createdAt DESC);
CREATE INDEX IF NOT EXISTS idx_activity_action ON ActivityLog(action);

CREATE TABLE IF NOT EXISTS SiteSettings (
  id            INTEGER PRIMARY KEY,
  logoUrl       TEXT,
  footerLogoUrl TEXT,
  faviconUrl    TEXT,
  phone       TEXT,
  email       TEXT,
  address     TEXT,
  facebook    TEXT,
  instagram   TEXT,
  twitter     TEXT,
  linkedin    TEXT,
  youtube     TEXT,
  tiktok      TEXT,
  whatsapp    TEXT,
  updatedAt   TEXT NOT NULL DEFAULT (datetime('now'))
);
INSERT OR IGNORE INTO SiteSettings (id) VALUES (1);
