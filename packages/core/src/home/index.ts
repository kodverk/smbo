import { createInsertSchema } from "drizzle-zod";
import { eq, getTableColumns } from "drizzle-orm";
import type { DB } from "../drizzle";
import { createID } from "../util/id";
import { homeMemberTable, homeInvitationTable, homeTable } from "./home.sql";
import type { z } from "zod";

export namespace Home {
  export const Insert = createInsertSchema(homeTable).omit({ id: true });
  export type Insert = z.infer<typeof Insert>;

  export async function get(db: DB, values: { userId: string; id: string }) {
    return db.transaction(async (tx) => {
      const result = await tx
        .select()
        .from(homeTable)
        .leftJoin(homeMemberTable, eq(homeMemberTable.homeId, homeTable.id))
        .leftJoin(homeInvitationTable, eq(homeInvitationTable.homeId, homeTable.id))
        .where(eq(homeTable.id, values.id));

      if (result.length === 0) {
        return null;
      }

      const home = {
        ...result[0]?.home,
        members: result.map((r) => r.home_member),
        invitations: result.map((r) => r.home_invitation),
      };

      return home;
    });
  }

  export async function getAllForUser(db: DB, userId: string) {
    const result = await db
      .select(getTableColumns(homeTable))
      .from(homeTable)
      .innerJoin(homeMemberTable, eq(homeMemberTable.userId, userId));

    return result;
  }

  export async function create(db: DB, values: Insert) {
    return db.transaction(async (tx) => {
      const id = createID("home");

      await tx.insert(homeTable).values({
        id,
        ...values,
      });

      await tx.insert(homeMemberTable).values({
        homeId: id,
        userId: values.ownerId,
      });

      return id;
    });
  }
}
