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
  status        TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Upcoming', 'Completed', 'Abandoned', 'Lost')),
  price         REAL,
  jobCost       REAL,
  expenses      REAL,
  profit        REAL,
  notes         TEXT,
  createdAt     TEXT NOT NULL DEFAULT (datetime('now')),
  updatedAt     TEXT NOT NULL DEFAULT (datetime('now')),
  detailsToken        TEXT,
  details             TEXT,
  detailsVersion      INTEGER NOT NULL DEFAULT 0,
  detailsSaveId       TEXT,
  detailsUpdatedAt    TEXT,
  detailsSubmittedAt  TEXT,
  leadKey             TEXT,
  FOREIGN KEY (customerId) REFERENCES Customer(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_booking_customer ON Booking(customerId);
CREATE INDEX IF NOT EXISTS idx_booking_status ON Booking(status);
CREATE INDEX IF NOT EXISTS idx_booking_created ON Booking(createdAt DESC);

-- Move details: detailsToken is the secret in a customer's /move-details link,
-- details holds their answers as JSON, detailsVersion counts the changes to
-- them and detailsSaveId names the save that made the last one. leadKey is the
-- quote form's own id for a lead, kept so the browser that made the lead can
-- repeat the call that finishes it. An existing database gets these columns and
-- the two tables below from worker-api/migrations/2026-09-add-move-details.sql.
CREATE UNIQUE INDEX IF NOT EXISTS idx_booking_details_token ON Booking(detailsToken) WHERE detailsToken IS NOT NULL;

-- One row per photo or document a customer attaches. The file itself lives in
-- the R2 bucket bound as UPLOADS, under r2Key.
CREATE TABLE IF NOT EXISTS BookingFile (
  id          TEXT PRIMARY KEY,
  bookingId   TEXT NOT NULL,
  clientId    TEXT,
  name        TEXT NOT NULL,
  contentType TEXT NOT NULL,
  size        INTEGER NOT NULL,
  isImage     INTEGER NOT NULL DEFAULT 0,
  thumb       TEXT,
  r2Key       TEXT NOT NULL,
  createdAt   TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bookingId) REFERENCES Booking(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_bookingfile_booking ON BookingFile(bookingId);
-- The form's own id for a file, so an upload sent twice is stored once.
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookingfile_client ON BookingFile(bookingId, clientId) WHERE clientId IS NOT NULL;
-- For the daily upload limits, which count the last day's files and add up their sizes.
CREATE INDEX IF NOT EXISTS idx_bookingfile_created ON BookingFile(createdAt, size);

-- Short-lived links the admin opens an uploaded file through.
CREATE TABLE IF NOT EXISTS FileLink (
  token     TEXT PRIMARY KEY,
  fileId    TEXT NOT NULL,
  expiresAt TEXT NOT NULL,
  FOREIGN KEY (fileId) REFERENCES BookingFile(id) ON DELETE CASCADE
);

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
  showPhone   TEXT,
  updatedAt   TEXT NOT NULL DEFAULT (datetime('now'))
);
INSERT OR IGNORE INTO SiteSettings (id) VALUES (1);

-- The form's ids of files a customer removed. An upload under one of these is
-- refused, so a removed photo cannot come back from another device, another
-- tab, or an upload that was still landing when it was removed.
CREATE TABLE IF NOT EXISTS BookingFileRemoved (
  bookingId TEXT NOT NULL,
  clientId  TEXT NOT NULL,
  removedAt TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (bookingId, clientId),
  FOREIGN KEY (bookingId) REFERENCES Booking(id) ON DELETE CASCADE
);
