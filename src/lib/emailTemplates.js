// The emails' subjects and HTML, kept free of any sending code so they can be
// rendered and checked without an SMTP connection. src/lib/email.js sends them.

import { MOVE_TYPE_LABELS, describeDetails } from "./moveDetails.js";

const BRAND_COLOR = "#F97316";
// Served by /api/site-image/logo (public, returns a PNG) so the email header
// always matches the current admin-uploaded logo. The old /images/logo.webp
// path 404'd (no such file) and webp is poorly supported in email clients.
const LOGO_URL = "https://www.birminghamremovals.uk/api/site-image/logo";

/** Everything a customer typed is text, never markup. */
export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function moveLabel(moveType) {
  return MOVE_TYPE_LABELS[moveType] || moveType || "Move";
}

function longDate(moveDate, weekday = "long", month = "long") {
  const date = new Date(moveDate);
  if (Number.isNaN(date.getTime())) return "Date to be agreed";
  return date.toLocaleDateString("en-GB", { weekday, day: "numeric", month, year: "numeric" });
}

export function baseLayout(content, contact = {}) {
  // Footer line is composed from whatever contact details exist, so a removed
  // phone or email simply drops out instead of leaving a dangling separator.
  const footerLine = ["Birmingham Removals", contact.phone, contact.email]
    .filter((part) => part && String(part).trim().length > 0)
    .map(esc)
    .join(" &bull; ");
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
            <!-- The logo PNG is transparent; a white background + padding on the
                 image keeps it readable in dark-mode email clients (which would
                 otherwise composite it onto black). -->
            <img src="${LOGO_URL}" alt="Birmingham Removals" width="200" style="display:block;margin:0 auto;max-width:200px;height:auto;background-color:#ffffff;padding:14px 18px;border-radius:8px;" />
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
              ${footerLine}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Rows of a two-column summary table, striped like the original emails. */
function summaryTable(rows) {
  const body = rows
    .map(([label, value, strong], i) => {
      const bg = i % 2 === 0 ? "#f9fafb" : "#ffffff";
      const border = i % 2 === 1 ? "border-top:1px solid #f3f4f6;" : "";
      return `
      <tr>
        <td style="padding:12px 16px;font-size:13px;color:#6b7280;background-color:${bg};${border}width:140px;">${esc(label)}</td>
        <td style="padding:12px 16px;font-size:14px;color:#111827;background-color:${bg};${border}${strong ? "font-weight:600;" : ""}">${value}</td>
      </tr>`;
    })
    .join("");
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">${body}
    </table>`;
}

/**
 * The email a customer gets when they send the quote form. It is an enquiry,
 * not a booking: nothing is booked until the price and date are agreed, and
 * the email says so. `detailsUrl`, when there is one, is the customer's own
 * link to the move details form.
 */
export function enquiryReceivedEmail(
  { fullName, moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, detailsUrl },
  contact = {}
) {
  const formattedDate = longDate(moveDate);
  const extrasList = extras && extras.length > 0 ? extras.map(esc).join(", ") : "None";
  const firstName = String(fullName || "").trim().split(/\s+/)[0] || "there";
  const callLine = contact.phone
    ? ` If you have any questions, call us on <strong>${esc(contact.phone)}</strong>.`
    : "";

  const detailsBlock = detailsUrl
    ? `
    <div style="margin-top:24px;padding:20px;background-color:#fff7ed;border-radius:8px;border:1px solid #fed7aa;">
      <p style="margin:0;font-size:15px;color:#9a3412;font-weight:700;">One more step: tell us what you are moving</p>
      <p style="margin:8px 0 16px;font-size:14px;color:#374151;line-height:1.5;">Add a list or photos of your items, tell us whether it is a flat or a house and whether there is a lift, and how many people you need. It takes a couple of minutes and saves the back and forth on WhatsApp.</p>
      <a href="${esc(detailsUrl)}" style="display:inline-block;background-color:${BRAND_COLOR};color:#ffffff !important;font-size:15px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:8px;">Add your move details</a>
    </div>`
    : "";

  const html = baseLayout(
    `
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">We have received your enquiry</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.5;">Hi ${esc(firstName)}, thank you for getting in touch with Birmingham Removals. This is not a booking yet: we confirm your price and your date with you first. Here is what you sent us:</p>

    ${summaryTable([
      ["Move Type", esc(moveLabel(moveType)), true],
      ["From", esc(fromPostcode)],
      ["To", esc(toPostcode)],
      ["Date", esc(formattedDate)],
      ["Bedrooms", esc(bedrooms || "N/A")],
      ["Extras", extrasList],
    ])}
    ${detailsBlock}

    <div style="margin-top:24px;padding:16px;background-color:#f0f9ff;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:14px;color:#1e40af;font-weight:600;">What happens next?</p>
      <p style="margin:8px 0 0;font-size:13px;color:#374151;line-height:1.5;">We look at your details and call you with your price. Your move is booked once you have agreed the price and the date with us.${callLine}</p>
    </div>
  `,
    contact
  );

  return {
    // A flexible date reads "studio or flat, date to be agreed", not "on Date to be agreed".
    subject: `We have received your enquiry: ${moveLabel(moveType).toLowerCase()}${
      Number.isNaN(new Date(moveDate).getTime()) ? ", date to be agreed" : ` on ${formattedDate}`
    }`,
    html,
  };
}

/**
 * The customer's move details link, sent by the office from Booking Details:
 * for an enquiry whose confirmation email predates the link, or a customer
 * who has not filled the form in yet.
 */
export function moveDetailsLinkEmail({ fullName, moveType, fromPostcode, toPostcode, moveDate, detailsUrl }, contact = {}) {
  const firstName = String(fullName || "").trim().split(/\s+/)[0] || "there";
  const date = new Date(moveDate);
  const when = Number.isNaN(date.getTime()) ? "" : ` on ${longDate(moveDate)}`;
  const route = fromPostcode && toPostcode ? ` from ${esc(fromPostcode)} to ${esc(toPostcode)}` : "";
  const callLine = contact.phone
    ? ` If you would rather talk it through, call us on <strong>${esc(contact.phone)}</strong>.`
    : "";

  const html = baseLayout(
    `
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">One more step for your quote</h2>
    <p style="margin:0 0 16px;font-size:15px;color:#4b5563;line-height:1.5;">Hi ${esc(firstName)}, thank you for your enquiry about your move${route}${esc(when)}.</p>
    <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.5;">To give you a fixed price without the back and forth on WhatsApp, please tell us a little about the move: whether it is a flat or a house at each end and if there is a lift, what we are moving (tap the items, type a list, or add photos), anything that needs taking apart, and how many people you need.</p>
    <a href="${esc(detailsUrl)}" style="display:inline-block;background-color:${BRAND_COLOR};color:#ffffff !important;font-size:15px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:8px;">Add your move details</a>
    <p style="margin:20px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">It takes a couple of minutes. Everything saves as you go, so you can come back to it on the same link, which is private to your enquiry.</p>

    <div style="margin-top:24px;padding:16px;background-color:#f0f9ff;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">This is not a booking yet: we confirm the price and the date with you first.${callLine}</p>
    </div>
  `,
    contact
  );

  return { subject: `One more step for your ${moveLabel(moveType).toLowerCase()} quote`, html };
}

/** The notification the office gets for the same enquiry. */
export function adminEnquiryEmail(
  { fullName, email, phone, moveType, fromPostcode, toPostcode, moveDate, bedrooms, extras, bookingId },
  contact = {}
) {
  const formattedDate = longDate(moveDate, "short", "short");
  const extrasList = extras && extras.length > 0 ? extras.map(esc).join(", ") : "None";

  const html = baseLayout(
    `
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">New enquiry received</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#4b5563;">A new enquiry has just come in from the quote form.</p>

    ${summaryTable([
      ["Customer", esc(fullName), true],
      ["Email", esc(email)],
      ["Phone", esc(phone)],
      ["Move Type", esc(moveLabel(moveType))],
      ["Route", `${esc(fromPostcode)} &rarr; ${esc(toPostcode)}`],
      ["Date", esc(formattedDate)],
      ["Bedrooms", esc(bedrooms || "N/A")],
      ["Extras", extrasList],
    ])}

    <p style="margin:24px 0 0;font-size:13px;color:#6b7280;">Enquiry ID: ${esc(bookingId)}</p>
  `,
    contact
  );

  return {
    subject: `New enquiry: ${fullName} (${moveLabel(moveType)}, ${formattedDate})`,
    html,
  };
}

/** "2 photos and 1 file", "1 photo", "3 files", or "" when nothing was added. */
function countFiles(files) {
  const list = Array.isArray(files) ? files : [];
  const photos = list.filter((file) => file?.isImage).length;
  const others = list.length - photos;
  return [
    photos ? `${photos} ${photos === 1 ? "photo" : "photos"}` : "",
    others ? `${others} ${others === 1 ? "file" : "files"}` : "",
  ]
    .filter(Boolean)
    .join(" and ");
}

/**
 * The notification the office gets when a customer sends the move details
 * form, or sends it again after changing an answer. The photos and files are
 * not attached to the email: they stay with the enquiry, and the button opens
 * the admin at it. `booking`, `details` and `files` are what the API returns
 * for the submission.
 */
export function moveDetailsReceivedEmail({ booking, details, files, resubmitted, adminUrl }, contact = {}) {
  const customer = booking?.customer || {};
  // On one line however it was typed, because it goes in the subject as well.
  const fullName = String(customer.fullName || "").replace(/\s+/g, " ").trim() || "A customer";
  const moveType = moveLabel(booking?.moveType);
  const move = [
    esc(moveType),
    `${esc(booking?.fromPostcode)} to ${esc(booking?.toPostcode)}`,
    esc(longDate(booking?.moveDate)),
  ].join(", ");

  const contactLines = [
    customer.phone ? `Phone: <strong>${esc(customer.phone)}</strong>` : "",
    customer.email ? `Email: <strong>${esc(customer.email)}</strong>` : "",
  ]
    .filter(Boolean)
    .join("<br>");

  // The items the customer tapped read better one to a line, and anything
  // they typed keeps its own line breaks. A value of several lines gets a
  // little more room between them than the table's single lines need.
  const rows = describeDetails(details).map((row) => {
    const lines = row.list?.length ? row.list.map(esc) : esc(row.value).split(/\r?\n/);
    return [row.label, lines.length > 1 ? `<div style="line-height:1.5;">${lines.join("<br>")}</div>` : lines[0]];
  });

  const attached = countFiles(files);

  const html = baseLayout(
    `
    <h2 style="margin:0 0 8px;font-size:20px;color:#111827;">${resubmitted ? "Move details updated" : "Move details received"}</h2>
    <p style="margin:0 0 12px;font-size:15px;color:#4b5563;line-height:1.5;"><strong>${esc(fullName)}</strong> ${
      resubmitted ? "has changed the details of their move and sent them again" : "has sent the details of their move"
    } (${move}).</p>
    ${contactLines ? `<p style="margin:0 0 24px;font-size:14px;color:#4b5563;line-height:1.6;">${contactLines}</p>` : ""}

    ${summaryTable(rows)}

    <p style="margin:24px 0 0;font-size:14px;color:#374151;line-height:1.5;">${
      attached ? `${attached} attached to the enquiry.` : "No photos or files attached to the enquiry."
    }</p>
    ${
      adminUrl
        ? `
    <div style="margin-top:24px;">
      <a href="${esc(adminUrl)}" style="display:inline-block;background-color:${BRAND_COLOR};color:#ffffff !important;font-size:15px;font-weight:700;text-decoration:none;padding:13px 24px;border-radius:8px;">Open in admin</a>
    </div>`
        : ""
    }
  `,
    contact
  );

  return {
    subject: `Move details received: ${fullName} (${moveType}, ${longDate(booking?.moveDate, "short", "short")})`,
    html,
  };
}
