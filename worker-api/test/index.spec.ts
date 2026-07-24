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
			status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Upcoming', 'Completed', 'Abandoned')),
			price REAL,
			jobCost REAL,
			expenses REAL,
			profit REAL,
			createdAt TEXT NOT NULL DEFAULT (datetime('now')),
			updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
			FOREIGN KEY (customerId) REFERENCES Customer(id) ON DELETE CASCADE
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

	await env.DB.prepare("DELETE FROM ActivityLog").run();
	await env.DB.prepare("DELETE FROM Booking").run();
	await env.DB.prepare("DELETE FROM Customer").run();
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

	it("converts a matching abandoned lead instead of creating a duplicate booking", async () => {
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

		const abandonedResponse = await SELF.fetch("https://example.com/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...booking, status: "Abandoned" }),
		});
		const abandonedPayload = await abandonedResponse.json<{ data: { id: string; status: string } }>();

		expect(abandonedResponse.status).toBe(201);
		expect(abandonedPayload.data.status).toBe("Abandoned");

		const completedResponse = await SELF.fetch("https://example.com/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(booking),
		});
		const completedPayload = await completedResponse.json<{ data: { id: string; status: string } }>();

		expect(completedResponse.status).toBe(200);
		expect(completedPayload.data.id).toBe(abandonedPayload.data.id);
		expect(completedPayload.data.status).toBe("New");

		const { results } = await env.DB.prepare("SELECT id, status FROM Booking").all<{ id: string; status: string }>();

		expect(results).toHaveLength(1);
		expect(results[0]).toEqual({ id: abandonedPayload.data.id, status: "New" });
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
