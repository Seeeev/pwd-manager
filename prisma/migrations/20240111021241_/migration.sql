/*
  Warnings:

  - You are about to drop the `Annoucement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Annoucement";

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);
