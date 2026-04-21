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
});
