import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { beforeEach, describe, it, expect } from "vitest";
import worker from "../src/index";

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

async function resetDatabase() {
	const schema = [
		`CREATE TABLE IF NOT EXISTS Customer (
			id TEXT PRIMARY KEY,
			fullName TEXT NOT NULL,
			phone TEXT NOT NULL,
			email TEXT NOT NULL,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
		)`,
		`CREATE TABLE IF NOT EXISTS Booking (
			id TEXT PRIMARY KEY,
			customerId TEXT NOT NULL,
			moveType TEXT NOT NULL,
			fromPostcode TEXT NOT NULL,
			toPostcode TEXT NOT NULL,
			moveDate TEXT NOT NULL,
			bedrooms INTEGER NOT NULL DEFAULT 1 CHECK (bedrooms >= 0 AND bedrooms <= 10),
			extras TEXT,
			status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Upcoming', 'Completed', 'Abandoned', 'Lost')),
			price REAL,
			jobCost REAL,
			expenses REAL,
			profit REAL,
			notes TEXT,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
			detailsToken TEXT,
			details TEXT,
			detailsVersion INTEGER NOT NULL DEFAULT 0,
			detailsSaveId TEXT,
			detailsUpdatedAt TEXT,
			detailsSubmittedAt TEXT,
			leadKey TEXT,
			FOREIGN KEY (customerId) REFERENCES Customer(id) ON DELETE CASCADE
		)`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_booking_details_token ON Booking(detailsToken) WHERE detailsToken IS NOT NULL`,
		`CREATE TABLE IF NOT EXISTS BookingFile (
			id TEXT PRIMARY KEY,
			bookingId TEXT NOT NULL,
			clientId TEXT,
			name TEXT NOT NULL,
			contentType TEXT NOT NULL,
			size INTEGER NOT NULL,
			isImage INTEGER NOT NULL DEFAULT 0,
			thumb TEXT,
			r2Key TEXT NOT NULL,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			FOREIGN KEY (bookingId) REFERENCES Booking(id) ON DELETE CASCADE
		)`,
		`CREATE INDEX IF NOT EXISTS idx_bookingfile_booking ON BookingFile(bookingId)`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_bookingfile_client ON BookingFile(bookingId, clientId) WHERE clientId IS NOT NULL`,
		`CREATE INDEX IF NOT EXISTS idx_bookingfile_created ON BookingFile(createdAt, size)`,
		`CREATE TABLE IF NOT EXISTS FileLink (
			token TEXT PRIMARY KEY,
			fileId TEXT NOT NULL,
			expiresAt TEXT NOT NULL,
			FOREIGN KEY (fileId) REFERENCES BookingFile(id) ON DELETE CASCADE
		)`,
		`CREATE TABLE IF NOT EXISTS BookingFileRemoved (
			bookingId TEXT NOT NULL,
			clientId TEXT NOT NULL,
			removedAt TEXT NOT NULL DEFAULT (datetime('now')),
			PRIMARY KEY (bookingId, clientId),
			FOREIGN KEY (bookingId) REFERENCES Booking(id) ON DELETE CASCADE
		)`,
		`CREATE TABLE IF NOT EXISTS ActivityLog (
			id TEXT PRIMARY KEY,
			action TEXT NOT NULL,
			details TEXT,
			entityId TEXT,
			actor TEXT,
			createdAt TEXT NOT NULL DEFAULT (datetime('now'))
		)`,
	];

	for (const statement of schema) {
		await env.DB.prepare(statement).run();
	}

	await env.DB.prepare("DELETE FROM FileLink").run();
	await env.DB.prepare("DELETE FROM BookingFile").run();
	await env.DB.prepare("DELETE FROM BookingFileRemoved").run();
	await env.DB.prepare("DELETE FROM ActivityLog").run();
	await env.DB.prepare("DELETE FROM Booking").run();
	await env.DB.prepare("DELETE FROM Customer").run();
}

const BASE = "https://example.com";
const JSON_HEADERS = { "Content-Type": "application/json" };
const TOKEN_SHAPE = /^[A-Za-z0-9_-]{43}$/;
const TIMESTAMP_SHAPE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

// Admin routes need ADMIN_API_PIN, which the test environment does not set. As
// in the activity test below, these requests go straight to the worker with the
// PIN added to its environment. Pass `pin: null` to call without the header.
const ADMIN_PIN = "test-admin-pin";

async function adminFetch(path: string, init: RequestInit = {}, pin: string | null = ADMIN_PIN): Promise<Response> {
	const headers = new Headers(init.headers);
	if (pin !== null) headers.set("X-Admin-Pin", pin);

	const ctx = createExecutionContext();
	const response = await worker.fetch(
		new IncomingRequest(`${BASE}${path}`, { ...init, headers }),
		{ ...env, ADMIN_API_PIN: ADMIN_PIN },
		ctx,
	);
	await waitOnExecutionContext(ctx);

	return response;
}

interface TestBooking {
	id: string;
	status: string;
	// Null in a reply to a caller without the PIN, and for a lead.
	detailsToken: string;
	detailsUpdatedAt: string | null;
	detailsSubmittedAt: string | null;
	fileCount: number;
	customer: { id: string; email: string; fullName?: string };
}

interface TestFile {
	id: string;
	clientId: string | null;
	name: string;
	isImage: boolean;
	size: number;
	thumb: string | null;
}

const ENQUIRY = {
	fullName: "Sarah Ahmed",
	email: "sarah@example.com",
	phone: "07700900123",
	moveType: "flat",
	fromPostcode: "B15 2TT",
	toPostcode: "B29 6BD",
	moveDate: "2026-10-17",
	bedrooms: 2,
	extras: [],
	price: 350,
};

// An enquiry made the way the website makes one: its server sends the admin
// PIN, which is what gets it the details link in the reply. `pin: null` makes
// the same request as anyone else on the internet could.
async function postBooking(overrides: Record<string, unknown> = {}, pin: string | null = ADMIN_PIN): Promise<Response> {
	return adminFetch(
		"/bookings",
		{ method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ ...ENQUIRY, ...overrides }) },
		pin,
	);
}

async function createBooking(overrides: Record<string, unknown> = {}): Promise<TestBooking> {
	const response = await postBooking(overrides);
	const payload = await response.json<{ data: TestBooking }>();

	return payload.data;
}

async function tokenInDatabase(bookingId: string): Promise<string | null> {
	const row = await env.DB.prepare("SELECT detailsToken FROM Booking WHERE id = ?1")
		.bind(bookingId)
		.first<{ detailsToken: string | null }>();
	return row?.detailsToken ?? null;
}

// A second enquiry from somebody else, for the tests that check one customer's
// link cannot reach another customer's files.
function createOtherBooking(): Promise<TestBooking> {
	return createBooking({ fullName: "Imran Hussain", email: "imran@example.com", phone: "07700900456" });
}

// A booking as it looked before move details existed: no token.
async function insertOldBooking(status = "New"): Promise<string> {
	await env.DB.prepare("INSERT INTO Customer (id, fullName, phone, email) VALUES (?1, ?2, ?3, ?4)")
		.bind("cust-old", "Sarah Ahmed", "07700900123", "sarah@example.com")
		.run();
	await env.DB.prepare(
		`INSERT INTO Booking (id, customerId, moveType, fromPostcode, toPostcode, moveDate, status)
		 VALUES (?1, ?2, 'flat', 'B15 2TT', 'B29 6BD', '2026-10-17', ?3)`,
	)
		.bind("book-old", "cust-old", status)
		.run();

	return "book-old";
}

const COMPLETE_DETAILS = {
	from: { type: "flat", floor: "2", lift: "no" },
	to: { type: "house", floor: "", lift: "" },
	items: { "Sofa (3-seater)": 1, "Double bed": 2 },
	boxes: "11-20",
	itemsNotes: "",
	dismantle: "yes",
	dismantleNotes: "The double bed",
	movers: "2",
	notes: "Parking is at the back.",
};

// `basis` is what the form adds to say which version its answers started
// from: { baseVersion, saveId, sentIds }.
function saveDetails(token: string, details: unknown, basis: Record<string, unknown> = {}): Promise<Response> {
	return SELF.fetch(`${BASE}/move-details/${token}`, {
		method: "PUT",
		headers: JSON_HEADERS,
		body: JSON.stringify({ details, ...basis }),
	});
}

function submitDetails(
	token: string,
	details: unknown,
	pin: string | null = ADMIN_PIN,
	basis: Record<string, unknown> = {},
): Promise<Response> {
	return adminFetch(
		`/move-details/${token}/submit`,
		{ method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ details, ...basis }) },
		pin,
	);
}

// What the website records once it has emailed the office about a send.
async function recordNotified(bookingId: string): Promise<void> {
	const response = await adminFetch("/activity", {
		method: "POST",
		headers: JSON_HEADERS,
		body: JSON.stringify({ action: "booking.details_notified", entityId: bookingId, actor: "app", details: "{}" }),
	});
	await response.arrayBuffer();
	expect(response.status).toBe(201);
}

const PHOTO_BYTES = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);

// The start of a JPEG that declares the given size. The API reads the size a
// preview declares and never draws it, so the header is all a test needs.
function jpegThumb(width: number, height: number): string {
	const bytes = [
		...[0xff, 0xd8],
		...[0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00],
		...[0xff, 0xc0, 0x00, 0x0b, 0x08, height >> 8, height & 0xff, width >> 8, width & 0xff, 0x01, 0x01, 0x11, 0x00],
		...[0xff, 0xd9],
	];
	return `data:image/jpeg;base64,${btoa(String.fromCharCode(...bytes))}`;
}

const THUMB = jpegThumb(200, 200);

function photo(name = "sofa.jpg", type = "image/jpeg"): File {
	return new File([PHOTO_BYTES], name, { type });
}

// `hint` is the form's id for the file, which it also puts in the address.
function uploadFile(token: string, file: File, fields: Record<string, string> = {}, hint = ""): Promise<Response> {
	const body = new FormData();
	body.append("file", file);
	for (const [name, value] of Object.entries(fields)) body.append(name, value);

	const query = hint ? `?clientId=${encodeURIComponent(hint)}` : "";
	return SELF.fetch(`${BASE}/move-details/${token}/files${query}`, { method: "POST", body });
}

async function uploadedFile(token: string, file: File = photo(), fields: Record<string, string> = {}): Promise<TestFile> {
	const response = await uploadFile(token, file, fields);
	const payload = await response.json<{ data: TestFile }>();
	expect(response.status).toBe(201);

	return payload.data;
}

// A one-file form encoded the way a browser would send it, so a test can send
// the body in pieces of its own choosing.
async function encodeUpload(file: File): Promise<{ contentType: string; bytes: Uint8Array }> {
	const form = new FormData();
	form.append("file", file);
	const encoded = new Response(form);

	return { contentType: encoded.headers.get("Content-Type")!, bytes: new Uint8Array(await encoded.arrayBuffer()) };
}

async function storedKeys(bookingId: string): Promise<string[]> {
	const listed = await env.UPLOADS.list({ prefix: `move-details/${bookingId}/` });
	return listed.objects.map((object) => object.key);
}

async function countRows(table: "BookingFile" | "FileLink"): Promise<number> {
	const row = await env.DB.prepare(`SELECT COUNT(*) AS count FROM ${table}`).first<{ count: number }>();
	return row?.count ?? 0;
}

// How many times a booking's details have been recorded as sent.
async function countSends(bookingId: string): Promise<number> {
	const row = await env.DB.prepare(
		"SELECT COUNT(*) AS count FROM ActivityLog WHERE action = 'booking.details_submitted' AND entityId = ?1",
	)
		.bind(bookingId)
		.first<{ count: number }>();
	return row?.count ?? 0;
}

async function createFileLink(fileId: string): Promise<{ url: string; expiresAt: string }> {
	const response = await adminFetch(`/files/${fileId}/link`, { method: "POST" });
	const payload = await response.json<{ data: { url: string; expiresAt: string } }>();
	expect(response.status).toBe(201);

	return payload.data;
}

describe("Birmingham Removals API", () => {
	beforeEach(async () => {
		await resetDatabase();
	});

	it("responds with API metadata (unit style)", async () => {
		const request = new IncomingRequest("http://example.com");
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.json()).toEqual({
			data: {
				name: "Birmingham Removals API",
				resources: ["/bookings", "/customers", "/activity"],
			},
		});
	});

	it("responds to health checks (integration style)", async () => {
		const response = await SELF.fetch("https://example.com/health");
		expect(await response.json()).toEqual({ data: { ok: true } });
	});

	it("makes a finished quote a booking of its own, never somebody's lead with the same phone or email", async () => {
		const booking = {
			fullName: "Atif Jan",
			email: "webspires@gmail.com",
			phone: "07786738432",
			moveType: "House",
			fromPostcode: "M6 2QW",
			toPostcode: "M6 1SA",
			moveDate: "2026-05-11",
			bedrooms: 2,
			extras: [],
			price: 350,
		};
		// With the website's PIN and without: neither caller picks up the lead.
		const post = (body: Record<string, unknown>, pin: string | null) =>
			adminFetch("/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }, pin);

		const abandonedResponse = await post({ ...booking, status: "Abandoned" }, ADMIN_PIN);
		const abandonedPayload = await abandonedResponse.json<{ data: { id: string; status: string } }>();

		expect(abandonedResponse.status).toBe(201);
		expect(abandonedPayload.data.status).toBe("Abandoned");

		for (const pin of [ADMIN_PIN, null]) {
			const completedResponse = await post(booking, pin);
			const completedPayload = await completedResponse.json<{ data: { id: string; status: string } }>();

			expect(completedResponse.status).toBe(201);
			expect(completedPayload.data.id).not.toBe(abandonedPayload.data.id);
			expect(completedPayload.data.status).toBe("New");
		}

		const { results } = await env.DB.prepare("SELECT id, status FROM Booking ORDER BY status").all<{ id: string; status: string }>();

		expect(results.map((row) => row.status)).toEqual(["Abandoned", "New", "New"]);
		expect(results[0].id).toBe(abandonedPayload.data.id);
	});

	it("accepts short UK postcode areas from the hero quote form", async () => {
		const response = await SELF.fetch("https://example.com/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				fullName: "Atif Jan",
				email: "webspires@gmail.com",
				phone: "07765662784",
				moveType: "house",
				fromPostcode: "M5",
				toPostcode: "M2",
				moveDate: "2026-05-01",
				bedrooms: 1,
				extras: [],
				price: 250,
			}),
		});
		const payload = await response.json<{ data: { fromPostcode: string; toPostcode: string } }>();

		expect(response.status).toBe(201);
		expect(payload.data.fromPostcode).toBe("M5");
		expect(payload.data.toPostcode).toBe("M2");
	});

	it("accepts any non-empty route text", async () => {
		const response = await SELF.fetch("https://example.com/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				fullName: "Atif Jan",
				email: "atif@example.com",
				phone: "07765662784",
				moveType: "house",
				fromPostcode: "M",
				toPostcode: "City centre near station",
				moveDate: "2026-05-01",
				bedrooms: 1,
				extras: [],
				price: 250,
			}),
		});
		const payload = await response.json<{ data: { fromPostcode: string; toPostcode: string } }>();

		expect(response.status).toBe(201);
		expect(payload.data.fromPostcode).toBe("M");
		expect(payload.data.toPostcode).toBe("CITY CENTRE NEAR STATION");
	});

	it("purges abandoned leads older than 30 days but keeps recent ones and real bookings", async () => {
		// Stale abandoned lead (40 days old) — should be deleted along with its customer.
		await env.DB.prepare("INSERT INTO Customer (id, fullName, phone, email, createdAt) VALUES (?1, ?2, ?3, ?4, datetime('now', '-40 days'))")
			.bind("cust-stale", "Partial Lead", "Not provided", "abandoned_111@pending.com")
			.run();
		await env.DB.prepare(
			`INSERT INTO Booking (id, customerId, moveType, fromPostcode, toPostcode, moveDate, status, createdAt)
			 VALUES (?1, ?2, 'House', 'M6', 'M2', '2026-01-01', 'Abandoned', datetime('now', '-40 days'))`,
		)
			.bind("book-stale", "cust-stale")
			.run();

		// Recent abandoned lead (5 days old) — should be kept.
		await env.DB.prepare("INSERT INTO Customer (id, fullName, phone, email, createdAt) VALUES (?1, ?2, ?3, ?4, datetime('now', '-5 days'))")
			.bind("cust-recent", "Partial Lead", "Not provided", "abandoned_222@pending.com")
			.run();
		await env.DB.prepare(
			`INSERT INTO Booking (id, customerId, moveType, fromPostcode, toPostcode, moveDate, status, createdAt)
			 VALUES (?1, ?2, 'House', 'M6', 'M2', '2026-01-01', 'Abandoned', datetime('now', '-5 days'))`,
		)
			.bind("book-recent", "cust-recent")
			.run();

		// A real (old) booking — must never be touched by the purge.
		await env.DB.prepare("INSERT INTO Customer (id, fullName, phone, email, createdAt) VALUES (?1, ?2, ?3, ?4, datetime('now', '-40 days'))")
			.bind("cust-real", "Atif Jan", "07786738432", "atif@example.com")
			.run();
		await env.DB.prepare(
			`INSERT INTO Booking (id, customerId, moveType, fromPostcode, toPostcode, moveDate, status, createdAt)
			 VALUES (?1, ?2, 'House', 'M6', 'M2', '2026-01-01', 'New', datetime('now', '-40 days'))`,
		)
			.bind("book-real", "cust-real")
			.run();

		const ctx = createExecutionContext();
		await worker.scheduled!({ scheduledTime: 0, cron: "0 3 * * *", noRetry() {} }, env, ctx);
		await waitOnExecutionContext(ctx);

		const { results: bookings } = await env.DB.prepare("SELECT id FROM Booking ORDER BY id").all<{ id: string }>();
		expect(bookings.map((row) => row.id)).toEqual(["book-real", "book-recent"]);

		const { results: customers } = await env.DB.prepare("SELECT id FROM Customer ORDER BY id").all<{ id: string }>();
		expect(customers.map((row) => row.id)).toEqual(["cust-real", "cust-recent"]);

		const purge = await env.DB.prepare("SELECT details FROM ActivityLog WHERE action = 'lead.abandoned_purged'").first<{ details: string }>();
		expect(purge).not.toBeNull();
		expect(JSON.parse(purge!.details)).toMatchObject({ leads: 1, customers: 1 });
	});

	it("records email status activity entries", async () => {
		const ctx = createExecutionContext();
		const testEnv = { ...env, ADMIN_API_PIN: "524862" };
		const response = await worker.fetch(new IncomingRequest("https://example.com/activity", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Admin-Pin": "524862",
			},
			body: JSON.stringify({
				action: "booking.email_status",
				entityId: "booking-123",
				actor: "app",
				details: JSON.stringify({
					customer: { status: "sent" },
					admin: { status: "failed", error: "SMTP failed" },
				}),
			}),
		}), testEnv, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(201);

		const listCtx = createExecutionContext();
		const activityResponse = await worker.fetch(new IncomingRequest("https://example.com/activity", {
			headers: { "X-Admin-Pin": "524862" },
		}), testEnv, listCtx);
		await waitOnExecutionContext(listCtx);
		const payload = await activityResponse.json<{ data: Array<{ action: string; entityId: string }> }>();

		expect(payload.data[0]).toMatchObject({
			action: "booking.email_status",
			entityId: "booking-123",
		});
	});
});

describe("Move details", () => {
	beforeEach(async () => {
		await resetDatabase();
	});

	it("gives a new enquiry a 43-character details token", async () => {
		const first = await createBooking();
		const second = await createOtherBooking();

		expect(first.detailsToken).toMatch(TOKEN_SHAPE);
		expect(second.detailsToken).toMatch(TOKEN_SHAPE);
		expect(second.detailsToken).not.toBe(first.detailsToken);
		expect(first).toMatchObject({ detailsUpdatedAt: null, detailsSubmittedAt: null, fileCount: 0 });
	});

	it("tells the details link only to a caller with the PIN", async () => {
		const response = await postBooking({}, null);
		const payload = await response.json<{ data: TestBooking }>();

		// Anyone may make an enquiry. It has a link, but the reply does not say it.
		expect(response.status).toBe(201);
		expect(payload.data.detailsToken).toBeNull();
		expect(await tokenInDatabase(payload.data.id)).toMatch(TOKEN_SHAPE);
	});

	it("gives a lead no link, and a new one when the quote form finishes it", async () => {
		const lead = await createBooking({ status: "Abandoned" });
		expect(lead.status).toBe("Abandoned");
		expect(lead.detailsToken).toBeNull();
		expect(await tokenInDatabase(lead.id)).toBeNull();

		// The quote form finishing its own lead, by the id it was given for it.
		const finished = await adminFetch(`/bookings/${lead.id}`, {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({ ...ENQUIRY, status: "New", onlyIfLead: true }),
		});
		const enquiry = (await finished.json<{ data: TestBooking }>()).data;
		expect(finished.status).toBe(200);
		expect(enquiry.id).toBe(lead.id);
		expect(enquiry.status).toBe("New");
		expect(enquiry.detailsToken).toMatch(TOKEN_SHAPE);
		expect(await tokenInDatabase(lead.id)).toBe(enquiry.detailsToken);
	});

	it("does not hand a lead to anyone who names its phone number or email", async () => {
		const lead = await createBooking({ status: "Abandoned" });

		for (const pin of [null, ADMIN_PIN]) {
			for (const overrides of [{ email: "stranger@example.com" }, { phone: "07000000000" }, {}]) {
				const response = await postBooking({ fullName: "A Stranger", ...overrides }, pin);
				const payload = await response.json<{ data: TestBooking }>();

				// A booking of its own, never the lead.
				expect(response.status).toBe(201);
				expect(payload.data.id).not.toBe(lead.id);
			}
		}

		const row = await env.DB.prepare("SELECT status, detailsToken FROM Booking WHERE id = ?1")
			.bind(lead.id)
			.first<{ status: string; detailsToken: string | null }>();
		expect(row).toEqual({ status: "Abandoned", detailsToken: null });
	});

	it("does not let the quote form finish a lead that already has a details link", async () => {
		// A lead the office sent a link to may have answers and photos on it. The
		// public form must not be able to take it over and be told a link to it.
		const id = await insertOldBooking("Abandoned");
		await env.DB.prepare("UPDATE Booking SET detailsToken = ?1 WHERE id = ?2").bind("t".repeat(43), id).run();

		const refused = await adminFetch(`/bookings/${id}`, {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({ ...ENQUIRY, fullName: "Someone Else", status: "New", onlyIfLead: true }),
		});
		expect(refused.status).toBe(409);
		expect(await refused.json()).toEqual({ error: { message: "Booking is no longer a lead" } });

		const row = await env.DB.prepare(
			"SELECT b.status, b.detailsToken, c.fullName FROM Booking b INNER JOIN Customer c ON c.id = b.customerId WHERE b.id = ?1",
		)
			.bind(id)
			.first<{ status: string; detailsToken: string; fullName: string }>();
		expect(row).toEqual({ status: "Abandoned", detailsToken: "t".repeat(43), fullName: "Sarah Ahmed" });
	});

	it("lets the public quote form change a booking only while it is a lead", async () => {
		const put = (id: string, body: Record<string, unknown>) =>
			adminFetch(`/bookings/${id}`, { method: "PUT", headers: JSON_HEADERS, body: JSON.stringify(body) });

		// Still a lead: further typing is saved, and it is given no link.
		const lead = await createBooking({ status: "Abandoned" });
		const typed = await put(lead.id, { onlyIfLead: true, status: "Abandoned", fromPostcode: "B1 1AA" });
		const typedPayload = await typed.json<{ data: TestBooking }>();
		expect(typed.status).toBe(200);
		expect(typedPayload.data.detailsToken).toBeNull();

		// Finishing the form makes it an enquiry and gives it its link.
		const finished = await put(lead.id, { onlyIfLead: true, status: "New" });
		const finishedPayload = await finished.json<{ data: TestBooking }>();
		expect(finished.status).toBe(200);
		expect(finishedPayload.data.status).toBe("New");
		expect(finishedPayload.data.detailsToken).toMatch(TOKEN_SHAPE);

		// From then on the same call is refused and changes nothing: not a second
		// finish (which would be told the link), and not a return to a lead.
		for (const body of [{ onlyIfLead: true, status: "New" }, { onlyIfLead: true, status: "Abandoned", fullName: "Someone Else" }]) {
			const refused = await put(lead.id, body);
			expect(refused.status).toBe(409);
			expect(await refused.json()).toEqual({ error: { message: "Booking is no longer a lead" } });
		}

		const row = await env.DB.prepare(
			"SELECT b.status, b.detailsToken, c.fullName FROM Booking b INNER JOIN Customer c ON c.id = b.customerId WHERE b.id = ?1",
		)
			.bind(lead.id)
			.first<{ status: string; detailsToken: string; fullName: string }>();
		expect(row).toEqual({ status: "New", detailsToken: finishedPayload.data.detailsToken, fullName: "Sarah Ahmed" });

		// The office's own edits carry no such condition.
		const office = await put(lead.id, { status: "Upcoming" });
		await office.arrayBuffer();
		expect(office.status).toBe(200);
	});


	it("gives an older booking a token when it is updated", async () => {
		const id = await insertOldBooking();
		const response = await adminFetch(`/bookings/${id}`, {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({ status: "Upcoming" }),
		});
		const payload = await response.json<{ data: TestBooking }>();

		expect(response.status).toBe(200);
		expect(payload.data.status).toBe("Upcoming");
		expect(payload.data.detailsToken).toMatch(TOKEN_SHAPE);
	});

	it("adds the details fields to a booking, but not the answers or the file list", async () => {
		const booking = await createBooking();
		await (await saveDetails(booking.detailsToken, COMPLETE_DETAILS)).arrayBuffer();
		await uploadedFile(booking.detailsToken);

		const response = await adminFetch("/bookings");
		const payload = await response.json<{ data: TestBooking[] }>();

		expect(payload.data).toHaveLength(1);
		expect(payload.data[0]).toMatchObject({
			id: booking.id,
			detailsToken: booking.detailsToken,
			detailsUpdatedAt: expect.stringMatching(TIMESTAMP_SHAPE),
			detailsSubmittedAt: null,
			fileCount: 1,
		});
		expect(payload.data[0]).not.toHaveProperty("details");
		expect(payload.data[0]).not.toHaveProperty("files");
	});

	it("answers 404 for an unknown details token", async () => {
		await createBooking();

		for (const token of ["A".repeat(43), "not-a-token"]) {
			const requests = [
				SELF.fetch(`${BASE}/move-details/${token}`),
				saveDetails(token, COMPLETE_DETAILS),
				uploadFile(token, photo()),
				SELF.fetch(`${BASE}/move-details/${token}/files/some-file`, { method: "DELETE" }),
				submitDetails(token, COMPLETE_DETAILS),
			];

			for (const response of await Promise.all(requests)) {
				const payload = await response.json();

				expect(response.status).toBe(404);
				expect(payload).toEqual({ error: { message: "Move details link not found" } });
			}
		}
	});

	it("returns the enquiry behind a token without the customer's name, phone or email, or the booking id", async () => {
		const booking = await createBooking();
		const response = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`);
		const body = await response.text();

		expect(response.status).toBe(200);
		expect(response.headers.get("Cache-Control")).toBe("no-store");
		expect(JSON.parse(body)).toEqual({
			data: {
				enquiry: {
					moveType: "flat",
					fromPostcode: "B15 2TT",
					toPostcode: "B29 6BD",
					moveDate: "2026-10-17",
				},
				details: null,
				version: 0,
				saveId: null,
				updatedAt: null,
				submittedAt: null,
				files: [],
			},
		});
		// Nothing from the customer record, which other bookings share.
		expect(body).not.toContain("sarah@example.com");
		expect(body).not.toContain("Sarah");
		expect(body).not.toContain("Ahmed");
		expect(body).not.toContain("07700900123");
		expect(body).not.toContain(booking.id);
	});

	it("saves sanitised details: unknown keys dropped, long text cut, leftover answers cleared", async () => {
		const booking = await createBooking();
		const response = await saveDetails(booking.detailsToken, {
			from: { type: "house", floor: "2", lift: "yes", garden: true },
			to: { type: "flat", floor: "ground", lift: "no" },
			items: { "Sofa (3-seater)": 2, Piano: 0, Wardrobe: 150, Bookcase: "3", ["x".repeat(80)]: 1 },
			boxes: "loads",
			itemsNotes: "n".repeat(2500),
			dismantle: "no",
			dismantleNotes: "left over from an earlier answer",
			movers: "2",
			notes: 42,
			price: 1,
		});
		const saved = await response.json<{ data: { updatedAt: string; version: number } }>();

		expect(response.status).toBe(200);
		expect(saved.data.updatedAt).toMatch(TIMESTAMP_SHAPE);
		expect(saved.data.version).toBe(1);

		const read = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`);
		const payload = await read.json<{ data: { details: unknown; updatedAt: string; submittedAt: string | null } }>();

		expect(payload.data.details).toEqual({
			// A house has no floor or lift to record.
			from: { type: "house", floor: "", lift: "" },
			// A ground floor needs no lift.
			to: { type: "flat", floor: "ground", lift: "" },
			// A zero count and a count that is not a number are dropped, a count
			// over 99 is capped, and a name is cut to 60 characters.
			items: { "Sofa (3-seater)": 2, Wardrobe: 99, ["x".repeat(60)]: 1 },
			boxes: "",
			itemsNotes: "n".repeat(2000),
			dismantle: "no",
			dismantleNotes: "",
			movers: "2",
			notes: "",
		});
		expect(payload.data.updatedAt).toBe(saved.data.updatedAt);
		expect(payload.data.submittedAt).toBeNull();
	});

	it("refuses a save with no details in it, and one over 20 KB", async () => {
		const booking = await createBooking();
		await (await saveDetails(booking.detailsToken, COMPLETE_DETAILS)).arrayBuffer();

		const empty = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`, {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({}),
		});
		const emptyPayload = await empty.json();
		expect(empty.status).toBe(400);
		expect(emptyPayload).toEqual({ error: { message: "details must be an object" } });

		const large = await saveDetails(booking.detailsToken, { ...COMPLETE_DETAILS, notes: "n".repeat(21 * 1024) });
		const largePayload = await large.json();
		expect(large.status).toBe(413);
		expect(largePayload).toEqual({ error: { message: "Request body is too large" } });

		// Neither request touched the answers that were already saved.
		const read = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`);
		const payload = await read.json<{ data: { details: unknown } }>();
		expect(payload.data.details).toEqual(COMPLETE_DETAILS);
	});

	it("still saves answers after the details have been sent", async () => {
		const booking = await createBooking();
		const sent = await submitDetails(booking.detailsToken, COMPLETE_DETAILS);
		await sent.arrayBuffer();
		expect(sent.status).toBe(200);

		const response = await saveDetails(booking.detailsToken, { ...COMPLETE_DETAILS, movers: "3" });
		await response.arrayBuffer();
		expect(response.status).toBe(200);

		const read = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`);
		const payload = await read.json<{ data: { details: { movers: string }; submittedAt: string | null } }>();

		expect(payload.data.details.movers).toBe("3");
		expect(payload.data.submittedAt).toMatch(TIMESTAMP_SHAPE);
	});

	it("refuses to send details without the admin PIN", async () => {
		const booking = await createBooking();

		for (const pin of [null, "wrong-pin"]) {
			const response = await submitDetails(booking.detailsToken, COMPLETE_DETAILS, pin);
			const payload = await response.json();

			expect(response.status).toBe(401);
			expect(payload).toEqual({ error: { message: "Unauthorized" } });
		}

		const row = await env.DB.prepare("SELECT details, detailsSubmittedAt FROM Booking WHERE id = ?1")
			.bind(booking.id)
			.first<{ details: string | null; detailsSubmittedAt: string | null }>();
		expect(row).toEqual({ details: null, detailsSubmittedAt: null });
	});

	it("refuses to send incomplete details, with an error for each section", async () => {
		const booking = await createBooking();
		const response = await submitDetails(booking.detailsToken, {
			from: { type: "flat" },
			to: { type: "other", floor: "3" },
			itemsNotes: "ab",
			dismantle: "yes",
			dismantleNotes: " ",
		});
		const payload = await response.json();

		expect(response.status).toBe(400);
		expect(payload).toEqual({
			error: {
				message: "Move details are incomplete",
				details: {
					from: "Tell us which floor it is on.",
					to: "Tell us whether there is a lift.",
					items: "Tap some items, type a list, or add photos or a file, whichever is easiest.",
					dismantle: "Tell us which items need taking apart or putting together.",
					movers: "Choose how many people you need, or pick Not sure.",
				},
			},
		});

		const row = await env.DB.prepare("SELECT details, detailsSubmittedAt FROM Booking WHERE id = ?1")
			.bind(booking.id)
			.first<{ details: string | null; detailsSubmittedAt: string | null }>();
		expect(row).toEqual({ details: null, detailsSubmittedAt: null });
	});

	it("accepts an attached file in place of a list of items", async () => {
		const booking = await createBooking();
		const details = { ...COMPLETE_DETAILS, items: {}, itemsNotes: "" };

		const without = await submitDetails(booking.detailsToken, details);
		const payload = await without.json<{ error: { details: Record<string, string> } }>();
		expect(without.status).toBe(400);
		expect(Object.keys(payload.error.details)).toEqual(["items"]);

		await uploadedFile(booking.detailsToken);

		const withFile = await submitDetails(booking.detailsToken, details);
		await withFile.arrayBuffer();
		expect(withFile.status).toBe(200);
	});

	it("sends complete details: sets submittedAt and returns the booking, details and files", async () => {
		const booking = await createBooking();
		const file = await uploadedFile(booking.detailsToken, photo(), { thumb: THUMB });
		const response = await submitDetails(booking.detailsToken, { ...COMPLETE_DETAILS, extra: "dropped" });
		const payload = await response.json<{ data: { submittedAt: string } }>();

		expect(response.status).toBe(200);
		expect(payload.data).toEqual({
			submittedAt: expect.stringMatching(TIMESTAMP_SHAPE),
			version: 1,
			resubmitted: false,
			changed: true,
			notify: true,
			booking: {
				id: booking.id,
				moveType: "flat",
				fromPostcode: "B15 2TT",
				toPostcode: "B29 6BD",
				moveDate: "2026-10-17",
				customer: { fullName: "Sarah Ahmed", phone: "07700900123", email: "sarah@example.com" },
			},
			details: COMPLETE_DETAILS,
			files: [{ id: file.id, name: "sofa.jpg", isImage: true, size: PHOTO_BYTES.byteLength }],
		});

		const row = await env.DB.prepare("SELECT details, detailsUpdatedAt, detailsSubmittedAt FROM Booking WHERE id = ?1")
			.bind(booking.id)
			.first<{ details: string; detailsUpdatedAt: string; detailsSubmittedAt: string }>();
		expect(JSON.parse(row!.details)).toEqual(COMPLETE_DETAILS);
		expect(row!.detailsSubmittedAt).toBe(payload.data.submittedAt);
		expect(row!.detailsUpdatedAt).toBe(payload.data.submittedAt);

		// The activity log names the customer and the booking, and never holds the
		// token.
		const { results: log } = await env.DB.prepare("SELECT action, details, entityId, actor FROM ActivityLog").all<{
			action: string;
			details: string;
			entityId: string;
			actor: string;
		}>();
		const entry = log.find((item) => item.action === "booking.details_submitted");
		expect(entry).toMatchObject({ entityId: booking.id, actor: "customer" });
		expect(JSON.parse(entry!.details)).toMatchObject({ summary: "Move details sent by Sarah Ahmed", files: 1 });
		expect(log.some((item) => item.details.includes(booking.detailsToken))).toBe(false);

		// A second send is allowed and says that it is one. With nothing changed
		// since the first, it also says so, and is not recorded a second time.
		const again = await submitDetails(booking.detailsToken, COMPLETE_DETAILS);
		const againPayload = await again.json<{ data: { submittedAt: string; resubmitted: boolean; changed: boolean } }>();
		expect(again.status).toBe(200);
		expect(againPayload.data.resubmitted).toBe(true);
		expect(againPayload.data.changed).toBe(false);
		expect(againPayload.data.submittedAt).toBe(payload.data.submittedAt);
		expect(await countSends(booking.id)).toBe(1);
	});

	it("says when the office is due an email: for something new, or for a send it was never told about", async () => {
		const booking = await createBooking();
		const send = async (details: unknown = COMPLETE_DETAILS) => {
			const response = await submitDetails(booking.detailsToken, details);
			const payload = await response.json<{ data: { changed: boolean; notify: boolean } }>();
			expect(response.status).toBe(200);
			return payload.data;
		};

		// The first send, and then the customer pressing send again because the
		// first try showed an error: the office has still not been emailed.
		expect(await send()).toMatchObject({ changed: true, notify: true });
		expect(await send()).toMatchObject({ changed: false, notify: true });

		// The website emails the office and records that it did.
		await recordNotified(booking.id);
		expect(await send()).toMatchObject({ changed: false, notify: false });

		// A changed answer is news again.
		expect(await send({ ...COMPLETE_DETAILS, movers: "3" })).toMatchObject({ changed: true, notify: true });
		await recordNotified(booking.id);
		expect(await send({ ...COMPLETE_DETAILS, movers: "3" })).toMatchObject({ changed: false, notify: false });
	});

	it("refuses a sixth send with something new in it in one day, and leaves the answers saved", async () => {
		const booking = await createBooking();
		const other = await createOtherBooking();

		for (let i = 1; i <= 5; i += 1) {
			const response = await submitDetails(booking.detailsToken, { ...COMPLETE_DETAILS, notes: `Change ${i}` });
			const payload = await response.json<{ data: { notify: boolean } }>();
			expect(response.status).toBe(200);
			expect(payload.data.notify).toBe(true);
			await recordNotified(booking.id);
		}

		const before = await env.DB.prepare("SELECT detailsSubmittedAt, detailsVersion FROM Booking WHERE id = ?1")
			.bind(booking.id)
			.first<{ detailsSubmittedAt: string; detailsVersion: number }>();

		// The sixth is turned away: nothing is recorded as sent, so nothing is
		// sent without the office being told.
		const sixth = await submitDetails(booking.detailsToken, { ...COMPLETE_DETAILS, notes: "Change 6" });
		expect(sixth.status).toBe(429);
		expect(await sixth.json()).toEqual({ error: { message: "These details have been sent too many times today" } });
		expect(await countSends(booking.id)).toBe(5);
		const after = await env.DB.prepare("SELECT detailsSubmittedAt, detailsVersion FROM Booking WHERE id = ?1")
			.bind(booking.id)
			.first<{ detailsSubmittedAt: string; detailsVersion: number }>();
		expect(after).toEqual(before);

		// Pressing send again with nothing new in it is still answered, and asks
		// for no email: the office has had one for exactly this.
		const repeat = await submitDetails(booking.detailsToken, { ...COMPLETE_DETAILS, notes: "Change 5" });
		expect(repeat.status).toBe(200);
		expect((await repeat.json<{ data: { changed: boolean; notify: boolean } }>()).data).toMatchObject({ changed: false, notify: false });

		// The form's own save still takes the change, so the office can see it.
		const saved = await saveDetails(booking.detailsToken, { ...COMPLETE_DETAILS, notes: "Change 6" });
		await saved.arrayBuffer();
		expect(saved.status).toBe(200);

		// Another enquiry is not affected, and nor is this one once a day has passed.
		const otherSend = await submitDetails(other.detailsToken, COMPLETE_DETAILS);
		expect((await otherSend.json<{ data: { notify: boolean } }>()).data.notify).toBe(true);

		await env.DB.prepare("UPDATE ActivityLog SET createdAt = datetime('now', '-25 hours') WHERE entityId = ?1").bind(booking.id).run();
		const nextDay = await submitDetails(booking.detailsToken, { ...COMPLETE_DETAILS, notes: "Change 6" });
		expect(nextDay.status).toBe(200);
		expect((await nextDay.json<{ data: { notify: boolean } }>()).data.notify).toBe(true);
	});

	it("asks for an email for every send with something new, even when more emails than sends are on record", async () => {
		const booking = await createBooking();
		const first = await submitDetails(booking.detailsToken, COMPLETE_DETAILS);
		await first.arrayBuffer();
		// Five emails recorded against one send: two pages pressing send at once
		// can each be told to notify before either email is on record.
		for (let i = 0; i < 5; i += 1) await recordNotified(booking.id);

		const changedSend = await submitDetails(booking.detailsToken, { ...COMPLETE_DETAILS, movers: "3" });
		const payload = await changedSend.json<{ data: { changed: boolean; notify: boolean } }>();
		expect(changedSend.status).toBe(200);
		expect(payload.data).toMatchObject({ changed: true, notify: true });
	});

	it("gives every booking the public makes a customer record of its own", async () => {
		const first = await createBooking();
		// The same email again, under another name and number: from the quote form
		// (the website's server, with the PIN), from anyone at all (without), and
		// as a lead.
		const viaSite = await createBooking({ fullName: "Mallory Other", phone: "07999999999" });
		const direct = (await (await postBooking({ fullName: "Mallory Other", phone: "07999999999", reuseCustomer: true }, null)).json<{ data: TestBooking }>()).data;
		const lead = await createBooking({ fullName: "Mallory Other", phone: "07999999999", status: "Abandoned" });

		const ids = new Set([first.customer.id, viaSite.customer.id, direct.customer.id, lead.customer.id]);
		expect(ids.size).toBe(4);

		// The first customer's record is as it was.
		const row = await env.DB.prepare("SELECT fullName, phone, email FROM Customer WHERE id = ?1")
			.bind(first.customer.id)
			.first<{ fullName: string; phone: string; email: string }>();
		expect(row).toEqual({ fullName: "Sarah Ahmed", phone: "07700900123", email: "sarah@example.com" });
	});

	it("joins an existing customer record only for a booking the office adds, and never one a lead is using", async () => {
		const first = await createBooking();
		const added = await createBooking({ phone: "07700900999", moveDate: "2026-11-02", reuseCustomer: true });
		expect(added.customer.id).toBe(first.customer.id);

		// A lead someone has typed another customer's address into keeps its own
		// record, and the office's next booking for that address does not join it.
		const lead = await createBooking({ email: "imran@example.com", status: "Abandoned" });
		const office = await createBooking({ fullName: "Imran Hussain", email: "imran@example.com", phone: "07700900456", reuseCustomer: true });
		expect(office.customer.id).not.toBe(lead.customer.id);
	});

	it("keeps what the quote form writes to the lead's own customer record", async () => {
		// An enquiry, and a lead from before leads had records of their own, which
		// shares the enquiry's customer record.
		const enquiry = await createBooking();
		await env.DB.prepare(
			`INSERT INTO Booking (id, customerId, moveType, fromPostcode, toPostcode, moveDate, status)
			 VALUES ('lead-shared', ?1, 'flat', 'B15 2TT', 'B29 6BD', '2026-10-17', 'Abandoned')`,
		)
			.bind(enquiry.customer.id)
			.run();

		const typed = await adminFetch("/bookings/lead-shared", {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({ onlyIfLead: true, status: "Abandoned", fullName: "Mallory Other", phone: "07999999999", email: "mallory@example.net" }),
		});
		const typedPayload = await typed.json<{ data: TestBooking }>();
		expect(typed.status).toBe(200);
		expect(typedPayload.data.customer.id).not.toBe(enquiry.customer.id);
		expect(typedPayload.data.customer).toMatchObject({ email: "mallory@example.net" });

		// The enquiry's customer, and so where its emails go, is untouched.
		const row = await env.DB.prepare("SELECT fullName, phone, email FROM Customer WHERE id = ?1")
			.bind(enquiry.customer.id)
			.first<{ fullName: string; phone: string; email: string }>();
		expect(row).toEqual({ fullName: "Sarah Ahmed", phone: "07700900123", email: "sarah@example.com" });

		// A lead with a record of its own keeps it.
		const again = await adminFetch("/bookings/lead-shared", {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({ onlyIfLead: true, status: "Abandoned", phone: "07999999998" }),
		});
		expect((await again.json<{ data: TestBooking }>()).data.customer.id).toBe(typedPayload.data.customer.id);
	});

	it("keeps the finishing call's details when an earlier save from the same form arrives at the same moment", async () => {
		for (let round = 0; round < 4; round += 1) {
			const lead = await createBooking({ status: "Abandoned", email: `race${round}@example.com` });
			const put = (body: Record<string, unknown>) =>
				adminFetch(`/bookings/${lead.id}`, { method: "PUT", headers: JSON_HEADERS, body: JSON.stringify({ onlyIfLead: true, ...body }) });

			// The form's last save, made a keystroke before the address was complete,
			// and the submit itself, in either order.
			const calls = [
				() => put({ status: "Abandoned", fullName: "Sar", email: `race${round}@example.co` }),
				() => put({ ...ENQUIRY, status: "New", email: `race${round}@example.com` }),
			];
			const [early, finish] = await Promise.all((round % 2 ? calls.reverse() : calls).map((call) => call())).then((responses) =>
				round % 2 ? responses.reverse() : responses,
			);
			await early.arrayBuffer();
			await finish.arrayBuffer();
			expect(finish.status).toBe(200);
			expect([200, 409]).toContain(early.status);

			const row = await env.DB.prepare(
				"SELECT b.status, c.fullName, c.email FROM Booking b INNER JOIN Customer c ON c.id = b.customerId WHERE b.id = ?1",
			)
				.bind(lead.id)
				.first<{ status: string; fullName: string; email: string }>();
			expect(row).toEqual({ status: "New", fullName: "Sarah Ahmed", email: `race${round}@example.com` });
		}
	});

	it("takes an enquiry with flexible dates, which has no date, but not one with the date left out", async () => {
		const flexible = await postBooking({ moveDate: "" });
		const payload = await flexible.json<{ data: { moveDate: string; detailsToken: string } }>();
		expect(flexible.status).toBe(201);
		expect(payload.data.moveDate).toBe("");
		expect(payload.data.detailsToken).toMatch(TOKEN_SHAPE);

		const { moveDate: _left, ...withoutDate } = ENQUIRY;
		const missing = await adminFetch("/bookings", { method: "POST", headers: JSON_HEADERS, body: JSON.stringify(withoutDate) });
		expect(missing.status).toBe(400);
		expect(await missing.json()).toMatchObject({ error: { details: { moveDate: "moveDate is required" } } });
	});

	it("lets the browser that made a lead repeat the call that finishes it, and nobody else", async () => {
		const leadKey = "0f3c5a2e-7b1d-4e9a-8c6f-2d4b6a8c0e1f";
		const lead = await createBooking({ status: "Abandoned", leadKey });
		const finish = (body: Record<string, unknown>) =>
			adminFetch(`/bookings/${lead.id}`, { method: "PUT", headers: JSON_HEADERS, body: JSON.stringify({ ...ENQUIRY, status: "New", onlyIfLead: true, ...body }) });

		const first = await finish({ leadKey });
		const enquiry = (await first.json<{ data: TestBooking }>()).data;
		expect(first.status).toBe(200);
		expect(enquiry.detailsToken).toMatch(TOKEN_SHAPE);

		// The answer never reached the browser, so it presses submit again: the
		// same enquiry and the same link, not a refusal and not a second enquiry.
		const repeat = await finish({ leadKey, fullName: "Typed Differently" });
		const repeated = (await repeat.json<{ data: TestBooking & { alreadyFinished?: boolean } }>()).data;
		expect(repeat.status).toBe(200);
		expect(repeated.id).toBe(lead.id);
		expect(repeated.detailsToken).toBe(enquiry.detailsToken);
		// The website is told this was a repeat, so it does not email twice.
		expect(repeated.alreadyFinished).toBe(true);
		expect(enquiry).not.toHaveProperty("alreadyFinished");
		// Nothing is changed by the repeat.
		expect(repeated.customer.fullName).toBe("Sarah Ahmed");
		const { results } = await env.DB.prepare("SELECT id FROM Booking").all<{ id: string }>();
		expect(results).toHaveLength(1);

		// The booking id alone, or with the wrong key, gets nothing.
		for (const body of [{}, { leadKey: "ffffffff-ffff-4fff-8fff-ffffffffffff" }, { leadKey: "short" }]) {
			const refused = await finish(body);
			expect(refused.status).toBe(409);
			expect(JSON.stringify(await refused.json())).not.toContain(enquiry.detailsToken);
		}

		// A lead that was made without a key cannot be repeated by offering one.
		const keyless = await createBooking({ email: "imran@example.com", phone: "07700900456", status: "Abandoned" });
		const keylessFinish = (body: Record<string, unknown>) =>
			adminFetch(`/bookings/${keyless.id}`, { method: "PUT", headers: JSON_HEADERS, body: JSON.stringify({ status: "New", onlyIfLead: true, ...body }) });
		expect((await keylessFinish({})).status).toBe(200);
		expect((await keylessFinish({ leadKey })).status).toBe(409);
	});

	it("knows a second send with a changed answer, an added file or a removed file from one with nothing new", async () => {
		const booking = await createBooking();
		const resend = async (details: unknown = COMPLETE_DETAILS) => {
			const response = await submitDetails(booking.detailsToken, details);
			const payload = await response.json<{ data: { resubmitted: boolean; changed: boolean } }>();
			expect(response.status).toBe(200);
			return payload.data;
		};

		expect(await resend()).toMatchObject({ resubmitted: false, changed: true });
		expect(await resend()).toMatchObject({ resubmitted: true, changed: false });

		// An answer changed by the form's own save, in the same second as the send.
		const changedDetails = { ...COMPLETE_DETAILS, movers: "3" };
		await (await saveDetails(booking.detailsToken, changedDetails)).arrayBuffer();
		expect(await resend(changedDetails)).toMatchObject({ resubmitted: true, changed: true });
		expect(await resend(changedDetails)).toMatchObject({ changed: false });

		// An answer changed only in the send itself.
		expect(await resend(COMPLETE_DETAILS)).toMatchObject({ changed: true });
		expect(await resend(COMPLETE_DETAILS)).toMatchObject({ changed: false });

		// A file added, then removed, with the answers as they were.
		const file = await uploadedFile(booking.detailsToken);
		expect(await resend()).toMatchObject({ changed: true });
		expect(await resend()).toMatchObject({ changed: false });

		const removed = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/${file.id}`, { method: "DELETE" });
		expect(removed.status).toBe(204);
		expect(await resend()).toMatchObject({ changed: true });
		expect(await resend()).toMatchObject({ changed: false });

		// One entry for each send that had something new in it.
		expect(await countSends(booking.id)).toBe(5);
	});

	it("leaves the last-saved time alone when the same answers are saved again", async () => {
		const booking = await createBooking();
		await (await saveDetails(booking.detailsToken, COMPLETE_DETAILS)).arrayBuffer();
		await env.DB.prepare("UPDATE Booking SET detailsUpdatedAt = '2026-01-01 00:00:00' WHERE id = ?1").bind(booking.id).run();

		const same = await saveDetails(booking.detailsToken, COMPLETE_DETAILS);
		expect(await same.json()).toEqual({ data: { updatedAt: "2026-01-01 00:00:00", version: 1 } });

		const different = await saveDetails(booking.detailsToken, { ...COMPLETE_DETAILS, boxes: "40+" });
		const payload = await different.json<{ data: { updatedAt: string; version: number } }>();
		expect(payload.data.updatedAt).toMatch(TIMESTAMP_SHAPE);
		expect(payload.data.updatedAt > "2026-01-01 00:00:00").toBe(true);
		expect(payload.data.version).toBe(2);
	});

	it("turns away a save from a page that has fallen behind, and hands it the current answers", async () => {
		const booking = await createBooking();
		const token = booking.detailsToken;
		const version = async (response: Response) => (await response.json<{ data: { version: number } }>()).data.version;

		// Two pages open on the same link, both loaded at version 0.
		const laptop = { ...COMPLETE_DETAILS, notes: "Typed on the laptop" };
		expect(await version(await saveDetails(token, laptop, { baseVersion: 0, saveId: "laptop-1", sentIds: [] }))).toBe(1);

		// The phone still holds what it loaded, and one tap sends all of it.
		const phone = await saveDetails(token, { ...COMPLETE_DETAILS, notes: "" }, { baseVersion: 0, saveId: "phone-1", sentIds: [] });
		expect(phone.status).toBe(409);
		expect(await phone.json()).toEqual({
			error: { message: "These answers have been changed somewhere else" },
			data: {
				details: laptop,
				version: 1,
				saveId: "laptop-1",
				updatedAt: expect.stringMatching(TIMESTAMP_SHAPE),
				submittedAt: null,
			},
		});

		// Once it has taken those answers in, its next save is accepted.
		const merged = { ...laptop, movers: "4+" };
		expect(await version(await saveDetails(token, merged, { baseVersion: 1, saveId: "phone-2", sentIds: ["phone-1"] }))).toBe(2);

		// The laptop never heard back from a save of its own: the version moved
		// on, but only by that save, so its next one is not a conflict.
		await env.DB.prepare("UPDATE Booking SET detailsVersion = 3, detailsSaveId = 'laptop-2' WHERE id = ?1").bind(booking.id).run();
		const afterLostReply = await saveDetails(
			token,
			{ ...merged, notes: "More from the laptop" },
			{ baseVersion: 2, saveId: "laptop-3", sentIds: ["laptop-1", "laptop-2"] },
		);
		expect(await version(afterLostReply)).toBe(4);

		// A send from a page that has fallen behind is turned away the same way,
		// so the office is never emailed an old copy.
		const staleSend = await submitDetails(token, COMPLETE_DETAILS, ADMIN_PIN, { baseVersion: 1, saveId: "phone-3", sentIds: [] });
		expect(staleSend.status).toBe(409);
		const staleSendPayload = await staleSend.json<{ data: { version: number; submittedAt: string | null } }>();
		expect(staleSendPayload.data).toMatchObject({ version: 4, submittedAt: null });

		const read = await SELF.fetch(`${BASE}/move-details/${token}`);
		const stored = await read.json<{ data: { details: { notes: string; movers: string }; version: number; saveId: string } }>();
		expect(stored.data).toMatchObject({ details: { notes: "More from the laptop", movers: "4+" }, version: 4, saveId: "laptop-3" });

		// A caller that names no version (nothing the form sends) is not checked.
		const unchecked = await saveDetails(token, COMPLETE_DETAILS);
		expect(unchecked.status).toBe(200);
		expect(await version(unchecked)).toBe(5);
	});

	it("moves the last-saved time on when a file is added or removed, past the time of a send in the same second", async () => {
		const booking = await createBooking();
		const times = () =>
			env.DB.prepare("SELECT detailsUpdatedAt AS updatedAt, detailsSubmittedAt AS submittedAt FROM Booking WHERE id = ?1")
				.bind(booking.id)
				.first<{ updatedAt: string | null; submittedAt: string | null }>();

		// A photo added before any answer is saved still counts as a start.
		const first = await uploadedFile(booking.detailsToken);
		expect((await times())!.updatedAt).toMatch(TIMESTAMP_SHAPE);

		await (await submitDetails(booking.detailsToken, COMPLETE_DETAILS)).arrayBuffer();
		const sent = await times();
		expect(sent!.updatedAt).toBe(sent!.submittedAt);

		const removed = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/${first.id}`, { method: "DELETE" });
		expect(removed.status).toBe(204);
		const afterRemove = await times();
		expect(afterRemove!.updatedAt! > afterRemove!.submittedAt!).toBe(true);

		await (await submitDetails(booking.detailsToken, COMPLETE_DETAILS)).arrayBuffer();
		await uploadedFile(booking.detailsToken, photo("bed.jpg"));
		const afterAdd = await times();
		expect(afterAdd!.updatedAt! > afterAdd!.submittedAt!).toBe(true);
	});

	it("pauses uploads once a day's worth has arrived, and takes them again as that day passes", async () => {
		const booking = await createBooking();
		const other = await createOtherBooking();
		// Two gigabytes of files from another enquiry, without storing any of it.
		await env.DB.prepare(
			`INSERT INTO BookingFile (id, bookingId, name, contentType, size, isImage, r2Key)
			 VALUES ('file-huge', ?1, 'huge.pdf', 'application/pdf', ?2, 0, 'move-details/none/file-huge')`,
		)
			.bind(other.id, 2 * 1024 * 1024 * 1024)
			.run();

		const paused = await uploadFile(booking.detailsToken, photo());
		expect(paused.status).toBe(503);
		expect(await paused.json()).toEqual({
			error: { message: "Uploads are paused for the moment. Please try again later." },
		});
		expect(await storedKeys(booking.id)).toEqual([]);

		await env.DB.prepare("UPDATE BookingFile SET createdAt = datetime('now', '-25 hours') WHERE id = 'file-huge'").run();
		await uploadedFile(booking.detailsToken);

		// The same brake counts files, however small, because each may carry a
		// preview that is stored in the database.
		await env.DB.prepare(
			`WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 1500)
			 INSERT INTO BookingFile (id, bookingId, name, contentType, size, isImage, r2Key)
			 SELECT 'bulk-' || i, ?1, 'a.jpg', 'image/jpeg', 1, 1, 'move-details/none/bulk-' || i FROM n`,
		)
			.bind(other.id)
			.run();
		const counted = await uploadFile(booking.detailsToken, photo("one-more.jpg"));
		await counted.arrayBuffer();
		expect(counted.status).toBe(503);
		expect(await storedKeys(booking.id)).toHaveLength(1);
	});

	it("answers a bad or oversized booking request with a proper error, quickly", async () => {
		const origin = { Origin: "https://www.birminghamremovals.uk" };

		// The wrong content type used to escape as a bare 500.
		const wrongType = await SELF.fetch(`${BASE}/bookings`, { method: "POST", headers: { "Content-Type": "text/plain", ...origin }, body: "x" });
		expect(wrongType.status).toBe(415);
		expect(wrongType.headers.get("Access-Control-Allow-Origin")).toBe(origin.Origin);
		expect(await wrongType.json()).toEqual({ error: { message: "Content-Type must be application/json" } });

		// A booking is a dozen short fields; a body far over that is not read.
		const large = await postBooking({ fullName: "n".repeat(17 * 1024) }, null);
		expect(large.status).toBe(413);
		expect(await large.json()).toEqual({ error: { message: "Request body is too large" } });

		// An address built to make the pattern crawl is refused on its length.
		const started = Date.now();
		const crafted = await postBooking({ email: `a@${"a.".repeat(6000)}@` }, null);
		expect(crafted.status).toBe(400);
		expect(await crafted.json()).toMatchObject({ error: { details: { email: "email must be 254 characters or fewer" } } });
		expect(Date.now() - started).toBeLessThan(1000);

		// Padding with spaces does not get something that is not one address past the check.
		for (const email of [`not-an-address${" ".repeat(260)}`, `first@example.com,second@example.net${" ".repeat(260)}`]) {
			const padded = await postBooking({ email }, null);
			expect(padded.status).toBe(400);
			expect(await padded.json()).toMatchObject({ error: { details: { email: "email must be valid" } } });
		}
		const spaced = await postBooking({ email: `  Spaced@Example.com${" ".repeat(260)}` }, ADMIN_PIN);
		expect(spaced.status).toBe(201);
		expect((await spaced.json<{ data: { customer: { email: string } } }>()).data.customer.email).toBe("spaced@example.com");
	});

	it("stores an uploaded file in R2 and returns its record", async () => {
		const booking = await createBooking();
		const response = await uploadFile(booking.detailsToken, photo("Sofa.JPG"), { thumb: THUMB, image: "1" });
		const payload = await response.json<{ data: TestFile }>();

		expect(response.status).toBe(201);
		expect(payload.data).toEqual({
			id: expect.stringMatching(/^[0-9a-f-]{36}$/),
			clientId: null,
			name: "Sofa.JPG",
			isImage: true,
			size: PHOTO_BYTES.byteLength,
			thumb: THUMB,
		});

		const key = `move-details/${booking.id}/${payload.data.id}`;
		const object = await env.UPLOADS.get(key);
		expect(object).not.toBeNull();
		expect(object!.httpMetadata?.contentType).toBe("image/jpeg");
		expect(new Uint8Array(await object!.arrayBuffer())).toEqual(PHOTO_BYTES);

		const row = await env.DB.prepare("SELECT bookingId, contentType, size, isImage, r2Key FROM BookingFile WHERE id = ?1")
			.bind(payload.data.id)
			.first();
		expect(row).toEqual({
			bookingId: booking.id,
			contentType: "image/jpeg",
			size: PHOTO_BYTES.byteLength,
			isImage: 1,
			r2Key: key,
		});

		// The customer's page lists it.
		const read = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`);
		const details = await read.json<{ data: { files: TestFile[] } }>();
		expect(details.data.files).toEqual([payload.data]);
	});

	it("chooses the stored content type from the file name, not from the browser", async () => {
		const booking = await createBooking();

		// A document is never an image, whatever the form says, and keeps no
		// thumbnail.
		const document = await uploadedFile(
			booking.detailsToken,
			new File(["%PDF-1.7"], "inventory.pdf", { type: "application/x-made-up" }),
			{ thumb: THUMB, image: "1" },
		);
		expect(document).toMatchObject({ name: "inventory.pdf", isImage: false, thumb: null });

		// An image only has to arrive as some image type, since browsers do not
		// agree on the names, and a device that does not know the format sends no
		// type at all. Either way the stored type follows the name.
		await uploadedFile(booking.detailsToken, photo("screenshot.png", "image/jpeg"));
		await uploadedFile(booking.detailsToken, photo("scan.bmp", "image/x-ms-bmp"));
		await uploadedFile(booking.detailsToken, photo("IMG_0001.HEIC", ""));

		const { results } = await env.DB.prepare("SELECT name, contentType, isImage FROM BookingFile ORDER BY rowid").all();
		expect(results).toEqual([
			{ name: "inventory.pdf", contentType: "application/pdf", isImage: 0 },
			{ name: "screenshot.png", contentType: "image/png", isImage: 1 },
			{ name: "scan.bmp", contentType: "image/bmp", isImage: 1 },
			{ name: "IMG_0001.HEIC", contentType: "image/heic", isImage: 1 },
		]);
	});

	it("tidies the name a file is stored under", async () => {
		const booking = await createBooking();

		const pathLike = await uploadedFile(booking.detailsToken, photo("C:\\Users\\sarah\\Pictures/sofa.jpg"));
		expect(pathLike.name).toBe("C:UserssarahPicturessofa.jpg");

		// A long name is cut to 120 characters without losing its extension.
		const long = await uploadedFile(booking.detailsToken, photo(`${"a".repeat(200)}.jpg`));
		expect(long.name).toBe(`${"a".repeat(116)}.jpg`);
	});

	it("rejects an .exe, an .svg and a file whose declared type contradicts its name with 415", async () => {
		const booking = await createBooking();
		const rejected = [
			new File(["MZ"], "setup.exe", { type: "application/x-msdownload" }),
			new File(["<svg xmlns='http://www.w3.org/2000/svg'/>"], "logo.svg", { type: "image/svg+xml" }),
			// The name alone rules an SVG out, whatever type it arrives with.
			new File(["<svg xmlns='http://www.w3.org/2000/svg'/>"], "drawing.SVG", { type: "image/png" }),
			new File(["<svg xmlns='http://www.w3.org/2000/svg'/>"], "sketch.svg", { type: "" }),
			// An allowed name does not help a file that says it is something else.
			new File(["<script>alert(1)</script>"], "photo.jpg", { type: "text/html" }),
			new File(["<script>alert(1)</script>"], "notes.txt", { type: "text/html" }),
			new File(["<svg xmlns='http://www.w3.org/2000/svg'/>"], "photo.png", { type: "image/svg+xml" }),
			// Only the last extension counts.
			new File(["MZ"], "photo.jpg.exe", { type: "image/jpeg" }),
			new File(["x"], "no-extension", { type: "image/jpeg" }),
		];

		for (const file of rejected) {
			const response = await uploadFile(booking.detailsToken, file, { image: "1" });
			const payload = await response.json();

			expect(response.status, file.name).toBe(415);
			expect(payload).toEqual({ error: { message: "That file type is not accepted" } });
		}

		expect(await storedKeys(booking.id)).toEqual([]);
		expect(await countRows("BookingFile")).toBe(0);
	});

	it("rejects the 13th file with 409", async () => {
		const booking = await createBooking();

		for (let i = 1; i <= 12; i += 1) {
			await uploadedFile(booking.detailsToken, photo(`photo-${i}.jpg`));
		}

		const response = await uploadFile(booking.detailsToken, photo("photo-13.jpg"));
		const payload = await response.json();

		expect(response.status).toBe(409);
		expect(payload).toEqual({ error: { message: "This enquiry already has 12 files" } });
		expect(await storedKeys(booking.id)).toHaveLength(12);
		expect(await countRows("BookingFile")).toBe(12);
	});

	it("holds the limit when the last place is taken while another upload is still arriving", async () => {
		const booking = await createBooking();

		for (let i = 1; i <= 11; i += 1) {
			await uploadedFile(booking.detailsToken, photo(`photo-${i}.jpg`));
		}

		// This upload gets past the early check, with 11 files stored, and is then
		// held before its last piece arrives.
		const { contentType, bytes } = await encodeUpload(photo("late.jpg"));
		let release = () => {};
		const held = new Promise<void>((resolve) => {
			release = resolve;
		});
		let reachedHold = () => {};
		const waiting = new Promise<void>((resolve) => {
			reachedHold = resolve;
		});
		let piece = 0;
		const body = new ReadableStream<Uint8Array>({
			async pull(controller) {
				piece += 1;
				if (piece === 1) {
					controller.enqueue(bytes.slice(0, 40));
					return;
				}

				reachedHold();
				await held;
				controller.enqueue(bytes.slice(40));
				controller.close();
			},
		});

		const ctx = createExecutionContext();
		const pending = worker.fetch(
			new IncomingRequest(`${BASE}/move-details/${booking.detailsToken}/files`, {
				method: "POST",
				// The size is declared, as a browser's is; without it the upload is
				// refused before any of it is read.
				headers: { "Content-Type": contentType, "Content-Length": String(bytes.byteLength) },
				body,
			}),
			env,
			ctx,
		);

		// While it waits, another upload takes the twelfth place.
		await waiting;
		await uploadedFile(booking.detailsToken, photo("photo-12.jpg"));
		release();

		const response = await pending;
		await waitOnExecutionContext(ctx);
		const payload = await response.json();

		expect(response.status).toBe(409);
		expect(payload).toEqual({ error: { message: "This enquiry already has 12 files" } });
		// The insert refused the late file, and its object was taken out of R2 again.
		expect(await storedKeys(booking.id)).toHaveLength(12);
		expect(await countRows("BookingFile")).toBe(12);
	});

	it("stores a file sent twice under the same id from the form only once", async () => {
		const booking = await createBooking();
		const send = () => uploadFile(booking.detailsToken, photo("sofa.jpg"), { clientId: "abc-123", thumb: THUMB });

		const first = await send();
		const firstPayload = await first.json<{ data: TestFile }>();
		expect(first.status).toBe(201);
		expect(firstPayload.data.clientId).toBe("abc-123");

		// The reply to the first was lost, so the form sends the file again.
		const second = await send();
		const secondPayload = await second.json<{ data: TestFile }>();
		expect(second.status).toBe(200);
		expect(secondPayload.data).toEqual(firstPayload.data);

		// Two attempts arriving together end up as one file as well.
		const together = await Promise.all([1, 2, 3].map(() => uploadFile(booking.detailsToken, photo("bed.jpg"), { clientId: "def-456" })));
		const ids = new Set<string>();
		for (const response of together) {
			expect([200, 201]).toContain(response.status);
			ids.add((await response.json<{ data: TestFile }>()).data.id);
		}
		expect(ids.size).toBe(1);

		expect(await countRows("BookingFile")).toBe(2);
		expect(await storedKeys(booking.id)).toHaveLength(2);

		// The same id on another enquiry is another file, and an id that is not
		// the shape the form makes is left out rather than stored.
		const other = await createOtherBooking();
		const elsewhere = await uploadedFile(other.detailsToken, photo("sofa.jpg"), { clientId: "abc-123" });
		expect(elsewhere.id).not.toBe(firstPayload.data.id);
		const odd = await uploadedFile(other.detailsToken, photo("odd.jpg"), { clientId: "not an id!" });
		expect(odd.clientId).toBeNull();

		// The customer's page is told each file's id, to match against what it
		// still has waiting on the device.
		const read = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}`);
		const listed = await read.json<{ data: { files: TestFile[] } }>();
		expect(listed.data.files.map((file) => file.clientId)).toEqual(["abc-123", "def-456"]);
	});

	it("answers the repeat of an upload with the stored file even when the enquiry is full", async () => {
		const booking = await createBooking();
		const stored: TestFile[] = [];
		for (let i = 1; i <= 12; i += 1) {
			const response = await uploadFile(booking.detailsToken, photo(`photo-${i}.jpg`), { clientId: `full-${i}` }, `full-${i}`);
			stored.push((await response.json<{ data: TestFile }>()).data);
			expect(response.status).toBe(201);
		}

		// The reply to the twelfth was lost and the form sends it again.
		const repeat = await uploadFile(booking.detailsToken, photo("photo-12.jpg"), { clientId: "full-12" }, "full-12");
		expect(repeat.status).toBe(200);
		expect(await repeat.json()).toEqual({ data: stored[11] });

		// A thirteenth file is still refused.
		const extra = await uploadFile(booking.detailsToken, photo("photo-13.jpg"), { clientId: "full-13" }, "full-13");
		await extra.arrayBuffer();
		expect(extra.status).toBe(409);
		expect(await countRows("BookingFile")).toBe(12);
	});

	it("refuses an upload that does not declare its size", async () => {
		const booking = await createBooking();
		const { contentType, bytes } = await encodeUpload(photo("streamed.jpg"));
		const body = new ReadableStream<Uint8Array>({
			start(controller) {
				controller.enqueue(bytes.slice(0, 40));
				controller.enqueue(bytes.slice(40));
				controller.close();
			},
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(
			new IncomingRequest(`${BASE}/move-details/${booking.detailsToken}/files`, {
				method: "POST",
				headers: { "Content-Type": contentType },
				body,
			}),
			env,
			ctx,
		);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(411);
		expect(await response.json()).toEqual({ error: { message: "The size of the upload must be declared" } });
		expect(await storedKeys(booking.id)).toEqual([]);
		expect(await countRows("BookingFile")).toBe(0);
	});

	it("rejects a file over 15 MB with 413", async () => {
		const booking = await createBooking();
		// One byte over, as a zero-filled buffer: nothing to generate or read.
		const file = new File([new Uint8Array(15 * 1024 * 1024 + 1)], "inventory.pdf", { type: "application/pdf" });
		const response = await uploadFile(booking.detailsToken, file);
		const payload = await response.json();

		expect(response.status).toBe(413);
		expect(payload).toEqual({ error: { message: "That file is larger than 15 MB" } });
		expect(await storedKeys(booking.id)).toEqual([]);
		expect(await countRows("BookingFile")).toBe(0);
	});

	it("refuses an oversized upload without reading it all", async () => {
		const booking = await createBooking();
		const url = `${BASE}/move-details/${booking.detailsToken}/files`;
		const headers = { "Content-Type": "multipart/form-data; boundary=x" };

		// A body that declares a size over the limit is refused before it is read.
		const declaredCtx = createExecutionContext();
		const declared = await worker.fetch(
			new IncomingRequest(url, {
				method: "POST",
				headers: { ...headers, "Content-Length": String(64 * 1024 * 1024) },
				body: "x",
			}),
			env,
			declaredCtx,
		);
		await waitOnExecutionContext(declaredCtx);
		const declaredPayload = await declared.json();
		expect(declared.status).toBe(413);
		expect(declaredPayload).toEqual({ error: { message: "Request body is too large" } });

		// A body that declares no size is not read at all. This one would be 64 MB
		// if it were read to the end.
		const megabyte = new Uint8Array(1024 * 1024);
		let sent = 0;
		const body = new ReadableStream<Uint8Array>({
			pull(controller) {
				if (sent < 64) {
					sent += 1;
					controller.enqueue(megabyte);
				} else {
					controller.close();
				}
			},
		});

		const streamedCtx = createExecutionContext();
		const streamed = await worker.fetch(new IncomingRequest(url, { method: "POST", headers, body }), env, streamedCtx);
		await waitOnExecutionContext(streamedCtx);
		const streamedPayload = await streamed.json();
		expect(streamed.status).toBe(411);
		expect(streamedPayload).toEqual({ error: { message: "The size of the upload must be declared" } });
		expect(sent).toBeLessThan(20);
	});

	it("keeps only a small JPEG preview, judged by the size the picture itself declares", async () => {
		const booking = await createBooking();
		const dropped = [
			"https://example.com/thumb.jpg",
			"data:text/html;base64,PHNjcmlwdD4=",
			"data:image/svg+xml;base64,PHN2Zz4=",
			// Only JPEG, which is what the form makes.
			"data:image/png;base64,iVBORw0KGgo=",
			'data:image/jpeg;base64,AAAA" onerror="alert(1)',
			`data:image/jpeg;base64,${"A".repeat(24_000)}`,
			// A JPEG that stops before it says how big it is.
			"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ==",
			// A few hundred characters describing a picture that would take
			// gigabytes to draw.
			jpegThumb(15000, 15000),
			jpegThumb(321, 100),
			jpegThumb(100, 321),
			jpegThumb(0, 100),
		];

		for (const thumb of dropped) {
			const file = await uploadedFile(booking.detailsToken, photo(), { thumb });
			expect(file.thumb, thumb.slice(0, 60)).toBeNull();
		}

		const other = await createOtherBooking();
		for (const thumb of [THUMB, jpegThumb(320, 320), jpegThumb(1, 1)]) {
			const kept = await uploadedFile(other.detailsToken, photo(), { thumb });
			expect(kept.thumb).toBe(thumb);
		}
	});

	it("deletes a file: the row and the object both go", async () => {
		const booking = await createBooking();
		const kept = await uploadedFile(booking.detailsToken, photo("keep.jpg"));
		const removed = await uploadedFile(booking.detailsToken, photo("remove.jpg"));
		await createFileLink(removed.id);

		const url = `${BASE}/move-details/${booking.detailsToken}/files/${removed.id}`;
		const response = await SELF.fetch(url, { method: "DELETE" });
		expect(response.status).toBe(204);

		expect(await storedKeys(booking.id)).toEqual([`move-details/${booking.id}/${kept.id}`]);
		const { results } = await env.DB.prepare("SELECT id FROM BookingFile").all<{ id: string }>();
		expect(results).toEqual([{ id: kept.id }]);
		expect(await countRows("FileLink")).toBe(0);

		// There is nothing left for a second delete to find.
		const again = await SELF.fetch(url, { method: "DELETE" });
		const againPayload = await again.json();
		expect(again.status).toBe(404);
		expect(againPayload).toEqual({ error: { message: "File not found" } });

		// A form that never heard back from an upload knows the file only by the
		// id it gave it, and can remove it by that. Only within its own enquiry.
		const other = await createOtherBooking();
		await uploadedFile(booking.detailsToken, photo("mine.jpg"), { clientId: "my-file-1" });
		const theirs = await uploadedFile(other.detailsToken, photo("theirs.jpg"), { clientId: "their-file-1" });

		const wrongBooking = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/their-file-1`, { method: "DELETE" });
		await wrongBooking.arrayBuffer();
		expect(wrongBooking.status).toBe(404);
		expect(await storedKeys(other.id)).toEqual([`move-details/${other.id}/${theirs.id}`]);

		const byClientId = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/my-file-1`, { method: "DELETE" });
		expect(byClientId.status).toBe(204);
		expect(await storedKeys(booking.id)).toEqual([`move-details/${booking.id}/${kept.id}`]);
	});

	it("never stores a removed file again, however its upload arrives", async () => {
		const booking = await createBooking();
		const removedMessage = { error: { message: "That file was removed" } };
		const stored = await uploadedFile(booking.detailsToken, photo("wrong-room.jpg"), { clientId: "photo-1" });

		const removed = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/${stored.id}`, { method: "DELETE" });
		expect(removed.status).toBe(204);

		// A copy waiting on another device, or a retry sent before the removal:
		// with the id in the address, and in the body only.
		const retry = await uploadFile(booking.detailsToken, photo("wrong-room.jpg"), { clientId: "photo-1" }, "photo-1");
		expect(retry.status).toBe(410);
		expect(await retry.json()).toEqual(removedMessage);
		const bodyOnly = await uploadFile(booking.detailsToken, photo("wrong-room.jpg"), { clientId: "photo-1" });
		expect(bodyOnly.status).toBe(410);
		await bodyOnly.arrayBuffer();

		expect(await countRows("BookingFile")).toBe(0);
		expect(await storedKeys(booking.id)).toEqual([]);

		// The same photo added again is a new file, under a new id.
		await uploadedFile(booking.detailsToken, photo("wrong-room.jpg"), { clientId: "photo-2" });
		expect(await countRows("BookingFile")).toBe(1);
	});

	it("keeps a file removed that is removed before its upload lands", async () => {
		const booking = await createBooking();

		// Removed by the form's id while the upload is still on its way: nothing to delete yet.
		const early = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/late-1`, { method: "DELETE" });
		expect(early.status).toBe(404);
		await early.arrayBuffer();

		const landed = await uploadFile(booking.detailsToken, photo(), { clientId: "late-1" }, "late-1");
		expect(landed.status).toBe(410);
		await landed.arrayBuffer();
		expect(await countRows("BookingFile")).toBe(0);
		expect(await storedKeys(booking.id)).toEqual([]);
	});

	it("keeps the note of a removed file to its own enquiry, and drops it with the enquiry", async () => {
		const booking = await createBooking();
		const other = await createOtherBooking();

		const removed = await SELF.fetch(`${BASE}/move-details/${booking.detailsToken}/files/shared-1`, { method: "DELETE" });
		await removed.arrayBuffer();
		await uploadedFile(other.detailsToken, photo(), { clientId: "shared-1" });

		const notes = () => env.DB.prepare("SELECT COUNT(*) AS count FROM BookingFileRemoved WHERE bookingId = ?1").bind(booking.id).first<{ count: number }>();
		expect((await notes())?.count).toBe(1);
		const deleted = await adminFetch(`/bookings/${booking.id}`, { method: "DELETE" });
		expect(deleted.status).toBe(204);
		expect((await notes())?.count).toBe(0);
	});

	it("does not delete a file through another booking's token", async () => {
		const booking = await createBooking();
		const other = await createOtherBooking();
		const file = await uploadedFile(booking.detailsToken);

		const response = await SELF.fetch(`${BASE}/move-details/${other.detailsToken}/files/${file.id}`, { method: "DELETE" });
		const payload = await response.json();

		expect(response.status).toBe(404);
		expect(payload).toEqual({ error: { message: "File not found" } });
		expect(await storedKeys(booking.id)).toEqual([`move-details/${booking.id}/${file.id}`]);
		expect(await countRows("BookingFile")).toBe(1);
	});

	it("creates a token for an older booking when the admin opens its move details", async () => {
		const id = await insertOldBooking();
		const response = await adminFetch(`/bookings/${id}/move-details`);
		const payload = await response.json<{ data: { token: string } }>();

		expect(response.status).toBe(200);
		expect(payload.data).toEqual({
			token: expect.stringMatching(TOKEN_SHAPE),
			details: null,
			updatedAt: null,
			submittedAt: null,
			files: [],
		});

		const row = await env.DB.prepare("SELECT detailsToken FROM Booking WHERE id = ?1").bind(id).first<{ detailsToken: string }>();
		expect(row?.detailsToken).toBe(payload.data.token);

		// The link it made works, and opening the booking again does not replace it.
		const link = await SELF.fetch(`${BASE}/move-details/${payload.data.token}`);
		await link.arrayBuffer();
		expect(link.status).toBe(200);

		const again = await adminFetch(`/bookings/${id}/move-details`);
		const againPayload = await again.json<{ data: { token: string } }>();
		expect(againPayload.data.token).toBe(payload.data.token);
	});

	it("does not give a lead a link just because the admin opened it", async () => {
		const lead = await createBooking({ status: "Abandoned" });
		const response = await adminFetch(`/bookings/${lead.id}/move-details`);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			data: { token: null, details: null, updatedAt: null, submittedAt: null, files: [] },
		});
		expect(await tokenInDatabase(lead.id)).toBeNull();

		// So the quote form can still finish the lead when its customer does.
		const finished = await adminFetch(`/bookings/${lead.id}`, {
			method: "PUT",
			headers: JSON_HEADERS,
			body: JSON.stringify({ status: "New", onlyIfLead: true }),
		});
		await finished.arrayBuffer();
		expect(finished.status).toBe(200);
	});

	it("shows the admin a booking's answers and files, and only with the PIN", async () => {
		const booking = await createBooking();
		await (await saveDetails(booking.detailsToken, COMPLETE_DETAILS)).arrayBuffer();
		const file = await uploadedFile(booking.detailsToken, photo(), { thumb: THUMB });

		const response = await adminFetch(`/bookings/${booking.id}/move-details`);
		const payload = await response.json();
		expect(response.status).toBe(200);
		expect(payload).toEqual({
			data: {
				token: booking.detailsToken,
				details: COMPLETE_DETAILS,
				updatedAt: expect.stringMatching(TIMESTAMP_SHAPE),
				submittedAt: null,
				files: [
					{
						id: file.id,
						name: "sofa.jpg",
						isImage: true,
						size: PHOTO_BYTES.byteLength,
						contentType: "image/jpeg",
						thumb: THUMB,
						createdAt: expect.stringMatching(TIMESTAMP_SHAPE),
					},
				],
			},
		});

		const unauthorised = await adminFetch(`/bookings/${booking.id}/move-details`, {}, null);
		await unauthorised.arrayBuffer();
		expect(unauthorised.status).toBe(401);

		const missing = await adminFetch("/bookings/no-such-booking/move-details");
		const missingPayload = await missing.json();
		expect(missing.status).toBe(404);
		expect(missingPayload).toEqual({ error: { message: "Booking not found" } });
	});

	it("opens a file through a short-lived link, with headers that stop it running as a page", async () => {
		const booking = await createBooking();
		const image = await uploadedFile(booking.detailsToken);
		const document = await uploadedFile(
			booking.detailsToken,
			new File(["%PDF-1.7"], "inventory.pdf", { type: "application/pdf" }),
		);
		// A name with a quote, a percent sign and a character outside ASCII, set
		// directly so the test does not depend on how a form upload escapes it.
		await env.DB.prepare("UPDATE BookingFile SET name = ?1 WHERE id = ?2").bind('Sofa "big" 100% €.jpg', image.id).run();

		const link = await createFileLink(image.id);
		expect(link.url).toMatch(/^https:\/\/example\.com\/file\/[A-Za-z0-9_-]{43}$/);
		expect(link.expiresAt).toMatch(TIMESTAMP_SHAPE);

		const lifetime = await env.DB.prepare(
			"SELECT (julianday(expiresAt) - julianday('now')) * 24 * 60 AS minutes FROM FileLink",
		).first<{ minutes: number }>();
		expect(lifetime!.minutes).toBeGreaterThan(4.8);
		expect(lifetime!.minutes).toBeLessThanOrEqual(5);

		const response = await SELF.fetch(link.url);
		const bytes = new Uint8Array(await response.arrayBuffer());
		expect(response.status).toBe(200);
		expect(bytes).toEqual(PHOTO_BYTES);
		expect(response.headers.get("Content-Type")).toBe("image/jpeg");
		expect(response.headers.get("Content-Disposition")).toBe(
			`inline; filename="Sofa _big_ 100_ _.jpg"; filename*=UTF-8''Sofa%20%22big%22%20100%25%20%E2%82%AC.jpg`,
		);
		expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
		expect(response.headers.get("Content-Security-Policy")).toBe("default-src 'none'; sandbox");
		expect(response.headers.get("Cache-Control")).toBe("private, no-store");
		expect(response.headers.get("Referrer-Policy")).toBe("no-referrer");
		expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();

		// Anything that is not an image downloads instead of opening in the browser.
		const documentLink = await createFileLink(document.id);
		const download = await SELF.fetch(documentLink.url);
		const downloaded = new TextDecoder().decode(await download.arrayBuffer());
		expect(download.status).toBe(200);
		expect(downloaded).toBe("%PDF-1.7");
		expect(download.headers.get("Content-Type")).toBe("application/pdf");
		expect(download.headers.get("Content-Disposition")).toBe(
			`attachment; filename="inventory.pdf"; filename*=UTF-8''inventory.pdf`,
		);
		expect(download.headers.get("X-Content-Type-Options")).toBe("nosniff");
		expect(download.headers.get("Content-Security-Policy")).toBe("default-src 'none'; sandbox");
	});

	it("answers 404 for an expired file link, the same as for one that never existed", async () => {
		const booking = await createBooking();
		const file = await uploadedFile(booking.detailsToken);
		const link = await createFileLink(file.id);

		await env.DB.prepare("UPDATE FileLink SET expiresAt = datetime('now', '-1 minute')").run();

		for (const url of [link.url, `${BASE}/file/${"A".repeat(43)}`, `${BASE}/file/not-a-token`]) {
			const response = await SELF.fetch(url);
			// Read before anything is asserted: if the link were wrongly honoured this
			// would be the file itself, and a body left unread stops the test runner
			// clearing its storage, which hides the failure that matters.
			const body = await response.text();

			expect(response.status, url).toBe(404);
			expect(JSON.parse(body)).toEqual({ error: { message: "File not found" } });
		}
	});

	it("only lets the admin create a file link, and only for a file that exists", async () => {
		const booking = await createBooking();
		const file = await uploadedFile(booking.detailsToken);

		const unauthorised = await adminFetch(`/files/${file.id}/link`, { method: "POST" }, null);
		await unauthorised.arrayBuffer();
		expect(unauthorised.status).toBe(401);

		const missing = await adminFetch("/files/no-such-file/link", { method: "POST" });
		const missingPayload = await missing.json();
		expect(missing.status).toBe(404);
		expect(missingPayload).toEqual({ error: { message: "File not found" } });

		expect(await countRows("FileLink")).toBe(0);
	});

	it("removes a booking's files from R2 when the booking is deleted", async () => {
		const booking = await createBooking();
		const other = await createOtherBooking();
		const file = await uploadedFile(booking.detailsToken);
		await uploadedFile(booking.detailsToken, new File(["%PDF-1.7"], "inventory.pdf", { type: "application/pdf" }));
		const otherFile = await uploadedFile(other.detailsToken);
		await createFileLink(file.id);
		// An object whose row was never written, as an upload that failed part-way
		// could leave behind.
		await env.UPLOADS.put(`move-details/${booking.id}/orphan`, "left behind");

		const response = await adminFetch(`/bookings/${booking.id}`, { method: "DELETE" });
		expect(response.status).toBe(204);

		expect(await storedKeys(booking.id)).toEqual([]);
		expect(await storedKeys(other.id)).toEqual([`move-details/${other.id}/${otherFile.id}`]);
		const { results } = await env.DB.prepare("SELECT bookingId FROM BookingFile").all<{ bookingId: string }>();
		expect(results).toEqual([{ bookingId: other.id }]);
		expect(await countRows("FileLink")).toBe(0);
	});

	it("deletes a customer's record with their last booking, and not before", async () => {
		const first = await createBooking();
		const second = await createBooking({ moveDate: "2026-11-02", reuseCustomer: true });
		const other = await createOtherBooking();
		const customers = async () =>
			(await env.DB.prepare("SELECT id FROM Customer ORDER BY id").all<{ id: string }>()).results.map((row) => row.id);
		expect(second.customer.id).toBe(first.customer.id);

		await (await adminFetch(`/bookings/${first.id}`, { method: "DELETE" })).arrayBuffer();
		// The customer still has a booking, so their record stays.
		expect(await customers()).toEqual([first.customer.id, other.customer.id].sort());

		await (await adminFetch(`/bookings/${second.id}`, { method: "DELETE" })).arrayBuffer();
		// Their last booking has gone, and their name, phone and email with it.
		expect(await customers()).toEqual([other.customer.id]);
	});

	it("removes the files of every booking when a customer is deleted", async () => {
		const first = await createBooking();
		// A second booking the office added for the same customer.
		const second = await createBooking({ moveDate: "2026-11-02", reuseCustomer: true });
		const other = await createOtherBooking();
		const file = await uploadedFile(first.detailsToken);
		await uploadedFile(second.detailsToken);
		await uploadedFile(other.detailsToken);
		await createFileLink(file.id);

		expect(second.customer.id).toBe(first.customer.id);

		const response = await adminFetch(`/customers/${first.customer.id}`, { method: "DELETE" });
		expect(response.status).toBe(204);

		expect(await storedKeys(first.id)).toEqual([]);
		expect(await storedKeys(second.id)).toEqual([]);
		expect(await storedKeys(other.id)).toHaveLength(1);
		const { results } = await env.DB.prepare("SELECT bookingId FROM BookingFile").all<{ bookingId: string }>();
		expect(results).toEqual([{ bookingId: other.id }]);
		expect(await countRows("FileLink")).toBe(0);
	});

	it("removes the files of purged abandoned leads, and expired file links, on the daily cron", async () => {
		const stale = await createBooking();
		const recent = await createOtherBooking();
		await uploadedFile(stale.detailsToken);
		const recentFile = await uploadedFile(recent.detailsToken);
		const expired = await createFileLink(recentFile.id);
		const live = await createFileLink(recentFile.id);

		await env.DB.prepare("UPDATE Booking SET status = 'Abandoned', createdAt = datetime('now', '-40 days') WHERE id = ?1")
			.bind(stale.id)
			.run();
		await env.DB.prepare("UPDATE FileLink SET expiresAt = datetime('now', '-1 minute') WHERE token = ?1")
			.bind(expired.url.split("/").pop()!)
			.run();

		const ctx = createExecutionContext();
		await worker.scheduled!({ scheduledTime: 0, cron: "0 3 * * *", noRetry() {} }, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(await storedKeys(stale.id)).toEqual([]);
		expect(await storedKeys(recent.id)).toEqual([`move-details/${recent.id}/${recentFile.id}`]);
		const { results: files } = await env.DB.prepare("SELECT bookingId FROM BookingFile").all<{ bookingId: string }>();
		expect(files).toEqual([{ bookingId: recent.id }]);
		const { results: links } = await env.DB.prepare("SELECT token FROM FileLink").all<{ token: string }>();
		expect(links).toEqual([{ token: live.url.split("/").pop() }]);
	});

	it("allows the live site's origin and still refuses an unknown one", async () => {
		const booking = await createBooking();
		const url = `${BASE}/move-details/${booking.detailsToken}`;

		for (const origin of ["https://www.birminghamremovals.uk", "https://birminghamremovals.uk", "http://localhost:3010"]) {
			const preflight = await SELF.fetch(url, {
				method: "OPTIONS",
				headers: { Origin: origin, "Access-Control-Request-Method": "PUT", "Access-Control-Request-Headers": "content-type" },
			});

			expect(preflight.status, origin).toBe(204);
			expect(preflight.headers.get("Access-Control-Allow-Origin")).toBe(origin);
			expect(preflight.headers.get("Access-Control-Allow-Methods")).toBe("GET, POST, PUT, DELETE, OPTIONS");
			// The admin PIN is never a header a browser may send.
			expect(preflight.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type, Authorization");
		}

		const allowed = await SELF.fetch(url, { headers: { Origin: "https://www.birminghamremovals.uk" } });
		await allowed.arrayBuffer();
		expect(allowed.status).toBe(200);
		expect(allowed.headers.get("Access-Control-Allow-Origin")).toBe("https://www.birminghamremovals.uk");

		for (const method of ["OPTIONS", "GET"]) {
			const refused = await SELF.fetch(url, { method, headers: { Origin: "https://birminghamremovals.uk.example.com" } });
			const payload = await refused.json();

			expect(refused.status, method).toBe(403);
			expect(refused.headers.get("Access-Control-Allow-Origin")).toBeNull();
			expect(payload).toEqual({ error: { message: "Origin is not allowed" } });
		}
	});
});
