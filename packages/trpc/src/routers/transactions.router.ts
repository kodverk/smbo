import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { Transaction } from "@smbo/core/transaction/index";

export const transactionsRouter = createTRPCRouter({
  create: privateProcedure.input(Transaction.Insert).mutation(async ({ ctx, input }) => {
    const id = await Transaction.create(ctx.db, input);
    return id;
  }),
  totalOwed: privateProcedure
    .input(
      z.object({
        homeId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const totalOwed = await Transaction.totalOwed(ctx.db, {
        homeId: input.homeId,
        userId: ctx.auth.user.id,
      });
      return totalOwed;
    }),
  many: privateProcedure
    .input(
      z.object({
        homeId: z.string(),
        limit: z.number().min(1).max(50),
        offset: z.number().min(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const transactions = await Transaction.get(ctx.db, {
        userId: ctx.auth.user.id,
        homeId: input.homeId,
        limit: input.limit,
        offset: input.offset,
      });

      return transactions;
    }),
});
