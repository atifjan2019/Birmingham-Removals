import prisma from "@/lib/prisma";
import BookingsClient from "./BookingsClient";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  // Fetch from database
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true
    }
  });

  return <BookingsClient initialBookings={bookings} />;
}
