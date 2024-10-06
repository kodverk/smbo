import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { User } from "../user";

export function initializeLucia(d1: D1Database) {
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
