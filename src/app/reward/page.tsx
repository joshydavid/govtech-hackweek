"use client";

import { Button } from "@/components/Button";
import { Achievement, LANDING_PAGE } from "@/constant";
import { NavigationContext } from "@/context/NavigationContext";
import { tabs } from "@/models/tabs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import star from "~/star.png";
import cross from "~/cross.png";

export default function Reward() {
  const { setSelected } = useContext(NavigationContext);
  const router = useRouter();

  const handleGoHome = () => {
    setSelected(tabs[0].label);
    router.push(LANDING_PAGE);
  };

  const { receiptData } = useContext(NavigationContext);
  const acceptedItemsCount = receiptData?.acceptedLineItems?.length ?? 0;
  const points = acceptedItemsCount * 5;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(Achievement.STAMPS, acceptedItemsCount.toString());
      localStorage.setItem(Achievement.POINTS, points.toString());
    }
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        {receiptData?.acceptedLineItems?.length > 0 ? "Amazing!" : "Sorry!"}
      </h1>

      {receiptData?.acceptedLineItems?.length > 0 ? (
        <Image src={star} width={250} height={250} alt="star" />
      ) : (
        <Image src={cross} width={150} height={150} alt="star" />
      )}

      {receiptData?.acceptedLineItems?.length > 0 ? (
        <h1 className="text-lg font-semibold">
          You've earned {acceptedItemsCount} grocery stamps!
        </h1>
      ) : (
        <h1 className="text-lg font-semibold">
          <h1 className="text-lg font-semibold">
            No eligible purchases were identified.
          </h1>
        </h1>
      )}

      {receiptData?.acceptedLineItems?.length > 0 && (
        <div className="mt-2 flex w-10/12 gap-4 text-end">
          <div className="flex w-screen items-center justify-end gap-2 rounded-md bg-gray-100 p-4">
            {points} <FaHeart color="red" />
          </div>
          <div className="w-screen rounded-md bg-gray-100 p-4">
            Healthpoints
          </div>
        </div>
      )}

      <Button
        variant="blue"
        size="xl"
        onClick={handleGoHome}
        className="mt-4 w-10/12"
      >
        {receiptData?.acceptedLineItems?.length > 0 ? "Yay" : "Oops... Go Home"}
      </Button>
    </div>
  );
}
