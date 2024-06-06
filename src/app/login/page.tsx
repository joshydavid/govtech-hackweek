"use client";

import { Button } from "@/components/Button";
import { fetcher } from "@/helper";
import Image from "next/image";
import Singpass from "~/singpass.svg";

export default function Login() {
  const handleLogin = async () => {
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH}`,
    );
    window.location.href = response.url;
  };

  return (
    <div className="flex max-h-screen w-screen items-center justify-center">
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
  );
}
