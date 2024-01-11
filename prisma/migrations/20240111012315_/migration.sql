-- CreateTable
CREATE TABLE "Annoucement" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Annoucement_pkey" PRIMARY KEY ("id")
);
