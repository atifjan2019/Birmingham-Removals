import BookingsClient from "./BookingsClient";
import { listBookings } from "@/lib/workerApi";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await listBookings();

  return <BookingsClient initialBookings={bookings} />;
}
