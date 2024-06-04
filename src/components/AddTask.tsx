"use client";

import {
  IoCalendarClearOutline,
  IoCreateOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/date-picker";
import { useState } from "react";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function AddTask() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const handleSubmit = async () => {
    if (!deadline) {
      toast({
        title: "Error",
        description: "Deadline is required",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
      return;
    }

    try {
      await axios.post("/api/task", {
        title,
        deadline: new Date(deadline),
        completed: false,
      });

      toast({
        title: "Task created",
        description: "Task created successfully",
        variant: "default",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      setTitle("");
      setDeadline(null);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button
          variant="outline"
          className="flex justify-between items-center py-7 rounded-xl"
        >
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 items-center">
              <div className="p-1.5 rounded-full bg-red-theme"></div>
              <div className="p-1.5 rounded-full bg-blue-theme"></div>
              <div className="p-1.5 rounded-full bg-yellow-theme"></div>
            </div>
            <span className="text-gray-500">What is your next task?</span>
          </div>
          <div className="flex gap-2 items-center text-purple-secondary">
            <IoTimeOutline size={20} />
            <IoCalendarClearOutline size={20} />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Add a new task to your list</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-start">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-start">
              Due Date
            </Label>
            <DatePicker selectedDate={deadline} onDateChange={setDeadline} />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            variant={"default"}
            className="flex gap-2 items-center"
          >
            <IoCreateOutline size={20} />
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
