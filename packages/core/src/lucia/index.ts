import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { User } from "../user";
import { DB } from "../drizzle";

export function initializeLucia(d1: DB) {
  const adapter = new D1Adapter(d1, {
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
