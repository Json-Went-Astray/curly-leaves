/*
  Warnings:

  - Added the required column `phoneNumber` to the `AdressSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdressSet" ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "login" TEXT NOT NULL;
