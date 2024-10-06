import {
  List,
  Plus,
  Home,
  MoreHorizontal,
  Calendar,
  Banknote,
  HandCoins,
  CalendarHeart,
  ListTodo,
  SendHorizontal,
} from "lucide-react-native";
import { iconWithClassName } from "./icon-with-classname";

const Icons = {
  ListTodo,
  SendHorizontal,
  CalendarHeart,
  HandCoins,
  List,
  Home,
  Banknote,
  Calendar,
  Plus,
  MoreHorizontal,
};

for (const icon of Object.values(Icons)) {
  iconWithClassName(icon);
}

export { Icons };
