-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_fkey";

-- DropIndex
DROP INDEX "PlantInfo_productId_key";

-- AddForeignKey
ALTER TABLE "PlantInfo" ADD CONSTRAINT "PlantInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
