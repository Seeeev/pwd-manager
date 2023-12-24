/*
  Warnings:

  - Made the column `status` on table `Pwd` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pwd" ALTER COLUMN "status" SET NOT NULL;
