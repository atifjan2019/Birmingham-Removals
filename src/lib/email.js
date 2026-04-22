import nodemailer from "nodemailer";

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
  console.log("[EMAIL] Attempting to send email to:", to);
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[EMAIL SKIP] No transporter available, skipping email to", to);
    return { success: false, error: "SMTP not configured" };
  }
  try {
    const from = `"Birmingham Removals" <${process.env.SMTP_FROM}>`;
    console.log("[EMAIL] Sending from:", from);
    const info = await transporter.sendMail({ from, to, subject, html, text: text || "" });
    console.log(`[EMAIL SENT] to=${to} messageId=${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL ERROR] to=${to}`, error.message, error.stack);
    return { success: false, error: error.message };
  }
}

/* ─── Pre-built templates ─── */

const BRAND_COLOR = "#F97316";
const LOGO_URL = "https://www.birminghamremovals.uk/images/logo.png";
const BOOKING_NOTIFICATION_EMAIL = "webspires@gmail.com";

function baseLayout(content) {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; }
    body, table, td, div, p, h1, h2, h3 { color: #111827 !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;color:#111827;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f6f8;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <!-- Header with Logo -->
        <tr>
          <td style="background-color:#ffffff;padding:28px 32px;text-align:center;border-bottom:3px solid #F97316;">
            <img src="${LOGO_URL}" alt="Birmingham Removals" width="200" style="display:block;margin:0 auto;max-width:200px;height:auto;" />
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;background-color:#ffffff;color:#111827;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">
              Birmingham Removals &bull; 07365 380090 &bull; info@birminghamremovals.uk
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Booking confirmation email to the customer
 */
export async function sendBookingConfirmation({ email, fullName, moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras }) {
  const formattedDate = new Date(moveDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const extrasList = extras && extras.length > 0 ? extras.join(", ") : "None";

  const html = baseLayout(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Booking Confirmed!</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#4b5563;">Hi ${fullName}, thank you for choosing Birmingham Removals. Here are your booking details:</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;width:140px;">Move Type</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;font-weight:600;">${moveType}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">From</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${fromPostcode}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;">To</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;">${toPostcode}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">Date</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${formattedDate}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;">Bedrooms</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;">${bedrooms || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">Extras</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${extrasList}</td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:16px;background-color:#f0f9ff;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:14px;color:#1e40af;font-weight:600;">What happens next?</p>
      <p style="margin:8px 0 0;font-size:13px;color:#374151;">Our team will review your booking and call you to confirm the final details and price. If you have any questions, feel free to call us on <strong>07365 380090</strong>.</p>
    </div>
  `);

  return sendEmail({
    to: email,
    subject: `Booking Confirmed - ${moveType} Move on ${formattedDate}`,
    html,
  });
}

/**
 * New booking notification email to admin
 */
export async function sendAdminNotification({ fullName, email, phone, moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, bookingId }) {
  const formattedDate = new Date(moveDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const extrasList = extras && extras.length > 0 ? extras.join(", ") : "None";

  const html = baseLayout(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">New Booking Received</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#4b5563;">A new booking has just been submitted.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;width:140px;">Customer</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;font-weight:600;">${fullName}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">Email</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${email}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;">Phone</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;">${phone}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">Move Type</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${moveType}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;">Route</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;">${fromPostcode} &rarr; ${toPostcode}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">Date</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${formattedDate}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#f9fafb;">Bedrooms</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#f9fafb;">${bedrooms || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:#ffffff;border-top:1px solid #f3f4f6;">Extras</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:#ffffff;border-top:1px solid #f3f4f6;">${extrasList}</td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Booking ID: ${bookingId}</p>
  `);

  return sendEmail({
    to: BOOKING_NOTIFICATION_EMAIL,
    subject: `New Booking - ${fullName} (${moveType}, ${formattedDate})`,
    html,
  });
}
