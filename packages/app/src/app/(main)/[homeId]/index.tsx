import React from "react";
import { ScrollView } from "react-native";
import { ActionMenu } from "~/components/action-menu";
import { Screen } from "~/components/screen";
import { CalendarSummary } from "~/modules/calendar/calendar-summary";
import { ExpenseSummary } from "~/modules/expenses/expenses-summary";
import { Header } from "~/modules/home/header";
import { ListsSummary } from "~/modules/lists/list-summary";

export default function Index() {
  return (
    <Screen>
      <Header />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 16,
        }}
      >
        <CalendarSummary />
        <ListsSummary />
        <ExpenseSummary />
      </ScrollView>
      <ActionMenu />
    </Screen>
  );
}
