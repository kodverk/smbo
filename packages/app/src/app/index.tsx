import { Link, Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { Screen } from "~/components/screen";
import { Stepper, StepperContent } from "~/components/stepper";
import { trpc } from "~/trpc/provider";

export default function Index() {
  const homes = trpc.home.homes.useQuery(undefined, {
    retry: false,
  });

  if (homes.isLoading) {
    return (
      <View>
        <Text>IsLoading</Text>
      </View>
    );
  }

  if (homes.error?.data?.code === "UNAUTHORIZED") {
    return <Redirect href="/(auth)" />;
  }

  if (homes.data?.length === 0) {
    return (
      <Screen>
        <CreateHome />
      </Screen>
    );
  }

  return (
    <Screen>
      <View>
        <Text className="text-neutral-200">hello world</Text>
        <Link href="/(auth)/">
          <Text className="text-neutral-200">Login</Text>
        </Link>
        <Link href="/(main)/homeid">
          <Text className="text-neutral-200">main</Text>
        </Link>
      </View>
    </Screen>
  );
}

function CreateHome() {
  return (
    <Stepper length={2}>
      <StepperContent index={0}>
        <View>
          <Text>
            Name of your home
          </Text>
        </View>
      </StepperContent>
      <StepperContent index={1}>
        <View>
          <Text>
            Name of your home
          </Text>
        </View>
      </StepperContent>
    </Stepper>
  )
}
