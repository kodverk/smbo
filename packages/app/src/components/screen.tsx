import type React from "react";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen(props: React.PropsWithChildren) {
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
      {props.children}
    </View>
  );
}
