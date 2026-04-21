type BookingStatus = "New" | "Upcoming" | "Completed" | "Abandoned";

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
	createdAt: string;
	updatedAt: string;
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
	createdAt: string;
	updatedAt: string;
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
}

type UpdateBookingRequest = Partial<CreateBookingRequest> & {
	jobCost?: number | string | null;
	expenses?: number | string | null;
};

type NormalizedBookingRequest = Required<Omit<CreateBookingRequest, "bedrooms" | "price">> & {
	bedrooms: number;
	price: number | null;
};

type ApiResponse<T> = { data: T } | { error: { message: string; details?: Record<string, string> } };

const DEFAULT_ALLOWED_ORIGINS = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"https://birmingham-removals.vercel.app",
];
const BOOKING_STATUSES: BookingStatus[] = ["New", "Upcoming", "Completed", "Abandoned"];
const MAX_LIMIT = 100;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
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
					return listBookings(request, env, corsHeaders);
				}
				if (request.method === "POST") return createBooking(request, env, corsHeaders);
			}

			if (path === "/customers") {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				if (request.method === "GET") return listCustomers(env, corsHeaders);
			}

			const customerMatch = path.match(/^\/customers\/([^/]+)$/);
			if (customerMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				const id = decodeURIComponent(customerMatch[1]);

				if (request.method === "DELETE") return deleteCustomer(id, env, corsHeaders);
			}

			if (path === "/activity") {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				if (request.method === "GET") return listActivity(env, corsHeaders);
			}

			const bookingMatch = path.match(/^\/bookings\/([^/]+)$/);
			if (bookingMatch) {
				const adminResponse = requireAdmin(request, env, corsHeaders);
				if (adminResponse) return adminResponse;
				const id = decodeURIComponent(bookingMatch[1]);

				if (request.method === "GET") return getBooking(id, env, corsHeaders);
				if (request.method === "PUT") return updateBooking(id, request, env, corsHeaders);
				if (request.method === "DELETE") return deleteBooking(id, env, corsHeaders);
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
			b.bedrooms, b.extras, b.status, b.price, b.jobCost, b.expenses, b.profit,
			b.createdAt, b.updatedAt,
			c.fullName AS customerFullName, c.phone AS customerPhone, c.email AS customerEmail
		FROM Booking b
		INNER JOIN Customer c ON c.id = b.customerId
		WHERE (?1 IS NULL OR b.status = ?1)
		ORDER BY b.createdAt DESC
		LIMIT ?2 OFFSET ?3`,
	)
		.bind(status, limit, offset)
		.all<BookingRow>();

	return json({ data: results.map(toBooking) }, 200, corsHeaders);
}

async function getBooking(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const row = await findBooking(id, env);

	if (!row) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	return json({ data: toBooking(row) }, 200, corsHeaders);
}

async function createBooking(request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const body = await readJson<CreateBookingRequest>(request);
	const validation = validateCreateBooking(body);

	if (!validation.valid) {
		return json({ error: { message: "Invalid booking data", details: validation.errors } }, 400, corsHeaders);
	}

	const booking = normalizeCreateBooking(body);
	const matchingAbandoned = await findMatchingAbandonedBooking(booking, env);

	if (matchingAbandoned) {
		await updateCustomerFields(matchingAbandoned.customerId, booking, env);
		await updateBookingFields(matchingAbandoned.id, booking, env);

		await logActivity(env, {
			action: booking.status === "Abandoned" ? "lead.abandoned_captured" : "booking.created",
			details: JSON.stringify({
				summary:
					booking.status === "Abandoned"
						? `Abandoned lead updated for ${booking.fullName}`
						: `Abandoned lead converted to booking for ${booking.fullName}`,
				customer: { fullName: booking.fullName, phone: booking.phone, email: booking.email },
				moveType: booking.moveType,
				route: `${booking.fromPostcode} to ${booking.toPostcode}`,
			}),
			entityId: matchingAbandoned.id,
			actor: "api",
		});

		const updated = await findBooking(matchingAbandoned.id, env);
		return json({ data: toBooking(updated as BookingRow) }, 200, corsHeaders);
	}

	const customer = await findOrCreateCustomer(booking, env);
	const bookingId = crypto.randomUUID();

	await env.DB.prepare(
		`INSERT INTO Booking (
			id, customerId, moveType, fromPostcode, toPostcode, moveDate,
			bedrooms, extras, status, price
		) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`,
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
	return json({ data: toBooking(row as BookingRow) }, 201, corsHeaders);
}

async function updateBooking(id: string, request: Request, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const existing = await findBooking(id, env);

	if (!existing) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	const body = await readJson<UpdateBookingRequest>(request);
	const validation = validateUpdateBooking(body);

	if (!validation.valid) {
		return json({ error: { message: "Invalid booking data", details: validation.errors } }, 400, corsHeaders);
	}

	await updateCustomerFields(existing.customerId, body, env);
	await updateBookingFields(id, body, env);

	const updated = await findBooking(id, env);

	await logActivity(env, {
		action: "booking.updated",
		details: JSON.stringify({ summary: "Booking updated via API" }),
		entityId: id,
		actor: "api",
	});

	return json({ data: toBooking(updated as BookingRow) }, 200, corsHeaders);
}

async function deleteBooking(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const result = await env.DB.prepare("DELETE FROM Booking WHERE id = ?1").bind(id).run();

	if ((result.meta.changes ?? 0) === 0) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	await logActivity(env, {
		action: "booking.deleted",
		details: JSON.stringify({ summary: "Booking deleted via API" }),
		entityId: id,
		actor: "api",
	});

	return new Response(null, { status: 204, headers: corsHeaders });
}

async function listCustomers(env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const { results } = await env.DB.prepare(
		`SELECT
			c.id, c.fullName, c.phone, c.email, c.createdAt, c.updatedAt,
			COUNT(b.id) AS bookingCount
		FROM Customer c
		LEFT JOIN Booking b ON b.customerId = c.id
		GROUP BY c.id, c.fullName, c.phone, c.email, c.createdAt, c.updatedAt
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

	await env.DB.prepare("DELETE FROM Booking WHERE customerId = ?1").bind(id).run();
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

async function findBooking(id: string, env: Env): Promise<BookingRow | null> {
	return env.DB.prepare(
		`SELECT
			b.id, b.customerId, b.moveType, b.fromPostcode, b.toPostcode, b.moveDate,
			b.bedrooms, b.extras, b.status, b.price, b.jobCost, b.expenses, b.profit,
			b.createdAt, b.updatedAt,
			c.fullName AS customerFullName, c.phone AS customerPhone, c.email AS customerEmail
		FROM Booking b
		INNER JOIN Customer c ON c.id = b.customerId
		WHERE b.id = ?1`,
	)
		.bind(id)
		.first<BookingRow>();
}

async function findMatchingAbandonedBooking(booking: NormalizedBookingRequest, env: Env): Promise<BookingRow | null> {
	const { results } = await env.DB.prepare(
		`SELECT
			b.id, b.customerId, b.moveType, b.fromPostcode, b.toPostcode, b.moveDate,
			b.bedrooms, b.extras, b.status, b.price, b.jobCost, b.expenses, b.profit,
			b.createdAt, b.updatedAt,
			c.fullName AS customerFullName, c.phone AS customerPhone, c.email AS customerEmail
		FROM Booking b
		INNER JOIN Customer c ON c.id = b.customerId
		WHERE b.status = 'Abandoned'
		ORDER BY b.createdAt DESC
		LIMIT 100`,
	).all<BookingRow>();

	return results
		.map((row) => ({ row, score: abandonedLeadMatchScore(row, booking) }))
		.filter((item) => item.score > 0)
		.sort((a, b) => b.score - a.score)[0]?.row ?? null;
}

function abandonedLeadMatchScore(row: BookingRow, booking: NormalizedBookingRequest): number {
	const email = booking.email.toLowerCase();
	const rowEmail = row.customerEmail.toLowerCase();
	const phone = normalizePhone(booking.phone);
	const rowPhone = normalizePhone(row.customerPhone);

	const emailMatches = email.length > 0 && !isPendingEmail(rowEmail) && rowEmail === email;
	const phoneMatches = phone.length > 0 && rowPhone === phone;

	if (!emailMatches && !phoneMatches) return 0;

	let score = 50;
	if (emailMatches && phoneMatches) score += 25;
	if (row.fromPostcode.toUpperCase() === booking.fromPostcode.toUpperCase()) score += 5;
	if (row.toPostcode.toUpperCase() === booking.toPostcode.toUpperCase()) score += 5;
	if (row.moveDate === booking.moveDate) score += 5;
	if (row.moveType.toLowerCase() === booking.moveType.toLowerCase()) score += 3;
	if (row.bedrooms === booking.bedrooms) score += 2;

	return score;
}

function normalizePhone(value: string): string {
	const digits = value.replace(/\D/g, "");
	return digits.startsWith("44") ? `0${digits.slice(2)}` : digits;
}

function isPendingEmail(value: string): boolean {
	return /^abandoned_\d+@pending\.com$/i.test(value);
}

async function findOrCreateCustomer(booking: NormalizedBookingRequest, env: Env): Promise<{ id: string }> {
	const existing = await env.DB.prepare("SELECT id FROM Customer WHERE lower(email) = ?1 LIMIT 1")
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

	const id = crypto.randomUUID();
	await env.DB.prepare("INSERT INTO Customer (id, fullName, phone, email) VALUES (?1, ?2, ?3, ?4)")
		.bind(id, booking.fullName, booking.phone, booking.email.toLowerCase())
		.run();

	return { id };
}

async function updateCustomerFields(customerId: string, body: UpdateBookingRequest, env: Env): Promise<void> {
	const fields: { column: string; value: string }[] = [];

	if (body.fullName !== undefined) fields.push({ column: "fullName", value: body.fullName.trim() });
	if (body.phone !== undefined) fields.push({ column: "phone", value: body.phone.trim() });
	if (body.email !== undefined) fields.push({ column: "email", value: body.email.trim().toLowerCase() });

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

async function readJson<T>(request: Request): Promise<T> {
	const contentType = request.headers.get("Content-Type") ?? "";

	if (!contentType.includes("application/json")) {
		throw new HttpError("Content-Type must be application/json", 415);
	}

	try {
		return (await request.json()) as T;
	} catch {
		throw new HttpError("Request body must be valid JSON", 400);
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
	if ("status" in body && !isBookingStatus(body.status)) {
		errors.status = `Status must be one of: ${BOOKING_STATUSES.join(", ")}`;
	}

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

	if (body.jobCost !== undefined || body.expenses !== undefined) {
		const jobCost = normalizeNullableNumber(body.jobCost);
		const expenses = normalizeNullableNumber(body.expenses);
		fields.push({ column: "profit", value: (jobCost ?? 0) - (expenses ?? 0) });
	}

	return fields;
}

function toBooking(row: BookingRow): Booking {
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
		profit: row.profit,
		createdAt: row.createdAt,
		updatedAt: row.updatedAt,
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

	if (typeof value === "string" && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
		errors.email = "email must be valid";
	}
}

function validateRoutePostcode(
	value: unknown,
	field: string,
	errors: Record<string, string>,
	required: boolean,
): void {
	validateText(value, field, errors, { required, min: 2, max: 20 });

	if (typeof value !== "string" || !value.trim() || value.trim().toLowerCase() === "unknown") return;

	if (!/^[A-Z]{1,2}\d[A-Z\d]?(?:\s?\d[A-Z]{2})?$/i.test(value.trim())) {
		errors[field] = `${field} must be a valid UK postcode or postcode area`;
	}
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
	if (value === undefined || value === null || value === "") {
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
