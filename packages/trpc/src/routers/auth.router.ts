import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "..";
import { User } from "@smbo/core/user/index";
import { Email } from "@smbo/core/email/index";
import { EmailVerification } from "@smbo/core/email-verification/index";
import { TRPCError } from "@trpc/server";
import { Session } from "@smbo/core/session/index";

export const authRouter = createTRPCRouter({
  start: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await User.getOrCreate(ctx.db, input.email);

      if (!user) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      await EmailVerification.invalidateAllForUser(ctx.db, user.id);

      const code = await EmailVerification.create(ctx.db, {
        email: user.email,
        userId: user.id,
      });

      await Email.send({
        to: user.email,
        from: "viktor@sm.bo",
        subject: "Verify your email",
        body: `Your verification code is ${code}`,
      });

      const session = await Session.create(ctx.lucia, user.id);

      return session.id;
    }),

  verify: publicProcedure
    .input(
      z.object({
        code: z.string().length(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.auth.session) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const verification = await EmailVerification.get(ctx.db, {
        userId: ctx.auth.user.id,
        code: input.code,
      });

      await EmailVerification.invalidateAllForUser(ctx.db, ctx.auth.user.id);

      if (!verification) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      if (EmailVerification.isValid(verification)) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      await User.update(ctx.db, ctx.auth.user.id, { emailVerified: true });

      await Session.invalidateForUser(ctx.lucia, ctx.auth.user.id);

      const session = await Session.create(ctx.lucia, ctx.auth.user.id);

      return session.id;
    }),
});
