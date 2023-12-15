/*
  Warnings:

  - Added the required column `forRenewal` to the `Pwd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pwd" ADD COLUMN     "forRenewal" BOOLEAN NOT NULL;
