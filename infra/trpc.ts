import { d1, database } from "./db";

const trpc = new sst.cloudflare.Worker("TRPC", {
  url: true,
  handler: "packages/trpc/src/handler.ts",
  link: [d1, database],
});

export const outputs = {
  trpc: trpc.url,
};
