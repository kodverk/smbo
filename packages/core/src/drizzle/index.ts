import { drizzle } from "drizzle-orm/d1";
import { schema } from "../schema";
export * from "drizzle-orm";

export function createDB(client: D1Database) {
  return drizzle(client, { schema, logger: true });
}

export type DB = ReturnType<typeof createDB>;
