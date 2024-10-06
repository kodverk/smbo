import { createTRPCRouter, privateProcedure } from "../trpc";

export const eventsRouter = createTRPCRouter({
  foo: privateProcedure.query(() => ({
    foo: "string",
  })),
});
