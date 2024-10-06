/// <reference path="./.sst/platform/config.d.ts" />
import { readdirSync } from "fs";
export default $config({
  app(input) {
    return {
      name: "smbo",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
      providers: {
        random: true,
        tls: true,
        cloudflare: "5.40.0",
      },
    };
  },
  async run() {
    $transform(cloudflare.WorkerScript, (script) => {
      script.compatibilityFlags = ["nodejs_compat"];
      script.compatibilityDate = "2024-09-23";
    });
    const outputs = {};
    for (const value of readdirSync("./infra/")) {
      const result = await import("./infra/" + value);
      if (result.outputs) Object.assign(outputs, result.outputs);
    }
    return outputs;
  },
});
