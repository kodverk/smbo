import React from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Animated, {
  Easing,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
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
      <UpcomingCalendarEvents />
      <ShoppingList />
      <RecentExpenses />
      <ActionMenu />
    </View>
  );
}

const window = Dimensions.get("window");

function ActionMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const animatedRef = useAnimatedRef();
  const contentHeight = useSharedValue(0);

  const measureContent = React.useCallback(() => {
    runOnUI(() => {
      "worklet";
      const measured = measure(animatedRef);
      if (measured) {
        contentHeight.value = measured.height;
      }
    })();
  }, []);

  React.useEffect(() => {
    measureContent();
  }, []);

  const animatedValues = useDerivedValue(() => ({
    width: withSpring(isOpen ? window.width - 8 * 2 : 56, {
      mass: 1,
      stiffness: 300,
      damping: 40,
    }),
    height: withSpring(isOpen ? contentHeight.value : 56, {
      mass: 1,
      stiffness: 300,
      damping: 40,
    }),
    borderRadius: withSpring(isOpen ? 16 : 28, {
      damping: 15,
    }),
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: animatedValues.value.width,
    height: animatedValues.value.height,
    borderRadius: animatedValues.value.borderRadius,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    }),
    transform: [
      {
        translateY: withTiming(isOpen ? 0 : 20, {
          duration: 200,
          easing: Easing.inOut(Easing.ease),
        }),
      },
    ],
  }));

  function toggleOpen() {
    setIsOpen((prev) => !prev);
  }

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, { duration: 200 }),
    pointerEvents: isOpen ? "auto" : "none",
  }));

  return (
    <>
      <Animated.View
        className="bg-black/30"
        style={[{ ...StyleSheet.absoluteFillObject }, overlayStyle]}
      >
        <Pressable className="w-full h-full" onPress={toggleOpen} />
      </Animated.View>
      <Animated.View
        className="bg-neutral-300 absolute right-2 bottom-8 overflow-hidden z-10"
        style={[containerStyle]}
      >
        {!isOpen && (
          <Pressable
            className="absolute w-full h-full items-center justify-center"
            onPress={toggleOpen}
          >
            <Text className="text-neutral-800">X</Text>
          </Pressable>
        )}
        <Animated.View
          className="gap-y-2 p-2"
          ref={animatedRef}
          style={[contentStyle]}
        >
          <Pressable className="bg-neutral-200 px-3 py-4 rounded-xl flex-row gap-x-4">
            <View className="h-12 w-12 bg-blue-400 rounded-full" />
            <View>
              <Text className="text-neutral-800 font-medium text-xl">
                Transaction
              </Text>
              <Text>Add shared transactions</Text>
            </View>
          </Pressable>
          <Pressable className="bg-neutral-200 px-3 py-4 rounded-xl flex-row gap-x-4">
            <View className="h-12 w-12 bg-blue-400 rounded-full" />
            <View>
              <Text className="text-neutral-800 font-medium text-xl">
                Calendar
              </Text>
              <Text>Add shared calendar events</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </>
  );
}

function Summary() {
  return (
    <View className="px-4 py-3 gap-y-4">
      <Text className="text-neutral-200 text-3xl font-bold">
        Hägerstensvägen 295
      </Text>
      <View className="flex-row gap-x-4">
        {new Array(3).fill(null).map((_, i) => (
          <View key={i} className="gap-y-2 items-center">
            <View className="bg-neutral-800 w-12 h-12 rounded-full" />
            <Text className="text-neutral-200 text-md">Johanna</Text>
          </View>
        ))}
      </View>
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
          <Text className="text-neutral-400 text-xl">Snacks</Text>
          <Text className="text-neutral-400"> | </Text>
          <Text className="text-neutral-400 text-xl">Nödvändigheter</Text>
        </View>
        {new Array(3).fill(null).map((_, i) => (
          <View className="flex-row items-center gap-x-4">
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
