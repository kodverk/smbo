import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp, timestamps, ulid } from "../drizzle/types";
import { userTable } from "../user/user.sql";

export const eventTable = sqliteTable("events", {
  ...id,
  ...timestamps,
  title: text("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  createdBy: ulid("created_by")
    .notNull()
    .references(() => userTable.id),
});
