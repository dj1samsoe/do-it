import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";

// Assuming Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, and Button components are imported from your UI library

export const DeleteTasks = ({
  taskId,
  onDelete,
}: {
  taskId: String;
  onDelete: (taskId: String) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteConfirmed = async () => {
    try {
      await onDelete(taskId);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex gap-3 items-center">
          <FaRegTrashAlt />
          Delete Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="default" onClick={handleDeleteConfirmed}>
            Yes
          </Button>
          <Button variant="destructive" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
