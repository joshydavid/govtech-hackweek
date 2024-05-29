"use client";

import AnimatedLogoCloud from "@/components/AnimatedCloud";
import Tabs from "@/components/Tabs";
import { TabsEnum, tabs } from "@/models/tabs";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string>(tabs[0].label);

  const renderContent = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <div>
            <AnimatedLogoCloud />;
          </div>
        );
      case TabsEnum.SCAN:
        return <div>Render Camera</div>;
      case TabsEnum.PROFILE:
        return <div>Profile Content</div>;
      default:
    }
  };

  const renderHeader = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <h1 className="font-semibold text-3xl text-left">
            {TabsEnum.REWARDS}
          </h1>
        );
      case TabsEnum.SCAN:
        return (
          <h1 className="font-semibold text-3xl text-left">{TabsEnum.SCAN}</h1>
        );
      case TabsEnum.PROFILE:
        return (
          <h1 className="font-semibold text-3xl text-left">
            {TabsEnum.PROFILE}
          </h1>
        );
      default:
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center p-8 overflow-hidden">
      <div className="flex w-full justify-start">{renderHeader()}</div>
      <div className="mt-8">{renderContent()}</div>
      <div className="items-center absolute bottom-0">
        <Tabs
          tabsMapping={tabs}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </main>
  );
}
