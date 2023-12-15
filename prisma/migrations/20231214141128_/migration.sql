-- DropForeignKey
ALTER TABLE "Pwd" DROP CONSTRAINT "Pwd_occupationId_fkey";

-- AlterTable
ALTER TABLE "Pwd" ALTER COLUMN "occupationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
