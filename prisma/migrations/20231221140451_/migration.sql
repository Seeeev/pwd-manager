/*
  Warnings:

  - You are about to drop the `TestBarangay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestPwd` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TestPwd" DROP CONSTRAINT "TestPwd_testBarangayId_fkey";

-- DropTable
DROP TABLE "TestBarangay";

-- DropTable
DROP TABLE "TestPwd";
