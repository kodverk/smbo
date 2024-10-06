import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Screen } from "~/components/screen";

export default function Index() {
  return (
    <Screen>
      <View>
        <Text className="text-neutral-200">hello world</Text>
        <Link href="/(auth)/">
          <Text className="text-neutral-200">Login</Text>
        </Link>
      </View>
    </Screen>
  );
}
