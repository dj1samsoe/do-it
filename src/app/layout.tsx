import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layouts from "@/components/layouts";
import { getUserSession } from "./api/auth/[...nextauth]/options";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "fallback",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Do-it | Do Your Plan Today",
  description: "Do-it is a todo list app that allows you to plan your day.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();

  return (
    <html lang="en">
      <head />
      <body className={cn("flex", poppins.className)}>
        <Layouts session={session}>{children}</Layouts>
      </body>
    </html>
  );
}
