import { drizzle } from "drizzle-orm/d1";

export * from "drizzle-orm";

export function createDB(client: D1Database) {
  return drizzle(client, { logger: true });
}

export type DB = ReturnType<typeof createDB>;

export function getDrizzleResult<T>(result?: Array<T>): T | null {
  if (!result || result.length === 0) {
    return null;
  }

  return result[0]!;
}
