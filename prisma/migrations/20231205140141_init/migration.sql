-- CreateTable
CREATE TABLE "pwdForm" (
    "pwdId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT,

    CONSTRAINT "pwdForm_pkey" PRIMARY KEY ("pwdId")
);
