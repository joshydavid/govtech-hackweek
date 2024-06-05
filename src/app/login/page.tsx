"use client";

import { Button } from "@/components/Button";
import { LANDING_PAGE } from "@/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Singpass from "~/singpass.svg";

export default function Login() {
  const router = useRouter();
  const handleLogin = () => {
    router.push(LANDING_PAGE);
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
