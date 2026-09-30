interface Env {
	DB: D1Database;
	UPLOADS: R2Bucket;
	CORS_ORIGIN?: string;
	ADMIN_API_PIN?: string;
}

// The parts of the R2 binding this Worker uses. worker-types.d.ts is a
// hand-written subset of the runtime's types and has no R2 in it, so they are
// declared here, next to the binding that needs them.
interface R2HTTPMetadata {
	contentType?: string;
}

interface R2PutOptions {
	httpMetadata?: R2HTTPMetadata;
}

interface R2Object {
	readonly key: string;
	readonly size: number;
	readonly httpMetadata?: R2HTTPMetadata;
}

interface R2ObjectBody extends R2Object {
	readonly body: ReadableStream;
	arrayBuffer(): Promise<ArrayBuffer>;
	text(): Promise<string>;
}

interface R2ListOptions {
	prefix?: string;
	cursor?: string;
	limit?: number;
}

interface R2Objects {
	objects: R2Object[];
	truncated: boolean;
	cursor?: string;
}

interface R2Bucket {
	get(key: string): Promise<R2ObjectBody | null>;
	put(
		key: string,
		value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob | null,
		options?: R2PutOptions,
	): Promise<R2Object | null>;
	delete(keys: string | string[]): Promise<void>;
	list(options?: R2ListOptions): Promise<R2Objects>;
}
