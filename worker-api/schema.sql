CREATE TABLE IF NOT EXISTS bookings (
	id TEXT PRIMARY KEY,
	status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'booked', 'completed', 'cancelled')),
	customer_name TEXT NOT NULL,
	email TEXT NOT NULL,
	phone TEXT NOT NULL,
	move_type TEXT NOT NULL,
	from_postcode TEXT NOT NULL,
	to_postcode TEXT NOT NULL,
	bedrooms INTEGER CHECK (bedrooms IS NULL OR (bedrooms >= 0 AND bedrooms <= 10)),
	move_date TEXT,
	extras TEXT NOT NULL DEFAULT '[]',
	message TEXT,
	created_at TEXT NOT NULL DEFAULT (datetime('now')),
	updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings (email);
