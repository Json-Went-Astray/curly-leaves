-- DropForeignKey
ALTER TABLE "PlantInfo" DROP CONSTRAINT "PlantInfo_productId_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "PlantInfo"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
