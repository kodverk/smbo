import { LucideIcon } from "lucide-react-native";
import { Pressable, Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
}

export function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <Pressable
      onPress={props.onPress}
      className="px-5 py-4 bg-neutral-200 rounded-lg flex-row justify-between w-full"
    >
      {props.children}
    </Pressable>
  );
}

export function ButtonIconRight(props: { icon: LucideIcon }) {
  const Icon = props.icon;
  return <Icon className="text-neutral-800" />;
}

export function ButtonText(props: React.PropsWithChildren) {
  return (
    <Text className="text-neutral-800 font-medium text-lg">
      {props.children}
    </Text>
  );
}
