import { InferSelectModel, eq } from "drizzle-orm";
import { userTable } from "./user.sql";
import { DrizzleD1Database } from "drizzle-orm/d1";
import { DB, getDrizzleResult } from "../drizzle";
import { createID } from "../util/id";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export namespace User {
  export type Select = InferSelectModel<typeof userTable>;
  export const Insert = createInsertSchema(userTable, {
    emailVerified: z.boolean().optional(),
  }).omit({ id: true });
  export type Insert = z.infer<typeof Insert>;

  export async function get(db: DB, email: string) {
    const result = await db.select().from(userTable).where(eq(userTable.email, email));

    return getDrizzleResult(result);
  }

  export async function update(db: DB, userId: string, values: Partial<Insert>) {
    await db.update(userTable).set(values).where(eq(userTable.id, userId));
  }

  export async function create(db: DB, values: Insert) {
    const userId = createID("user");
    const result = await db
      .insert(userTable)
      .values({
        id: userId,
        ...values,
      })
      .returning();

    return getDrizzleResult(result);
  }

  export async function getOrCreate(db: DB, email: string) {
    const user = await get(db, email);
    if (user) {
      return user;
    }
    return create(db, { email });
  }
}
