import "../global.css";
import { Stack } from "expo-router";
import { TRPCProvider } from "~/trpc/provider";

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TRPCProvider>
  );
}
