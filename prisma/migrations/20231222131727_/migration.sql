-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "Pwd" ADD COLUMN     "status" "Status" DEFAULT 'pending';
