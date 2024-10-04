import "../global.css";
import { Tabs } from "expo-router";
import { TRPCProvider } from "~/trpc/provider";

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" />
      </Tabs>
    </TRPCProvider>
  );
}
