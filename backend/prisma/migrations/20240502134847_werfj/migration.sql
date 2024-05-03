/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `PlantInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlantInfo_productId_key" ON "PlantInfo"("productId");
