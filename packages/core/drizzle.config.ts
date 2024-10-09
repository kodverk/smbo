import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
  strict: true,
  verbose: true,
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: Resource.TURSO_URL.value,
    authToken: Resource.TURSO_AUTH_TOKEN.value,
  },
  schema: "./src/**/*.sql.ts",
});
