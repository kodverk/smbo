import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamps, ulid } from "../drizzle/types";
import { homeTable } from "../home/home.sql";
import { userTable } from "../user/user.sql";

export const listTable = sqliteTable("lists", {
  ...id,
  ...timestamps,
  homeId: text("home_id")
    .notNull()
    .references(() => homeTable.id),
  type: text("type", { enum: ["shopping", "todo"] }).notNull(),
  name: text("name").notNull(),
  createdBy: ulid("created_by")
    .notNull()
    .references(() => userTable.id),
});

export const listItemTable = sqliteTable("list_items", {
  ...id,
  ...timestamps,
  listId: ulid("list_id")
    .notNull()
    .references(() => listTable.id),
  name: text("name").notNull(),
  isCompleted: integer("is_completed", { mode: "boolean" }),
  quantity: integer("quantity"),
});
