import { createBooking } from "./src/app/actions/booking.js";

async function test() {
  const result = await createBooking({
    moveType: "studio",
    fromPostcode: "NE1 4XF",
    toPostcode: "NE3 2PA",
    moveDate: "2026-04-08",
    bedrooms: 0,
    extras: [],
    fullName: "John Smith",
    phone: "07123 456 789",
    email: "john@example.com"
  });
  console.log("TEST RESULT:", result);
}

test();
