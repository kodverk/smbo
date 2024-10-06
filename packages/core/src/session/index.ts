import { Lucia } from "lucia";
import { createID } from "../util/id";

type TokenType = {
  type: "bearer";
  header: string;
};

export namespace Session {
  export async function get(lucia: Lucia, token: TokenType) {
    function getSessionId() {
      switch (token.type) {
        case "bearer":
          return lucia.readBearerToken(token.header);
        default:
          return exhaustiveCheck(token.type);
      }
    }

    const sessionId = getSessionId();

    if (!sessionId) {
      return { session: null, user: null };
    }

    return lucia.validateSession(sessionId);
  }

  export async function create(lucia: Lucia, userId: string) {
    const id = createID("session");
    await lucia.createSession(
      userId,
      {},
      {
        sessionId: id,
      },
    );
    return id;
  }

  export async function invalidateForUser(lucia: Lucia, userId: string) {
    return lucia.invalidateUserSessions(userId);
  }
}

function exhaustiveCheck(value: never): never {
  throw new Error(`Unhandled token type: ${value}`);
}
