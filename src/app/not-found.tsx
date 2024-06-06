"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Lost from "~/lost.svg";
import { Button } from "./components/Button";
import { LANDING_PAGE } from "./constant";
import { NavigationContext } from "./context/NavigationContext";
import { tabs } from "./models/tabs";

export default function NotFound() {
  const { setSelected } = useContext(NavigationContext);
  const router = useRouter();

  const handleGoHome = () => {
    setSelected(tabs[0].label);
    router.push(LANDING_PAGE);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center">
      <Image src={Lost} alt="lost" width={300} height={300} />
      <div className="flex w-10/12 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">Error 404</h1>
          <h1 className="font-semibold">Page Not Found</h1>
          <h1 className="font-normal">
            Our page has gone missing, or there's a broken link. Please return
            home.
          </h1>
        </div>
        <div>
          <Button variant="blue" size="lg" onClick={handleGoHome}>
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
