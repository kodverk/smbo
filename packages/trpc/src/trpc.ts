import { DB } from "@smbo/core/drizzle/index";
import superjson from "superjson";
import { initTRPC, TRPCError } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Session } from "@smbo/core/session/index";
import { initializeLucia } from "@smbo/core/lucia/index";

interface CreateContextOptions extends FetchCreateContextFnOptions {
  db: DB;
  lucia: ReturnType<typeof initializeLucia>;
}

export async function createTRPCContext(opts: CreateContextOptions) {
  const authHeader = opts.req.headers.get("Authorization") ?? "";

  const auth = await Session.get(opts.lucia, {
    type: "bearer",
    header: authHeader,
  });

  return {
    auth,
    db: opts.db,
    lucia: opts.lucia,
  };
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx?.auth.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(authMiddleware);

export const createTRPCRouter = t.router;
