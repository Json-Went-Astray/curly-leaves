/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `PlantInfo` will be added. If there are existing duplicate values, this will fail.
  - Made the column `productId` on table `PlantInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlantInfo" DROP CONSTRAINT "PlantInfo_productId_fkey";

-- AlterTable
ALTER TABLE "PlantInfo" ALTER COLUMN "productId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PlantInfo_productId_key" ON "PlantInfo"("productId");

-- AddForeignKey
ALTER TABLE "PlantInfo" ADD CONSTRAINT "PlantInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
