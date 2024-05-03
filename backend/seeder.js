import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const type1 = await prisma.productType.create({
      data: {
        title: "Roślina",
      },
    });

    const type2 = await prisma.productType.create({
      data: {
        title: "Artykuł ogrodniczy",
      },
    });

    const type3 = await prisma.productType.create({
      data: {
        title: "Inny",
      },
    });

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
