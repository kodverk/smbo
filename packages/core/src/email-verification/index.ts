import { and, DB, eq, getDrizzleResult, InferInsertModel } from "../drizzle";
import { generateRandomString, alphabet } from "oslo/crypto";
import { emailVerificationTable } from "./email-verification.sql";
import { createID } from "../util/id";
import { createDate, isWithinExpirationDate, TimeSpan } from "oslo";

export namespace EmailVerification {
  export type Insert = InferInsertModel<typeof emailVerificationTable>;
  export type Select = InferInsertModel<typeof emailVerificationTable>;

  export function isValid(verification: Select) {
    return (
      verification.code === verification.code ||
      isWithinExpirationDate(verification.expiresAt)
    );
  }

  export async function get(db: DB, values: Pick<Insert, "userId" | "code">) {
    const result = await db
      .select()
      .from(emailVerificationTable)
      .where(
        and(
          eq(emailVerificationTable.userId, values.userId),
          eq(emailVerificationTable.code, values.code),
        ),
      );

    return getDrizzleResult(result);
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

    return verificationId;
  }
}
