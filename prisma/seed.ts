import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Buku", price: 15000 },
      { name: "Pulpen", price: 5000 }
    ],
  });
}

void main()
  .catch((e) => {
    console.error(e);
    void process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
