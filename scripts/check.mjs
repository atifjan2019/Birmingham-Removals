import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const customers = await prisma.customer.findMany();
  const bookings = await prisma.booking.findMany();
  console.log("CUSTOMERS:", customers);
  console.log("BOOKINGS:", bookings);
}
check().finally(() => prisma.$disconnect());
