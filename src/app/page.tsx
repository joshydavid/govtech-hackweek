"use client";

import Tabs from "@/components/Tabs";
import { TabsEnum, tabs } from "@/models/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaGift, FaHeart } from "react-icons/fa";
import { Button } from "./components/Button";
import Camera from "./components/Camera";
import { REWARD_PAGE } from "./constant";
import { NavigationContext } from "./context/NavigationContext";
import { HowItWorks } from "./data/howItWorks";
import { cn } from "./lib/utils";

export default function Home() {
  const { selected, setSelected } = useContext(NavigationContext);
  const { openCamera, setOpenCamera } = useContext(NavigationContext);
  const { userInfo } = useContext(NavigationContext);
  const { receiptData } = useContext(NavigationContext);

  const router = useRouter();

  const handleSubmission = () => {
    router.push(REWARD_PAGE);
  };

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
                  <FaHeart color="red" />
                </div>
                <p className="text-sm">My Healthpoints</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-bold">0</p>
                  <FaGift color="green" />
                </div>
                <p className="text-sm">My Rewards</p>
              </div>
            </div>

            <h3 className="text-h3 my-8 pl-16 font-bold">How it works</h3>
            <div className="flex flex-col gap-12 px-16 pb-28 lg:flex-row lg:justify-evenly lg:gap-4 lg:p-12 lg:pb-60">
              {HowItWorks.map(({ id, instruction, image }) => (
                <div
                  className="flex flex-col items-start gap-3 rounded-lg bg-white p-8"
                  key={id}
                >
                  <div className="mb-4 flex min-h-[200px] justify-center">
                    <Image src={image} alt={String(id)} />
                  </div>
                  <p className="text-body">{instruction}</p>
                </div>
              ))}
            </div>
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
            <div className="fixed top-0 z-10 w-screen bg-blue-500 px-6 py-8 text-center text-lg font-semibold text-white">
              <p>
                Healthier Choices Spotted <span className="pl-2">🥬</span>
              </p>
            </div>
            <div
              className={cn(
                "mx-auto mt-20 flex w-screen flex-col items-center justify-center gap-8",
              )}
            >
              <div className="rounded-2xl bg-gray-100 p-6">
                <ul className="list-none divide-y-[1px] divide-black leading-8">
                  {receiptData?.lineItems?.map((item: string) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-8">
                <Button
                  variant="outline"
                  onClick={() => setSelected(TabsEnum.SCAN)}
                  size="lg"
                >
                  Retake
                </Button>
                <Button variant="blue" onClick={handleSubmission} size="lg">
                  Submit
                </Button>
              </div>
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
