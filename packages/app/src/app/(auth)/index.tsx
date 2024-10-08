import React from "react";
import { LucideIcon } from "lucide-react-native";
import { Text, Pressable, TextInput, View } from "react-native";
import { Icons } from "~/components/icons";
import { Screen } from "~/components/screen";
import { trpc } from "~/trpc/provider";
import { AuthStore } from "~/modules/auth/auth.store";
import { router } from "expo-router";
import { Stepper, StepperContent, useStepper } from "~/components/stepper";
import { Button, ButtonIconRight, ButtonText } from "~/components/button";

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
    onError() { },
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
    onError() { },
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


