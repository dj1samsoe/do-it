"use client";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Breakline from "@/components/Breakline";
import Link from "next/link";
import { GoTasklist } from "react-icons/go";
import { BsListTask } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

interface SidebarProps {
  user: User;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const isActiveRoute = (route: string) => pathname === route;

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
    <aside className="h-screen w-full flex flex-col space-y-5 items-start justify-between bg-white p-7 rounded-l-xl z-10">
      <div className="flex flex-col space-y-10 w-full">
        <div className="flex flex-col space-y-4">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={user?.image as string}
                alt="avatar"
                width={100}
                height={100}
              />
              <AvatarFallback>
                {getInitials(user?.name as string)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1 justify-start">
              <p className="font-medium text-gray-theme">Do-it</p>
              <h1 className="text-xl font-semibold text-purple-primary">
                {user?.name}
              </h1>
            </div>
          </div>
          <Breakline className="w-full border-purple-primary" />
        </div>
        <div className="flex flex-col space-y-4 text-gray-theme">
          <Link
            href="#"
            className={
              isActiveRoute("/")
                ? `flex w-full gap-2 items-center text-purple-primary font-medium px-4 py-2`
                : `flex w-full gap-2 items-center text-gray-theme px-4 py-2`
            }
          >
            <BsListTask size={20} />
            <span>All Tasks</span>
          </Link>
          <Link
            href="#"
            className={
              isActiveRoute("/settings")
                ? `flex w-full gap-2 items-center text-purple-primary font-medium px-4 py-2`
                : `flex w-full gap-2 items-center text-gray-theme px-4 py-2`
            }
          >
            <IoSettingsOutline size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <SignOutButton />
      </div>
    </aside>
  );
}
