import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Layouts from "@/components/layouts";
import { Toaster } from "@/components/ui/toaster";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Layouts>{children}</Layouts>
        <Toaster />
      </body>
    </html>
  );
}
