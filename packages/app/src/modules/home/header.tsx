import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Icons } from "~/components/icons";
import { trpc } from "~/trpc/provider";

export function Header() {
  const params = useLocalSearchParams<{ homeId: string }>();

  const home = trpc.home.get.useQuery({
    id: params.homeId,
  });

  return (
    <View className="px-4 py-3 gap-y-4 w-full flex-row justify-between items-end">
      <View className="flex-row gap-x-4">
        <View className="w-8 h-8 rounded-3xl bg-fuchsia-300" />
        {home.data?.name && (
          <Text className="text-neutral-200 text-xl font-bold">{home.data.name}</Text>
        )}
      </View>
      <Icons.MoreHorizontal className="text-neutral-200" />
    </View>
  );
}
