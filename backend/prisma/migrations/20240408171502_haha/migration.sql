/*
  Warnings:

  - A unique constraint covering the columns `[snowFlake]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_snowFlake_key" ON "Product"("snowFlake");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
