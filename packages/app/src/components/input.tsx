import { TextInput, TextInputProps } from "react-native";

type InputProps = Omit<TextInputProps, "className">

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      className="text-neutral-200 text-lg bg-neutral-950 border border-neutral-800 rounded-lg px-5 py-2"
    />
  )
}
