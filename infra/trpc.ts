import { allSecrets } from "./secrets";

const trpc = new sst.cloudflare.Worker("TRPC", {
  url: true,
  handler: "packages/trpc/src/handler.ts",
  link: [...allSecrets],
});

export const outputs = {
  trpc: trpc.url,
};
