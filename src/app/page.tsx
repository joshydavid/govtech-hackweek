"use client";

import Tabs from "@/components/Tabs";
import { TabsEnum, tabs } from "@/models/tabs";
import { useContext, useEffect } from "react";
import { FaGift, FaHeart } from "react-icons/fa";
import { Button } from "./components/Button";
import Camera from "./components/Camera";
import { NavigationContext } from "./context/NavigationContext";

export default function Home() {
  const { selected, setSelected } = useContext(NavigationContext);
  const { openCamera, setOpenCamera } = useContext(NavigationContext);
  const { capturedImage } = useContext(NavigationContext);
  const { userInfo } = useContext(NavigationContext);

  useEffect(() => {
    if (selected === TabsEnum.SCAN) {
      setOpenCamera(true);
    }
  }, [selected, setOpenCamera]);

  const renderContent = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <>
            <div className="mt-4 grid h-fit w-screen grid-cols-2 gap-4 divide-x bg-white p-6 text-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-bold">325</p>
                  <FaHeart />
                </div>
                <p className="text-sm">My Healthpoints</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-bold">0</p>
                  <FaGift />
                </div>
                <p className="text-sm">My Rewards</p>
              </div>
            </div>

            {/* <div>
              <AnimatedLogoCloud logos={logos} />
            </div> */}
          </>
        );
      case TabsEnum.SCAN:
        return <Camera />;
      default:
    }
  };

  const renderHeader = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <div className="fixed top-0 z-10 w-screen bg-blue-500 px-6 py-8 text-center text-sm font-semibold text-white">
            <p className="pb-2">Hey 👋🏻,</p>
            <p>{userInfo}</p>
          </div>
        );
      case TabsEnum.VERIFICATION:
        return (
          <div>
            <h1 className="h1-special">{TabsEnum.VERIFICATION}</h1>
            <div className="mt-20 flex pl-6">
              {/* render info here */}
              {capturedImage}
              <Button onClick={() => setSelected(TabsEnum.SCAN)}>Retake</Button>
            </div>
          </div>
        );
      default:
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden p-8">
      <div className="flex w-screen">{renderHeader()}</div>
      <div className="mt-16 flex-grow bg-gray-100">{renderContent()}</div>
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
