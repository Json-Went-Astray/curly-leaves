/*
  Warnings:

  - You are about to drop the `_productList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "_productList" DROP CONSTRAINT "_productList_A_fkey";

-- DropForeignKey
ALTER TABLE "_productList" DROP CONSTRAINT "_productList_B_fkey";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "orderId" INTEGER,
ALTER COLUMN "cartId" DROP NOT NULL;

-- DropTable
DROP TABLE "_productList";

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
