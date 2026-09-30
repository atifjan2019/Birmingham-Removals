import nodemailer from "nodemailer";
import { getSiteSettings } from "@/lib/siteSettings";
import { BUSINESS } from "@/config/business";
import {
  enquiryReceivedEmail,
  adminEnquiryEmail,
  moveDetailsReceivedEmail,
  moveDetailsLinkEmail,
} from "@/lib/emailTemplates";

let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log("[EMAIL] SMTP_HOST:", host ? "SET" : "MISSING");
  console.log("[EMAIL] SMTP_USER:", user ? "SET" : "MISSING");
  console.log("[EMAIL] SMTP_PASS:", pass ? "SET" : "MISSING");

  if (!host || !user || !pass) {
    console.warn("[EMAIL] SMTP credentials missing, cannot send emails");
    return null;
  }

  _transporter = nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT) || 2525,
    secure: false,
    auth: { user, pass },
  });

  console.log("[EMAIL] Transporter created successfully");
  return _transporter;
}

/**
 * Send an email
 */
export async function sendEmail({ to, subject, html, text }) {
  // The recipient is often a customer, and a log is no place to keep their
  // address, so only which kind it is gets printed.
  const recipient = to === BOOKING_NOTIFICATION_EMAIL ? "the office" : "a customer";
  console.log("[EMAIL] Attempting to send email to", recipient);
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[EMAIL SKIP] No transporter available, skipping email to", recipient);
    return { success: false, error: "SMTP not configured" };
  }
  try {
    const from = `"Birmingham Removals" <${process.env.SMTP_FROM}>`;
    console.log("[EMAIL] Sending from:", from);
    const info = await transporter.sendMail({ from, to, subject, html, text: text || "" });
    console.log(`[EMAIL SENT] to=${recipient} messageId=${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL ERROR] to=${recipient}`, error.message, error.stack);
    return { success: false, error: error.message };
  }
}

/* ─── The emails ─── */

// Where new-enquiry notifications go. Set BOOKING_NOTIFICATION_EMAIL in the env
// to change it without a code change; falls back to the current address.
const BOOKING_NOTIFICATION_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || "atifjan2019@gmail.com";

// Pull the current phone/email from Settings so an email never hardcodes an
// out-of-date number. Fail soft to no contact details if the read fails.
async function siteContact() {
  const settings = await getSiteSettings().catch(() => ({}));
  return {
    phone: settings.showPhone === false ? "" : settings.phone || "",
    email: settings.email,
  };
}

/**
 * "We have received your enquiry", to the customer. The quote form is an
 * enquiry, not a booking, and the email says so.
 */
export async function sendEnquiryReceived(data) {
  const { subject, html } = enquiryReceivedEmail(data, await siteContact());
  return sendEmail({ to: data.email, subject, html });
}

/** The same enquiry, to the office. */
export async function sendAdminNotification(data) {
  const { subject, html } = adminEnquiryEmail(data, await siteContact());
  return sendEmail({ to: BOOKING_NOTIFICATION_EMAIL, subject, html });
}

/** The customer's move details link, sent from Booking Details. */
export async function sendMoveDetailsLink({ booking, detailsUrl }) {
  const { subject, html } = moveDetailsLinkEmail(
    {
      fullName: booking.customer?.fullName,
      moveType: booking.moveType,
      fromPostcode: booking.fromPostcode,
      toPostcode: booking.toPostcode,
      moveDate: booking.moveDate,
      detailsUrl,
    },
    await siteContact()
  );
  return sendEmail({ to: booking.customer?.email, subject, html });
}

/**
 * "Move details received", to the office, when a customer sends the move
 * details form or sends it again. `data` is what the API returns for the
 * submission. The email's button opens the admin with that enquiry showing.
 */
export async function sendMoveDetailsReceived(data) {
  const adminUrl = `${BUSINESS.url}/admin/bookings?booking=${encodeURIComponent(data.booking.id)}`;
  const { subject, html } = moveDetailsReceivedEmail(
    { booking: data.booking, details: data.details, files: data.files, resubmitted: data.resubmitted, adminUrl },
    await siteContact()
  );
  return sendEmail({ to: BOOKING_NOTIFICATION_EMAIL, subject, html });
}
