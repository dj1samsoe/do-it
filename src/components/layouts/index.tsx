"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Toaster } from "../ui/toaster";
import Header from "@/modules/Header";
import Sidebar from "@/modules/Sidebar";
import { Session, User } from "next-auth";
import { usePathname } from "next/navigation";
const GlobalDialog = dynamic(
  () => import("@/components/elements/global-dialog"),
  {
    ssr: false,
  }
);

export default function Layouts({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const pathname = usePathname();
  return (
    <>
      <Toaster />
      <GlobalDialog />
      <div className="w-full min-h-screen flex flex-col bg-purple-primary">
        {pathname !== "/login" && (
          <div className="lg:hidden flex pt-2">
            <Header user={session?.user as User} />
          </div>
        )}
        <div className="h-full w-full flex flex-row lg:p-2 p-5 relative">
          {pathname !== "/login" && (
            <div className="hidden lg:block w-full max-w-[300px]">
              <Sidebar user={session?.user as User} />
            </div>
          )}

          <main className="relative flex min-h-screen w-full bg-purple-primary">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
