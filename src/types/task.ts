import { z } from "zod";

export type Task = {
  id?: string | undefined;
  title: string;
  description: string;
  label: string;
  status: string;
  priority: string;
  userId: string;
};

export type ITask = {
  id?: string;
  title: string;
  description: string;
  label: string;
  status: string;
  priority: string;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type ITaskPayloadCreate = {
  id?: string | undefined;
  title: string;
  description: string;
  label: string;
  status: string;
  priority: string;
  userId: string;
};

export type ITaskPayloadUpdate = { id: string } & ITaskPayloadCreate;

export const taskDefaultValueForm = {
  id: "",
  title: "",
  description: "",
  label: "documentation",
  status: "todo",
  priority: "low",
  userId: "",
  user: {
    connect: {
      email: "",
    },
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(10, { message: "Title must be less than 10 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255, { message: "Description must be less than 255 characters" }),
  label: z.string().min(1, { message: "Label is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
  userId: z.string(),
});

export type Status = {
  id: string;
  label: string;
  value: string;
};
