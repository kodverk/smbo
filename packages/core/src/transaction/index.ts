import { createInsertSchema } from "drizzle-zod";
import { sharedExpenseTable, transactionCategoryTable, transactionTable } from "./transaction.sql";
import { and, desc, eq, isNull, or, sum, type DB } from "../drizzle";
import { createID } from "../util/id";
import { z } from "zod";
import { userTable } from "../user/user.sql";

export namespace Transaction {
  export const Insert = createInsertSchema(transactionTable)
    .omit({ id: true })
    .and(z.object({ percentage: z.number() }));
  export type Insert = z.infer<typeof Insert>;

  export async function create(db: DB, values: Insert) {
    const transactionId = createID("transaction");
    const sharedExpenseId = createID("sharedExpense");

    await db.transaction(async (tx) => {
      await tx.insert(transactionTable).values({
        id: transactionId,
        ...values,
      });

      await tx.insert(sharedExpenseTable).values({
        id: sharedExpenseId,
        transactionId,
        userId: values.paidBy,
        settled: false,
        amountOwed: values.amount / values.percentage,
      });
    });

    return transactionId;
  }

  export async function get(
    db: DB,
    args: { userId: string; homeId: string; limit: number; offset: number },
  ) {
    const result = await db
      .select({
        id: transactionTable.id,
        amount: transactionTable.amount,
        description: transactionTable.description,
        category: transactionCategoryTable.name,
        paidBy: userTable.id,
        transactionDate: transactionTable.transactionDate,
        currency: transactionTable.currency,
      })
      .from(transactionTable)
      .leftJoin(userTable, eq(transactionTable.paidBy, userTable.id))
      .leftJoin(
        transactionCategoryTable,
        eq(transactionTable.categoryId, transactionCategoryTable.id),
      )
      .where(eq(transactionTable.homeId, args.homeId))
      .orderBy(desc(transactionTable.transactionDate)) // Sort by latest transaction date
      .limit(args.limit)
      .offset(args.offset);

    return result;
  }

  export async function totalOwed(db: DB, args: { userId: string; homeId: string }) {
    const result = await db
      .select({
        totalOwed: sum(sharedExpenseTable.amountOwed).as("totalOwed"),
        totalOwedToUser: sum(sharedExpenseTable.amountOwed).as("totalOwedToUser"),
      })
      .from(sharedExpenseTable)
      .leftJoin(transactionTable, eq(sharedExpenseTable.transactionId, transactionTable.id))
      .where(and(eq(transactionTable.homeId, args.homeId), isNull(sharedExpenseTable.settled)))
      .groupBy(sharedExpenseTable.userId, transactionTable.paidBy)
      .having(
        or(eq(sharedExpenseTable.userId, args.userId), eq(transactionTable.paidBy, args.userId)),
      );

    return {
      totalOwed: result[0]?.totalOwed ?? 0,
      totalOwedToUser: result[0]?.totalOwedToUser ?? 0,
    };
  }
}
