import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "../drizzle/types";

export const userTable = sqliteTable("users", {
  ...id,
  ...timestamps,
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  email: text("email").notNull().unique(),
});
