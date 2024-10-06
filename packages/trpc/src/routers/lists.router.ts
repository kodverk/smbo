import { createTRPCRouter, privateProcedure } from "../trpc";

export const listsRouter = createTRPCRouter({
  foo: privateProcedure.query(() => ({
    foo: "string",
  })),
});
