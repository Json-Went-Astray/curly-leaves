/*
  Warnings:

  - You are about to drop the column `metaDecription` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shippingCostId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "refLink" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "metaDecription",
DROP COLUMN "metaTitle",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "isPrize" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pointsCost" INTEGER,
ADD COLUMN     "pointsGiven" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "trivia" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "shippingCostId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantInfo" (
    "id" SERIAL NOT NULL,
    "sunlight" INTEGER NOT NULL DEFAULT 0,
    "ground" INTEGER NOT NULL DEFAULT 0,
    "fertilizer" INTEGER NOT NULL DEFAULT 0,
    "water" INTEGER NOT NULL DEFAULT 0,
    "isToxic" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER,

    CONSTRAINT "PlantInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shippingCostId_fkey" FOREIGN KEY ("shippingCostId") REFERENCES "ShippingCost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantInfo" ADD CONSTRAINT "PlantInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
