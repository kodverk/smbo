import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Screen } from "~/components/screen";
import { trpc } from "~/trpc/provider";

export default function Index() {
  const homes = trpc.home.homes.useQuery(undefined, {
    retry: false,
  });

  if (homes.isLoading) {
    return (
      <View>
        <Text>IsLoading</Text>
      </View>
    );
  }

  if (homes.error.data?.code === "UNAUTHORIZED") {
    return <Redirect href="/(auth)" />;
  }

  if (homes.data?.length === 0) {
    return (
      <View>
        <Text>no homes found for user</Text>
      </View>
    );
  }

  return (
    <Screen>
      <View>
        <Text className="text-neutral-200">hello world</Text>
        <Link href="/(auth)/">
          <Text className="text-neutral-200">Login</Text>
        </Link>
        <Link href="/(main)/homeid">
          <Text className="text-neutral-200">main</Text>
        </Link>
      </View>
    </Screen>
  );
}
