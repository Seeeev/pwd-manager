/*
  Warnings:

  - You are about to drop the column `applicant` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `forRenewal` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `guardian` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `philhealthMember` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `philhealthMemberDependent` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `representative` on the `Pwd` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pwd" DROP COLUMN "applicant",
DROP COLUMN "forRenewal",
DROP COLUMN "guardian",
DROP COLUMN "philhealthMember",
DROP COLUMN "philhealthMemberDependent",
DROP COLUMN "representative",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateApproved" TIMESTAMP(3),
ADD COLUMN     "isApplicant" BOOLEAN,
ADD COLUMN     "isGuardian" BOOLEAN,
ADD COLUMN     "isPhilhealthMember" BOOLEAN,
ADD COLUMN     "isPhilhealthMemberDependent" BOOLEAN,
ADD COLUMN     "isRepresentative" BOOLEAN;
