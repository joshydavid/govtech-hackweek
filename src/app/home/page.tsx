"use client";

import { useUser } from "@/api/user";
import { Button } from "@/components/Button";
import Camera from "@/components/Camera";
import Tabs from "@/components/Tabs";
import { Achievement, LOGIN_PAGE, REWARD_PAGE } from "@/constant";
import { NavigationContext } from "@/context/NavigationContext";
import { HowItWorks } from "@/data/howItWorks";
import { cn } from "@/lib/utils";
import { TabsEnum, tabs } from "@/models/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaGift, FaHeart } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import NotAuthorised from "~/unauthorised.svg";

export default function Home() {
  const [achievement, setAchievements] = useState({ stamps: 0, points: 0 });
  const { selected, setSelected } = useContext(NavigationContext);
  const { openCamera, setOpenCamera } = useContext(NavigationContext);
  const { receiptData } = useContext(NavigationContext);
  const [userInfo, setUserInfo] = useState<string>();
  const router = useRouter();
  const { data, error, isLoading } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined" && data) {
      setUserInfo(data.userName);
      localStorage.setItem("user", data.userName);
    }
  }, [data, error, isLoading]);

  const handleSubmission = () => {
    router.push(REWARD_PAGE);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stamps = localStorage.getItem(Achievement.STAMPS);
      const points = localStorage.getItem(Achievement.POINTS);
      setAchievements({
        ...achievement,
        stamps: Number(stamps),
        points: Number(points),
      });
    }
  }, []);

  useEffect(() => {
    if (selected === TabsEnum.SCAN) {
      setOpenCamera(true);
    }
  }, [selected, setOpenCamera]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-4">
        <ClipLoader size={40} />
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  const renderContent = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <>
            <div className="mt-4 grid h-fit w-screen grid-cols-2 gap-4 divide-x bg-white p-6 text-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-bold">{achievement?.points ?? 0}</p>
                  <FaHeart color="red" />
                </div>
                <p className="text-sm">My Healthpoints</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-bold">{achievement?.stamps ?? 0}</p>
                  <FaGift color="green" />
                </div>
                <p className="text-sm">My Stamps</p>
              </div>
            </div>

            <h3 className="my-8 pl-8 font-semibold">How it works</h3>
            <div className="flex flex-col gap-12 px-8 pb-28 lg:flex-row lg:justify-evenly lg:gap-4 lg:p-12 lg:pb-60">
              {HowItWorks.map(({ id, instruction, image }) => (
                <div
                  className="flex flex-col items-start justify-start gap-6 rounded-3xl bg-white p-12 text-left"
                  key={id}
                >
                  <div className="flex max-h-[200px] justify-start">
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

  const disabledCondition = receiptData?.lineItems?.length <= 0;

  const renderHeader = () => {
    switch (selected) {
      case TabsEnum.REWARDS:
        return (
          <div className="fixed top-[28px] z-10 w-screen bg-blue-500 px-6 py-8 text-left text-sm font-semibold text-white">
            <p>{userInfo ? `Hey, ${userInfo} 👋🏻` : "Hey, Guest 👋🏻"}</p>
          </div>
        );
      case TabsEnum.VERIFICATION:
        return (
          <div>
            <div className="fixed top-0 z-10 w-screen bg-blue-500 px-6 py-8 text-left text-lg font-semibold text-white">
              {receiptData?.lineItems?.length > 0 ? (
                <p>My Purchases</p>
              ) : (
                <p>Something Went Wrong</p>
              )}
            </div>
            <div
              className={cn(
                "mx-auto mt-24 flex w-screen flex-col items-center justify-center gap-8",
              )}
            >
              {receiptData?.lineItems?.length > 0 && (
                <div className="font-semibold">
                  {receiptData?.acceptedLineItems?.length > 0 ? (
                    <p className="animate-bounce text-green-500">
                      Healthier Choices Spotted <span className="pl-2">🥬</span>
                    </p>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <p>Choose Healthier Options</p>
                      <span className="animate-ping pl-2">
                        <IoIosWarning />
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="w-10/12 rounded-2xl bg-gray-100 p-6">
                {receiptData?.lineItems?.length > 0 ? (
                  <ul className="list-none divide-y-2 divide-gray-200 leading-8">
                    {receiptData?.lineItems?.map((item: string) => (
                      <li key={item} className="p-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex min-h-[300px] flex-col items-center gap-8">
                    <IoIosWarning
                      color="orange"
                      size="150"
                      className="my-12 animate-ping"
                    />
                    <p>
                      <span className="font-bold">Sorry,</span> something went
                      wrong. Please try again!
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-8">
                <Button
                  variant={disabledCondition ? "destructive" : "outline"}
                  onClick={() => setSelected(TabsEnum.SCAN)}
                  size="lg"
                >
                  Retake
                </Button>
                <Button
                  variant="blue"
                  onClick={handleSubmission}
                  size="lg"
                  disabled={disabledCondition}
                >
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
      {data?.userName ? (
        <>
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
        </>
      ) : (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center">
          <Image src={NotAuthorised} alt="lost" width={500} height={300} />
          <div className="flex w-10/12 flex-col gap-6">
            <div className="mt-12 flex flex-col gap-2">
              <h1 className="font-semibold">Error 401</h1>
              <h1 className="font-semibold">Not Logged In</h1>
              <h1 className="font-normal">
                Please verify your identify by logging in.
              </h1>
            </div>
            <div>
              <Button
                variant="blue"
                size="lg"
                onClick={() => router.push(LOGIN_PAGE)}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
