/*
  Warnings:

  - You are about to drop the column `barangay` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `municipality` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Pwd` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Pwd` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'barangay');

-- AlterTable
ALTER TABLE "Pwd" DROP COLUMN "barangay",
DROP COLUMN "municipality",
DROP COLUMN "province",
DROP COLUMN "region";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'barangay';

-- CreateTable
CREATE TABLE "Barangay" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Barangay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPwd" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TestPwd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestBarangay" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TestBarangay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TestBarangayToTestPwd" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TestBarangayToTestPwd_AB_unique" ON "_TestBarangayToTestPwd"("A", "B");

-- CreateIndex
CREATE INDEX "_TestBarangayToTestPwd_B_index" ON "_TestBarangayToTestPwd"("B");

-- AddForeignKey
ALTER TABLE "_TestBarangayToTestPwd" ADD CONSTRAINT "_TestBarangayToTestPwd_A_fkey" FOREIGN KEY ("A") REFERENCES "TestBarangay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestBarangayToTestPwd" ADD CONSTRAINT "_TestBarangayToTestPwd_B_fkey" FOREIGN KEY ("B") REFERENCES "TestPwd"("id") ON DELETE CASCADE ON UPDATE CASCADE;
