"use client";

import { usePathname } from "next/navigation";

import { signIn } from "next-auth/react";
import { FcGoogle, FcGoogle as GoogleIcon } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { LuListTodo } from "react-icons/lu";

// import { sendDataLayer } from '@/common/libs/gtm'

export default function Login() {
  // const pathname = usePathname()
  function handleGoogleSignIn() {
    // sendDataLayer({ event: 'google_signin_clicked', page_path: pathname })
    signIn("google", { callbackUrl: "/" });
  }
  return (
    <div className="container-md bg-white rounded-xl flex flex-col space-y-4 items-center justify-between text-white p-10 h-[450px]">
      <div className="flex flex-col items-center space-y-4">
        <LuListTodo size={100} className="text-purple-primary" />
        <div className="bg-purple-primary p-4 rounded-xl">
          <h1 className="md:text-5xl text-3xl font-bold">
            Welcome to <span className="text-purple-950 font-bold">Do-it</span>
          </h1>
        </div>
        <p className="md:text-xl text-lg font-medium text-purple-primary">
          List Your Plan Today!
        </p>
      </div>

      <Button
        variant="outline"
        onClick={handleGoogleSignIn}
        className="flex gap-3 items-center hover:gap-4 transition-all text-lg border-purple-primary text-black"
      >
        <FcGoogle size={25} />
        Sign in with Google
      </Button>
    </div>
  );
}
