"use client";

import { ReactNode, useState } from "react";
import { NavigationContext } from "./context/NavigationContext";
import { tabs } from "./models/tabs";

interface EntryProps {
  children: ReactNode;
}
export default function Entry({ children }: EntryProps) {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(tabs[0].label);

  return (
    <NavigationContext.Provider
      value={{ openCamera, setOpenCamera, selected, setSelected }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
