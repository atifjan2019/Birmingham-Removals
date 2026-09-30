import BookingsClient from "./BookingsClient";
import { listActivity, listBookings } from "@/lib/workerApi";

export const dynamic = "force-dynamic";

export const metadata = { title: "Bookings" };

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

// How often each booking's move details link has been emailed from Booking
// Details, and when last, so the button can say so after a reload.
function buildLinkEmailMap(activity) {
  return activity
    .filter((entry) => entry.action === "booking.details_link_emailed" && entry.entityId)
    .reduce((map, entry) => {
      const seen = map[entry.entityId];
      map[entry.entityId] = { count: (seen?.count || 0) + 1, lastAt: seen?.lastAt || entry.createdAt };
      return map;
    }, {});
}

export default async function BookingsPage() {
  const [bookings, activity] = await Promise.all([listBookings(), listActivity()]);
  const emailStatusByBooking = buildEmailStatusMap(activity);

  return (
    <BookingsClient
      initialBookings={bookings}
      initialEmailStatusByBooking={emailStatusByBooking}
      linkEmailsByBooking={buildLinkEmailMap(activity)}
    />
  );
}
