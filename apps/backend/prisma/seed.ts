import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed categories
  await prisma.category.createMany({
    data: [
      { name: "Coffee" },
      { name: "Tea" },
      { name: "Cake" },
      { name: "Other" },
    ],
    skipDuplicates: true,
  });

  // Seed products
  await prisma.product.createMany({
    data: [
      { name: "Espresso", price: 30000, categoryId: 1 },
      { name: "Latte", price: 40000, categoryId: 1 },
      { name: "Green Tea", price: 25000, categoryId: 2 },
      { name: "Chocolate Cake", price: 50000, categoryId: 3 },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("✅ Seed completed!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
