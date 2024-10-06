import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  id,
  timestamp,
  timestampDefaultNow,
  timestamps,
  ulid,
} from "../drizzle/types";
import { userTable } from "../user/user.sql";

export const homeTable = sqliteTable("home", {
  ...id,
  ...timestamps,
  name: text("name").notNull(),
  ownerId: ulid("owner_id")
    .notNull()
    .references(() => userTable.id),
  description: text("description"),
  colorHex: text("color_hex", {
    length: 7,
  }),
});

export const homeInvitationTable = sqliteTable("home_invitation", {
  ...id,
  ...timestamps,
  token: text("token").notNull(),
  homeId: ulid("home_id")
    .notNull()
    .references(() => homeTable.id),
  inviterId: ulid("inviter_id")
    .notNull()
    .references(() => userTable.id),
  inviteeId: ulid("invitee_id")
    .notNull()
    .references(() => userTable.id),
  status: text("status", { enum: ["pending", "accepted", "declined"] })
    .notNull()
    .default("pending"),
});

export const homeMemberTable = sqliteTable(
  "home_member",
  {
    homeId: ulid("home_id")
      .notNull()
      .references(() => homeTable.id),
    userId: ulid("user_id")
      .notNull()
      .references(() => userTable.id),
    joinedAt: timestamp("joined_at").notNull().default(timestampDefaultNow),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.homeId, table.userId] }),
  }),
);
