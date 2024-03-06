/*
  Warnings:

  - Added the required column `categoryId2` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId2" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Category2" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "title2" INTEGER NOT NULL,

    CONSTRAINT "Category2_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId2_fkey" FOREIGN KEY ("categoryId2") REFERENCES "Category2"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
