"use client";

import { Button } from "@/components/Button";
import { LANDING_PAGE } from "@/constant";
import { NavigationContext } from "@/context/NavigationContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import star from "~/star.png";

export default function Reward() {
  const router = useRouter();
  const handleGoHome = () => {
    router.push(LANDING_PAGE);
  };

  const { receiptData } = useContext(NavigationContext);
  const acceptedItemsCount = receiptData?.acceptedLineItems?.length ?? 10;
  const points = acceptedItemsCount * 5;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Amazing!</h1>
      <Image src={star} width={250} height={250} alt="star" />
      <h1 className="text-lg font-semibold">
        You've earned {acceptedItemsCount} grocery stamps!
      </h1>

      <div className="mt-2 flex w-10/12 gap-4 text-end">
        <div className="flex w-screen items-center justify-end gap-2 rounded-md bg-gray-100 p-4">
          {points} <FaHeart color="red" />
        </div>
        <div className="w-screen rounded-md bg-gray-100 p-4">Healthpoints</div>
      </div>

      <Button
        variant="blue"
        size="xl"
        onClick={handleGoHome}
        className="mt-4 w-10/12"
      >
        Yay
      </Button>
    </div>
  );
}
