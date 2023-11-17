-- AlterTable
ALTER TABLE "User" ALTER COLUMN "activationLink" DROP NOT NULL,
ALTER COLUMN "resetLink" DROP NOT NULL;
