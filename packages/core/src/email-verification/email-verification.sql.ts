import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp, timestamps, ulid } from "../drizzle/types";
import { userTable } from "../user/user.sql";

export const emailVerificationTable = sqliteTable("email-verifications", {
  ...id,
  ...timestamps,
  code: text("code", {
    length: 6,
  }).notNull(),
  userId: ulid("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
