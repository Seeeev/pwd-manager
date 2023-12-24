/*
  Warnings:

  - You are about to drop the `_TestBarangayToTestPwd` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `testBarangayId` to the `TestPwd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TestBarangayToTestPwd" DROP CONSTRAINT "_TestBarangayToTestPwd_A_fkey";

-- DropForeignKey
ALTER TABLE "_TestBarangayToTestPwd" DROP CONSTRAINT "_TestBarangayToTestPwd_B_fkey";

-- AlterTable
ALTER TABLE "TestPwd" ADD COLUMN     "testBarangayId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_TestBarangayToTestPwd";

-- AddForeignKey
ALTER TABLE "TestPwd" ADD CONSTRAINT "TestPwd_testBarangayId_fkey" FOREIGN KEY ("testBarangayId") REFERENCES "TestBarangay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
