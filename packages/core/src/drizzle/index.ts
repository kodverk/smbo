import { drizzle } from "drizzle-orm/d1";
export * from "drizzle-orm";

export function createDB(client: D1Database) {
  return drizzle(client, {
    logger:
      process.env.DRIZZLE_LOG === "true"
        ? {
            logQuery(query, params) {
              console.log("query", query);
              console.log("params", params);
            },
          }
        : undefined,
  });
}
