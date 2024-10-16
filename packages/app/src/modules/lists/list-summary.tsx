import React from "react";
import { Text, View } from "react-native";

export function ListsSummary() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3">
      <View className="gap-y-8">
        <View className="flex-row gap-x-4 items-center">
          <Text className="text-neutral-200 font-medium text-xl">Mat</Text>
          <Text className="text-neutral-400"> | </Text>
          <Text className="text-neutral-400 text-md">Snacks</Text>
          <Text className="text-neutral-400"> | </Text>
          <Text className="text-neutral-400 text-md">Nödvändigheter</Text>
          <Text className="text-neutral-400"> | </Text>
          <Text className="text-neutral-400 text-md">Städ</Text>
        </View>
        {new Array(3).fill(null).map((_, i) => (
          <View key={i} className="flex-row items-center gap-x-4">
            <View className="bg-neutral-700 w-6 h-6 rounded-md" />
            <Text className="text-neutral-200 text-md">Nöfärs</Text>
          </View>
        ))}

        <Text className="text-emerald-400 font-medium text-lg text-center">See all</Text>
      </View>
    </View>
  );
}
