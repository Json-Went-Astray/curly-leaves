/*
  Warnings:

  - You are about to drop the `Category2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId2_fkey";

-- DropTable
DROP TABLE "Category2";
