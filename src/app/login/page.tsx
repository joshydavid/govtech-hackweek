"use client";

import { backendAxiosGet } from "@/api";
import { Button } from "@/components/Button";
import Image from "next/image";
import People from "~/people.svg";
import Singpass from "~/singpass.svg";

export default function Login() {
  const handleLogin = async () => {
    const response = await backendAxiosGet(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH}`,
    );
    window.location.href = response;
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-start justify-start gap-4 lg:mb-24">
      <div className="mt-16">
        <Image src={People} alt="phone" width={800} height={500} />
        <div className="flex flex-col gap-3 px-8">
          <h1 className="animate-pulse text-xl font-semibold">
            Buy Scan Redeem
          </h1>
          <div>
            <Button size="lg" onClick={handleLogin}>
              Continue with
              <Image
                src={Singpass}
                alt="Singpass"
                width={80}
                className="ml-1 mt-1.5"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
