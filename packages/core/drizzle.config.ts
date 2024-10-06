import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  strict: true,
  verbose: true,
  out: "./migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    token: Resource.D1_TOKEN.value,
    databaseId: Resource.D1Properties.id,
    accountId: Resource.D1Properties.accountId,
  },
  schema: "./src/**/*.sql.ts",
});
