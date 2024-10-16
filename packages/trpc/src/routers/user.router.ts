import { createTRPCRouter, privateProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  me: privateProcedure.query(async ({ ctx }) => {
    return ctx.auth.user;
  }),
});
