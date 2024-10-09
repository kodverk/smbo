import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { User } from "../user";
import { Client } from "@libsql/client";

export function initializeLucia(client: Client) {
  const adapter = new LibSQLAdapter(client, {
    user: "users",
    session: "sessions",
  });

  return new Lucia(adapter, {
    getUserAttributes: (attr) => ({
      email: attr.email,
      emailVerified: attr.emailVerified,
    }),
  });
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: User.Select;
  }
}
