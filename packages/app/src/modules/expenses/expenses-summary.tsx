import { formatRelative } from "date-fns";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { trpc, type RouterOutputs } from "~/trpc/provider";

export function ExpenseSummary() {
  return (
    <View className="bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 gap-y-8">
      <Owed />
      <ExpenseList />
      <Text className="text-emerald-400 font-medium text-lg text-center">See all</Text>
    </View>
  );
}

function ExpenseList() {
  const transactions = trpc.transactions.many.useQuery({
    offset: 0,
    limit: 10,
  });
  return (
    <FlatList
      data={transactions.data}
      renderItem={({ item }) => <ExpenseItem transaction={item} />}
    />
  );
}

function Owed() {
  const owed = trpc.transactions.totalOwed.useQuery();

  if (owed.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (owed.error) {
    return <Text>Error</Text>;
  }

  if (owed.data.totalOwed > owed.data.totalOwedToUser) {
    return (
      <View className="gap-y-2">
        <Text className="text-neutral-200 text-md">You are owed:</Text>
        <Text className="text-3xl font-bold text-green-500">+ 5600 kr</Text>
      </View>
    );
  }

  if (owed.data.totalOwed < owed.data.totalOwedToUser) {
    return (
      <View className="gap-y-2">
        <Text className="text-neutral-200 text-md">You owe:</Text>
        <Text className="text-3xl font-bold text-red-500">- 5600 kr</Text>
      </View>
    );
  }

  return (
    <View className="gap-y-2">
      <Text className="text-neutral-200 text-md">Score is settled:</Text>
      <Text className="text-3xl font-bold text-neutral-200">+ 0 kr</Text>
    </View>
  );
}

interface ExpenseItemProps {
  transaction: RouterOutputs["transactions"]["many"][number];
}

function ExpenseItem(props: ExpenseItemProps) {
  return (
    <View className="flex-row gap-x-4 items-center">
      <View className="rounded-3xl h-8 w-8 bg-orange-300" />
      <View className="flex-1">
        <View className="flex-row justify-between items-end">
          <Text className="text-gray-300 font-medium text-lg">{props.transaction.amount}</Text>
          <Text className="text-gray-200 text-lg">
            +{props.transaction.amount} {props.transaction.currency}
          </Text>
        </View>
        <Text className="text-gray-400">
          {formatRelative(props.transaction.transactionDate, new Date())}
        </Text>
      </View>
    </View>
  );
}
