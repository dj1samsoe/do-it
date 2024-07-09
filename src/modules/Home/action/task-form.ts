"use server";

import { ActionItemState } from "@/types/action";
import { ITaskPayloadCreate, ITaskPayloadUpdate } from "@/types/task";
import { TaskUseCase } from "@/usecase/task";
import { revalidatePath } from "next/cache";

const usecase = new TaskUseCase();

export async function createTaskAction(
  formData: ITaskPayloadCreate
): Promise<ActionItemState<ITaskPayloadCreate>> {
  try {
    const data = await usecase.createTask(formData);
    revalidatePath("/");
    return {
      form: data,
      status: "success",
    };
  } catch (err) {
    console.error("Error creating article:", err); // Log the error
    const error = err as Error;
    return {
      form: formData,
      status: "error",
      errors: error.message,
    };
  }
}

export async function updateTaskAction(
  formData: ITaskPayloadUpdate
): Promise<ActionItemState<ITaskPayloadUpdate>> {
  try {
    const data = await usecase.updateTask(formData);
    revalidatePath("/");
    return {
      form: data,
      status: "success",
    };
  } catch (err) {
    const error = err as Error;
    return {
      form: formData,
      status: "error",
      errors: error.message,
    };
  }
}
