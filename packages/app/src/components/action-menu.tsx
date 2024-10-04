import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Icons } from "~/components/icons";
import { withHaptics } from "./with-haptics";

const window = Dimensions.get("window");

export function ActionMenu() {
  const isOpen = useSharedValue(false);
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
    width: withSpring(isOpen.value ? window.width - 8 * 2 : 56, {
      mass: 1,
      stiffness: 300,
      damping: 40,
    }),
    height: withSpring(isOpen.value ? contentHeight.value : 56, {
      mass: 1,
      stiffness: 300,
      damping: 40,
    }),
    borderRadius: withSpring(isOpen.value ? 16 : 28, {
      damping: 15,
    }),
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: animatedValues.value.width,
    height: animatedValues.value.height,
    borderRadius: animatedValues.value.borderRadius,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen.value ? 1 : 0, {
      duration: 200,
    }),
  }));

  const toggleOpen = withHaptics("soft", () => {
    isOpen.value = !isOpen.value;
  });

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen.value ? 1 : 0, { duration: 200 }),
    pointerEvents: isOpen.value ? "auto" : "none",
  }));

  const plusStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen.value ? 0 : 1, { duration: 200 }),
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
        className="bg-neutral-300 absolute right-8 bottom-12 overflow-hidden z-10"
        style={[containerStyle]}
      >
        <Pressable
          className="absolute w-full h-full items-center justify-center z-20 rounded-full"
          onPress={toggleOpen}
        >
          <Animated.View style={[plusStyle]}>
            <Icons.Plus className="text-neutral-800" />
          </Animated.View>
        </Pressable>
        <Animated.View
          ref={animatedRef}
          className="gap-y-2 p-2"
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
