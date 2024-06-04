"use client";

import { Button } from "@/components/Button";
import Image from "next/image";
import Singpass from "~/singpass.svg";

export default function Login() {
  const handleLogin = () => {
    return;
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
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
