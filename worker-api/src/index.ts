type BookingStatus = "new" | "contacted" | "quoted" | "booked" | "completed" | "cancelled";

interface BookingRow {
	id: string;
	status: BookingStatus;
	customer_name: string;
	email: string;
	phone: string;
	move_type: string;
	from_postcode: string;
	to_postcode: string;
	bedrooms: number | null;
	move_date: string | null;
	extras: string;
	message: string | null;
	created_at: string;
	updated_at: string;
}

interface Booking {
	id: string;
	status: BookingStatus;
	customerName: string;
	email: string;
	phone: string;
	moveType: string;
	fromPostcode: string;
	toPostcode: string;
	bedrooms: number | null;
	moveDate: string | null;
	extras: string[];
	message: string | null;
	createdAt: string;
	updatedAt: string;
}

interface CreateBookingRequest {
	customerName: string;
	email: string;
	phone: string;
	moveType: string;
	fromPostcode: string;
	toPostcode: string;
	bedrooms?: number | null;
	moveDate?: string | null;
	extras?: string[];
	message?: string | null;
}

type UpdateBookingRequest = Partial<CreateBookingRequest> & {
	status?: BookingStatus;
};

type ApiResponse<T> = { data: T } | { error: { message: string; details?: Record<string, string> } };

const DEFAULT_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];
const BOOKING_STATUSES: BookingStatus[] = ["new", "contacted", "quoted", "booked", "completed", "cancelled"];
const MAX_LIMIT = 100;

export default {
	async fetch(request, env): Promise<Response> {
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
							resources: ["/bookings"],
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
					return listBookings(request, env, corsHeaders);
				}

				if (request.method === "POST") {
					return createBooking(request, env, corsHeaders);
				}
			}

			const bookingMatch = path.match(/^\/bookings\/([^/]+)$/);
			if (bookingMatch) {
				const id = decodeURIComponent(bookingMatch[1]);

				if (request.method === "GET") {
					return getBooking(id, env, corsHeaders);
				}

				if (request.method === "PUT") {
					return updateBooking(id, request, env, corsHeaders);
				}

				if (request.method === "DELETE") {
					return deleteBooking(id, env, corsHeaders);
				}
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
		`SELECT * FROM bookings
		 WHERE (?1 IS NULL OR status = ?1)
		 ORDER BY created_at DESC
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
	const id = crypto.randomUUID();

	await env.DB.prepare(
		`INSERT INTO bookings (
			id, customer_name, email, phone, move_type, from_postcode, to_postcode,
			bedrooms, move_date, extras, message
		) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`,
	)
		.bind(
			id,
			booking.customerName,
			booking.email,
			booking.phone,
			booking.moveType,
			booking.fromPostcode,
			booking.toPostcode,
			booking.bedrooms,
			booking.moveDate,
			JSON.stringify(booking.extras),
			booking.message,
		)
		.run();

	const row = await findBooking(id, env);
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

	const fields = getUpdateFields(body);

	if (fields.length === 0) {
		return json({ error: { message: "No supported fields were provided" } }, 400, corsHeaders);
	}

	const assignments = fields.map((field, index) => `${field.column} = ?${index + 1}`);
	const values = fields.map((field) => field.value);

	await env.DB.prepare(
		`UPDATE bookings
		 SET ${assignments.join(", ")}, updated_at = datetime('now')
		 WHERE id = ?${values.length + 1}`,
	)
		.bind(...values, id)
		.run();

	const updated = await findBooking(id, env);
	return json({ data: toBooking(updated as BookingRow) }, 200, corsHeaders);
}

async function deleteBooking(id: string, env: Env, corsHeaders?: HeadersInit): Promise<Response> {
	const result = await env.DB.prepare("DELETE FROM bookings WHERE id = ?1").bind(id).run();

	if ((result.meta.changes ?? 0) === 0) {
		return json({ error: { message: "Booking not found" } }, 404, corsHeaders);
	}

	return new Response(null, { status: 204, headers: corsHeaders });
}

async function findBooking(id: string, env: Env): Promise<BookingRow | null> {
	return env.DB.prepare("SELECT * FROM bookings WHERE id = ?1").bind(id).first<BookingRow>();
}

function handleOptions(request: Request, env: Env): Response {
	const origin = request.headers.get("Origin");
	const corsHeaders = getCorsHeaders(origin, env);

	if (!corsHeaders) {
		return json({ error: { message: "Origin is not allowed" } }, 403);
	}

	return new Response(null, { status: 204, headers: corsHeaders });
}

function getCorsHeaders(origin: string | null, env: Env): HeadersInit | undefined {
	if (!origin) {
		return undefined;
	}

	const allowedOrigins = getAllowedOrigins(env);
	if (!allowedOrigins.includes(origin)) {
		return undefined;
	}

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
	return Response.json(payload, {
		status,
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
			...headers,
		},
	});
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

	validateText(body.customerName, "customerName", errors, { required: true, min: 2, max: 120 });
	validateEmail(body.email, errors, true);
	validateText(body.phone, "phone", errors, { required: true, min: 7, max: 30 });
	validateText(body.moveType, "moveType", errors, { required: true, min: 2, max: 80 });
	validateText(body.fromPostcode, "fromPostcode", errors, { required: true, min: 3, max: 20 });
	validateText(body.toPostcode, "toPostcode", errors, { required: true, min: 3, max: 20 });
	validateBedrooms(body.bedrooms, errors);
	validateMoveDate(body.moveDate, errors);
	validateExtras(body.extras, errors);
	validateText(body.message, "message", errors, { required: false, max: 2000 });

	return { valid: Object.keys(errors).length === 0, errors };
}

function validateUpdateBooking(body: unknown): { valid: boolean; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	if (!isRecord(body)) {
		return { valid: false, errors: { body: "Body must be a JSON object" } };
	}

	if ("status" in body && !isBookingStatus(body.status)) {
		errors.status = `Status must be one of: ${BOOKING_STATUSES.join(", ")}`;
	}
	if ("customerName" in body) validateText(body.customerName, "customerName", errors, { required: false, min: 2, max: 120 });
	if ("email" in body) validateEmail(body.email, errors, false);
	if ("phone" in body) validateText(body.phone, "phone", errors, { required: false, min: 7, max: 30 });
	if ("moveType" in body) validateText(body.moveType, "moveType", errors, { required: false, min: 2, max: 80 });
	if ("fromPostcode" in body) validateText(body.fromPostcode, "fromPostcode", errors, { required: false, min: 3, max: 20 });
	if ("toPostcode" in body) validateText(body.toPostcode, "toPostcode", errors, { required: false, min: 3, max: 20 });
	if ("bedrooms" in body) validateBedrooms(body.bedrooms, errors);
	if ("moveDate" in body) validateMoveDate(body.moveDate, errors);
	if ("extras" in body) validateExtras(body.extras, errors);
	if ("message" in body) validateText(body.message, "message", errors, { required: false, max: 2000 });

	return { valid: Object.keys(errors).length === 0, errors };
}

function normalizeCreateBooking(body: CreateBookingRequest): Required<CreateBookingRequest> {
	return {
		customerName: body.customerName.trim(),
		email: body.email.trim().toLowerCase(),
		phone: body.phone.trim(),
		moveType: body.moveType.trim(),
		fromPostcode: body.fromPostcode.trim().toUpperCase(),
		toPostcode: body.toPostcode.trim().toUpperCase(),
		bedrooms: body.bedrooms ?? null,
		moveDate: body.moveDate?.trim() || null,
		extras: body.extras ?? [],
		message: body.message?.trim() || null,
	};
}

function getUpdateFields(body: UpdateBookingRequest): { column: string; value: string | number | null }[] {
	const fields: { column: string; value: string | number | null }[] = [];

	if (body.status !== undefined) fields.push({ column: "status", value: body.status });
	if (body.customerName !== undefined) fields.push({ column: "customer_name", value: body.customerName.trim() });
	if (body.email !== undefined) fields.push({ column: "email", value: body.email.trim().toLowerCase() });
	if (body.phone !== undefined) fields.push({ column: "phone", value: body.phone.trim() });
	if (body.moveType !== undefined) fields.push({ column: "move_type", value: body.moveType.trim() });
	if (body.fromPostcode !== undefined) fields.push({ column: "from_postcode", value: body.fromPostcode.trim().toUpperCase() });
	if (body.toPostcode !== undefined) fields.push({ column: "to_postcode", value: body.toPostcode.trim().toUpperCase() });
	if (body.bedrooms !== undefined) fields.push({ column: "bedrooms", value: body.bedrooms });
	if (body.moveDate !== undefined) fields.push({ column: "move_date", value: body.moveDate?.trim() || null });
	if (body.extras !== undefined) fields.push({ column: "extras", value: JSON.stringify(body.extras) });
	if (body.message !== undefined) fields.push({ column: "message", value: body.message?.trim() || null });

	return fields;
}

function toBooking(row: BookingRow): Booking {
	return {
		id: row.id,
		status: row.status,
		customerName: row.customer_name,
		email: row.email,
		phone: row.phone,
		moveType: row.move_type,
		fromPostcode: row.from_postcode,
		toPostcode: row.to_postcode,
		bedrooms: row.bedrooms,
		moveDate: row.move_date,
		extras: parseExtras(row.extras),
		message: row.message,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

function parseExtras(value: string): string[] {
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
	if (value === undefined || value === null || value === "") {
		if (options.required) {
			errors[field] = `${field} is required`;
		}
		return;
	}

	if (typeof value !== "string") {
		errors[field] = `${field} must be a string`;
		return;
	}

	const trimmed = value.trim();
	if (options.min && trimmed.length < options.min) {
		errors[field] = `${field} must be at least ${options.min} characters`;
	}
	if (trimmed.length > options.max) {
		errors[field] = `${field} must be ${options.max} characters or fewer`;
	}
}

function validateEmail(value: unknown, errors: Record<string, string>, required: boolean): void {
	validateText(value, "email", errors, { required, max: 254 });

	if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
		errors.email = "email must be valid";
	}
}

function validateBedrooms(value: unknown, errors: Record<string, string>): void {
	if (value === undefined || value === null) {
		return;
	}

	if (!Number.isInteger(value) || value < 0 || value > 10) {
		errors.bedrooms = "bedrooms must be an integer between 0 and 10";
	}
}

function validateMoveDate(value: unknown, errors: Record<string, string>): void {
	if (value === undefined || value === null || value === "") {
		return;
	}

	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
		errors.moveDate = "moveDate must use YYYY-MM-DD format";
	}
}

function validateExtras(value: unknown, errors: Record<string, string>): void {
	if (value === undefined) {
		return;
	}

	if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length > 100) || value.length > 20) {
		errors.extras = "extras must be an array of up to 20 strings";
	}
}

function isBookingStatus(value: unknown): value is BookingStatus {
	return typeof value === "string" && BOOKING_STATUSES.includes(value as BookingStatus);
}

function clampNumber(value: number, min: number, max: number): number {
	if (!Number.isFinite(value)) {
		return min;
	}

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
