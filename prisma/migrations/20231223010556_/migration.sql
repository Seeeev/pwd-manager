/*
  Warnings:

  - You are about to drop the column `pwdPwdNumber` on the `Disability` table. All the data in the column will be lost.
  - You are about to drop the column `pwdPwdNumber` on the `DisabilityCause` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Disability" DROP CONSTRAINT "Disability_pwdPwdNumber_fkey";

-- DropForeignKey
ALTER TABLE "DisabilityCause" DROP CONSTRAINT "DisabilityCause_pwdPwdNumber_fkey";

-- AlterTable
ALTER TABLE "Disability" DROP COLUMN "pwdPwdNumber";

-- AlterTable
ALTER TABLE "DisabilityCause" DROP COLUMN "pwdPwdNumber";

-- CreateTable
CREATE TABLE "_DisabilityToPwd" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DisabilityCauseToPwd" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisabilityToPwd_AB_unique" ON "_DisabilityToPwd"("A", "B");

-- CreateIndex
CREATE INDEX "_DisabilityToPwd_B_index" ON "_DisabilityToPwd"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DisabilityCauseToPwd_AB_unique" ON "_DisabilityCauseToPwd"("A", "B");

-- CreateIndex
CREATE INDEX "_DisabilityCauseToPwd_B_index" ON "_DisabilityCauseToPwd"("B");

-- AddForeignKey
ALTER TABLE "_DisabilityToPwd" ADD CONSTRAINT "_DisabilityToPwd_A_fkey" FOREIGN KEY ("A") REFERENCES "Disability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisabilityToPwd" ADD CONSTRAINT "_DisabilityToPwd_B_fkey" FOREIGN KEY ("B") REFERENCES "Pwd"("pwdNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisabilityCauseToPwd" ADD CONSTRAINT "_DisabilityCauseToPwd_A_fkey" FOREIGN KEY ("A") REFERENCES "DisabilityCause"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisabilityCauseToPwd" ADD CONSTRAINT "_DisabilityCauseToPwd_B_fkey" FOREIGN KEY ("B") REFERENCES "Pwd"("pwdNumber") ON DELETE CASCADE ON UPDATE CASCADE;
