import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";
import { eventTable } from "./event.sql";
import type { DB } from "../drizzle";
import { createID } from "../util/id";

export namespace Event {
  export const Insert = createInsertSchema(eventTable).omit({ id: true });
  export type Insert = z.infer<typeof Insert>;

  export async function create(db: DB, values: Insert) {
    const id = createID("event");

    await db.insert(eventTable).values({
      id,
      ...values,
    });

    return id;
  }
}
