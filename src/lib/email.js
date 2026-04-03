import nodemailer from "nodemailer";

let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  _transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 2525,
    secure: false, // TLS via STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return _transporter;
}

/**
 * Send an email
 * @param {{ to: string, subject: string, html: string, text?: string }} options
 */
export async function sendEmail({ to, subject, html, text }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[EMAIL SKIP] SMTP not configured, skipping email to", to);
    return { success: false, error: "SMTP not configured" };
  }
  try {
    const info = await transporter.sendMail({
      from: `"Newcastle Removals" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
      text: text || "",
    });
    console.log(`[EMAIL SENT] to=${to} messageId=${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EMAIL ERROR] to=${to}`, error.message);
    return { success: false, error: error.message };
  }
}

/* ─── Pre-built templates ─── */

const BRAND_COLOR = "#2563eb";

function baseLayout(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background:${BRAND_COLOR};padding:28px 32px;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Newcastle Removals</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${content}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
              Newcastle Removals &bull; 0794 348 0432 &bull; info@newcastleremovals.uk
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
export async function sendBookingConfirmation({ email, fullName, moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, estimatedPrice }) {
  const formattedDate = new Date(moveDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const extrasList = extras && extras.length > 0 ? extras.join(", ") : "None";

  const html = baseLayout(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">Booking Confirmed!</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;">Hi ${fullName}, thank you for choosing Newcastle Removals. Here are your booking details:</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;width:140px;">Move Type</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;font-weight:600;">${moveType}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">From</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${fromPostcode}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;">To</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;">${toPostcode}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">Date</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${formattedDate}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;">Bedrooms</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;">${bedrooms || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">Extras</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${extrasList}</td>
      </tr>
      <tr style="background:${BRAND_COLOR}10;">
        <td style="padding:12px 16px;font-size:13px;color:${BRAND_COLOR};font-weight:600;">Est. Price</td>
        <td style="padding:12px 16px;font-size:16px;color:${BRAND_COLOR};font-weight:700;">From &pound;${estimatedPrice}</td>
      </tr>
    </table>

    <div style="margin-top:24px;padding:16px;background:#f0f9ff;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:14px;color:#1e40af;font-weight:600;">What happens next?</p>
      <p style="margin:8px 0 0;font-size:13px;color:#374151;">Our team will review your booking and call you to confirm the final details and price. If you have any questions, feel free to call us on <strong>0794 348 0432</strong>.</p>
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
export async function sendAdminNotification({ fullName, email, phone, moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, estimatedPrice, bookingId }) {
  const formattedDate = new Date(moveDate).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const extrasList = extras && extras.length > 0 ? extras.join(", ") : "None";

  const html = baseLayout(`
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">New Booking Received</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;">A new booking has just been submitted.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;width:140px;">Customer</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;font-weight:600;">${fullName}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">Email</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${email}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;">Phone</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;">${phone}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">Move Type</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${moveType}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;">Route</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;">${fromPostcode} &rarr; ${toPostcode}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">Date</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${formattedDate}</td>
      </tr>
      <tr style="background:#f9fafb;">
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;">Bedrooms</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;">${bedrooms || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-top:1px solid #f3f4f6;">Extras</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;border-top:1px solid #f3f4f6;">${extrasList}</td>
      </tr>
      <tr style="background:#fef3c7;">
        <td style="padding:12px 16px;font-size:13px;color:#92400e;font-weight:600;">Est. Price</td>
        <td style="padding:12px 16px;font-size:16px;color:#92400e;font-weight:700;">From &pound;${estimatedPrice}</td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">Booking ID: ${bookingId}</p>
  `);

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking - ${fullName} (${moveType}, ${formattedDate})`,
    html,
  });
}
