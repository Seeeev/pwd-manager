/*
  Warnings:

  - You are about to drop the column `occupationId` on the `Pwd` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pwdPwdNumber]` on the table `Occupation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Pwd" DROP CONSTRAINT "Pwd_occupationId_fkey";

-- AlterTable
ALTER TABLE "Occupation" ADD COLUMN     "pwdPwdNumber" TEXT;

-- AlterTable
ALTER TABLE "Pwd" DROP COLUMN "occupationId";

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_pwdPwdNumber_key" ON "Occupation"("pwdPwdNumber");

-- AddForeignKey
ALTER TABLE "Occupation" ADD CONSTRAINT "Occupation_pwdPwdNumber_fkey" FOREIGN KEY ("pwdPwdNumber") REFERENCES "Pwd"("pwdNumber") ON DELETE SET NULL ON UPDATE CASCADE;
