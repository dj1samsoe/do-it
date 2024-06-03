"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button variant="destructive" onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
