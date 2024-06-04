import SignOutButton from "@/components/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const getInitials = (name: string) => {
    // Split the name into words
    const words = name.split(" ");

    // Initialize an empty string to store initials
    let initials = "";

    // Loop through each word
    for (const word of words) {
      // Get the first character of the word and uppercase it
      initials += word[0].toUpperCase();
    }

    return initials;
  };
  return (
    <div className="w-full px-5 py-3 flex justify-between items-center bg-white rounded-xl mx-2 sticky">
      <Link href="/" className="text-3xl font-bold text-purple-primary">
        Do-it
      </Link>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user?.image as string}
              alt="avatar"
              width={100}
              height={100}
            />
            <AvatarFallback>{getInitials(user?.name as string)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-72 mt-3 mr-2">
          <div className="flex flex-col space-y-2">
            <Link
              href={"#"}
              className="w-full py-2 text-center bg-white hover:bg-purple-primary/10 transition-all rounded-lg"
            >
              Profile
            </Link>
            <SignOutButton />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
