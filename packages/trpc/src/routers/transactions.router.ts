import { createTRPCRouter, privateProcedure } from "../trpc";

export const transactionsRouter = createTRPCRouter({
  foo: privateProcedure.query(() => ({
    foo: "string",
  })),
});
