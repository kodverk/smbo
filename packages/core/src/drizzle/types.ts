import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

export const ulid = (name: string) => text(name, { length: 26 + 4 });

export const id = {
  get id() {
    return ulid("id").primaryKey();
  },
};

export const timestamp = (name: string) => integer(name, { mode: "timestamp" });
export const timestampDefaultNow = sql`(unixepoch())`;

export const timestamps = {
  createdAt: timestamp("time_created").notNull().default(timestampDefaultNow),
  updatedAt: timestamp("time_updated").notNull().default(timestampDefaultNow),
};
