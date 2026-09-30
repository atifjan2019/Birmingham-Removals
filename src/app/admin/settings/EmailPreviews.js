import { Mail } from "lucide-react";
import {
  enquiryReceivedEmail,
  adminEnquiryEmail,
  moveDetailsReceivedEmail,
  moveDetailsLinkEmail,
} from "@/lib/emailTemplates";
import { BUSINESS } from "@/config/business";
import { OFFICE_EMAIL, REPLY_TO } from "@/lib/email";

// A made-up customer and move, so every preview shows what a real email looks
// like without showing anyone's details. The link goes nowhere real.
function sample() {
  const moveDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const detailsUrl = `${BUSINESS.url}/move-details/example-link-for-preview-only`;
  const customer = { fullName: "Sarah Mitchell", email: "sarah@example.com", phone: "07700 900123" };
  const move = { moveType: "flat", fromPostcode: "B15 2TT", toPostcode: "B29 6BD", moveDate };
  return { customer, move, detailsUrl, moveDate };
}

/**
 * Every email the site sends, as it looks now, for the admin to check: who
 * gets it, when, its subject, and the email itself. Built from the same
 * templates the sending code uses, with the site's current phone and email,
 * so a change to either shows here straight away.
 */
export default function EmailPreviews({ contact }) {
  const { customer, move, detailsUrl } = sample();
  const enquiry = { ...customer, ...move, bedrooms: 2, extras: ["Packing"], bookingId: "EXAMPLE-ID", detailsUrl };
  const booking = { id: "EXAMPLE-ID", ...move, customer };
  const details = {
    from: { type: "flat", floor: "2", lift: "no" },
    to: { type: "house", floor: "", lift: "" },
    items: { "Sofa (3-seater)": 1, "Double bed": 1, Wardrobe: 2, "Fridge freezer": 1 },
    boxes: "11-20",
    itemsNotes: "A large mirror and a bike",
    dismantle: "yes",
    dismantleNotes: "Double bed and one wardrobe",
    movers: "2",
    notes: "Permit parking only outside the flat",
  };
  const files = [
    { id: "1", name: "living-room.jpg", isImage: true, size: 1 },
    { id: "2", name: "bedroom.jpg", isImage: true, size: 1 },
    { id: "3", name: "inventory.pdf", isImage: false, size: 1 },
  ];
  const adminUrl = `${BUSINESS.url}/admin/bookings`;

  const groups = [
    {
      title: "To the customer",
      emails: [
        {
          name: "Enquiry received",
          to: "The customer",
          when: "As soon as they send the quote form (and again if you press Resend emails on the booking). Carries their move details link.",
          ...enquiryReceivedEmail(enquiry, contact),
        },
        {
          name: "Move details link",
          to: "The customer",
          when: "When you press Email the link to the customer in Booking Details.",
          ...moveDetailsLinkEmail({ ...enquiry }, contact),
        },
      ],
    },
    {
      title: "To the office",
      emails: [
        {
          name: "New enquiry",
          to: OFFICE_EMAIL,
          when: "With every enquiry from the quote form.",
          ...adminEnquiryEmail(enquiry, contact),
        },
        {
          name: "Move details received",
          to: OFFICE_EMAIL,
          when: "When a customer sends their move details form.",
          ...moveDetailsReceivedEmail({ booking, details, files, resubmitted: false, adminUrl }, contact),
        },
        {
          name: "Move details updated",
          to: OFFICE_EMAIL,
          when: "When a customer changes their answers and sends the form again.",
          ...moveDetailsReceivedEmail({ booking, details, files, resubmitted: true, adminUrl }, contact),
        },
      ],
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Mail aria-hidden="true" className="w-5 h-5 text-primary" /> Email previews
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Every email the site sends, as it looks now, with a made-up customer. Nothing is sent from here.
        Replies to any of them go to <span className="font-medium text-gray-700">{REPLY_TO}</span>.
      </p>

      <div className="mt-6 space-y-8">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">{group.title}</h3>
            <div className="mt-3 space-y-3">
              {group.emails.map((email) => (
                <details key={email.name} className="group rounded-xl border border-gray-200 bg-gray-50 open:bg-white">
                  <summary className="cursor-pointer list-none px-4 py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-semibold text-gray-900">{email.name}</span>
                      <span className="text-xs text-gray-500">
                        To: <span className="font-medium text-gray-700">{email.to}</span>
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{email.when}</p>
                    <p className="mt-1 text-sm text-gray-700">
                      <span className="text-gray-500">Subject:</span> {email.subject}
                    </p>
                    <span className="mt-2 inline-block text-xs font-semibold text-primary group-open:hidden">Show the email</span>
                    <span className="mt-2 hidden text-xs font-semibold text-primary group-open:inline-block">Hide the email</span>
                  </summary>
                  {/* Shown in a sealed frame: the email's own styles cannot touch
                      the admin, and nothing in it can run. */}
                  <iframe
                    title={`Preview: ${email.name}`}
                    srcDoc={email.html}
                    sandbox=""
                    loading="lazy"
                    className="block h-[760px] w-full border-t border-gray-200 bg-[#f4f6f8]"
                  />
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
