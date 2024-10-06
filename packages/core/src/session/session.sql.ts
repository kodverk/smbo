import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { id, ulid } from "../drizzle/types";
import { userTable } from "../user/user.sql";

export const sessions = sqliteTable("sessions", {
  ...id,
  userId: ulid("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});
