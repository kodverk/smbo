import React from "react";
import { Text, View } from "react-native";
import { HomeStore } from "../home/home.store";

export function ExpenseSummary() {
  const id = HomeStore.useSelectedId();
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 gap-y-8">
      <View className="gap-y-2">
        <Text className="text-neutral-200 text-md">You are owed:</Text>
        <Text className="text-3xl font-bold text-green-500">+ 5600 kr</Text>
      </View>
      {new Array(3).fill(null).map((_, i) => (
        <ExpenseContent key={i} />
      ))}
      <Text className="text-emerald-400 font-medium text-lg text-center">See all</Text>
    </View>
  );
}

function ExpenseContent() {
  return (
    <View className="flex-row gap-x-4 items-center">
      <View className="rounded-3xl h-8 w-8 bg-orange-300" />
      <View className="flex-1">
        <View className="flex-row justify-between items-end">
          <Text className="text-gray-300 font-medium text-lg">Hawaii Poke Sveavagen</Text>
          <Text className="text-gray-200 text-lg">+200 kr</Text>
        </View>
        <Text className="text-gray-400">Yesterday, 12:17</Text>
      </View>
    </View>
  );
}
