/*
  Warnings:

  - You are about to drop the `pwdForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pwdForm";

-- CreateTable
CREATE TABLE "Pwd" (
    "pwdNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT,
    "suffix" TEXT,
    "streetName" TEXT,
    "barangay" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "landline" TEXT,
    "mobileNumber" TEXT NOT NULL,
    "emailAddress" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "civilStatus" TEXT NOT NULL,
    "educationalAttainment" TEXT,
    "employmentStatus" TEXT,
    "affiliatedPerson" TEXT,
    "affiliatedAddress" TEXT,
    "affiliatedContactNumber" TEXT,
    "sssNumber" TEXT,
    "gsisNumber" TEXT,
    "psnNumber" TEXT,
    "philhealthNumber" TEXT,
    "philhealthMember" BOOLEAN,
    "philhealthMemberDependent" BOOLEAN,
    "fathersFirstName" TEXT,
    "fathersMiddleName" TEXT,
    "fathersLastName" TEXT,
    "mothersFirstName" TEXT,
    "mothersMiddleName" TEXT,
    "mothersLastName" TEXT,
    "accomplishedBy" TEXT NOT NULL,
    "applicant" BOOLEAN,
    "guardian" BOOLEAN,
    "representative" BOOLEAN,

    CONSTRAINT "Pwd_pkey" PRIMARY KEY ("pwdNumber")
);

-- CreateTable
CREATE TABLE "BloodType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pwdPwdNumber" TEXT,

    CONSTRAINT "BloodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disability" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pwdPwdNumber" TEXT,

    CONSTRAINT "Disability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabilityCause" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pwdPwdNumber" TEXT,

    CONSTRAINT "DisabilityCause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pwdPwdNumber" TEXT,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BloodType" ADD CONSTRAINT "BloodType_pwdPwdNumber_fkey" FOREIGN KEY ("pwdPwdNumber") REFERENCES "Pwd"("pwdNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disability" ADD CONSTRAINT "Disability_pwdPwdNumber_fkey" FOREIGN KEY ("pwdPwdNumber") REFERENCES "Pwd"("pwdNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabilityCause" ADD CONSTRAINT "DisabilityCause_pwdPwdNumber_fkey" FOREIGN KEY ("pwdPwdNumber") REFERENCES "Pwd"("pwdNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Occupation" ADD CONSTRAINT "Occupation_pwdPwdNumber_fkey" FOREIGN KEY ("pwdPwdNumber") REFERENCES "Pwd"("pwdNumber") ON DELETE SET NULL ON UPDATE CASCADE;
