import React from "react";
import { Text, View } from "react-native";
import { Button, ButtonText } from "~/components/button";

function getDayDatePadded(today = new Date()) {
  return today.getDate().toString().padStart(2, "0");
}

function getDayName(today = new Date()) {
  return today.toLocaleDateString("en-US", { weekday: "long" });
}

export function CalendarSummary() {
  const today = React.useMemo(
    () => ({
      number: getDayDatePadded(),
      name: getDayName(),
    }),
    [],
  );
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4">
      <View className="flex-row gap-x-4">
        <View>
          <Text className="text-neutral-200 text-lg">{today.name}</Text>
          <Text className="text-neutral-200 text-3xl">{today.number}</Text>
        </View>
        <EmptyCalendar />
      </View>
    </View>
  );
}

function CalendarItem() {
  return (
    <View className="bg-neutral-800 rounded-lg py-1 px-2">
      <Text className="text-neutral-400">Träning</Text>
    </View>
  );
}

function EmptyCalendar() {
  return (
    <View className="gap-y-2 flex-1 items-center justify-center">
      <Text className="text-neutral-400">This looks empty...</Text>
    </View>
  );
}
