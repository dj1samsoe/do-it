import React from "react";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-purple-primary">
      {children}
    </main>
  );
}
