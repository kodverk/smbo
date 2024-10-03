import { DB } from "@smbo/core/drizzle/index";
import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { z } from "zod";

interface CreateContextOptions extends FetchCreateContextFnOptions {
  db: DB;
}

export function createTRPCContext(opts: CreateContextOptions) {
  return {
    db: opts.db,
  };
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const rootRouter = t.router({
  greet: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => {
      return "Hello" + input.name;
    }),
});

export type Router = typeof rootRouter;
