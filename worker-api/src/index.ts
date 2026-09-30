type BookingStatus = "New" | "Upcoming" | "Completed" | "Abandoned" | "Lost";

interface BookingRow {
	id: string;
	customerId: string;
	moveType: string;
	fromPostcode: string;
	toPostcode: string;
	moveDate: string;
	bedrooms: number;
	extras: string | null;
	status: BookingStatus;
	price: number | null;
	jobCost: number | null;
	expenses: number | null;
	profit: number | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
	detailsToken: string | null;
	detailsUpdatedAt: string | null;
	detailsSubmittedAt: string | null;
	leadKey: string | null;
	fileCount: number;
	customerFullName: string;
	customerPhone: string;
	customerEmail: string;
}

interface Booking {
	id: string;
	moveType: string;
	fromPostcode: string;
	toPostcode: string;
	moveDate: string;
	bedrooms: number;
	extras: string[];
	status: BookingStatus;
	price: number | null;
	jobCost: number | null;
	expenses: number | null;
	profit: number | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
	detailsToken: string | null;
	detailsUpdatedAt: string | null;
	detailsSubmittedAt: string | null;
	fileCount: number;
	customer: {
		id: string;
		fullName: string;
		phone: string;
		email: string;
	};
}

interface CustomerRow {
	id: string;
	fullName: string;
	phone: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	bookingCount: number;
}

interface ActivityLogRow {
	id: string;
	action: string;
	details: string | null;
	entityId: string | null;
	actor: string | null;
	createdAt: string;
}

interface CreateBookingRequest {
	fullName: string;
	email: string;
	phone: string;
	moveType: string;
	fromPostcode: string;
	toPostcode: string;
	moveDate: string;
	bedrooms?: number | string | null;
	extras?: string[];
	status?: BookingStatus;
	price?: number | string | null;
	// A random id the quote form makes and keeps in the visitor's browser. It
	// is stored with the lead, and is what lets that same browser repeat the
	// call that finishes the lead. See updateBooking().
	leadKey?: string;
	// Set by the website for a booking the office itself is adding: attach it
	// to the customer record that already has this email. See createBooking().
	reuseCustomer?: boolean;
}

type UpdateBookingRequest = Partial<CreateBookingRequest> & {
	jobCost?: number | string | null;
	expenses?: number | string | null;
	notes?: string | null;
	// Set by the website's public forms: only change the booking if it is still
	// an untouched lead. See updateBooking().
	onlyIfLead?: boolean;
};

interface CreateActivityRequest {
	action: string;
	details?: string | null;
	entityId?: string | null;
	actor?: string | null;
}

interface SiteSettingsRow {
	id: number;
	logoUrl: string | null;
	footerLogoUrl: string | null;
	faviconUrl: string | null;
	phone: string | null;
	email: string | null;
	address: string | null;
	facebook: string | null;
	instagram: string | null;
	twitter: string | null;
	linkedin: string | null;
	youtube: string | null;
	tiktok: string | null;
	whatsapp: string | null;
	showPhone: string | null;
	updatedAt: string;
}

const SITE_SETTINGS_FIELDS = [
	"logoUrl",
	"footerLogoUrl",
	"faviconUrl",
	"phone",
	"email",
	"address",
	"facebook",
	"instagram",
	"twitter",
	"linkedin",
	"youtube",
	"tiktok",
	"whatsapp",
	"showPhone",
] as const;
type SiteSettingsField = (typeof SITE_SETTINGS_FIELDS)[number];
type SiteSettingsUpdate = Partial<Record<SiteSettingsField, string | null>>;

type NormalizedBookingRequest = Required<Omit<CreateBookingRequest, "bedrooms" | "price" | "leadKey" | "reuseCustomer">> & {
	bedrooms: number;
	price: number | null;
};

const PROPERTY_TYPES = ["house", "flat", "other"] as const;
const FLOORS = ["ground", "1", "2", "3", "4+"] as const;
const YES_NO = ["yes", "no"] as const;
const BOX_RANGES = ["none", "1-10", "11-20", "21-40", "40+"] as const;
const MOVER_OPTIONS = ["1", "2", "3", "4+", "unsure"] as const;

interface PlaceDetails {
	type: (typeof PROPERTY_TYPES)[number] | "";
	floor: (typeof FLOORS)[number] | "";
	lift: (typeof YES_NO)[number] | "";
}

// The answers from the move details form. A question that has not been
// answered is "", never missing: sanitizeDetails() builds exactly this shape
// from whatever a request sends, and the form relies on getting it back.
interface MoveDetails {
	from: PlaceDetails;
	to: PlaceDetails;
	items: Record<string, number>;
	boxes: (typeof BOX_RANGES)[number] | "";
	itemsNotes: string;
	dismantle: (typeof YES_NO)[number] | "";
	dismantleNotes: string;
	movers: (typeof MOVER_OPTIONS)[number] | "";
	notes: string;
}

// A booking as the move details endpoints need it, found by its token.
interface DetailsBookingRow {
	id: string;
	moveType: string;
	fromPostcode: string;
	toPostcode: string;
	moveDate: string;
	details: string | null;
	detailsVersion: number;
	detailsSaveId: string | null;
	detailsUpdatedAt: string | null;
	detailsSubmittedAt: string | null;
	customerFullName: string;
	customerPhone: string;
	customerEmail: string;
}

interface BookingFileRow {
	id: string;
	clientId: string | null;
	name: string;
	contentType: string;
	size: number;
	isImage: number;
	thumb: string | null;
	createdAt: string;
}

interface NewBookingFile {
	id: string;
	bookingId: string;
	clientId: string | null;
	name: string;
	contentType: string;
	size: number;
	isImage: boolean;
	thumb: string | null;
	r2Key: string;
}

type ApiResponse<T> = { data: T } | { error: { message: string; details?: Record<string, string> } };

const DEFAULT_ALLOWED_ORIGINS = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"https://birmingham-removals.vercel.app",
	// The move details form saves answers and uploads files straight from the
	// customer's browser, so the live site (with and without www) and its local
	// dev server are allowed as well.
	"https://www.birminghamremovals.uk",
	"https://birminghamremovals.uk",
	"http://localhost:3010",
];
const BOOKING_STATUSES: BookingStatus[] = ["New", "Upcoming", "Completed", "Abandoned", "Lost"];
const MAX_LIMIT = 100;
// Abandoned leads are captured automatically as the quote funnel is filled in and
// never followed up, so they accumulate. The cron trigger below deletes any that
// have sat untouched for this many days.
const PURGE_ABANDONED_AFTER_DAYS = 30;

// Request bodies are read up to a limit and no further. A booking is a dozen
// short fields; the office's own calls carry a little more (notes, an activity
// entry); the settings carry the logos as data URLs.
const MAX_BOOKING_BODY_BYTES = 16 * 1024;
const MAX_ADMIN_BODY_BYTES = 64 * 1024;
const MAX_SETTINGS_BODY_BYTES = 2 * 1024 * 1024;

const DETAILS_LINK_NOT_FOUND = "Move details link not found";
const DETAILS_CHANGED_ELSEWHERE = "These answers have been changed somewhere else";
const MAX_DETAILS_BODY_BYTES = 20 * 1024;
// The website emails the office when details are sent with something new in
// them. One enquiry can only be sent that way this many times in a day: after
// that a send is refused (the answers themselves are still saved as they are
// typed), so whoever holds a link cannot use it to flood the office's inbox.
const MAX_DETAILS_SENDS_PER_DAY = 5;
const MAX_NOTES_LENGTH = 2000;
const MAX_DISMANTLE_NOTES_LENGTH = 1000;
const MAX_ITEM_ENTRIES = 60;
const MAX_ITEM_NAME_LENGTH = 60;
const MAX_ITEM_COUNT = 99;

const MAX_FILES_PER_BOOKING = 12;
const MAX_FILE_BYTES = 15 * 1024 * 1024;
// A brake on the service as a whole, not on one customer. Anyone can start an
// enquiry and so be given a link, and the per-enquiry limits alone would not
// stop a script filling the bucket, or the database with thumbnails, through
// thousands of them. A normal day comes nowhere near either figure.
const MAX_UPLOAD_BYTES_PER_DAY = 2 * 1024 * 1024 * 1024;
const MAX_UPLOAD_FILES_PER_DAY = 1500;
// An upload also carries its form fields and a thumbnail, so the request body
// may be a little larger than the file inside it.
const MAX_UPLOAD_BODY_BYTES = MAX_FILE_BYTES + 1024 * 1024;
const MAX_FILE_NAME_LENGTH = 120;
// The form's previews are 200 px JPEGs of a few thousand characters. The
// length is capped because they are stored in the database, and the picture's
// own declared size is capped as well (see cleanThumb).
const MAX_THUMB_LENGTH = 24_000;
const MAX_THUMB_SIDE = 320;
const FILE_LINK_MINUTES = 5;
// The time of a save, as SQL. D1 keeps time in whole seconds, so a save made in
// the same second as the details were sent is put one second after it: "saved
// later than it was sent" has to be true of every change, however quick.
const DETAILS_SAVED_NOW = `CASE
	WHEN detailsSubmittedAt IS NOT NULL AND datetime('now') <= detailsSubmittedAt THEN datetime(detailsSubmittedAt, '+1 second')
	ELSE datetime('now')
END`;

// What a customer may upload, by file extension, with the content type each is
// stored and served as. The type always comes from these tables and never from
// the browser, so a file cannot be labelled as something that would run when
// the office opens it. SVG is left out on purpose: it is an image that can
// carry script.
const IMAGE_TYPES = new Map([
	["jpg", "image/jpeg"],
	["jpeg", "image/jpeg"],
	["png", "image/png"],
	["webp", "image/webp"],
	["gif", "image/gif"],
	["heic", "image/heic"],
	["heif", "image/heif"],
	["avif", "image/avif"],
	["bmp", "image/bmp"],
]);
const DOCUMENT_TYPES = new Map([
	["pdf", "application/pdf"],
	["txt", "text/plain"],
	["csv", "text/csv"],
	["doc", "application/msword"],
	["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
	["xls", "application/vnd.ms-excel"],
	["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
	["rtf", "application/rtf"],
	["odt", "application/vnd.oasis.opendocument.text"],
	["ods", "application/vnd.oasis.opendocument.spreadsheet"],
	["pages", "application/vnd.apple.pages"],
	["numbers", "application/vnd.apple.numbers"],
]);
// Types a browser gives to web pages and scripts. A document that arrives
// calling itself one of these is not the document its name says it is.
const ACTIVE_CONTENT_TYPE = /html|javascript|ecmascript|svg|^(?:text|application)\/xml$/;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const THUMB_PREFIX = "data:image/jpeg;base64,";
const THUMB_PATTERN = /^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/;
// Ids the form makes up: one for each save of the answers, one for each file.
const SAVE_ID_PATTERN = /^[A-Za-z0-9_-]{1,40}$/;
const CLIENT_ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
// How many removed files an enquiry keeps a note of (see recordRemoved). Far
// more than twelve files' worth of adding and removing; the cap only stops a
// link being used to fill the table.
const MAX_REMOVED_PER_BOOKING = 200;
// The quote form's id for a lead. Long enough that it cannot be guessed.
const LEAD_KEY_PATTERN = /^[A-Za-z0-9_-]{16,80}$/;
const MAX_SENT_IDS = 20;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const requestOrigin = request.headers.get("Origin");

		if (request.method === "OPTIONS") {
			return handleOptions(request, env);
		}

		try {
			const url = new URL(request.url);
			const path = normalizePath(url.pathname);
			const corsHeaders = getCorsHeaders(requestOrigin, env);

			if (requestOrigin && !corsHeaders) {
				return json({ error: { message: "Origin is not allowed" } }, 403);
			}

			if (path === "/" && request.method === "GET") {
				return json(
					{
						data: {
							name: "Birmingham Removals API",
							resources: ["/bookings", "/customers", "/activity"],
						},
					},
					200,
					corsHeaders,
				);
			}

			if (path === "/health" && request.method === "GET") {
				return json({ data: { ok: true } }, 200, corsHeaders);
			}

			if (path === "/bookings") {
				if (request.method === "GET") {
					const adminResponse = requireAdmin(request, env, corsHeaders);
					if (adminResponse) return adminResponse;
					return await listBookings(request, env, corsHeaders);
				}
				if (request.method === "POST") return await createBooking(request, env, corsHeaders);
			}

			if (path === "/customers") {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				if (request.method === "GET") return await listCustomers(env, corsHeaders);
			}

			const customerMatch = path.match(/^\/customers\/([^/]+)$/);
			if (customerMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				const id = decodeURIComponent(customerMatch[1]);

				if (request.method === "DELETE") return await deleteCustomer(id, env, corsHeaders);
			}

			if (path === "/activity") {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				if (request.method === "GET") return await listActivity(env, corsHeaders);
				if (request.method === "POST") return await createActivity(request, env, corsHeaders);
			}

			if (path === "/settings") {
				if (request.method === "GET") return await getSettings(env, corsHeaders);
				if (request.method === "PUT") {
					const adminResponse = requireAdmin(request, env, corsHeaders);
					if (adminResponse) return adminResponse;
					return await updateSettings(request, env, corsHeaders);
				}
			}

			const bookingMatch = path.match(/^\/bookings\/([^/]+)$/);
			if (bookingMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				const id = decodeURIComponent(bookingMatch[1]);

				if (request.method === "GET") return await getBooking(id, env, corsHeaders);
				if (request.method === "PUT") return await updateBooking(id, request, env, corsHeaders);
				if (request.method === "DELETE") return await deleteBooking(id, env, corsHeaders);
			}

			// The move details form. The token in the path is the customer's own
			// link and is what authorises these. It is compared exactly as it
			// arrives, and anything that is not a token is simply not found.
			//
			// Every handler in this router is awaited. An HttpError thrown inside
			// one (a body over its limit, the wrong content type) only reaches the
			// catch below, and becomes a proper response, if its promise is awaited
			// inside this try.
			const detailsMatch = path.match(/^\/move-details\/([^/]+)$/);
			if (detailsMatch) {
				if (request.method === "GET") return await getMoveDetails(detailsMatch[1], env, corsHeaders);
				if (request.method === "PUT") return await saveMoveDetails(detailsMatch[1], request, env, corsHeaders);
			}

			const detailsFilesMatch = path.match(/^\/move-details\/([^/]+)\/files$/);
			if (detailsFilesMatch) {
				if (request.method === "POST") {
					return await uploadMoveDetailsFile(detailsFilesMatch[1], request, env, ctx, corsHeaders);
				}
			}

			const detailsFileMatch = path.match(/^\/move-details\/([^/]+)\/files\/([^/]+)$/);
			if (detailsFileMatch) {
				if (request.method === "DELETE") {
					return await deleteMoveDetailsFile(detailsFileMatch[1], detailsFileMatch[2], env, corsHeaders);
				}
			}

			// Sending the details is admin-only even though the customer starts it:
			// the website's server makes this call and then emails the office, so a
			// browser cannot mark details as sent without that email going out.
			const detailsSubmitMatch = path.match(/^\/move-details\/([^/]+)\/submit$/);
			if (detailsSubmitMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;

				if (request.method === "POST") {
					return await submitMoveDetails(detailsSubmitMatch[1], request, env, corsHeaders);
				}
			}

			const bookingDetailsMatch = path.match(/^\/bookings\/([^/]+)\/move-details$/);
			if (bookingDetailsMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				const id = decodeURIComponent(bookingDetailsMatch[1]);

				if (request.method === "GET") return await getBookingMoveDetails(id, env, corsHeaders);
			}

			const fileLinkMatch = path.match(/^\/files\/([^/]+)\/link$/);
			if (fileLinkMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				const id = decodeURIComponent(fileLinkMatch[1]);

				if (request.method === "POST") return await createFileLink(id, request, env, corsHeaders);
			}

			// Opened as a page in the admin's browser, not fetched by script, so it
			// takes no CORS headers.
			const fileMatch = path.match(/^\/file\/([^/]+)$/);
			if (fileMatch) {
				if (request.method === "GET") return await serveFile(fileMatch[1], env);
			}

			return json({ error: { message: "Not found" } }, 404, corsHeaders);
		} catch (error) {
			if (error instanceof HttpError) {
				return json({ error: { message: error.message } }, error.status, getCorsHeaders(requestOrigin, env));
			}

			console.error(error);
			return json({ error: { message: "Internal server error" } }, 500, getCorsHeaders(requestOrigin, env));
		}
	},

	async scheduled(_controller: ScheduledController, env: Env): Promise<void> {
		await purgeExpiredFileLinks(env);
		await purgeStaleAbandonedLeads(env);
	},
} satisfies ExportedHandler<Env>;

async function listBookings(request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const url = new URL(request.url);
	const status = url.searchParams.get("status");
	const limit = clampNumber(Number(url.searchParams.get("limit") ?? 25), 1, MAX_LIMIT);
	const offset = Math.max(0, Number(url.searchParams.get("offset") ?? 0) || 0);

	if (status && !isBookingStatus(status)) {
		return json({ error: { message: "Invalid status filter" } }, 400, corsHeaders);
	}

	const { results } = await env.DB.prepare(
		`SELECT
			b.id, b.customerId, b.moveType, b.fromPostcode, b.toPostcode, b.moveDate,
			b.bedrooms, b.extras, b.status, b.price, b.jobCost, b.expenses, b.profit, b.notes,
			b.createdAt, b.updatedAt,
			b.detailsToken, b.detailsUpdatedAt, b.detailsSubmittedAt, b.leadKey,
			(SELECT COUNT(*) FROM BookingFile f WHERE f.bookingId = b.id) AS fileCount,
			c.fullName AS customerFullName, c.phone AS customerPhone, c.email AS customerEmail
		FROM Booking b
		INNER JOIN Customer c ON c.id = b.customerId
		WHERE (?1 IS NULL OR b.status = ?1)
		ORDER BY b.createdAt DESC
		LIMIT ?2 OFFSET ?3`,
	)
		.bind(status, limit, offset)
		.all<BookingRow>();

	return json({ data: results.map((row) => toBooking(row, true)) }, 200, corsHeaders);
}

async function getBooking(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const row = await findBooking(id, env);

	if (!row) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	return json({ data: toBooking(row, true) }, 200, corsHeaders);
}

async function createBooking(request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const body = await readJson<CreateBookingRequest>(request, MAX_BOOKING_BODY_BYTES);
	const validation = validateCreateBooking(body);

	if (!validation.valid) {
		return json({ error: { message: "Invalid booking data", details: validation.errors } }, 400, corsHeaders);
	}

	const booking = normalizeCreateBooking(body);
	// Always a new booking. This used to look for an abandoned lead with the
	// same phone number or email and carry on from it, but those are not
	// secrets: anyone naming somebody's number would be handed that person's
	// lead, and with it the link to their answers and photos. The quote form
	// finishes its own lead by id (PUT with onlyIfLead), so all this costs is an
	// abandoned lead left in the list now and then, which the daily purge clears.
	//
	// The route is open to anyone, but only the website's own server, which
	// sends the admin PIN, is told the details link: the link is a key, and the
	// website is what emails it to the customer.
	const trusted = isAdminRequest(request, env);
	// A details link belongs to an enquiry. A lead (someone who has not finished
	// the quote form) has none, and is given one when it becomes an enquiry.
	const isEnquiry = booking.status !== "Abandoned";

	// A booking gets a customer record of its own. Joining the record that
	// already has the same email would let anyone who knows a customer's address
	// change the name and phone the office holds for them, and through a lead
	// the email too, which is where "Resend emails" sends the details link.
	// Only a booking the office itself is adding (reuseCustomer, which the
	// website sets for a signed-in admin) joins an existing record.
	const reuse = trusted && isEnquiry && body.reuseCustomer === true;
	const customer = reuse ? await findOrCreateCustomer(booking, env) : await createCustomer(booking, env);
	const bookingId = crypto.randomUUID();

	await env.DB.prepare(
		`INSERT INTO Booking (
			id, customerId, moveType, fromPostcode, toPostcode, moveDate,
			bedrooms, extras, status, price, detailsToken, leadKey
		) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)`,
	)
		.bind(
			bookingId,
			customer.id,
			booking.moveType,
			booking.fromPostcode,
			booking.toPostcode,
			booking.moveDate,
			booking.bedrooms,
			JSON.stringify(booking.extras),
			booking.status,
			booking.price,
			isEnquiry ? createToken() : null,
			cleanLeadKey(body.leadKey),
		)
		.run();

	await logActivity(env, {
		action: booking.status === "Abandoned" ? "lead.abandoned_captured" : "booking.created",
		details: JSON.stringify({
			summary:
				booking.status === "Abandoned"
					? `Abandoned lead captured for ${booking.fullName}`
					: `New booking from ${booking.fullName}`,
			customer: { fullName: booking.fullName, phone: booking.phone, email: booking.email },
			moveType: booking.moveType,
			route: `${booking.fromPostcode} to ${booking.toPostcode}`,
		}),
		entityId: bookingId,
		actor: "api",
	});

	const row = await findBooking(bookingId, env);
	return json({ data: toBooking(row as BookingRow, trusted) }, 201, corsHeaders);
}

async function updateBooking(id: string, request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const existing = await findBooking(id, env);

	if (!existing) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	const body = await readJson<UpdateBookingRequest>(request, MAX_ADMIN_BODY_BYTES);
	const validation = validateUpdateBooking(body);

	if (!validation.valid) {
		return json({ error: { message: "Invalid booking data", details: validation.errors } }, 400, corsHeaders);
	}

	// The office edits any booking. The website's public quote form also calls
	// this, for whoever is filling it in, with an id the browser holds; it sets
	// onlyIfLead, which limits it to a booking that is still an untouched lead.
	// An id that has reached the wrong hands can then never change a real
	// enquiry, reopen one, or be given the link to one that has details on it.
	const onlyIfLead = body.onlyIfLead === true;
	const becomesEnquiry =
		existing.status === "Abandoned" && body.status !== undefined && body.status !== "Abandoned";

	if (!onlyIfLead) {
		await updateBookingFields(id, body, env);
		await updateCustomerFields(existing.customerId, body, env);
	}

	// A lead completed through the public form gets its link now, new.
	const changed = !onlyIfLead || (await updateLead(existing, body, env, becomesEnquiry ? createToken() : undefined));

	if (!changed) {
		// The quote form pressing submit a second time because the answer to the
		// first never reached it: the lead is already an enquiry. The browser
		// that made the lead proves it is the same one with the lead's key, and
		// is given the enquiry as it stands, link included, rather than being
		// refused and making a second enquiry. Nothing is changed, and
		// alreadyFinished tells the website not to send its emails a second time.
		const leadKey = cleanLeadKey(body.leadKey);
		const finished = await findBooking(id, env);
		if (leadKey && finished && finished.leadKey === leadKey && finished.status !== "Abandoned" && finished.detailsToken) {
			return json({ data: { ...toBooking(finished, true), alreadyFinished: true } }, 200, corsHeaders);
		}

		return json({ error: { message: "Booking is no longer a lead" } }, 409, corsHeaders);
	}

	const updated = (await findBooking(id, env)) as BookingRow;
	// An enquiry from before details links existed is given one when the office
	// next saves it. A lead is left without.
	if (updated.status !== "Abandoned" && !updated.detailsToken) {
		updated.detailsToken = await ensureDetailsToken(id, env);
	}

	await logActivity(env, {
		action: "booking.updated",
		details: JSON.stringify({ summary: "Booking updated via API" }),
		entityId: id,
		actor: "api",
	});

	return json({ data: toBooking(updated, true) }, 200, corsHeaders);
}

async function deleteBooking(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	// The customer's photos and documents go before the booking does. Once the
	// booking row is deleted there is nothing left to find them by.
	await deleteBookingFiles([id], env);

	const owner = await env.DB.prepare("SELECT customerId FROM Booking WHERE id = ?1").bind(id).first<{ customerId: string }>();
	const result = await env.DB.prepare("DELETE FROM Booking WHERE id = ?1").bind(id).run();

	if ((result.meta.changes ?? 0) === 0) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	await deleteBookingObjects([id], env);

	// The customer's name, phone and email go with their last booking. The
	// customers list only shows people with a booking, so a record left behind
	// would be personal data nobody could see or delete.
	if (owner) {
		await env.DB.prepare(
			"DELETE FROM Customer WHERE id = ?1 AND NOT EXISTS (SELECT 1 FROM Booking WHERE customerId = ?1)",
		)
			.bind(owner.customerId)
			.run();
	}

	await logActivity(env, {
		action: "booking.deleted",
		details: JSON.stringify({ summary: "Booking deleted via API" }),
		entityId: id,
		actor: "api",
	});

	return new Response(null, { status: 204, headers: corsHeaders });
}

// Runs on the daily cron trigger: remove abandoned leads that have been sitting
// untouched past the retention window, then drop any customer rows they leave
// behind with no remaining bookings.
async function purgeStaleAbandonedLeads(env: Env): Promise<{ leads: number; customers: number }> {
	const { results: stale } = await env.DB.prepare(
		`SELECT id, customerId FROM Booking
		 WHERE status = 'Abandoned' AND createdAt < datetime('now', ?1)`,
	)
		.bind(`-${PURGE_ABANDONED_AFTER_DAYS} days`)
		.all<{ id: string; customerId: string }>();

	if (stale.length === 0) {
		return { leads: 0, customers: 0 };
	}

	const ids = stale.map((row) => row.id);
	const customerIds = [...new Set(stale.map((row) => row.customerId))];

	await deleteBookingFiles(ids, env);

	// Delete exactly the rows we selected (by id) so the orphan check below stays
	// consistent regardless of the clock advancing mid-run. Chunked to stay within
	// D1's bound-parameter limit.
	for (let i = 0; i < ids.length; i += 50) {
		const chunk = ids.slice(i, i + 50);
		const placeholders = chunk.map((_, index) => `?${index + 1}`).join(", ");
		await env.DB.prepare(`DELETE FROM Booking WHERE id IN (${placeholders})`)
			.bind(...chunk)
			.run();
	}

	await deleteBookingObjects(ids, env);

	// A customer row is created per lead (placeholder-email rows are unique), so
	// tidy up any that no longer have a booking attached.
	let customers = 0;
	for (const customerId of customerIds) {
		const remaining = await env.DB.prepare("SELECT COUNT(*) AS count FROM Booking WHERE customerId = ?1")
			.bind(customerId)
			.first<{ count: number }>();

		if ((remaining?.count ?? 0) === 0) {
			await env.DB.prepare("DELETE FROM Customer WHERE id = ?1").bind(customerId).run();
			customers += 1;
		}
	}

	await logActivity(env, {
		action: "lead.abandoned_purged",
		details: JSON.stringify({
			summary: `Purged ${ids.length} abandoned lead(s) older than ${PURGE_ABANDONED_AFTER_DAYS} days`,
			leads: ids.length,
			customers,
		}),
		entityId: "system",
		actor: "cron",
	});

	return { leads: ids.length, customers };
}

async function listCustomers(env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const { results } = await env.DB.prepare(
		`SELECT
			c.id, c.fullName, c.phone, c.email, c.createdAt, c.updatedAt,
			SUM(CASE WHEN b.status <> 'Abandoned' THEN 1 ELSE 0 END) AS bookingCount
		FROM Customer c
		LEFT JOIN Booking b ON b.customerId = c.id
		GROUP BY c.id, c.fullName, c.phone, c.email, c.createdAt, c.updatedAt
		-- Hide partial/abandoned leads: only surface customers who have at least
		-- one real (non-Abandoned) booking.
		HAVING bookingCount > 0
		ORDER BY c.createdAt DESC`,
	).all<CustomerRow>();

	return json({ data: results }, 200, corsHeaders);
}

async function deleteCustomer(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const customer = await env.DB.prepare("SELECT fullName, phone, email FROM Customer WHERE id = ?1")
		.bind(id)
		.first<{ fullName: string; phone: string; email: string }>();

	if (!customer) {
		return json({ error: { message: "Customer not found" } }, 404, corsHeaders);
	}

	const { results: bookings } = await env.DB.prepare("SELECT id FROM Booking WHERE customerId = ?1")
		.bind(id)
		.all<{ id: string }>();

	const bookingIds = bookings.map((booking) => booking.id);

	await deleteBookingFiles(bookingIds, env);
	await env.DB.prepare("DELETE FROM Booking WHERE customerId = ?1").bind(id).run();
	await deleteBookingObjects(bookingIds, env);
	const result = await env.DB.prepare("DELETE FROM Customer WHERE id = ?1").bind(id).run();

	if ((result.meta.changes ?? 0) === 0) {
		return json({ error: { message: "Customer not found" } }, 404, corsHeaders);
	}

	await logActivity(env, {
		action: "customer.deleted",
		details: JSON.stringify({
			summary: `Customer "${customer.fullName}" deleted`,
			customer,
		}),
		entityId: id,
		actor: "api",
	});

	return new Response(null, { status: 204, headers: corsHeaders });
}

async function listActivity(env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const { results } = await env.DB.prepare(
		`SELECT id, action, details, entityId, actor, createdAt
		FROM ActivityLog
		ORDER BY createdAt DESC
		LIMIT 200`,
	).all<ActivityLogRow>();

	return json({ data: results }, 200, corsHeaders);
}

async function createActivity(request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const body = await readJson<CreateActivityRequest>(request, MAX_ADMIN_BODY_BYTES);
	const validation = validateCreateActivity(body);

	if (!validation.valid) {
		return json({ error: { message: "Invalid activity data", details: validation.errors } }, 400, corsHeaders);
	}

	const entry = {
		action: body.action.trim(),
		details: body.details ?? "",
		entityId: body.entityId ?? "",
		actor: body.actor ?? "api",
	};

	await logActivity(env, entry);

	return json({ data: entry }, 201, corsHeaders);
}

async function getSettings(env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	await env.DB.prepare("INSERT OR IGNORE INTO SiteSettings (id) VALUES (1)").run();
	const row = await env.DB.prepare(
		`SELECT id, logoUrl, footerLogoUrl, faviconUrl, phone, email, address,
			facebook, instagram, twitter, linkedin, youtube, tiktok, whatsapp, showPhone, updatedAt
		 FROM SiteSettings WHERE id = 1`,
	).first<SiteSettingsRow>();

	return json({ data: row ?? null }, 200, corsHeaders);
}

async function updateSettings(request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const body = await readJson<SiteSettingsUpdate>(request, MAX_SETTINGS_BODY_BYTES);

	if (!isRecord(body)) {
		return json({ error: { message: "Body must be a JSON object" } }, 400, corsHeaders);
	}

	const fields: { column: SiteSettingsField; value: string | null }[] = [];
	for (const key of SITE_SETTINGS_FIELDS) {
		if (!(key in body)) continue;
		const raw = (body as Record<string, unknown>)[key];
		if (raw === null) {
			fields.push({ column: key, value: null });
			continue;
		}
		if (typeof raw !== "string") {
			return json({ error: { message: `${key} must be a string or null` } }, 400, corsHeaders);
		}
		const trimmed = raw.trim();
		fields.push({ column: key, value: trimmed.length === 0 ? null : trimmed });
	}

	await env.DB.prepare("INSERT OR IGNORE INTO SiteSettings (id) VALUES (1)").run();

	if (fields.length > 0) {
		const assignments = fields.map((field, index) => `${field.column} = ?${index + 1}`);
		const values = fields.map((field) => field.value);
		await env.DB.prepare(
			`UPDATE SiteSettings
			 SET ${assignments.join(", ")}, updatedAt = datetime('now')
			 WHERE id = 1`,
		)
			.bind(...values)
			.run();
	}

	const row = await env.DB.prepare(
		`SELECT id, logoUrl, footerLogoUrl, faviconUrl, phone, email, address,
			facebook, instagram, twitter, linkedin, youtube, tiktok, whatsapp, showPhone, updatedAt
		 FROM SiteSettings WHERE id = 1`,
	).first<SiteSettingsRow>();

	await logActivity(env, {
		action: "settings.updated",
		details: JSON.stringify({ summary: "Site settings updated", fields: fields.map((f) => f.column) }),
		entityId: "1",
		actor: "api",
	});

	return json({ data: row ?? null }, 200, corsHeaders);
}

async function getMoveDetails(token: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const booking = await findBookingByDetailsToken(token, env);

	if (!booking) {
		return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
	}

	const files = await listBookingFiles(booking.id, env);

	// The link is all a caller has to show, so this returns only what belongs to
	// this one enquiry. The customer's name, phone and email are left out: they
	// are held on a customer record that other bookings share and can change,
	// so they are not this link's to show. The booking id, prices and the
	// office's notes stay out of it as well.
	return json(
		{
			data: {
				enquiry: {
					moveType: booking.moveType,
					fromPostcode: booking.fromPostcode,
					toPostcode: booking.toPostcode,
					moveDate: booking.moveDate,
				},
				...currentDetails(booking),
				files: files.map(toPublicFile),
			},
		},
		200,
		corsHeaders,
	);
}

// Saves the answers as the customer types. Allowed after the details have been
// sent as well, so a customer can come back and correct something.
//
// Each save replaces the whole set of answers, so it says which version of
// them it started from. If they have been changed since by anything other
// than this same page's earlier saves, the save is turned away with the
// current answers, and the form puts the two together. Without that, a page
// left open on a second device would overwrite newer answers with old ones.
async function saveMoveDetails(token: string, request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const booking = await findBookingByDetailsToken(token, env);

	if (!booking) {
		return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
	}

	const body = await readJson<Record<string, unknown>>(request, MAX_DETAILS_BODY_BYTES);

	// A body with no details in it would otherwise be sanitised into a blank set
	// of answers and saved over the real ones.
	if (!isRecord(body) || !isRecord(body.details)) {
		return json({ error: { message: "details must be an object" } }, 400, corsHeaders);
	}

	const basis = readSaveBasis(body);

	if (isStaleBasis(basis, booking)) {
		return detailsConflict(booking, corsHeaders);
	}

	const detailsJson = JSON.stringify(sanitizeDetails(body.details));

	// The same answers again are not a change, so they leave the version and the
	// last-saved time where they are: that time moving is what tells the office,
	// and a second send, that something is different.
	if (booking.details === detailsJson) {
		return json({ data: { updatedAt: booking.detailsUpdatedAt, version: booking.detailsVersion } }, 200, corsHeaders);
	}

	// Only written if the version is still the one checked above, so a save that
	// arrived in between is not overwritten either.
	const saved = await env.DB.prepare(
		`UPDATE Booking
		 SET details = ?1, detailsVersion = detailsVersion + 1, detailsSaveId = ?3, detailsUpdatedAt = ${DETAILS_SAVED_NOW}
		 WHERE id = ?2 AND detailsVersion = ?4
		 RETURNING detailsUpdatedAt, detailsVersion`,
	)
		.bind(detailsJson, booking.id, basis.saveId, booking.detailsVersion)
		.first<{ detailsUpdatedAt: string; detailsVersion: number }>();

	if (!saved) {
		const latest = await findBookingByDetailsToken(token, env);
		if (!latest) return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
		return detailsConflict(latest, corsHeaders);
	}

	return json({ data: { updatedAt: saved.detailsUpdatedAt, version: saved.detailsVersion } }, 200, corsHeaders);
}

async function uploadMoveDetailsFile(
	token: string,
	request: Request,
	env: Env,
	ctx: ExecutionContext,
	corsHeaders?: HeadersInit,
): Promise<Response> {
	const booking = await findBookingByDetailsToken(token, env);

	if (!booking) {
		return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
	}

	const refuse = (outcome: "full" | "paused") =>
		outcome === "full"
			? json({ error: { message: `This enquiry already has ${MAX_FILES_PER_BOOKING} files` } }, 409, corsHeaders)
			: json({ error: { message: "Uploads are paused for the moment. Please try again later." } }, 503, corsHeaders);

	// The form gives each file an id of its own and sends it with every attempt,
	// in the address as well as in the body. A phone can lose its connection
	// after the file has arrived and before the reply gets back; the form then
	// tries again, and the id is how that second attempt is recognised and
	// answered with the file already stored. It is looked for here, before the
	// limits: the repeat of an enquiry's twelfth file must not be told the
	// enquiry is full, and none of a repeat needs to be read.
	const hintedId = cleanClientId(new URL(request.url).searchParams.get("clientId"));

	// A file the customer has removed never comes back: not from a copy still
	// waiting on another device or tab, nor from a retry that went out before
	// the removal. The form drops the file when it is told so.
	if (hintedId && (await wasRemoved(booking.id, hintedId, env))) return fileRemoved(corsHeaders);

	const hinted = hintedId ? await findFileByClientId(booking.id, hintedId, env) : null;

	if (hinted) {
		return json({ data: toPublicFile(hinted) }, 200, corsHeaders);
	}

	// An early answer for an enquiry that is already full, or a day that is,
	// before the upload is read. The insert in storeFile() is what actually
	// holds both limits.
	const room = await env.DB.prepare(
		`SELECT
			(SELECT COUNT(*) FROM BookingFile WHERE bookingId = ?1) AS forBooking,
			(SELECT COUNT(*) FROM BookingFile WHERE createdAt > datetime('now', '-1 day')) AS filesToday,
			(SELECT COALESCE(SUM(size), 0) FROM BookingFile WHERE createdAt > datetime('now', '-1 day')) AS bytesToday`,
	)
		.bind(booking.id)
		.first<{ forBooking: number; filesToday: number; bytesToday: number }>();

	if ((room?.forBooking ?? 0) >= MAX_FILES_PER_BOOKING) return refuse("full");
	if ((room?.filesToday ?? 0) >= MAX_UPLOAD_FILES_PER_DAY || (room?.bytesToday ?? 0) >= MAX_UPLOAD_BYTES_PER_DAY) {
		return refuse("paused");
	}

	const form = await readFormData(request, MAX_UPLOAD_BODY_BYTES);
	const file = form.get("file");

	if (!(file instanceof File)) {
		return json({ error: { message: "A file is required" } }, 400, corsHeaders);
	}

	if (file.size === 0) {
		return json({ error: { message: "That file is empty" } }, 400, corsHeaders);
	}

	// file.size is the number of bytes that arrived, not a figure the sender
	// supplied.
	if (file.size > MAX_FILE_BYTES) {
		return json({ error: { message: "That file is larger than 15 MB" } }, 413, corsHeaders);
	}

	const name = cleanFileName(file.name);
	const type = acceptedFileType(name, file.type);

	if (!type) {
		return json({ error: { message: "That file type is not accepted" } }, 415, corsHeaders);
	}

	// A client that sent the id only in the body (the form sends both).
	const clientId = cleanClientId(form.get("clientId")) ?? hintedId;
	if (clientId && clientId !== hintedId && (await wasRemoved(booking.id, clientId, env))) return fileRemoved(corsHeaders);
	const already = clientId && clientId !== hintedId ? await findFileByClientId(booking.id, clientId, env) : null;

	if (already) {
		return json({ data: toPublicFile(already) }, 200, corsHeaders);
	}

	// Whether a file is an image is decided by its name alone, so the form's
	// own "image" field is not read: a document cannot be passed off as a photo
	// to get a thumbnail stored or to be shown inline later.
	const id = crypto.randomUUID();
	const record: NewBookingFile = {
		id,
		bookingId: booking.id,
		clientId,
		name,
		contentType: type.contentType,
		size: file.size,
		isImage: type.isImage,
		thumb: type.isImage ? cleanThumb(form.get("thumb")) : null,
		r2Key: `move-details/${booking.id}/${id}`,
	};

	// Customers upload from phones, and a phone can drop its connection the
	// moment the upload completes. waitUntil() lets the two steps of storing a
	// file finish together even then, rather than stopping between them.
	const stored = storeFile(record, file, env);
	ctx.waitUntil(stored.catch(() => undefined));
	const outcome = await stored;

	if (outcome === "repeat") {
		const winner = clientId ? await findFileByClientId(booking.id, clientId, env) : null;
		if (winner) return json({ data: toPublicFile(winner) }, 200, corsHeaders);
		throw new Error("A repeated upload could not be matched to its file");
	}

	if (outcome === "removed") return fileRemoved(corsHeaders);
	if (outcome !== "stored") return refuse(outcome);

	return json(
		{
			data: {
				id: record.id,
				clientId: record.clientId,
				name: record.name,
				isImage: record.isImage,
				size: record.size,
				thumb: record.thumb,
			},
		},
		201,
		corsHeaders,
	);
}

async function deleteMoveDetailsFile(token: string, fileId: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const booking = await findBookingByDetailsToken(token, env);

	if (!booking) {
		return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
	}

	// The name is noted as removed before anything is looked up. An upload of
	// the same file that is still landing is then refused when it gets to its
	// insert (storeFile), and one that got there first is found below, so a
	// file removed at any moment of its upload is gone either way. The note is
	// kept per enquiry, so it cannot touch another customer's files.
	const namedId = cleanClientId(fileId);
	if (namedId) await recordRemoved(booking.id, namedId, env);

	// Matching on the booking as well as the file is what stops one customer's
	// link removing another customer's file. The file may be named by the id the
	// form gave it as well as by its own: a form that never heard back from an
	// upload knows no other.
	const file = await env.DB.prepare(
		"SELECT id, clientId, r2Key FROM BookingFile WHERE bookingId = ?2 AND (id = ?1 OR clientId = ?1)",
	)
		.bind(fileId, booking.id)
		.first<{ id: string; clientId: string | null; r2Key: string }>();

	if (!file) {
		return json({ error: { message: "File not found" } }, 404, corsHeaders);
	}

	// Named by its own id: the form's id for it is noted too.
	if (file.clientId && file.clientId !== namedId) await recordRemoved(booking.id, file.clientId, env);

	// The object goes first. If that fails the row is still there, so the file
	// stays listed and the customer can remove it again.
	await env.UPLOADS.delete(file.r2Key);
	await env.DB.prepare("DELETE FROM FileLink WHERE fileId = ?1").bind(file.id).run();
	await env.DB.prepare("DELETE FROM BookingFile WHERE id = ?1 AND bookingId = ?2").bind(file.id, booking.id).run();
	await touchDetails(booking.id, env);

	return new Response(null, { status: 204, headers: corsHeaders });
}

async function submitMoveDetails(token: string, request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const booking = await findBookingByDetailsToken(token, env);

	if (!booking) {
		return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
	}

	const body = await readJson<Record<string, unknown>>(request, MAX_DETAILS_BODY_BYTES);

	// The same check as a save: answers sent from a page that has fallen behind
	// are turned away, so the office is never emailed an old copy.
	if (isRecord(body) && isStaleBasis(readSaveBasis(body), booking)) {
		return detailsConflict(booking, corsHeaders);
	}

	const details = sanitizeDetails(isRecord(body) ? body.details : undefined);
	const files = await listBookingFiles(booking.id, env);
	const validation = validateMoveDetails(details, files.length);

	if (!validation.valid) {
		return json({ error: { message: "Move details are incomplete", details: validation.errors } }, 400, corsHeaders);
	}

	const detailsJson = JSON.stringify(details);
	const resubmitted = booking.detailsSubmittedAt !== null;
	const newAnswers = booking.details !== detailsJson;
	// Sent before, with no answer saved and no file added or removed since (any
	// of those moves the last-saved time on), and the same answers again now:
	// the office already has exactly this, and nothing new is recorded.
	const changed = !resubmitted || booking.detailsUpdatedAt !== booking.detailsSubmittedAt || newAnswers;
	let submittedAt = booking.detailsSubmittedAt;
	let version = booking.detailsVersion;

	// What has been recorded for this enquiry lately: sends with something new in
	// them, and the emails the website managed to send the office about them.
	const recent = await env.DB.prepare(
		`SELECT
			COALESCE(SUM(CASE WHEN action = 'booking.details_submitted' AND createdAt > datetime('now', '-1 day') THEN 1 ELSE 0 END), 0) AS sendsToday,
			COALESCE(SUM(CASE WHEN action = 'booking.details_notified' AND createdAt > datetime('now', '-1 day') THEN 1 ELSE 0 END), 0) AS emailsToday,
			MAX(CASE WHEN action = 'booking.details_notified' THEN createdAt END) AS lastEmail
		 FROM ActivityLog
		 WHERE entityId = ?1 AND action IN ('booking.details_submitted', 'booking.details_notified')`,
	)
		.bind(booking.id)
		.first<{ sendsToday: number; emailsToday: number; lastEmail: string | null }>();

	// Refused rather than recorded without an email: details are never marked
	// as sent unless the office is going to be told.
	if (changed && (recent?.sendsToday ?? 0) >= MAX_DETAILS_SENDS_PER_DAY) {
		return json({ error: { message: "These details have been sent too many times today" } }, 429, corsHeaders);
	}

	if (changed) {
		const saveId = isRecord(body) ? readSaveBasis(body).saveId : null;
		const saved = await env.DB.prepare(
			`UPDATE Booking
			 SET details = ?1,
			     detailsVersion = detailsVersion + ?3,
			     detailsSaveId = CASE WHEN ?3 = 1 THEN ?4 ELSE detailsSaveId END,
			     detailsUpdatedAt = datetime('now'),
			     detailsSubmittedAt = datetime('now')
			 WHERE id = ?2 AND detailsVersion = ?5
			 RETURNING detailsSubmittedAt, detailsVersion`,
		)
			.bind(detailsJson, booking.id, newAnswers ? 1 : 0, saveId, booking.detailsVersion)
			.first<{ detailsSubmittedAt: string; detailsVersion: number }>();

		if (!saved) {
			const latest = await findBookingByDetailsToken(token, env);
			if (!latest) return json({ error: { message: DETAILS_LINK_NOT_FOUND } }, 404, corsHeaders);
			return detailsConflict(latest, corsHeaders);
		}

		submittedAt = saved.detailsSubmittedAt;
		version = saved.detailsVersion;

		// The entry names the customer and the booking. The token is a secret and
		// is never written to the log. The details are already recorded as sent by
		// now, so a failure to write the entry must not turn the send into an error.
		try {
			await logActivity(env, {
				action: "booking.details_submitted",
				details: JSON.stringify({
					summary: resubmitted
						? `Move details sent again by ${booking.customerFullName}`
						: `Move details sent by ${booking.customerFullName}`,
					customer: { fullName: booking.customerFullName, phone: booking.customerPhone, email: booking.customerEmail },
					moveType: booking.moveType,
					route: `${booking.fromPostcode} to ${booking.toPostcode}`,
					files: files.length,
				}),
				entityId: booking.id,
				actor: "customer",
			});
		} catch (error) {
			console.error("Could not record that move details were sent", error);
		}
	}

	// Whether the website should email the office now. It records each email it
	// manages to send as a "booking.details_notified" entry. The office is due
	// one for every send with something new in it, and for a repeat of a send it
	// was never emailed about (the first try failed, or never got its answer).
	const emailedSinceSent = recent?.lastEmail != null && submittedAt !== null && recent.lastEmail >= submittedAt;
	// Only the repeat is held to the day's limit on emails. A send with something
	// new has already passed the limit on sends above, and once it is marked as
	// sent the office must be told.
	const notify = changed || (!emailedSinceSent && (recent?.emailsToday ?? 0) < MAX_DETAILS_SENDS_PER_DAY);

	return json(
		{
			data: {
				submittedAt,
				version,
				resubmitted,
				changed,
				notify,
				booking: {
					id: booking.id,
					moveType: booking.moveType,
					fromPostcode: booking.fromPostcode,
					toPostcode: booking.toPostcode,
					moveDate: booking.moveDate,
					customer: {
						fullName: booking.customerFullName,
						phone: booking.customerPhone,
						email: booking.customerEmail,
					},
				},
				details,
				files: files.map((file) => ({ id: file.id, name: file.name, isImage: file.isImage === 1, size: file.size })),
			},
		},
		200,
		corsHeaders,
	);
}

async function getBookingMoveDetails(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const booking = await env.DB.prepare(
		"SELECT status, detailsToken, details, detailsUpdatedAt, detailsSubmittedAt FROM Booking WHERE id = ?1",
	)
		.bind(id)
		.first<{
			status: string;
			detailsToken: string | null;
			details: string | null;
			detailsUpdatedAt: string | null;
			detailsSubmittedAt: string | null;
		}>();

	if (!booking) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	// An enquiry made before move details existed has no link yet. Opening it
	// here is what gives it one, so the office can send it to the customer. A
	// lead is left without (token is null): it gets its link when it becomes an
	// enquiry, and giving it one now would stop the quote form picking it up.
	const token =
		booking.detailsToken ?? (booking.status === "Abandoned" ? null : await ensureDetailsToken(id, env));

	const files = await listBookingFiles(id, env);

	return json(
		{
			data: {
				token,
				details: parseDetails(booking.details),
				updatedAt: booking.detailsUpdatedAt,
				submittedAt: booking.detailsSubmittedAt,
				files: files.map((file) => ({
					id: file.id,
					name: file.name,
					isImage: file.isImage === 1,
					size: file.size,
					contentType: file.contentType,
					thumb: file.thumb,
					createdAt: file.createdAt,
				})),
			},
		},
		200,
		corsHeaders,
	);
}

// The bucket is private, so the admin opens a file through a link that works
// for a few minutes and is then useless to anyone it was shared with or who
// finds it in a browser history.
async function createFileLink(fileId: string, request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const file = await env.DB.prepare("SELECT id FROM BookingFile WHERE id = ?1").bind(fileId).first<{ id: string }>();

	if (!file) {
		return json({ error: { message: "File not found" } }, 404, corsHeaders);
	}

	const token = createToken();
	const link = await env.DB.prepare(
		`INSERT INTO FileLink (token, fileId, expiresAt)
		 VALUES (?1, ?2, datetime('now', ?3))
		 RETURNING expiresAt`,
	)
		.bind(token, file.id, `+${FILE_LINK_MINUTES} minutes`)
		.first<{ expiresAt: string }>();

	if (!link) {
		throw new Error("File link was not created");
	}

	return json(
		{ data: { url: `${new URL(request.url).origin}/file/${token}`, expiresAt: link.expiresAt } },
		201,
		corsHeaders,
	);
}

async function serveFile(token: string, env: Env): Promise<Response> {
	// One answer for a link that never existed, one that has expired and one
	// whose file has gone, so the response gives nothing away about which.
	const notFound = () => json({ error: { message: "File not found" } }, 404);

	if (!TOKEN_PATTERN.test(token)) return notFound();

	const file = await env.DB.prepare(
		`SELECT f.name, f.contentType, f.isImage, f.r2Key
		 FROM FileLink l
		 INNER JOIN BookingFile f ON f.id = l.fileId
		 WHERE l.token = ?1 AND l.expiresAt > datetime('now')`,
	)
		.bind(token)
		.first<{ name: string; contentType: string; isImage: number; r2Key: string }>();

	if (!file) return notFound();

	const object = await env.UPLOADS.get(file.r2Key);

	if (!object) return notFound();

	// A customer chose what is in this file. It is sent with the type fixed at
	// upload, the browser is told not to guess another, and the sandbox policy
	// stops it running anything or reaching this origin even if it is opened as
	// a page. Only images are shown in the browser; everything else downloads.
	return new Response(object.body, {
		headers: {
			"Content-Type": file.contentType,
			"Content-Disposition": contentDisposition(file.name, file.isImage === 1),
			"X-Content-Type-Options": "nosniff",
			"Content-Security-Policy": "default-src 'none'; sandbox",
			"Cache-Control": "private, no-store",
			"Referrer-Policy": "no-referrer",
		},
	});
}

async function findBooking(id: string, env: Env): Promise<BookingRow | null> {
	return env.DB.prepare(
		`SELECT
			b.id, b.customerId, b.moveType, b.fromPostcode, b.toPostcode, b.moveDate,
			b.bedrooms, b.extras, b.status, b.price, b.jobCost, b.expenses, b.profit, b.notes,
			b.createdAt, b.updatedAt,
			b.detailsToken, b.detailsUpdatedAt, b.detailsSubmittedAt, b.leadKey,
			(SELECT COUNT(*) FROM BookingFile f WHERE f.bookingId = b.id) AS fileCount,
			c.fullName AS customerFullName, c.phone AS customerPhone, c.email AS customerEmail
		FROM Booking b
		INNER JOIN Customer c ON c.id = b.customerId
		WHERE b.id = ?1`,
	)
		.bind(id)
		.first<BookingRow>();
}

async function findBookingByDetailsToken(token: string, env: Env): Promise<DetailsBookingRow | null> {
	// Anything that is not the shape of a token cannot be one, so it is turned
	// away without a query.
	if (!TOKEN_PATTERN.test(token)) return null;

	return env.DB.prepare(
		`SELECT
			b.id, b.moveType, b.fromPostcode, b.toPostcode, b.moveDate,
			b.details, b.detailsVersion, b.detailsSaveId, b.detailsUpdatedAt, b.detailsSubmittedAt,
			c.fullName AS customerFullName, c.phone AS customerPhone, c.email AS customerEmail
		FROM Booking b
		INNER JOIN Customer c ON c.id = b.customerId
		WHERE b.detailsToken = ?1`,
	)
		.bind(token)
		.first<DetailsBookingRow>();
}

// A booking made before move details existed has no token. This gives it one
// the first time it is needed and returns it, or null for an unknown booking.
async function ensureDetailsToken(bookingId: string, env: Env): Promise<string | null> {
	const booking = await env.DB.prepare("SELECT detailsToken FROM Booking WHERE id = ?1")
		.bind(bookingId)
		.first<{ detailsToken: string | null }>();

	if (!booking) return null;
	if (booking.detailsToken) return booking.detailsToken;

	// Only an empty slot is filled. If two requests get here together the second
	// leaves the first one's token alone, and both read the same one back, so a
	// link that has already been sent out is never replaced.
	await env.DB.prepare("UPDATE Booking SET detailsToken = ?1 WHERE id = ?2 AND detailsToken IS NULL")
		.bind(createToken(), bookingId)
		.run();

	const updated = await env.DB.prepare("SELECT detailsToken FROM Booking WHERE id = ?1")
		.bind(bookingId)
		.first<{ detailsToken: string | null }>();

	return updated?.detailsToken ?? null;
}

async function listBookingFiles(bookingId: string, env: Env): Promise<BookingFileRow[]> {
	// rowid gives the order the files were added in; createdAt only counts in
	// whole seconds, and several photos are often uploaded within one.
	const { results } = await env.DB.prepare(
		`SELECT id, clientId, name, contentType, size, isImage, thumb, createdAt
		 FROM BookingFile
		 WHERE bookingId = ?1
		 ORDER BY rowid`,
	)
		.bind(bookingId)
		.all<BookingFileRow>();

	return results;
}

async function findFileByClientId(bookingId: string, clientId: string, env: Env): Promise<BookingFileRow | null> {
	return env.DB.prepare(
		`SELECT id, clientId, name, contentType, size, isImage, thumb, createdAt
		 FROM BookingFile
		 WHERE bookingId = ?1 AND clientId = ?2`,
	)
		.bind(bookingId, clientId)
		.first<BookingFileRow>();
}

// A file as the customer's own page is told about it.
function toPublicFile(file: BookingFileRow) {
	return {
		id: file.id,
		clientId: file.clientId,
		name: file.name,
		isImage: file.isImage === 1,
		size: file.size,
		thumb: file.thumb,
	};
}

// The answers as they stand, with what a page needs to tell whether its own
// copy is still based on them: the version, and the id of the save that made it.
function currentDetails(booking: DetailsBookingRow) {
	return {
		details: parseDetails(booking.details),
		version: booking.detailsVersion,
		saveId: booking.detailsSaveId,
		updatedAt: booking.detailsUpdatedAt,
		submittedAt: booking.detailsSubmittedAt,
	};
}

interface SaveBasis {
	baseVersion: number | null;
	saveId: string | null;
	sentIds: string[];
}

// What a save says about where its answers came from: the version the page
// last saw, an id for this save, and the ids of the saves the same page made
// before it and may not have heard back from.
function readSaveBasis(body: Record<string, unknown>): SaveBasis {
	const { baseVersion, saveId, sentIds } = body;

	return {
		baseVersion: typeof baseVersion === "number" && Number.isInteger(baseVersion) && baseVersion >= 0 ? baseVersion : null,
		saveId: typeof saveId === "string" && SAVE_ID_PATTERN.test(saveId) ? saveId : null,
		sentIds: Array.isArray(sentIds)
			? sentIds.filter((id): id is string => typeof id === "string" && SAVE_ID_PATTERN.test(id)).slice(-MAX_SENT_IDS)
			: [],
	};
}

// A page's answers are out of date when the stored version has moved on from
// the one it started with, unless the save that moved it was one of the page's
// own (a save whose reply never arrived, or two of its saves overlapping). A
// caller that names no version is not checked.
function isStaleBasis(basis: SaveBasis, booking: DetailsBookingRow): boolean {
	if (basis.baseVersion === null || basis.baseVersion === booking.detailsVersion) return false;
	return booking.detailsSaveId === null || !basis.sentIds.includes(booking.detailsSaveId);
}

// 409 with the answers as they now stand, for the form to merge with its own.
function detailsConflict(booking: DetailsBookingRow, corsHeaders?: HeadersInit): Response {
	const headers = new Headers(corsHeaders);
	headers.set("Content-Type", "application/json; charset=utf-8");
	headers.set("Cache-Control", "no-store");

	return Response.json(
		{ error: { message: DETAILS_CHANGED_ELSEWHERE }, data: currentDetails(booking) },
		{ status: 409, headers },
	);
}

// Stores an uploaded file: the object in R2, then its row. In that order a row
// never points at an object that is not there, so everything the office is
// shown can be opened. Anything but "stored" means nothing was kept: the
// booking has its full number of files, the day's brake is on, or the same
// file (by the form's id for it) arrived twice at once and the other won.
async function storeFile(record: NewBookingFile, file: File, env: Env): Promise<"stored" | "full" | "paused" | "repeat" | "removed"> {
	await env.UPLOADS.put(record.r2Key, file, { httpMetadata: { contentType: record.contentType } });

	let inserted = false;
	let repeat = false;
	try {
		// The limits and the insert are one statement, so uploads that arrive
		// together cannot all take the last place, or all slip under the brake.
		const result = await env.DB.prepare(
			`INSERT INTO BookingFile (id, bookingId, clientId, name, contentType, size, isImage, thumb, r2Key)
			 SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9
			 WHERE (SELECT COUNT(*) FROM BookingFile WHERE bookingId = ?2) < ?10
			   AND (SELECT COUNT(*) FROM BookingFile WHERE createdAt > datetime('now', '-1 day')) < ?11
			   AND (SELECT COALESCE(SUM(size), 0) FROM BookingFile WHERE createdAt > datetime('now', '-1 day')) + ?6 <= ?12
			   AND NOT EXISTS (SELECT 1 FROM BookingFileRemoved WHERE bookingId = ?2 AND clientId = ?3)`,
		)
			.bind(
				record.id,
				record.bookingId,
				record.clientId,
				record.name,
				record.contentType,
				record.size,
				record.isImage ? 1 : 0,
				record.thumb,
				record.r2Key,
				MAX_FILES_PER_BOOKING,
				MAX_UPLOAD_FILES_PER_DAY,
				MAX_UPLOAD_BYTES_PER_DAY,
			)
			.run();

		inserted = (result.meta.changes ?? 0) > 0;
	} catch (error) {
		// The only rule an insert can break is that a client id appears once in a
		// booking. If the row it collided with is there, this was a repeat.
		repeat = record.clientId !== null && (await findFileByClientId(record.bookingId, record.clientId, env)) !== null;
		if (!repeat) throw error;
	} finally {
		// No row, whatever the reason, means nothing refers to the object, so it
		// is removed rather than left behind.
		if (!inserted) await env.UPLOADS.delete(record.r2Key);
	}

	if (inserted) {
		await touchDetails(record.bookingId, env);
		return "stored";
	}

	if (repeat) return "repeat";
	if (record.clientId && (await wasRemoved(record.bookingId, record.clientId, env))) return "removed";

	const count = await env.DB.prepare("SELECT COUNT(*) AS count FROM BookingFile WHERE bookingId = ?1")
		.bind(record.bookingId)
		.first<{ count: number }>();

	return (count?.count ?? 0) >= MAX_FILES_PER_BOOKING ? "full" : "paused";
}

// Adding or removing a file is a change to the move details, so it moves their
// last-saved time on: that is how the office sees details were edited after
// they were sent, and how a second send knows there is something new in it.
// Best effort, because by now the file itself is already stored or gone.
async function touchDetails(bookingId: string, env: Env): Promise<void> {
	try {
		await env.DB.prepare(`UPDATE Booking SET detailsUpdatedAt = ${DETAILS_SAVED_NOW} WHERE id = ?1`).bind(bookingId).run();
	} catch (error) {
		console.error("Could not move the details' last-saved time on", error);
	}
}

// Removes every file stored for the given bookings. Called before the bookings
// themselves are deleted: the database would cascade the rows away on its own,
// but the photos and documents in R2 have to be removed by hand, and they are
// the customer's personal data.
async function deleteBookingFiles(bookingIds: string[], env: Env): Promise<void> {
	// R2 first, by key prefix rather than from the rows, so an object whose row
	// was never written (an upload that failed part-way) is removed as well. If
	// this fails the rows and the booking are still there and the delete can be
	// tried again.
	await deleteBookingObjects(bookingIds, env);

	// Chunked to stay within D1's bound-parameter limit.
	for (let i = 0; i < bookingIds.length; i += 50) {
		const chunk = bookingIds.slice(i, i + 50);
		const placeholders = chunk.map((_, index) => `?${index + 1}`).join(", ");

		await env.DB.prepare(
			`DELETE FROM FileLink WHERE fileId IN (SELECT id FROM BookingFile WHERE bookingId IN (${placeholders}))`,
		)
			.bind(...chunk)
			.run();
		await env.DB.prepare(`DELETE FROM BookingFile WHERE bookingId IN (${placeholders})`)
			.bind(...chunk)
			.run();
		await env.DB.prepare(`DELETE FROM BookingFileRemoved WHERE bookingId IN (${placeholders})`)
			.bind(...chunk)
			.run();
	}
}

// Notes the form's id of a file the customer removed (see deleteMoveDetailsFile).
async function recordRemoved(bookingId: string, clientId: string, env: Env): Promise<void> {
	await env.DB.prepare(
		`INSERT OR IGNORE INTO BookingFileRemoved (bookingId, clientId)
		 SELECT ?1, ?2 WHERE (SELECT COUNT(*) FROM BookingFileRemoved WHERE bookingId = ?1) < ?3`,
	)
		.bind(bookingId, clientId, MAX_REMOVED_PER_BOOKING)
		.run();
}

async function wasRemoved(bookingId: string, clientId: string, env: Env): Promise<boolean> {
	const row = await env.DB.prepare("SELECT 1 AS removed FROM BookingFileRemoved WHERE bookingId = ?1 AND clientId = ?2")
		.bind(bookingId, clientId)
		.first();
	return row !== null;
}

// 410: the customer removed this file, so an upload of it is not stored.
function fileRemoved(corsHeaders?: HeadersInit): Response {
	return json({ error: { message: "That file was removed" } }, 410, corsHeaders);
}

// Removes every object stored under the given bookings. Run before their rows
// are deleted, and once more after the bookings themselves have gone: an
// upload that was already on its way in can store its object between the two,
// and from the moment the booking is gone no later one can (its row has no
// booking to belong to, so the upload removes its own object).
async function deleteBookingObjects(bookingIds: string[], env: Env): Promise<void> {
	for (const bookingId of bookingIds) {
		let cursor: string | undefined;

		do {
			const listed = await env.UPLOADS.list({ prefix: `move-details/${bookingId}/`, cursor });
			const keys = listed.objects.map((object) => object.key);

			if (keys.length > 0) await env.UPLOADS.delete(keys);
			cursor = listed.truncated ? listed.cursor : undefined;
		} while (cursor);
	}
}

// A file link works for a few minutes and nothing removes it when it lapses,
// so the daily cron clears out the expired ones.
async function purgeExpiredFileLinks(env: Env): Promise<void> {
	await env.DB.prepare("DELETE FROM FileLink WHERE expiresAt <= datetime('now')").run();
}

async function createCustomer(booking: NormalizedBookingRequest, env: Env): Promise<{ id: string }> {
	const id = crypto.randomUUID();
	await env.DB.prepare("INSERT INTO Customer (id, fullName, phone, email) VALUES (?1, ?2, ?3, ?4)")
		.bind(id, booking.fullName, booking.phone, booking.email.toLowerCase())
		.run();

	return { id };
}

// Only for a booking the office is adding (see createBooking). A record that a
// lead is using is never joined: a lead is whoever is typing into the quote
// form, and its record is theirs to change.
async function findOrCreateCustomer(booking: NormalizedBookingRequest, env: Env): Promise<{ id: string }> {
	const existing = await env.DB.prepare(
		`SELECT c.id FROM Customer c
		 WHERE lower(c.email) = ?1
		   AND NOT EXISTS (
			SELECT 1 FROM Booking b
			WHERE b.customerId = c.id AND b.status = 'Abandoned' AND b.detailsToken IS NULL
		   )
		 ORDER BY c.createdAt
		 LIMIT 1`,
	)
		.bind(booking.email.toLowerCase())
		.first<{ id: string }>();

	if (existing) {
		await env.DB.prepare(
			`UPDATE Customer
			 SET fullName = ?1, phone = ?2, updatedAt = datetime('now')
			 WHERE id = ?3`,
		)
			.bind(booking.fullName, booking.phone, existing.id)
			.run();

		return existing;
	}

	return createCustomer(booking, env);
}

function getCustomerUpdateFields(body: UpdateBookingRequest): { column: string; value: string }[] {
	const fields: { column: string; value: string }[] = [];

	if (body.fullName !== undefined) fields.push({ column: "fullName", value: body.fullName.trim() });
	if (body.phone !== undefined) fields.push({ column: "phone", value: body.phone.trim() });
	if (body.email !== undefined) fields.push({ column: "email", value: body.email.trim().toLowerCase() });

	return fields;
}

async function updateCustomerFields(customerId: string, body: UpdateBookingRequest, env: Env): Promise<void> {
	const fields = getCustomerUpdateFields(body);

	if (fields.length === 0) return;

	const assignments = fields.map((field, index) => `${field.column} = ?${index + 1}`);
	const values = fields.map((field) => field.value);

	await env.DB.prepare(
		`UPDATE Customer
		 SET ${assignments.join(", ")}, updatedAt = datetime('now')
		 WHERE id = ?${values.length + 1}`,
	)
		.bind(...values, customerId)
		.run();
}

async function updateBookingFields(id: string, body: UpdateBookingRequest, env: Env): Promise<void> {
	const fields = getBookingUpdateFields(body);

	if (fields.length === 0) return;

	const assignments = fields.map((field, index) => `${field.column} = ?${index + 1}`);
	const values = fields.map((field) => field.value);

	await env.DB.prepare(
		`UPDATE Booking
		 SET ${assignments.join(", ")}, updatedAt = datetime('now')
		 WHERE id = ?${values.length + 1}`,
	)
		.bind(...values, id)
		.run();
}

// The public quote form's update of its own lead. It changes nothing, and
// answers false, unless the booking is still a lead: Abandoned, and never
// given a details link. The lead's customer record and the booking are
// written in one transaction, so a save the form made a moment earlier cannot
// land on the customer record after the form has finished the lead. `token`
// sets the new enquiry's link in the same statement that makes it an enquiry.
//
// The form only ever writes to a customer record that is the lead's alone. A
// lead made before leads had records of their own may share one with a real
// enquiry; it is moved to a copy here, and the shared record is left as it was.
async function updateLead(existing: BookingRow, body: UpdateBookingRequest, env: Env, token?: string): Promise<boolean> {
	const STILL_A_LEAD = "status = 'Abandoned' AND detailsToken IS NULL";
	const shared = await env.DB.prepare("SELECT COUNT(*) AS count FROM Booking WHERE customerId = ?1 AND id <> ?2")
		.bind(existing.customerId, existing.id)
		.first<{ count: number }>();
	const statements: D1PreparedStatement[] = [];
	const bookingFields = getBookingUpdateFields(body);
	if (token) bookingFields.push({ column: "detailsToken", value: token });

	if ((shared?.count ?? 0) > 0) {
		const customerId = crypto.randomUUID();
		statements.push(
			env.DB.prepare(
				`INSERT INTO Customer (id, fullName, phone, email)
				 SELECT ?1, COALESCE(?2, fullName), COALESCE(?3, phone), COALESCE(?4, email)
				 FROM Customer
				 WHERE id = ?5 AND EXISTS (SELECT 1 FROM Booking WHERE id = ?6 AND ${STILL_A_LEAD})`,
			).bind(
				customerId,
				body.fullName?.trim() ?? null,
				body.phone?.trim() ?? null,
				body.email?.trim().toLowerCase() ?? null,
				existing.customerId,
				existing.id,
			),
		);
		bookingFields.push({ column: "customerId", value: customerId });
	} else {
		const customerFields = getCustomerUpdateFields(body);

		if (customerFields.length > 0) {
			const assignments = customerFields.map((field, index) => `${field.column} = ?${index + 1}`);
			const values = customerFields.map((field) => field.value);
			const customer = values.length + 1;
			const booking = values.length + 2;

			statements.push(
				env.DB.prepare(
					`UPDATE Customer
					 SET ${assignments.join(", ")}, updatedAt = datetime('now')
					 WHERE id = ?${customer}
					   AND EXISTS (SELECT 1 FROM Booking WHERE id = ?${booking} AND customerId = ?${customer} AND ${STILL_A_LEAD})
					   AND NOT EXISTS (SELECT 1 FROM Booking WHERE customerId = ?${customer} AND id <> ?${booking})`,
				).bind(...values, existing.customerId, existing.id),
			);
		}
	}

	// Last, so its count of changed rows is the answer: it is what stops being
	// true of the booking (a lead) once it has run.
	const assignments = bookingFields.map((field, index) => `${field.column} = ?${index + 1}`);
	const values = bookingFields.map((field) => field.value);
	statements.push(
		env.DB.prepare(
			`UPDATE Booking
			 SET ${[...assignments, "updatedAt = datetime('now')"].join(", ")}
			 WHERE id = ?${values.length + 1} AND ${STILL_A_LEAD}`,
		).bind(...values, existing.id),
	);

	const results = await env.DB.batch(statements);
	return (results[results.length - 1].meta.changes ?? 0) > 0;
}

async function logActivity(
	env: Env,
	entry: { action: string; details: string; entityId: string; actor: string },
): Promise<void> {
	await env.DB.prepare(
		"INSERT INTO ActivityLog (id, action, details, entityId, actor) VALUES (?1, ?2, ?3, ?4, ?5)",
	)
		.bind(crypto.randomUUID(), entry.action, entry.details, entry.entityId, entry.actor)
		.run();
}

function handleOptions(request: Request, env: Env): Response {
	const origin = request.headers.get("Origin");
	const corsHeaders = getCorsHeaders(origin, env);

	if (!corsHeaders) {
		return json({ error: { message: "Origin is not allowed" } }, 403);
	}

	return new Response(null, { status: 204, headers: corsHeaders });
}

// Whether the caller sent the admin PIN, for a route that is open to anyone
// but does more for the website's own server.
function isAdminRequest(request: Request, env: Env): boolean {
	const expectedPin = env.ADMIN_API_PIN;
	return Boolean(expectedPin) && request.headers.get("X-Admin-Pin") === expectedPin;
}

function requireAdmin(request: Request, env: Env, corsHeaders?: HeadersInit): Response | null {
	const expectedPin = env.ADMIN_API_PIN;

	if (!expectedPin) {
		return json({ error: { message: "Admin API PIN is not configured" } }, 500, corsHeaders);
	}

	if (request.headers.get("X-Admin-Pin") !== expectedPin) {
		return json({ error: { message: "Unauthorized" } }, 401, corsHeaders);
	}

	return null;
}

function getCorsHeaders(origin: string | null, env: Env): HeadersInit | undefined {
	if (!origin) return undefined;

	const allowedOrigins = getAllowedOrigins(env);
	if (!allowedOrigins.includes(origin)) return undefined;

	return {
		"Access-Control-Allow-Origin": origin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		// X-Admin-Pin is left out on purpose. Admin calls are made server to server,
		// and no page in a browser should be able to send the PIN.
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Max-Age": "86400",
		Vary: "Origin",
	};
}

function getAllowedOrigins(env: Env): string[] {
	const configuredOrigins = env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];
	return [...new Set([...configuredOrigins, ...DEFAULT_ALLOWED_ORIGINS])];
}

function json<T>(payload: ApiResponse<T>, status = 200, headers?: HeadersInit): Response {
	const responseHeaders = new Headers(headers);
	responseHeaders.set("Content-Type", "application/json; charset=utf-8");
	responseHeaders.set("Cache-Control", "no-store");

	return Response.json(payload, { status, headers: responseHeaders });
}

async function readJson<T>(request: Request, maxBytes?: number): Promise<T> {
	const contentType = request.headers.get("Content-Type") ?? "";

	if (!contentType.includes("application/json")) {
		throw new HttpError("Content-Type must be application/json", 415);
	}

	// The move details endpoints pass a limit: they are open to anyone holding a
	// link, so their bodies are measured as they are read.
	const limited = maxBytes === undefined ? null : new TextDecoder().decode(await readBody(request, maxBytes));

	try {
		return (limited === null ? await request.json() : JSON.parse(limited)) as T;
	} catch {
		throw new HttpError("Request body must be valid JSON", 400);
	}
}

// Reads a request body into memory, answering 413 for one over `limit` bytes.
// A declared length is checked before anything is read, and the body is then
// counted as it arrives, so a sender that declares no length, or a false one,
// is cut off at the limit instead of filling the Worker's memory.
async function readBody(request: Request, limit: number): Promise<Uint8Array<ArrayBuffer>> {
	if (Number(request.headers.get("Content-Length")) > limit) {
		throw new HttpError("Request body is too large", 413);
	}

	const chunks: Uint8Array[] = [];
	let total = 0;

	if (request.body) {
		const reader = request.body.getReader();

		for (;;) {
			const { done, value } = await reader.read();
			if (done) break;

			total += value.byteLength;
			if (total > limit) {
				await reader.cancel();
				throw new HttpError("Request body is too large", 413);
			}
			chunks.push(value);
		}
	}

	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}

	return bytes;
}

async function readFormData(request: Request, limit: number): Promise<FormData> {
	const contentType = request.headers.get("Content-Type") ?? "";

	if (!contentType.includes("multipart/form-data")) {
		throw new HttpError("Content-Type must be multipart/form-data", 415);
	}

	// A browser always declares the length of an upload, and a body cannot run
	// past the length it declared. One that declares none would have to be held
	// in memory piece by piece just to be measured, several times over for a
	// large file, so it is not read at all.
	const declared = request.headers.get("Content-Length");
	const declaredBytes = declared === null ? Number.NaN : Number(declared);

	if (!Number.isInteger(declaredBytes) || declaredBytes < 0) {
		throw new HttpError("The size of the upload must be declared", 411);
	}

	if (declaredBytes > limit) {
		throw new HttpError("Request body is too large", 413);
	}

	try {
		return await request.formData();
	} catch {
		throw new HttpError("Request body must be valid form data", 400);
	}
}

function validateCreateBooking(body: unknown): { valid: boolean; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	if (!isRecord(body)) {
		return { valid: false, errors: { body: "Body must be a JSON object" } };
	}

	validateText(body.fullName, "fullName", errors, { required: true, min: 2, max: 120 });
	validateEmail(body.email, errors, true);
	validateText(body.phone, "phone", errors, { required: true, min: 10, max: 30 });
	validateText(body.moveType, "moveType", errors, { required: true, min: 2, max: 80 });
	validateRoutePostcode(body.fromPostcode, "fromPostcode", errors, true);
	validateRoutePostcode(body.toPostcode, "toPostcode", errors, true);
	validateMoveDate(body.moveDate, errors, true);
	validateBedrooms(body.bedrooms, errors);
	validateExtras(body.extras, errors);
	validateMoney(body.price, "price", errors);
	if ("status" in body && body.status !== undefined && !isBookingStatus(body.status)) {
		errors.status = `Status must be one of: ${BOOKING_STATUSES.join(", ")}`;
	}
	if ("reuseCustomer" in body && typeof body.reuseCustomer !== "boolean") {
		errors.reuseCustomer = "reuseCustomer must be true or false";
	}

	return { valid: Object.keys(errors).length === 0, errors };
}

function validateUpdateBooking(body: unknown): { valid: boolean; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	if (!isRecord(body)) {
		return { valid: false, errors: { body: "Body must be a JSON object" } };
	}

	if ("fullName" in body) validateText(body.fullName, "fullName", errors, { required: false, min: 2, max: 120 });
	if ("email" in body) validateEmail(body.email, errors, false);
	if ("phone" in body) validateText(body.phone, "phone", errors, { required: false, min: 10, max: 30 });
	if ("moveType" in body) validateText(body.moveType, "moveType", errors, { required: false, min: 2, max: 80 });
	if ("fromPostcode" in body) validateRoutePostcode(body.fromPostcode, "fromPostcode", errors, false);
	if ("toPostcode" in body) validateRoutePostcode(body.toPostcode, "toPostcode", errors, false);
	if ("moveDate" in body) validateMoveDate(body.moveDate, errors, false);
	if ("bedrooms" in body) validateBedrooms(body.bedrooms, errors);
	if ("extras" in body) validateExtras(body.extras, errors);
	if ("price" in body) validateMoney(body.price, "price", errors);
	if ("jobCost" in body) validateMoney(body.jobCost, "jobCost", errors);
	if ("expenses" in body) validateMoney(body.expenses, "expenses", errors);
	if ("notes" in body && body.notes !== null) validateText(body.notes, "notes", errors, { required: false, max: 4000 });
	if ("status" in body && !isBookingStatus(body.status)) {
		errors.status = `Status must be one of: ${BOOKING_STATUSES.join(", ")}`;
	}
	if ("onlyIfLead" in body && typeof body.onlyIfLead !== "boolean") {
		errors.onlyIfLead = "onlyIfLead must be true or false";
	}

	return { valid: Object.keys(errors).length === 0, errors };
}

function validateCreateActivity(body: unknown): { valid: boolean; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	if (!isRecord(body)) {
		return { valid: false, errors: { body: "Body must be a JSON object" } };
	}

	validateText(body.action, "action", errors, { required: true, min: 2, max: 120 });
	if ("details" in body && body.details !== null) validateText(body.details, "details", errors, { required: false, max: 4000 });
	if ("entityId" in body && body.entityId !== null) validateText(body.entityId, "entityId", errors, { required: false, max: 120 });
	if ("actor" in body && body.actor !== null) validateText(body.actor, "actor", errors, { required: false, max: 80 });

	return { valid: Object.keys(errors).length === 0, errors };
}

function normalizeCreateBooking(
	body: CreateBookingRequest,
): NormalizedBookingRequest {
	return {
		fullName: body.fullName.trim(),
		email: body.email.trim().toLowerCase(),
		phone: body.phone.trim(),
		moveType: body.moveType.trim(),
		fromPostcode: body.fromPostcode.trim().toUpperCase(),
		toPostcode: body.toPostcode.trim().toUpperCase(),
		moveDate: body.moveDate.trim(),
		bedrooms: normalizeInteger(body.bedrooms, 1),
		extras: body.extras ?? [],
		status: body.status ?? "New",
		price: normalizeNullableNumber(body.price),
	};
}

function getBookingUpdateFields(body: UpdateBookingRequest): { column: string; value: string | number | null }[] {
	const fields: { column: string; value: string | number | null }[] = [];

	if (body.moveType !== undefined) fields.push({ column: "moveType", value: body.moveType.trim() });
	if (body.fromPostcode !== undefined) fields.push({ column: "fromPostcode", value: body.fromPostcode.trim().toUpperCase() });
	if (body.toPostcode !== undefined) fields.push({ column: "toPostcode", value: body.toPostcode.trim().toUpperCase() });
	if (body.moveDate !== undefined) fields.push({ column: "moveDate", value: body.moveDate.trim() });
	if (body.bedrooms !== undefined) fields.push({ column: "bedrooms", value: normalizeInteger(body.bedrooms, 1) });
	if (body.extras !== undefined) fields.push({ column: "extras", value: JSON.stringify(body.extras) });
	if (body.status !== undefined) fields.push({ column: "status", value: body.status });
	if (body.price !== undefined) fields.push({ column: "price", value: normalizeNullableNumber(body.price) });
	if (body.jobCost !== undefined) fields.push({ column: "jobCost", value: normalizeNullableNumber(body.jobCost) });
	if (body.expenses !== undefined) fields.push({ column: "expenses", value: normalizeNullableNumber(body.expenses) });
	if (body.notes !== undefined) fields.push({ column: "notes", value: typeof body.notes === "string" ? body.notes : null });

	if (body.jobCost !== undefined || body.expenses !== undefined) {
		const jobCost = normalizeNullableNumber(body.jobCost);
		const expenses = normalizeNullableNumber(body.expenses);
		fields.push({ column: "profit", value: (jobCost ?? 0) - (expenses ?? 0) });
	}

	return fields;
}

// `withToken` is true only for a caller that sent the admin PIN. The details
// link is a key to the customer's answers and photos, so anyone else is told
// whether details exist and never the link itself.
function toBooking(row: BookingRow, withToken: boolean): Booking {
	return {
		id: row.id,
		moveType: row.moveType,
		fromPostcode: row.fromPostcode,
		toPostcode: row.toPostcode,
		moveDate: row.moveDate,
		bedrooms: row.bedrooms,
		extras: parseExtras(row.extras),
		status: row.status,
		price: row.price,
		jobCost: row.jobCost,
		expenses: row.expenses,
		// Derive profit from the current cost/expenses rather than the stored
		// column, which could be stale when only one side was updated.
		profit: (row.jobCost ?? 0) - (row.expenses ?? 0),
		notes: row.notes,
		createdAt: row.createdAt,
		updatedAt: row.updatedAt,
		// The answers and the file list are left out on purpose: they would make a
		// page of bookings heavy. GET /bookings/:id/move-details returns them.
		detailsToken: withToken ? row.detailsToken : null,
		detailsUpdatedAt: row.detailsUpdatedAt,
		detailsSubmittedAt: row.detailsSubmittedAt,
		fileCount: row.fileCount,
		customer: {
			id: row.customerId,
			fullName: row.customerFullName,
			phone: row.customerPhone,
			email: row.customerEmail,
		},
	};
}

function parseExtras(value: string | null): string[] {
	if (!value) return [];

	try {
		const parsed = JSON.parse(value) as unknown;
		return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
	} catch {
		return [];
	}
}

// 32 random bytes as 43 characters of base64url. Used for a customer's move
// details link and for the short-lived file links. The token is all that
// stands between a stranger and the data behind it, so it is never logged and
// never written to the activity log.
function createToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(32));
	return btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
}

// Builds a clean set of answers from anything a request sends: unknown keys are
// dropped, a value of the wrong type or outside its list becomes "", and text
// is cut to its maximum. The result is safe to store and to hand back.
function sanitizeDetails(input: unknown): MoveDetails {
	const source = isRecord(input) ? input : {};
	const dismantle = pickOption(source.dismantle, YES_NO);

	return {
		from: sanitizePlace(source.from),
		to: sanitizePlace(source.to),
		items: sanitizeItems(source.items),
		boxes: pickOption(source.boxes, BOX_RANGES),
		itemsNotes: cutText(source.itemsNotes, MAX_NOTES_LENGTH),
		dismantle,
		// The form hides this box unless the answer is yes, so text left in it
		// from an earlier answer is not kept.
		dismantleNotes: dismantle === "yes" ? cutText(source.dismantleNotes, MAX_DISMANTLE_NOTES_LENGTH) : "",
		movers: pickOption(source.movers, MOVER_OPTIONS),
		notes: cutText(source.notes, MAX_NOTES_LENGTH),
	};
}

function sanitizePlace(input: unknown): PlaceDetails {
	const place = isRecord(input) ? input : {};
	const type = pickOption(place.type, PROPERTY_TYPES);
	// A house has no floor to ask about and a ground floor needs no lift, so an
	// answer left over from an earlier choice is cleared rather than stored.
	const floor = type === "" || type === "house" ? "" : pickOption(place.floor, FLOORS);
	const lift = floor === "" || floor === "ground" ? "" : pickOption(place.lift, YES_NO);

	return { type, floor, lift };
}

function sanitizeItems(input: unknown): Record<string, number> {
	const items = new Map<string, number>();

	if (isRecord(input)) {
		for (const [rawName, rawCount] of Object.entries(input)) {
			if (items.size >= MAX_ITEM_ENTRIES) break;

			const name = cutText(rawName.trim(), MAX_ITEM_NAME_LENGTH).trim();
			const count = typeof rawCount === "number" && Number.isFinite(rawCount) ? Math.min(Math.trunc(rawCount), MAX_ITEM_COUNT) : 0;

			if (name && count > 0) items.set(name, count);
		}
	}

	// fromEntries defines plain properties, so an item named "__proto__" is
	// stored as a name like any other.
	return Object.fromEntries(items);
}

function pickOption<T extends string>(value: unknown, options: readonly T[]): T | "" {
	return typeof value === "string" && (options as readonly string[]).includes(value) ? (value as T) : "";
}

function cutText(value: unknown, max: number): string {
	if (typeof value !== "string") return "";

	const cut = value.slice(0, max);
	// A cut that lands in the middle of an emoji would leave half of it behind.
	return /[\uD800-\uDBFF]$/.test(cut) ? cut.slice(0, -1) : cut;
}

// The ready-to-send rules. validateDetails() in src/lib/moveDetails.js applies
// the same ones in the form, with the same keys and wording; they are repeated
// here so a request that skips the form cannot send half an answer.
function validateMoveDetails(details: MoveDetails, fileCount: number): { valid: boolean; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	for (const side of ["from", "to"] as const) {
		const place = details[side];

		if (!place.type) errors[side] = "Choose the type of property.";
		else if (place.type !== "house") {
			if (!place.floor) errors[side] = "Tell us which floor it is on.";
			else if (place.floor !== "ground" && !place.lift) errors[side] = "Tell us whether there is a lift.";
		}
	}

	// Ticked items, a typed list or an attached file each tell the office what
	// is being moved, so any one of them is enough.
	const hasItems = Object.values(details.items).some((count) => count > 0);
	if (!hasItems && details.itemsNotes.trim().length < 3 && fileCount === 0) {
		errors.items = "Tap some items, type a list, or add photos or a file, whichever is easiest.";
	}

	if (!details.dismantle) errors.dismantle = "Choose yes or no.";
	else if (details.dismantle === "yes" && details.dismantleNotes.trim().length < 2) {
		errors.dismantle = "Tell us which items need taking apart or putting together.";
	}

	if (!details.movers) errors.movers = "Choose how many people you need, or pick Not sure.";

	return { valid: Object.keys(errors).length === 0, errors };
}

function parseDetails(value: string | null): MoveDetails | null {
	if (!value) return null;

	try {
		// Sanitised again on the way out, so the form always gets the full shape
		// back even if the rules have changed since these answers were stored.
		return sanitizeDetails(JSON.parse(value));
	} catch {
		return null;
	}
}

// The name a file is stored and later downloaded under: the customer's own
// name for it, without anything that could act as a path or upset a header,
// and without the hidden direction marks that can make a name read as though
// it ends in a different extension.
function cleanFileName(name: string): string {
	const cleaned = name
		.toWellFormed()
		.replace(/[\\/]/g, "")
		.replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, "")
		.trim();

	if (cleaned.length <= MAX_FILE_NAME_LENGTH) return cleaned;

	// A long name is cut before its extension, not through it: the extension is
	// what decides the file's type, here and on the computer that downloads it.
	const dot = cleaned.lastIndexOf(".");
	const extension = dot > 0 && cleaned.length - dot <= 10 ? cleaned.slice(dot) : "";
	const stem = extension ? cleaned.slice(0, dot) : cleaned;

	return cutText(stem, MAX_FILE_NAME_LENGTH - extension.length) + extension;
}

function fileExtension(name: string): string {
	const dot = name.lastIndexOf(".");
	return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

// Decides whether an upload is accepted and what it is stored as. The name's
// extension decides; the type the browser declared can only get a file turned
// away, never change what it is stored as.
function acceptedFileType(name: string, declaredType: string): { contentType: string; isImage: boolean } | null {
	const extension = fileExtension(name);
	const imageType = IMAGE_TYPES.get(extension);
	const contentType = imageType ?? DOCUMENT_TYPES.get(extension);

	if (!contentType) return null;

	const isImage = imageType !== undefined;
	return declaredTypeAgrees(declaredType, isImage) ? { contentType, isImage } : null;
}

function declaredTypeAgrees(declaredType: string, isImage: boolean): boolean {
	const declared = declaredType.split(";")[0].trim().toLowerCase();

	// A browser sends no type, or this generic one, for a format the device does
	// not know: a HEIC photo on Windows, a Pages document anywhere but a Mac.
	if (declared === "" || declared === "application/octet-stream") return true;

	// Any image type will do for an image, other than SVG. Browsers do not agree
	// on the names (a .bmp can arrive as image/x-ms-bmp, a .heic as image/heif),
	// so asking for an exact match would turn away honest photos.
	if (isImage) return declared.startsWith("image/") && declared !== "image/svg+xml";

	return (declared.startsWith("application/") || declared.startsWith("text/")) && !ACTIVE_CONTENT_TYPE.test(declared);
}

// The small preview the form makes of a photo. It is shown as an image source
// in the admin and on the customer's page, so only a small base64 JPEG, which
// is what the form makes, is kept.
function cleanThumb(value: FormDataEntryValue | null): string | null {
	if (typeof value !== "string" || value.length > MAX_THUMB_LENGTH || !THUMB_PATTERN.test(value)) return null;

	// A few thousand characters can still describe a picture tens of thousands
	// of pixels across, which would cost the office's browser gigabytes to draw.
	// So the size the picture itself declares is read, and has to be small.
	let bytes: Uint8Array;
	try {
		bytes = Uint8Array.from(atob(value.slice(THUMB_PREFIX.length)), (character) => character.charCodeAt(0));
	} catch {
		return null;
	}

	const size = jpegSize(bytes);
	return size && size.width <= MAX_THUMB_SIDE && size.height <= MAX_THUMB_SIDE ? value : null;
}

// The width and height a JPEG declares in its frame header, or null for
// anything that does not read as a JPEG with one.
function jpegSize(bytes: Uint8Array): { width: number; height: number } | null {
	if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;

	let offset = 2;
	while (offset + 8 < bytes.length) {
		if (bytes[offset] !== 0xff) return null;

		const marker = bytes[offset + 1];
		// Padding before a marker.
		if (marker === 0xff) {
			offset += 1;
			continue;
		}
		// The picture data, or the end of the file, with no frame header before it.
		if (marker === 0xda || marker === 0xd9) return null;
		// Markers that stand alone, with no length after them.
		if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
			offset += 2;
			continue;
		}

		const length = (bytes[offset + 2] << 8) | bytes[offset + 3];
		if (length < 2) return null;

		// A frame header: every "start of frame" marker, which excludes the three
		// in that range that define tables instead.
		if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
			const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
			const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
			return width > 0 && height > 0 ? { width, height } : null;
		}

		offset += 2 + length;
	}

	return null;
}

function cleanClientId(value: FormDataEntryValue | null): string | null {
	return typeof value === "string" && CLIENT_ID_PATTERN.test(value) ? value : null;
}

function cleanLeadKey(value: unknown): string | null {
	return typeof value === "string" && LEAD_KEY_PATTERN.test(value) ? value : null;
}

function contentDisposition(name: string, inline: boolean): string {
	// A header can only hold plain ASCII, and a quote or backslash would end the
	// quoted name early, so the fallback swaps those for "_" (and "%", which
	// some browsers try to decode). filename* carries the real name for the
	// browsers that read it, which is all current ones.
	const fallback = name.replace(/[^\x20-\x7e]|["\\%]/g, "_") || "file";
	const encoded = encodeURIComponent(name.toWellFormed()).replace(
		/['()*]/g,
		(character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
	);

	return `${inline ? "inline" : "attachment"}; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}

function normalizePath(pathname: string): string {
	const path = pathname.replace(/\/+$/, "");
	return path || "/";
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateText(
	value: unknown,
	field: string,
	errors: Record<string, string>,
	options: { required: boolean; min?: number; max: number },
): void {
	if (value === undefined || value === null) {
		if (options.required) errors[field] = `${field} is required`;
		return;
	}

	if (typeof value !== "string") {
		errors[field] = `${field} must be a string`;
		return;
	}

	const trimmed = value.trim();
	if (trimmed.length === 0) {
		if (options.required || options.min) errors[field] = `${field} cannot be empty`;
		return;
	}
	if (options.min && trimmed.length < options.min) errors[field] = `${field} must be at least ${options.min} characters`;
	if (trimmed.length > options.max) errors[field] = `${field} must be ${options.max} characters or fewer`;
}

function validateEmail(value: unknown, errors: Record<string, string>, required: boolean): void {
	validateText(value, "email", errors, { required, max: 254 });

	if (typeof value !== "string") return;

	// The same trimmed value is judged throughout, and it is what gets stored.
	// The pattern is only run on something short enough to be an address: on a
	// very long value it can take seconds, and the length error already stands.
	const trimmed = value.trim();
	if (trimmed.length === 0 || trimmed.length > 254) return;

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
		errors.email = "email must be valid";
	}
}

function validateRoutePostcode(
	value: unknown,
	field: string,
	errors: Record<string, string>,
	required: boolean,
): void {
	validateText(value, field, errors, { required, max: 120 });
}

function validateBedrooms(value: unknown, errors: Record<string, string>): void {
	if (value === undefined || value === null || value === "") return;

	if (typeof value !== "number" && typeof value !== "string") {
		errors.bedrooms = "bedrooms must be an integer between 0 and 10";
		return;
	}

	const normalized = normalizeInteger(value, Number.NaN);
	if (!Number.isInteger(normalized) || normalized < 0 || normalized > 10) {
		errors.bedrooms = "bedrooms must be an integer between 0 and 10";
	}
}

function validateMoveDate(value: unknown, errors: Record<string, string>, required: boolean): void {
	// An empty date is an answer: the quote form sends one for "flexible on
	// dates". Only a date that was left out altogether is missing.
	if (value === "") return;

	if (value === undefined || value === null) {
		if (required) errors.moveDate = "moveDate is required";
		return;
	}

	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
		errors.moveDate = "moveDate must use YYYY-MM-DD format";
	}
}

function validateExtras(value: unknown, errors: Record<string, string>): void {
	if (value === undefined) return;

	if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length > 100) || value.length > 20) {
		errors.extras = "extras must be an array of up to 20 strings";
	}
}

function validateMoney(value: unknown, field: string, errors: Record<string, string>): void {
	if (value === undefined || value === null || value === "") return;

	const normalized = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(normalized) || normalized < 0) {
		errors[field] = `${field} must be a positive number`;
	}
}

function normalizeInteger(value: number | string | null | undefined, fallback: number): number {
	if (value === null || value === undefined || value === "") return fallback;
	return Math.trunc(Number(value));
}

function normalizeNullableNumber(value: number | string | null | undefined): number | null {
	if (value === null || value === undefined || value === "") return null;
	return Number(value);
}

function isBookingStatus(value: unknown): value is BookingStatus {
	return typeof value === "string" && BOOKING_STATUSES.includes(value as BookingStatus);
}

function clampNumber(value: number, min: number, max: number): number {
	if (!Number.isFinite(value)) return min;
	return Math.min(Math.max(Math.floor(value), min), max);
}

class HttpError extends Error {
	constructor(
		message: string,
		readonly status: number,
	) {
		super(message);
	}
}

// TODO: Add Cloudflare Rate Limiting or a Turnstile-backed throttle before exposing write endpoints publicly.
