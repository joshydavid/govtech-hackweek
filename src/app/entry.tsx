"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "./api/user";
import { LOGIN_PAGE } from "./constant";
import { NavigationContext } from "./context/NavigationContext";
import { tabs } from "./models/tabs";

interface EntryProps {
  children: ReactNode;
}
export default function Entry({ children }: EntryProps) {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(tabs[0].label);
  const [image, setImage] = useState<string>(tabs[0].label);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userInfo, setUserInfo] = useState<string>();
  const pathname = usePathname();

  const { data, error, isLoading } = useUser();

  useEffect(() => {
    if (data) {
      setUserInfo(data.userName);
    }
  }, [data, error, isLoading]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <NavigationContext.Provider
      value={{
        openCamera,
        setOpenCamera,
        selected,
        setSelected,
        userInfo,
        image,
        setImage,
        capturedImage,
        setCapturedImage,
      }}
    >
      {pathname === LOGIN_PAGE ? <>{children}</> : <>{children}</>}
    </NavigationContext.Provider>
  );
}
