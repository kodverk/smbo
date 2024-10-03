import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 8,
        paddingRight: insets.right + 8,
      }}
      className="bg-neutral-950 flex-1 gap-y-4"
    >
      <Summary />
      <UpcomingCalendarEvents />
      <RecentExpenses />
    </View>
  );
}

function ActionMenu() {
  return (
    <Pressable className="absolute">
      <Text>X</Text>
    </Pressable>
  );
}

function UpcomingCalendarEvents() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 @container">
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

function Summary() {
  return (
    <View className="bg-neutral-300 border border-neutral-500 rounded-lg px-4 py-3">
      <Text className="text-md">You are owed:</Text>
      <Text className="text-3xl font-bold text-green-500">+ 5600 kr</Text>
    </View>
  );
}

function RecentExpenses() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 gap-y-8">
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
