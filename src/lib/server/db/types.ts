export interface Statement {
	text: string;
	params?: unknown[];
}

/** The little the app needs from Postgres; implemented for Neon and for local PGlite. */
export interface Db {
	query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
	/** Runs the statements atomically. Returns each statement's rows. */
	transaction(statements: Statement[]): Promise<Record<string, unknown>[][]>;
	/** Releases the connection; scripts call this so the process can exit. */
	close?(): Promise<void>;
}
