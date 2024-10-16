import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { createTRPCReact, httpBatchLink, loggerLink } from "@trpc/react-query";
import type { Router } from "@smbo/trpc/src/routers/root.router";
import superjson from "superjson";
import { AuthStore } from "~/modules/auth/auth.store";

export const trpc = createTRPCReact<Router>();

export function TRPCProvider(props: React.PropsWithChildren) {
  const [querClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${getBaseUrl()}/v0/trpc`,
          async headers() {
            const token = AuthStore.getToken();
            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "expo-react");
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={querClient}>
      <QueryClientProvider client={querClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export const getBaseUrl = () => {
  return "https://smbo-viktor-trpcscript.viktormalmedal.workers.dev";
};

export function isTRPCError(error) { }
