import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Xóa dữ liệu cũ
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Tạo categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Coffee" },
      { name: "Tea" },
      { name: "Dessert" },
      { name: "Bakery" },
    ],
  });

  // Insert products
  await prisma.product.createMany({
    data: [
      { name: "Espresso", price: 2.5, categoryId: 1 },
      { name: "Latte", price: 3.0, categoryId: 1 },
      { name: "Green Tea", price: 2.0, categoryId: 2 },
      { name: "Black Tea", price: 2.2, categoryId: 2 },
      { name: "Cheesecake", price: 4.0, categoryId: 3 },
      { name: "Brownie", price: 3.5, categoryId: 3 },
      { name: "Sandwich", price: 5.0, categoryId: 4 },
      { name: "Croissant", price: 2.8, categoryId: 4 },
    ],
  });
}

main()
  .then(() => {
    console.log("✅ Database seeded!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
