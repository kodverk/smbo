import { LucideIcon } from "lucide-react-native";
import { Text, Pressable, TextInput } from "react-native";
import { Icons } from "~/components/icons";
import { Screen } from "~/components/screen";
import { trpc } from "~/trpc/provider";

export default function AuthScreen() {
  const start = trpc.auth.start.useMutation();

  return (
    <Screen>
      <Text className="text-neutral-200">Your email address</Text>
      <TextInput
        keyboardType="email-address"
        className="text-neutral-200 text-lg bg-neutral-900 border border-neutral-800 rounded-lg px-5 py-2"
      />
      <Button>
        <ButtonText>Continue</ButtonText>
        <ButtonIconRight icon={Icons.SendHorizontal} />
      </Button>
      <Pressable className="px-5 py-4 bg-neutral-200 rounded-lg flex-row justify-between w-full">
        <Text className="text-neutral-800 font-medium text-lg">Continue</Text>
        <Icons.SendHorizontal className="text-neutral-800" />
      </Pressable>
    </Screen>
  );
}

function Button(props: React.PropsWithChildren) {
  return (
    <Pressable className="px-5 py-4 bg-neutral-200 rounded-lg flex-row justify-between w-full">
      {props.children}
    </Pressable>
  );
}

function ButtonIconRight(props: { icon: LucideIcon }) {
  const Icon = props.icon;
  return <Icon className="text-neutral-800" />;
}

function ButtonText(props: React.PropsWithChildren) {
  return (
    <Text className="text-neutral-800 font-medium text-lg">
      {props.children}
    </Text>
  );
}
