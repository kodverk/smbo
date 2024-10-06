import { z } from "zod";
import { User } from "@smbo/core/user/index";
import { Email } from "@smbo/core/email/index";
import { EmailVerification } from "@smbo/core/email-verification/index";
import { TRPCError } from "@trpc/server";
import { Session } from "@smbo/core/session/index";
import { createTRPCRouter, publicProcedure } from "../trpc";

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

      const id = await Session.create(ctx.lucia, user.id);

      return { id };
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

      const validCode = await EmailVerification.verifyCode(ctx.db, {
        userId: ctx.auth.user.id,
        code: input.code,
      });

      if (!validCode) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await EmailVerification.invalidateAllForUser(ctx.db, ctx.auth.user.id);

      await User.update(ctx.db, ctx.auth.user.id, { emailVerified: true });

      await Session.invalidateForUser(ctx.lucia, ctx.auth.user.id);

      const id = await Session.create(ctx.lucia, ctx.auth.user.id);

      return { id };
    }),
});
