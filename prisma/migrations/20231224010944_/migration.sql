/*
  Warnings:

  - You are about to drop the column `pwdPwdNumber` on the `Occupation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Occupation" DROP CONSTRAINT "Occupation_pwdPwdNumber_fkey";

-- DropIndex
DROP INDEX "Occupation_pwdPwdNumber_key";

-- AlterTable
ALTER TABLE "Occupation" DROP COLUMN "pwdPwdNumber";

-- AlterTable
ALTER TABLE "Pwd" ADD COLUMN     "occupationId" INTEGER;

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
