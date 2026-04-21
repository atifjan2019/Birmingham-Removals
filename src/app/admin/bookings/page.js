import BookingsClient from "./BookingsClient";
import { listActivity, listBookings } from "@/lib/workerApi";

export const dynamic = "force-dynamic";

function parseDetails(details) {
  if (!details) return null;
  try {
    return JSON.parse(details);
  } catch {
    return null;
  }
}

function buildEmailStatusMap(activity) {
  return activity
    .filter((entry) => entry.action === "booking.email_status" && entry.entityId)
    .reduce((map, entry) => {
      if (map[entry.entityId]) return map;

      map[entry.entityId] = {
        ...parseDetails(entry.details),
        createdAt: entry.createdAt,
      };
      return map;
    }, {});
}

export default async function BookingsPage() {
  const [bookings, activity] = await Promise.all([listBookings(), listActivity()]);
  const emailStatusByBooking = buildEmailStatusMap(activity);

  return <BookingsClient initialBookings={bookings} initialEmailStatusByBooking={emailStatusByBooking} />;
}
