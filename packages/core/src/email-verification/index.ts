import { and, DB, eq, getDrizzleResult, InferInsertModel } from "../drizzle";
import { generateRandomString, alphabet } from "oslo/crypto";
import { emailVerificationTable } from "./email-verification.sql";
import { createID } from "../util/id";
import { createDate, isWithinExpirationDate, TimeSpan } from "oslo";

export namespace EmailVerification {
  export type Insert = InferInsertModel<typeof emailVerificationTable>;
  export type Select = InferInsertModel<typeof emailVerificationTable>;

  export async function verifyCode(
    db: DB,
    values: Pick<Insert, "userId" | "code">,
  ) {
    const result = await db
      .select()
      .from(emailVerificationTable)
      .where(and(eq(emailVerificationTable.userId, values.userId)));

    const verification = getDrizzleResult(result);

    if (!verification) {
      return false;
    }

    if (verification.code !== values.code) {
      return false;
    }

    if (!isWithinExpirationDate(verification.expiresAt)) {
      return false;
    }

    if (verification.userId !== values.userId) {
      return false;
    }

    return true;
  }

  export async function invalidateAllForUser(db: DB, userId: string) {
    await db
      .delete(emailVerificationTable)
      .where(eq(emailVerificationTable.userId, userId));
  }

  export async function create(
    db: DB,
    values: Pick<Insert, "userId" | "email">,
  ) {
    const code = generateRandomString(6, alphabet("0-9"));
    const verificationId = createID("emailVerification");

    await db.insert(emailVerificationTable).values({
      id: verificationId,
      code,
      userId: values.userId,
      email: values.email,
      expiresAt: createDate(new TimeSpan(15, "m")),
    });

    return code;
  }
}
