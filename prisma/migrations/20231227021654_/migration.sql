/*
  Warnings:

  - You are about to drop the column `pathABarangayResidency` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathABirthCertificate` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathAId1x1` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathAId2x2` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathAMedicalCertificate` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathAWholeBody` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathNBarangayResidency` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathNGovId` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathNGuardian` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathNId1x1` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathNId2x2` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `pathNRepresentative` on the `Pwd` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pwd" DROP COLUMN "pathABarangayResidency",
DROP COLUMN "pathABirthCertificate",
DROP COLUMN "pathAId1x1",
DROP COLUMN "pathAId2x2",
DROP COLUMN "pathAMedicalCertificate",
DROP COLUMN "pathAWholeBody",
DROP COLUMN "pathNBarangayResidency",
DROP COLUMN "pathNGovId",
DROP COLUMN "pathNGuardian",
DROP COLUMN "pathNId1x1",
DROP COLUMN "pathNId2x2",
DROP COLUMN "pathNRepresentative",
ADD COLUMN     "apparentId" INTEGER,
ADD COLUMN     "nonApparentId" INTEGER;

-- CreateTable
CREATE TABLE "ApparentImage" (
    "id" SERIAL NOT NULL,
    "pathAId1x1" TEXT,
    "pathAId2x2" TEXT,
    "pathAWholeBody" TEXT,
    "pathAMedicalCertificate" TEXT,
    "pathABarangayResidency" TEXT,
    "pathABirthCertificate" TEXT,

    CONSTRAINT "ApparentImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NonApparentImage" (
    "id" SERIAL NOT NULL,
    "pathNId1x1" TEXT,
    "pathNId2x2" TEXT,
    "pathNGovId" TEXT,
    "pathNBarangayResidency" TEXT,
    "pathNGuardian" TEXT,
    "pathNRepresentative" TEXT,

    CONSTRAINT "NonApparentImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_apparentId_fkey" FOREIGN KEY ("apparentId") REFERENCES "ApparentImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_nonApparentId_fkey" FOREIGN KEY ("nonApparentId") REFERENCES "NonApparentImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
