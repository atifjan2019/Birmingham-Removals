import ReportsClient from "./ReportsClient";
import { listBookings } from "@/lib/workerApi";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const allBookings = await listBookings();
  const completedBookings = allBookings.filter((booking) => booking.status === "Completed");

  return <ReportsClient completedBookings={completedBookings} allBookings={allBookings} />;
}
