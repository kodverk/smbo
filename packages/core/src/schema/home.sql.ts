import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamps } from "./types";

export const homeTable = sqliteTable("home", {
  ...id,
  ...timestamps,
  name: text("name").notNull(),
});
