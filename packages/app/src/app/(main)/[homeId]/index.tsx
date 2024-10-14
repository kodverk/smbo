import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { ActionMenu } from "~/components/action-menu";
import { Icons } from "~/components/icons";
import { Screen } from "~/components/screen";
import { trpc } from "~/trpc/provider";

export default function Index() {
  const { homeId } = useLocalSearchParams<{ homeId: string }>();

  const home = trpc.home.get.useQuery({
    id: homeId,
  });

  return (
    <Screen>
      <Header />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 16,
        }}
      >
        <UpcomingCalendarEvents />
        <ShoppingList />
        <RecentExpenses />
      </ScrollView>
      {/* <ActionMenu /> */}
    </Screen>
  );
}

function Header() {
  return (
    <View className="px-4 py-3 gap-y-4 w-full flex-row justify-between items-end">
      <View className="flex-row gap-x-4">
        <View className="w-8 h-8 rounded-3xl bg-fuchsia-300" />
        <Text className="text-neutral-200 text-xl font-bold">
          Hägerstensvägen 295
        </Text>
      </View>
      <Icons.MoreHorizontal className="text-neutral-200" />
    </View>
  );
}

function ShoppingList() {
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

        <Text className="text-emerald-400 font-medium text-lg text-center">
          See all
        </Text>
      </View>
    </View>
  );
}

function UpcomingCalendarEvents() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4">
      <View className="flex-row gap-x-4">
        <View>
          <Text className="text-neutral-200 text-lg">Thursday</Text>
          <Text className="text-neutral-200 text-3xl">03</Text>
        </View>
        <View className="gap-y-2 flex-1">
          {new Array(3).fill(null).map((_, i) => (
            <View key={i} className="bg-neutral-800 rounded-lg py-1 px-2">
              <Text className="text-neutral-400">Träning</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function RecentExpenses() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 gap-y-8">
      <View className="gap-y-2">
        <Text className="text-neutral-200 text-md">You are owed:</Text>
        <Text className="text-3xl font-bold text-green-500">+ 5600 kr</Text>
      </View>
      {new Array(3).fill(null).map((_, i) => (
        <ExpenseContent key={i} />
      ))}
      <Text className="text-emerald-400 font-medium text-lg text-center">
        See all
      </Text>
    </View>
  );
}

function ExpenseContent() {
  return (
    <View className="flex-row gap-x-4 items-center">
      <View className="rounded-3xl h-8 w-8 bg-orange-300" />
      <View className="flex-1">
        <View className="flex-row justify-between items-end">
          <Text className="text-gray-300 font-medium text-lg">
            Hawaii Poke Sveavagen
          </Text>
          <Text className="text-gray-200 text-lg">+200 kr</Text>
        </View>
        <Text className="text-gray-400">Yesterday, 12:17</Text>
      </View>
    </View>
  );
}
