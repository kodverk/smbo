import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInLeft, FadeOutRight } from "react-native-reanimated";
import { Icons } from "~/components/icons";

export function ListsSummary() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3">
      <View className="gap-y-8">
        <EmptyListHeader />
        <EmptyList />
      </View>
    </View>
  );
}

function EmptyListHeader() {
  return (
    <View className="justify-between flex-row items-end">
      <View className="flex-row gap-x-4 items-center">
        <Text className="text-neutral-200 font-medium text-xl">Todo</Text>
      </View>
      <CreateListButton />
    </View>
  );
}

function CreateListButton() {
  const [textVisible, setTextVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-row items-center gap-x-2">
      {textVisible && (
        <Animated.Text entering={FadeInLeft.delay(1000)} className="text-emerald-400">
          Create list
        </Animated.Text>
      )}
      <Icons.Plus className="text-emerald-400" />
    </View>
  );
}

function EmptyList() {
  return (
    <View className="flex-row items-center gap-x-4">
      <View className="bg-neutral-700 w-6 h-6 rounded-md" />
      <Text className="text-neutral-200 text-md">Create your first list</Text>
    </View>
  );
}

function ListHeader() {
  return (
    <View className="flex-row gap-x-4 items-center">
      <Text className="text-neutral-200 font-medium text-xl">Mat</Text>
      <Text className="text-neutral-400"> | </Text>
      <Text className="text-neutral-400 text-md">Snacks</Text>
      <Text className="text-neutral-400"> | </Text>
      <Text className="text-neutral-400 text-md">Nödvändigheter</Text>
      <Text className="text-neutral-400"> | </Text>
      <Text className="text-neutral-400 text-md">Städ</Text>
    </View>
  );
}

function ListItem() {
  return (
    <View className="flex-row items-center gap-x-4">
      <View className="bg-neutral-700 w-6 h-6 rounded-md" />
      <Text className="text-neutral-200 text-md">Nöfärs</Text>
    </View>
  );
}
