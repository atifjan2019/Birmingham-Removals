// The move details as a PDF, for passing on to the people doing the move. It
// carries the customer's name, the whole move and their answers, and never
// their phone or email. Kept free of any sending code, like the
// email templates, so it can be built and checked on its own.

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { MOVE_TYPE_LABELS, describeDetails } from "./moveDetails.js";

const PAGE = { width: 595.28, height: 841.89 }; // A4
const MARGIN = 48;
const LABEL_WIDTH = 130;
const ORANGE = rgb(0.976, 0.451, 0.086);
const INK = rgb(0.067, 0.094, 0.153);
const GREY = rgb(0.42, 0.447, 0.502);
const RULE = rgb(0.898, 0.906, 0.922);

function longDate(moveDate) {
  const date = new Date(moveDate);
  if (Number.isNaN(date.getTime())) return "Date to be agreed";
  return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/** "2 photos and 1 file", or "" when nothing was added. */
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
 * The built-in PDF fonts only hold Western European characters, and drawing
 * anything else throws. A customer can type whatever they like, so characters
 * the font lacks (emoji, other scripts) become "?" instead of losing the PDF.
 */
function printable(font, text) {
  const known = new Set(font.getCharacterSet());
  return Array.from(String(text ?? "").replace(/\t/g, " "))
    .map((char) => (known.has(char.codePointAt(0)) ? char : "?"))
    .join("");
}

/** One paragraph broken into lines that fit `width`, splitting a word only when it alone is too long. */
function wrap(font, size, text, width) {
  const lines = [];
  let line = "";
  for (const word of text.split(/ +/).filter(Boolean)) {
    let piece = word;
    while (font.widthOfTextAtSize(piece, size) > width) {
      // A single unbroken run wider than the column: cut it where it fits.
      if (line) {
        lines.push(line);
        line = "";
      }
      let cut = piece.length - 1;
      while (cut > 1 && font.widthOfTextAtSize(piece.slice(0, cut), size) > width) cut -= 1;
      lines.push(piece.slice(0, cut));
      piece = piece.slice(cut);
    }
    const joined = line ? `${line} ${piece}` : piece;
    if (font.widthOfTextAtSize(joined, size) > width) {
      lines.push(line);
      line = piece;
    } else {
      line = joined;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

/** The customer's name on one line, or "" when there is none. */
function nameOf(booking) {
  return String(booking?.customer?.fullName || "").replace(/\s+/g, " ").trim();
}

/**
 * A file name for the attachment: the customer's name, then the date. Only
 * letters, digits and hyphens, so it saves and forwards on any phone.
 */
export function moveDetailsPdfName(booking) {
  const name = nameOf(booking)
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const date = new Date(booking?.moveDate);
  const day = Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  return [name || "Move-details", day].filter(Boolean).join("-").concat(".pdf");
}

/**
 * Build the PDF. `booking`, `details` and `files` are what the API returns for
 * a submission; `booking` may also carry `bedrooms` and `extras` from the
 * enquiry. Of the customer only the name is read: the phone and email are
 * never touched. Returns the PDF's bytes.
 */
export async function moveDetailsPdf({ booking, details, files, resubmitted }) {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  doc.setTitle("Move details");
  doc.setAuthor("Birmingham Removals");

  let page = doc.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;
  const contentWidth = PAGE.width - MARGIN * 2;

  const room = (needed) => {
    if (y - needed >= MARGIN) return;
    page = doc.addPage([PAGE.width, PAGE.height]);
    y = PAGE.height - MARGIN;
  };
  const text = (value, { x = MARGIN, font = regular, size = 11, color = INK } = {}) =>
    page.drawText(value, { x, y, font, size, color });

  // Header
  y -= 16;
  text("Birmingham Removals", { font: bold, size: 16 });
  y -= 12;
  page.drawRectangle({ x: MARGIN, y, width: contentWidth, height: 2.5, color: ORANGE });
  y -= 30;
  text(resubmitted ? "Move details (updated)" : "Move details", { font: bold, size: 20 });
  y -= 28;
  text("The move", { font: bold, size: 13 });
  y -= 22;

  // The move
  const moveType = MOVE_TYPE_LABELS[booking?.moveType] || booking?.moveType || "Move";
  const extras = Array.isArray(booking?.extras) ? booking.extras.filter(Boolean) : null;
  const summary = [
    ["Customer", nameOf(booking)],
    ["Move type", moveType],
    ["Moving from", booking?.fromPostcode || ""],
    ["Moving to", booking?.toPostcode || ""],
    ["Move date", longDate(booking?.moveDate)],
    ["Bedrooms", booking?.bedrooms != null ? String(booking.bedrooms) : ""],
    ["Extras", extras ? extras.join(", ") || "None" : ""],
    ["Enquiry ID", booking?.id || ""],
  ].filter(([, value]) => value);

  const row = ([label, value, list]) => {
    const size = 11;
    const leading = 15;
    const paragraphs = list?.length ? list : String(value).split(/\r?\n/);
    const lines = paragraphs.flatMap((paragraph) =>
      wrap(regular, size, printable(regular, paragraph), contentWidth - LABEL_WIDTH)
    );
    room(leading + 14);
    text(printable(bold, label), { font: bold, size: 10, color: GREY });
    for (const line of lines) {
      room(leading);
      text(line, { x: MARGIN + LABEL_WIDTH, size });
      y -= leading;
    }
    y -= 5;
    page.drawLine({ start: { x: MARGIN, y: y + 6 }, end: { x: MARGIN + contentWidth, y: y + 6 }, thickness: 0.5, color: RULE });
    y -= 8;
  };

  summary.forEach(row);

  y -= 10;
  room(40);
  text("The customer's answers", { font: bold, size: 13 });
  y -= 22;

  describeDetails(details)
    .map((item) => [item.label, item.value, item.list])
    .forEach(row);

  const attached = countFiles(files);
  y -= 6;
  room(20);
  text(attached ? `${attached} sent with these answers.` : "No photos or files sent with these answers.", {
    size: 10,
    color: GREY,
  });

  return doc.save();
}
