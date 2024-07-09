"use client";

import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./action-cell";
import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUp,
  FaRegCheckCircle,
  FaRegCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import CombineElements from "@/components/elements/combine-elements";

const truncate = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

const getVariant = (
  label: string
): "outline-danger" | "outline-info" | "outline-warning" => {
  switch (label) {
    case "bug":
      return "outline-danger";
    case "documentation":
      return "outline-info";
    case "feature":
      return "outline-warning";
    default:
      return "outline-info"; // Default variant
  }
};

export const taskTableColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const label = row.original.label as string;
      const description = row.getValue("description") as string;
      const variant = getVariant(label);

      return (
        <CombineElements
          label={label}
          variant={variant}
          description={truncate(description, 50)}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (cell) => {
      const value = cell.getValue();

      switch (value) {
        case "todo":
          return (
            <div className="flex items-center space-x-2">
              <FaRegCircle />
              <p className="text-sm">Todo</p>
            </div>
          );
        case "in-progress":
          return (
            <div className="flex items-center space-x-2 truncate">
              <MdOutlineTimer />
              <p className="text-sm">In Progress</p>
            </div>
          );
        case "done":
          return (
            <div className="flex items-center space-x-2">
              <FaRegCheckCircle />
              <p className="text-sm">Done</p>
            </div>
          );
        case "cancelled":
          return (
            <div className="flex items-center space-x-2">
              <FaRegTimesCircle />
              <p className="text-sm">Cancelled</p>
            </div>
          );
        default:
          return "Invalid status";
      }
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (cell) => {
      const value = cell.getValue();

      switch (value) {
        case "low":
          return (
            <div className="flex items-center space-x-2">
              <FaArrowDown />
              <p className="text-sm">Low</p>
            </div>
          );
        case "medium":
          return (
            <div className="flex items-center space-x-2">
              <FaArrowRight />
              <p className="text-sm">Medium</p>
            </div>
          );
        case "high":
          return (
            <div className="flex items-center space-x-2">
              <FaArrowUp />
              <p className="text-sm">High</p>
            </div>
          );
        default:
          return "Invalid priority";
      }
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (cell) => <ActionCell cell={cell} />,
  },
];
