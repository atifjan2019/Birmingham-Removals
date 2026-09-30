-- Adds move details: the answers a customer gives on their private
-- /move-details/<token> page, and the photos and documents they attach.
--
-- Booking gains seven columns:
--   detailsToken        the secret in the customer's link (43 characters)
--   details             the answers, as one JSON object
--   detailsVersion      how many times the answers have changed
--   detailsSaveId       the form's id for the save that made the last change
--   detailsUpdatedAt    last save, in datetime('now') format
--   detailsSubmittedAt  when the customer pressed send; NULL until then
--   leadKey             the quote form's own id for a lead, so the browser
--                       that made it can repeat the call that finishes it
-- BookingFile holds one row per uploaded file (the file itself lives in the R2
-- bucket bound as UPLOADS, under move-details/<bookingId>/<fileId>), and
-- FileLink holds the short-lived links the admin opens a file through.
--
-- Apply once against the existing remote D1 database (from worker-api/):
--   wrangler d1 execute DB --remote --file=./migrations/2026-09-add-move-details.sql
-- (Fresh databases already get all of this from prisma/d1-schema.sql &
-- worker-api/schema.sql.)
--
-- Apply it BEFORE deploying the Worker that goes with it. Every booking query
-- in that Worker reads the new columns and counts BookingFile rows, so the
-- quote form would fail against a database that does not have them yet. The
-- Worker before this change names every column it reads or writes, so it is
-- unaffected by the extra ones and the database can safely run ahead of it.
--
-- The change is additive. No table is rebuilt and existing rows are untouched:
-- their new columns are NULL (detailsVersion is 0), and a booking is given its
-- detailsToken the first time one is needed. A second run stops at the first ALTER ("duplicate column
-- name") and changes nothing. D1 Time Travel can restore the pre-migration
-- state if anything goes wrong.
--
-- Do not re-run 2026-07-add-lost-status-and-notes.sql after this one. It
-- rebuilds Booking from a column list that predates these seven, so it would
-- drop them, and dropping Booking would cascade into BookingFile and FileLink.

ALTER TABLE Booking ADD COLUMN detailsToken TEXT;
ALTER TABLE Booking ADD COLUMN details TEXT;
ALTER TABLE Booking ADD COLUMN detailsVersion INTEGER NOT NULL DEFAULT 0;
ALTER TABLE Booking ADD COLUMN detailsSaveId TEXT;
ALTER TABLE Booking ADD COLUMN detailsUpdatedAt TEXT;
ALTER TABLE Booking ADD COLUMN detailsSubmittedAt TEXT;
ALTER TABLE Booking ADD COLUMN leadKey TEXT;

-- Finds a booking from the token in a customer's link, and keeps tokens unique.
-- Partial, so the older bookings that have no token yet are not indexed.
CREATE UNIQUE INDEX IF NOT EXISTS idx_booking_details_token ON Booking(detailsToken) WHERE detailsToken IS NOT NULL;

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

CREATE TABLE IF NOT EXISTS FileLink (
  token     TEXT PRIMARY KEY,
  fileId    TEXT NOT NULL,
  expiresAt TEXT NOT NULL,
  FOREIGN KEY (fileId) REFERENCES BookingFile(id) ON DELETE CASCADE
);

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
