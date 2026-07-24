-- Adds the "Lost" booking status and a free-text "notes" column to Booking.
--
-- Two changes are bundled here because the "Lost" status requires rebuilding the
-- Booking table (SQLite cannot ALTER a CHECK constraint in place), so we fold the
-- new notes column into the same rebuild rather than run two migrations.
--
-- Apply once against the existing remote D1 database (from worker-api/):
--   wrangler d1 execute DB --remote --file=./migrations/2026-07-add-lost-status-and-notes.sql
-- (Fresh databases already get both from prisma/d1-schema.sql & worker-api/schema.sql.)
--
-- Existing rows are preserved by the INSERT ... SELECT below. D1 Time Travel can
-- restore the pre-migration state if anything goes wrong.

PRAGMA defer_foreign_keys = TRUE;

CREATE TABLE Booking_new (
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
  FOREIGN KEY (customerId) REFERENCES Customer(id) ON DELETE CASCADE
);

INSERT INTO Booking_new (
  id, customerId, moveType, fromPostcode, toPostcode, moveDate,
  bedrooms, extras, status, price, jobCost, expenses, profit, createdAt, updatedAt
)
SELECT
  id, customerId, moveType, fromPostcode, toPostcode, moveDate,
  bedrooms, extras, status, price, jobCost, expenses, profit, createdAt, updatedAt
FROM Booking;

DROP TABLE Booking;
ALTER TABLE Booking_new RENAME TO Booking;

CREATE INDEX IF NOT EXISTS idx_booking_customer ON Booking(customerId);
CREATE INDEX IF NOT EXISTS idx_booking_status ON Booking(status);
CREATE INDEX IF NOT EXISTS idx_booking_created ON Booking(createdAt DESC);
