/*
  Warnings:

  - The `isToxic` column on the `PlantInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PlantInfo" DROP COLUMN "isToxic",
ADD COLUMN     "isToxic" BOOLEAN NOT NULL DEFAULT false;
