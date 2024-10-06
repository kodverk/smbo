import { Tabs } from "expo-router";
import { LucideIcon } from "lucide-react-native";
import { Icons } from "~/components/icons";

interface TabBarIconProps {
  icon: LucideIcon;
  color?: string;
  focused?: boolean;
  size?: number;
}

function TabBarIcon({ icon: Icon, size, focused }: TabBarIconProps) {
  return (
    <Icon
      size={size}
      className={focused ? "color-neutral-200" : "color-neutral-400"}
    />
  );
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#0a0a0a",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (props) => <TabBarIcon icon={Icons.Home} {...props} />,
        }}
      />
      <Tabs.Screen
        name="calendar/index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (props) => (
            <TabBarIcon icon={Icons.Calendar} {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses/index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (props) => (
            <TabBarIcon icon={Icons.Banknote} {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: (props) => <TabBarIcon icon={Icons.List} {...props} />,
        }}
      />
    </Tabs>
  );
}
