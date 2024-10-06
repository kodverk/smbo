import React from "react";
import { LucideIcon } from "lucide-react-native";
import { Text, Pressable, TextInput, View } from "react-native";
import { Icons } from "~/components/icons";
import { Screen } from "~/components/screen";
import { trpc } from "~/trpc/provider";
import { AuthStore } from "~/modules/auth/auth.store";
import { router } from "expo-router";

export default function AuthScreen() {
  return (
    <Screen>
      <Stepper length={2}>
        <StepperContent index={0}>
          <EnterEmail />
        </StepperContent>
        <StepperContent index={1}>
          <EnterCode />
        </StepperContent>
        <StepperContent index={2}>
          <EnterCode />
        </StepperContent>
      </Stepper>
    </Screen>
  );
}

function EnterCode() {
  const { setToken } = AuthStore.useActions();
  const [code, setCode] = React.useState("");
  const start = trpc.auth.verify.useMutation({
    onSuccess(data) {
      setToken(data.id);
      router.push("/");
    },
    onError() {},
  });
  return (
    <View className="gap-y-4">
      <Text className="text-neutral-200">One time code</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        textContentType="oneTimeCode"
        className="text-neutral-200 text-lg bg-neutral-900 border border-neutral-800 rounded-lg px-5 py-2"
      />
      <Button
        onPress={() => {
          start.mutate({ code });
        }}
      >
        <ButtonText>Verify</ButtonText>
        <ButtonIconRight icon={Icons.LockOpen} />
      </Button>
    </View>
  );
}

function EnterEmail() {
  const { setToken } = AuthStore.useActions();
  const { setIndex } = useStepper();
  const [email, setEmail] = React.useState("viktor@malmedal.dev");
  const start = trpc.auth.start.useMutation({
    onSuccess(data) {
      setToken(data.id);
      setIndex((prev) => prev + 1);
    },
    onError() {},
  });
  return (
    <View className="gap-y-4">
      <Text className="text-neutral-200">Your email address</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="text-neutral-200 text-lg bg-neutral-900 border border-neutral-800 rounded-lg px-5 py-2"
      />
      <Button
        onPress={() => {
          start.mutate({ email });
        }}
      >
        <ButtonText>Continue</ButtonText>
        <ButtonIconRight icon={Icons.SendHorizontal} />
      </Button>
    </View>
  );
}

const StepperContext = React.createContext<{
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

interface StepperContentProps {
  index: number;
}

function useStepper() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return ctx;
}

function StepperContent(props: React.PropsWithChildren<StepperContentProps>) {
  const { index } = useStepper();

  if (index !== props.index) {
    return null;
  }
  return <View>{props.children}</View>;
}

interface StepperProps {
  length: number;
  activeIndex?: number;
}

function Stepper(props: React.PropsWithChildren<StepperProps>) {
  const [index, setIndex] = React.useState(props.activeIndex ?? 0);
  return (
    <StepperContext.Provider value={{ setIndex, index }}>
      <View className="flex-row gap-x-4 justify-center mb-8 items-center">
        {Array.from({ length: props.length }).map((_, i) => (
          <View
            key={i}
            className={`rounded-full ${
              i === index ? "bg-neutral-200 w-8 h-2" : "bg-neutral-400 w-4 h-2"
            }`}
          />
        ))}
      </View>
      {props.children}
    </StepperContext.Provider>
  );
}

interface ButtonProps {
  onPress: () => void;
}

function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <Pressable
      onPress={props.onPress}
      className="px-5 py-4 bg-neutral-200 rounded-lg flex-row justify-between w-full"
    >
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
