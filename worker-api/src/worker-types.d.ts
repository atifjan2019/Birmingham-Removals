type D1Value = string | number | boolean | null | ArrayBuffer;

interface D1Result {
	success?: boolean;
	error?: string;
	meta: {
		changes?: number;
		[key: string]: unknown;
	};
}

interface D1ResultSet<T = unknown> extends D1Result {
	results: T[];
}

interface D1PreparedStatement {
	bind(...values: D1Value[]): D1PreparedStatement;
	first<T = unknown>(): Promise<T | null>;
	all<T = unknown>(): Promise<D1ResultSet<T>>;
	run(): Promise<D1Result>;
}

interface D1Database {
	prepare(query: string): D1PreparedStatement;
}

interface ExecutionContext {
	waitUntil(promise: Promise<unknown>): void;
	passThroughOnException(): void;
}

interface ExportedHandler<Env = unknown> {
	fetch(request: Request, env: Env, ctx: ExecutionContext): Response | Promise<Response>;
}
