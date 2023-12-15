/*
  Warnings:

  - Added the required column `bloodTypeId` to the `Pwd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BloodType" DROP CONSTRAINT "BloodType_pwdPwdNumber_fkey";

-- AlterTable
ALTER TABLE "Pwd" ADD COLUMN     "bloodTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_bloodTypeId_fkey" FOREIGN KEY ("bloodTypeId") REFERENCES "BloodType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
