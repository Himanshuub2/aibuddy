-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "google_id" TEXT,
ADD COLUMN     "password" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
