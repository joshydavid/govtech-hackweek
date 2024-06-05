"use client";

import AnimatedLogoCloud from "@/components/AnimatedCloud";
import Tabs from "@/components/Tabs";
import { logos } from "@/data/logos";
import { TabsEnum, tabs } from "@/models/tabs";
import { useContext, useEffect } from "react";
import Camera from "./components/Camera";
import { NavigationContext } from "./context/NavigationContext";
import { Button } from "./components/Button";

export default function Home() {
  const { selected, setSelected } = useContext(NavigationContext);
  const { openCamera, setOpenCamera } = useContext(NavigationContext);

  useEffect(() => {
    if (selected === TabsEnum.SCAN) {
      setOpenCamera(true);
    }
  }, [selected, setOpenCamera]);

  const renderContent = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <div>
            <AnimatedLogoCloud logos={logos} />
          </div>
        );
      case TabsEnum.SCAN:
        return <Camera />;
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
      case TabsEnum.VERIFICATION:
        return (
          <div>
            <h1 className="text-left text-3xl font-semibold">
              {TabsEnum.VERIFICATION}
            </h1>
            <div className="mt-4 flex">
              {/* render info here */}
              <Button onClick={() => setSelected(TabsEnum.SCAN)}>Retake</Button>
            </div>
          </div>
        );
      default:
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden p-8">
      <div className="flex w-full justify-start">{renderHeader()}</div>
      <div className="mt-8 flex-grow">{renderContent()}</div>
      <div className="fixed bottom-0 flex w-full justify-center">
        {!openCamera && selected !== TabsEnum.VERIFICATION && (
          <Tabs
            tabsMapping={tabs}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
    </main>
  );
}
