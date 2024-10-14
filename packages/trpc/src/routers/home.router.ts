import { Home } from "@smbo/core/home/index";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";

export const homeRouter = createTRPCRouter({
  get: privateProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const home = await Home.get(ctx.db, { id: input.id, userId: ctx.auth.user.id })

    return home
  }),
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
