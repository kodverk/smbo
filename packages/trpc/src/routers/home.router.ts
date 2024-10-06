import { Home } from "@smbo/core/home/index";
import { createTRPCRouter, privateProcedure } from "../trpc";

export const homeRouter = createTRPCRouter({
  create: privateProcedure
    .input(Home.Insert.omit({ ownerId: true }))
    .mutation(async ({ ctx, input }) => {
      const homeId = await Home.create(ctx.db, {
        ...input,
        ownerId: ctx.auth.user.id,
      });

      return homeId;
    }),
  homes: privateProcedure.query(async ({ ctx }) => {
    const homes = await Home.getAllForUser(ctx.db, ctx.auth.user.id);

    return homes;
  }),
});
