import AddTask from "@/components/AddTask";
import Breakline from "@/components/Breakline";
import TaskLists from "@/components/TaskLists";

import React from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen lg:bg-white/10 py-12 text-white">
      <div className="w-full max-w-[640px] mx-auto">
        <div className="flex flex-col space-y-4 items-start">
          <h1 className="text-3xl font-bold">Today Tasks</h1>
          <Breakline className="w-full" />
          <AddTask />
          <div className="py-12 w-full">
            <TaskLists />
          </div>
        </div>
      </div>
    </div>
  );
}
