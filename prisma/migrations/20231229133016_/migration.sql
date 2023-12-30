/*
  Warnings:

  - You are about to drop the column `apparentId` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `nonApparentId` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the `ApparentImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NonApparentImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pwd" DROP CONSTRAINT "Pwd_apparentId_fkey";

-- DropForeignKey
ALTER TABLE "Pwd" DROP CONSTRAINT "Pwd_nonApparentId_fkey";

-- AlterTable
ALTER TABLE "Pwd" DROP COLUMN "apparentId",
DROP COLUMN "nonApparentId",
ADD COLUMN     "isApparent" BOOLEAN;

-- DropTable
DROP TABLE "ApparentImage";

-- DropTable
DROP TABLE "NonApparentImage";

-- CreateTable
CREATE TABLE "ImageUrls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "pwdPwdNumber" TEXT,

    CONSTRAINT "ImageUrls_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageUrls" ADD CONSTRAINT "ImageUrls_pwdPwdNumber_fkey" FOREIGN KEY ("pwdPwdNumber") REFERENCES "Pwd"("pwdNumber") ON DELETE SET NULL ON UPDATE CASCADE;
