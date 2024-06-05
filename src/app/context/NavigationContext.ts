import { tabs } from "@/models/tabs";
import { createContext } from "react";

export const NavigationContext = createContext<any>({
  openCamera: false,
  setOpenCamera: () => {},
  selected: tabs[0].label,
  setSelected: () => {},
});
