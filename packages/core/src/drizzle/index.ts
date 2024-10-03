import { drizzle } from "drizzle-orm/d1";
export * from "drizzle-orm";

export function createDB(client: D1Database) {
  return drizzle(client, { logger: true });
}

export type DB = ReturnType<typeof createDB>;
