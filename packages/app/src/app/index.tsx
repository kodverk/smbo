import { Link, Redirect, router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Button, ButtonText } from "~/components/button";
import { Input } from "~/components/input";
import { Screen } from "~/components/screen";
import { Stepper, StepperContent, useStepper } from "~/components/stepper";
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
        {homes.data.map((home) => (
          <Link href={`/${home.id}`} className="p-2 border border-neutral-800 bg-neutral-900 rounded-md">
            <View className="flex-row gap-x-2 items-center">
              <View
                style={{ backgroundColor: home.colorHex }}
                className="h-4 w-4 rounded-md" />
              <Text className="text-neutral-200 text-lg">{home.name}</Text>
            </View>
          </Link>
        ))}
      </View>
    </Screen>
  );
}

interface State {
  name: string
  color: string
}

type Action = Partial<State>

function CreateHome() {
  const [state, setState] = React.useReducer(
    (prevState: State, payload: Action): State => ({
      ...prevState,
      ...payload,
    }),
    {
      color: '#facc15',
      name: 'Hägerstensvägen 295'
    }
  );


  return (
    <Stepper length={3}>
      <StepperContent index={0}>
        <HomeName name={state.name} setName={(name: string) => setState({ name })} />
      </StepperContent>
      <StepperContent index={1}>
        <HomeColor color={state.color} setColor={(color: string) => setState({ color })} />
      </StepperContent>
      <StepperContent index={2}>
        <HomeSummary color={state.color} name={state.name} />
      </StepperContent>
    </Stepper>
  )
}

interface HomeNameProps {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
}

function HomeName(props: HomeNameProps) {
  const { setIndex } = useStepper()

  return (<View className="gap-y-4">
    <Text className="text-neutral-200">
      Name of your home
    </Text>
    <Input
      value={props.name}
      onChangeText={props.setName}
    />
    <Button onPress={() => {
      setIndex((prev) => prev + 1)
    }}>
      <ButtonText>
        Continue
      </ButtonText>
    </Button>
  </View>
  )
}

interface HomeColorProps {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

const colors = [
  { bg: "bg-pink-400", border: "border-pink-300" },
  { bg: "bg-blue-400", border: "border-blue-300" },
  { bg: "bg-yellow-400", border: "border-yellow-300" },
  { bg: "bg-red-400", border: "border-red-300" },
  { bg: "bg-emerald-400", border: "border-emerald-300" },
  { bg: "bg-purple-400", border: "border-purple-300" },
  { bg: "bg-teal-400", border: "border-teal-300" },
  { bg: "bg-neutral-200", border: "border-neutral-300" }
]

function HomeColor(props: HomeColorProps) {
  const { setIndex } = useStepper()
  return (<View className="gap-y-4">
    <Text className="text-neutral-200">
      Choose a color for your home
    </Text>
    <View className="gap-4 flex-wrap flex-row">
      {colors.map((color) => (
        <View
          key={color.bg}
          className={`rounded-lg w-20 h-20 border-2 ${color.bg} ${color.border}`}
        />
      ))}
    </View>
    <Button onPress={() => {
      setIndex((prev) => prev + 1)
    }}>
      <ButtonText>
        Continue
      </ButtonText>
    </Button>
  </View>
  )
}

interface HomeSummaryProps {
  name: string
  color: string
}

function HomeSummary(props: HomeSummaryProps) {
  const { mutate } = trpc.home.create.useMutation({
    onSuccess(id) {
      router.push(`/${id}`)
    }
  })
  return (
    <View className="gap-4">
      <View className="gap-x-4 flex-row">
        <View
          style={{ backgroundColor: props.color }}
          className="w-8 h-8 rounded-md"
        />
        <Text className="text-2xl text-neutral-200 font-bold">
          {props.name}
        </Text>
      </View>
      <Button onPress={() => {
        mutate({ name: props.name, colorHex: props.color })
      }}>
        <ButtonText>
          Create home
        </ButtonText>
      </Button>

    </View>
  )
}
