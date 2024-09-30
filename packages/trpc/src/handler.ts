import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { createDB } from "@smbo/core/drizzle/index";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { Resource } from "sst";

function createContext(opts: FetchCreateContextFnOptions, d1: D1Database) {
  return {
    db: createDB(d1),
    ...opts,
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
      createContext: (opts) => createContext(opts, Resource.D1),
    });
  },
};
