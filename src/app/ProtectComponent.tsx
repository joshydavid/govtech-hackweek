"use client";

import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import { LOGIN_PAGE } from "./constant";
import { NavigationContext } from "./context/NavigationContext";

interface ProtectComponentProps {
  children: React.ReactNode;
}

export default function ProtectComponent({ children }: ProtectComponentProps) {
  const { userInfo } = useContext(NavigationContext);

  useEffect(() => {
    if (!userInfo) {
      redirect(LOGIN_PAGE);
    }
    [userInfo];
  });

  return children;
}
