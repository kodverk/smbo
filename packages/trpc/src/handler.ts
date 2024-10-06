import { createDB } from "@smbo/core/drizzle/index";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Resource } from "sst";
import { initializeLucia } from "@smbo/core/lucia/index";
import { rootRouter } from "./routers/root.router";
import { createTRPCContext } from "./trpc";

export default {
  async fetch(req: Request): Promise<Response> {
    if (!req.url.includes("/v0/trpc")) {
      return new Response("Hello world", { status: 200 });
    }

    const db = createDB(Resource.D1Database);
    const lucia = initializeLucia(Resource.D1Database);

    return fetchRequestHandler({
      router: rootRouter,
      req,
      endpoint: "/v0/trpc",
      createContext: (opts) => createTRPCContext({ ...opts, db, lucia }),
    });
  },
};
