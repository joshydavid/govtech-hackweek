"use client";

import AnimatedLogoCloud from "@/components/AnimatedCloud";
import Tabs from "@/components/Tabs";
import { logos } from "@/data/logos";
import { TabsEnum, tabs } from "@/models/tabs";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string>(tabs[0].label);

  const renderContent = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <div>
            <AnimatedLogoCloud logos={logos} />
          </div>
        );
      case TabsEnum.SCAN:
        return <div>Render Scan</div>;
      case TabsEnum.PROFILE:
        return <div>Profile Content</div>;
      default:
    }
  };

  const renderHeader = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <h1 className="text-left text-3xl font-semibold">
            {TabsEnum.REWARDS}
          </h1>
        );
      case TabsEnum.SCAN:
        return (
          <h1 className="text-left text-3xl font-semibold">{TabsEnum.SCAN}</h1>
        );
      case TabsEnum.PROFILE:
        return (
          <h1 className="text-left text-3xl font-semibold">
            {TabsEnum.PROFILE}
          </h1>
        );
      default:
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden p-8">
      <div className="flex w-full justify-start">{renderHeader()}</div>
      <div className="mt-8">{renderContent()}</div>
      <div className="absolute bottom-0 items-center">
        <Tabs
          tabsMapping={tabs}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </main>
  );
}
