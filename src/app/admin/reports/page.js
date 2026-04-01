import prisma from "@/lib/prisma";
import ReportsClient from "./ReportsClient";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  // Fetch all completed bookings with financials
  const bookings = await prisma.booking.findMany({
    where: { status: "Completed" },
    include: { customer: true },
    orderBy: { updatedAt: "desc" }
  });

  // Serialize dates for client component
  const serialized = bookings.map(b => ({
    ...b,
    moveDate: b.moveDate?.toISOString(),
    createdAt: b.createdAt?.toISOString(),
    updatedAt: b.updatedAt?.toISOString(),
    customer: b.customer ? {
      ...b.customer,
      createdAt: b.customer.createdAt?.toISOString(),
      updatedAt: b.customer.updatedAt?.toISOString(),
    } : null
  }));

  // Also fetch all bookings for lead stats
  const allBookings = await prisma.booking.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" }
  });

  const allSerialized = allBookings.map(b => ({
    ...b,
    moveDate: b.moveDate?.toISOString(),
    createdAt: b.createdAt?.toISOString(),
    updatedAt: b.updatedAt?.toISOString(),
    customer: b.customer ? {
      ...b.customer,
      createdAt: b.customer.createdAt?.toISOString(),
      updatedAt: b.customer.updatedAt?.toISOString(),
    } : null
  }));

  return <ReportsClient completedBookings={serialized} allBookings={allSerialized} />;
}
