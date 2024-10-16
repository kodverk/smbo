import type { inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "../trpc";
import { authRouter } from "./auth.router";
import { homeRouter } from "./home.router";
import { listsRouter } from "./lists.router";
import { transactionsRouter } from "./transactions.router";
import { eventsRouter } from "./events.router";
import { userRouter } from "./user.router";

export const rootRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  home: homeRouter,
  lists: listsRouter,
  transactions: transactionsRouter,
  events: eventsRouter,
});

export type Router = typeof rootRouter;

export type RouterOutputs = inferRouterOutputs<Router>;
