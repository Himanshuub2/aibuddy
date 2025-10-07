/*
  Warnings:

  - Added the required column `model_id` to the `llm_models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."llm_models" ADD COLUMN     "model_id" TEXT NOT NULL;
