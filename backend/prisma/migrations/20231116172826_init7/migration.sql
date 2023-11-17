/*
  Warnings:

  - You are about to drop the `Carousel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isCarousel` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refLink` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Carousel" DROP CONSTRAINT "Carousel_imageId_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "isCarousel" BOOLEAN NOT NULL,
ADD COLUMN     "refLink" TEXT NOT NULL;

-- DropTable
DROP TABLE "Carousel";
