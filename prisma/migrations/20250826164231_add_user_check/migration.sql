-- This is an empty migration.

ALTER TABLE "users"
ADD CONSTRAINT email_or_google_not_null
CHECK (email IS NOT NULL OR google_id IS NOT NULL);
