import { d1 } from "./db";

const trpc = new sst.cloudflare.Worker("TRPC", {
  url: true,
  handler: "packages/trpc/src/handler.ts",
  link: [d1],
});

export const outputs = {
  trpc: trpc.url,
};
