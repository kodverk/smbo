import { drizzle } from 'drizzle-orm/libsql';
import { Client, Config, createClient } from '@libsql/client/web';

export * from "drizzle-orm";

type DBConfig = Pick<Config, "authToken" | "url">

export function createLibSQLClient(config: DBConfig) {
  return createClient(config)
}

export function createDB(client: Client) {
  return drizzle(client, { logger: true });
}

export type DB = ReturnType<typeof createDB>;

export function getDrizzleResult<T>(result?: Array<T>): T | null {
  if (!result || result.length === 0) {
    return null;
  }

  return result[0]!;
}
