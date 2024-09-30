import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { createDB } from "@smbo/core/drizzle/index";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { Resource } from "sst";

interface CreateContextOptions extends FetchCreateContextFnOptions {
  d1: D1Database;
}

function createContext(opts: CreateContextOptions) {
  const db = createDB(opts.d1);
  return {
    db,
  };
}

const t = initTRPC.context<typeof createContext>().create();

const router = t.router({
  greet: t.procedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => {
      return "Hello" + input.name;
    }),
});

export type Router = typeof router;

export default {
  async fetch(req: Request): Promise<Response> {
    return fetchRequestHandler({
      router,
      req,
      endpoint: "/",
      createContext: (opts) => createContext({ ...opts, d1: Resource.D1 }),
    });
  },
};
