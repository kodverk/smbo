import { createDB, createLibSQLClient } from "@smbo/core/drizzle/index";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Resource } from "sst";
import { initializeLucia } from "@smbo/core/lucia/index";
import { rootRouter } from "./routers/root.router";
import { createTRPCContext } from "./trpc";

export default {
  async fetch(req: Request): Promise<Response> {
    const client = createLibSQLClient({
      url: Resource.TURSO_URL.value,
      authToken: Resource.TURSO_AUTH_TOKEN.value,
    })

    const db = createDB(client);
    const lucia = initializeLucia(client);

    return fetchRequestHandler({
      router: rootRouter,
      req,
      endpoint: "/v0/trpc",
      createContext: (opts) => createTRPCContext({ ...opts, db, lucia }),
    });
  },
};
