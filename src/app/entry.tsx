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
  const [image, setImage] = useState<string>(tabs[0].label);
  const [receiptData, setReceiptData] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <NavigationContext.Provider
      value={{
        openCamera,
        setOpenCamera,
        selected,
        setSelected,
        image,
        setImage,
        capturedImage,
        setCapturedImage,
        receiptData,
        setReceiptData,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
