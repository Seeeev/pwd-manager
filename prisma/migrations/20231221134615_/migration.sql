-- AlterTable
ALTER TABLE "Pwd" ADD COLUMN     "barangayId" INTEGER;

-- AddForeignKey
ALTER TABLE "Pwd" ADD CONSTRAINT "Pwd_barangayId_fkey" FOREIGN KEY ("barangayId") REFERENCES "Barangay"("id") ON DELETE SET NULL ON UPDATE CASCADE;
