/*
  Warnings:

  - You are about to drop the column `pwdPwdNumber` on the `Occupation` table. All the data in the column will be lost.
  - You are about to drop the column `bloodTypeId` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `dateApproved` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the `BloodType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bloodType` to the `Pwd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupationId` to the `Pwd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Occupation" DROP CONSTRAINT "Occupation_pwdPwdNumber_fkey";

-- DropForeignKey
ALTER TABLE "Pwd" DROP CONSTRAINT "Pwd_bloodTypeId_fkey";

-- AlterTable
ALTER TABLE "Occupation" DROP COLUMN "pwdPwdNumber";

-- AlterTable
ALTER TABLE "Pwd" DROP COLUMN "bloodTypeId",
DROP COLUMN "dateApproved",
ADD COLUMN     "bloodType" TEXT NOT NULL,
ADD COLUMN     "occupationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "BloodType";

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
