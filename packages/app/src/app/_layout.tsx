import "../global.css";
import { Stack } from "expo-router";
import { AuthStore } from "~/modules/auth/auth.store";
import { TRPCProvider } from "~/trpc/provider";

export default function RootLayout() {
  const authStoreHydrated = AuthStore.useHydrated();

  if (!authStoreHydrated) {
    return null;
  }

  return (
    <TRPCProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TRPCProvider>
  );
}
