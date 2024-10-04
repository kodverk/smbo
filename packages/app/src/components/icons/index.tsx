import { Plus, MoreHorizontal } from "lucide-react-native";
import { iconWithClassName } from "./icon-with-classname";

const Icons = {
  Plus,
  MoreHorizontal,
};

for (const icon of Object.values(Icons)) {
  iconWithClassName(icon);
}

export { Icons };
