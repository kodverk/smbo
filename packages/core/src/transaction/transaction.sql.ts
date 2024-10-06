import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp, timestamps, ulid } from "../drizzle/types";
import { userTable } from "../user/user.sql";
import { homeTable } from "../home/home.sql";

export const transactionTable = sqliteTable("transactions", {
  ...id,
  ...timestamps,
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  categoryId: ulid("category_id").references(() => transactionCategoryTable.id),
  homeId: ulid("home_id")
    .notNull()
    .references(() => homeTable.id),
  paidBy: ulid("paid_by")
    .notNull()
    .references(() => userTable.id),
  transactionDate: timestamp("transaction_date").notNull(),
});

export const transactionCategoryTable = sqliteTable("transaction_categories", {
  ...id,
  ...timestamps,
  emoji: text("emoji"),
  colorHex: text("color_hex"),
  homeId: ulid("home_id")
    .notNull()
    .references(() => homeTable.id),
  name: text("name").notNull(),
});

export const sharedExpenseTable = sqliteTable("shared_expenses", {
  ...id,
  ...timestamps,
  transactionId: ulid("transaction_id")
    .notNull()
    .references(() => transactionTable.id),
  userId: ulid("user_id")
    .notNull()
    .references(() => userTable.id),
  amountOwed: real("amount_owed").notNull(),
  settled: integer("settled", { mode: "boolean" }).notNull().default(false),
});
