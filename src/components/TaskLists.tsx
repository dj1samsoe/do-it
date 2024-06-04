"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  format,
  formatDistanceToNow,
  isPast,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
import { DatePicker } from "./ui/date-picker";
import { Task } from "@/types/task";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Skeleton } from "./ui/skeleton";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { DeleteTasks } from "./DeleteTasks";
import { MdOutlineSaveAlt } from "react-icons/md";

export default function TaskLists() {
  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [editedTaskDeadline, setEditedTaskDeadline] = useState<Date | null>(
    null
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/task", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deadlineFormatted = (deadline: Date) => {
    return format(new Date(deadline), "dd MMMM yyyy");
  };

  const handleTaskCompletionToggle = async (taskId: String) => {
    try {
      // Toggle the completed status
      const updatedCompletedStatus = !tasks.find((task) => task.id === taskId)
        ?.completed;

      // Update the task's completed status in the database
      await axios.put(`/api/task?id=${taskId}`, {
        completed: updatedCompletedStatus,
      });

      // Update the local state to reflect the change
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: updatedCompletedStatus }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task completion status:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditedTask(task);
    setEditedTaskTitle(task.title);
    setEditedTaskDeadline(new Date(task.deadline));
  };

  const handleSaveEdit = async () => {
    try {
      if (!editedTask) return;

      const response = await axios.put(`/api/task?id=${editedTask.id}`, {
        title: editedTaskTitle,
        deadline: editedTaskDeadline,
      });

      const updatedTaskIndex = tasks.findIndex(
        (task) => task.id === editedTask.id
      );
      if (updatedTaskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[updatedTaskIndex] = response.data;
        setTasks(updatedTasks);
      }

      setEditedTask(null);
      setEditedTaskTitle("");
      setEditedTaskDeadline(null);
      toast({
        title: "Task updated",
        description: "Task updated successfully",
        variant: "default",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
  };

  const handleDeleteTask = async (taskId: String) => {
    try {
      await axios.delete(`/api/task?id=${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      toast({
        title: "Task deleted",
        description: "Task deleted successfully",
        variant: "default",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
        action: <ToastAction altText="Try Again">Try Again</ToastAction>,
      });
    }
  };

  if (isLoading)
    return Array.from({ length: 1 }).map((_, index) => (
      <Skeleton key={index} className="w-full h-16" />
    ));

  if (!isLoading && tasks.length === 0) {
    return (
      <div className="flex flex-col space-y-2 justify-center items-center w-full py-4 bg-white rounded-lg text-gray-500">
        <HiOutlineEmojiSad size={50} />
        <h1 className="font-bold">No tasks</h1>
      </div>
    );
  }

  const annotation = (deadline: Date) => {
    if (deadline) {
      if (isToday(deadline)) {
        return <p className="text-yellow-theme">Due Today</p>;
      } else if (isTomorrow(deadline)) {
        return <p className="text-green-600">Due Tomorrow</p>;
      } else if (isPast(deadline)) {
        return (
          <p className="text-red-theme">
            Overdue by {formatDistanceToNow(deadline)}
          </p>
        );
      } else {
        return (
          <p className="text-green-600">
            Due to {formatDistanceToNow(deadline)} from now
          </p>
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div key={task.id.toString() + "-button"}>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between items-center py-7 w-full rounded-xl"
                onClick={() => handleEditTask(task)}
              >
                <div className="flex gap-3 items-center">
                  <div className="p-1.5 rounded-full bg-red-theme"></div>

                  <div className="flex flex-col items-start">
                    <span
                      className={`text-gray-500 text-start ${
                        task.completed ? "line-through" : "" // Add completed class conditionally
                      }`}
                    >
                      {task.title}
                    </span>
                    <span className="text-xs italic">
                      {annotation(task.deadline)}
                    </span>
                  </div>
                </div>

                <span
                  className={`pl-3 text-gray-500${
                    task.completed ? "line-through" : "" // Add completed class conditionally
                  }`}
                >
                  {deadlineFormatted(task.deadline)}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>Edit the task details</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline">Deadline</Label>
                  <DatePicker
                    selectedDate={editedTaskDeadline}
                    onDateChange={(date: React.SetStateAction<Date | null>) =>
                      setEditedTaskDeadline(date)
                    }
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center justify-end -mt-4 mb-6">
                <Input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskCompletionToggle(task.id)}
                  className="w-5 h-5 accent-purple-700"
                />
                <Label htmlFor="mark-as-completed">Mark as completed</Label>
              </div>
              <div className="w-full">
                <DeleteTasks onDelete={handleDeleteTask} taskId={task.id} />
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSaveEdit}
                  variant="default"
                  className="w-full flex gap-2 items-center"
                >
                  <MdOutlineSaveAlt size={20} />
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
