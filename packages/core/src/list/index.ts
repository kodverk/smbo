import { createInsertSchema } from "drizzle-zod";
import { listItemTable, listTable } from "./list.sql";
import type { z } from "zod";
import { eq, type DB } from "../drizzle";
import { createID } from "../util/id";

export namespace List {
  export const Insert = createInsertSchema(listTable).omit({ id: true });
  export type Insert = z.infer<typeof Insert>;

  export async function create(db: DB, values: Insert) {
    const id = createID("list");
    await db.insert(listTable).values({
      id,
      ...values,
    });

    return id;
  }

  export async function many(db: DB, homeId: string) {
    const lists = await db.select().from(listTable).where(eq(listTable.homeId, homeId));

    return lists;
  }

  export async function get(db: DB, listId: string) {
    const list = await db
      .select()
      .from(listTable)
      .leftJoin(listItemTable, eq(listItemTable.listId, listTable.id))
      .where(eq(listTable.id, listId));

    return list;
  }
}
