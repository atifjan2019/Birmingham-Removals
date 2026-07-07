-- Adds the showPhone toggle to SiteSettings so the admin can hide/show the
-- business phone number across the public site. Values: "1" (or NULL) = show,
-- "0" = hide. Apply once against the existing remote D1 database:
--   wrangler d1 execute DB --remote --file=./migrations/2026-07-add-show-phone.sql
-- (Fresh databases already get this column from prisma/d1-schema.sql.)
ALTER TABLE SiteSettings ADD COLUMN showPhone TEXT;
