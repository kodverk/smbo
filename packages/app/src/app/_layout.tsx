import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthStore } from "~/modules/auth/auth.store";
import { TRPCProvider } from "~/trpc/provider";

export default function RootLayout() {
  const authStoreHydrated = AuthStore.useHydrated();

  if (!authStoreHydrated) {
    return null;
  }

  return (
    <TRPCProvider>
      <StatusBar style="light" />
      <Stack initialRouteName="/(main)/" screenOptions={{ headerShown: false }} />
    </TRPCProvider>
  );
}
