/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from "fs";
export default $config({
  app(input) {
    return {
      name: "smbo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "eu-north-1",
          profile: process.env.GITHUB_ACTIONS
            ? undefined
            : input.stage === "production"
              ? "smbo-production"
              : "smbo-dev",
        },
        random: true,
        tls: true,
      },
    };
  },
  async run() {
    const outputs = {};
    for (const value of readdirSync("./infra/")) {
      const result = await import("./infra/" + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
