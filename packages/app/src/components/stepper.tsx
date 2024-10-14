import React from "react";
import { View } from "react-native";

const StepperContext = React.createContext<{
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

interface StepperContentProps {
  index: number;
}

export function useStepper() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return ctx;
}

export function StepperContent(props: React.PropsWithChildren<StepperContentProps>) {
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

export function Stepper(props: React.PropsWithChildren<StepperProps>) {
  const [index, setIndex] = React.useState(props.activeIndex ?? 0);
  return (
    <StepperContext.Provider value={{ setIndex, index }}>
      <View className="flex-row gap-x-4 justify-center mb-8 items-center">
        {Array.from({ length: props.length }).map((_, i) => (
          <View
            key={i}
            className={`rounded-full ${i === index ? "bg-neutral-200 w-8 h-2" : "bg-neutral-400 w-4 h-2"
              }`}
          />
        ))}
      </View>
      <View className="flex-1">
        {props.children}
      </View>
    </StepperContext.Provider>
  );
}
