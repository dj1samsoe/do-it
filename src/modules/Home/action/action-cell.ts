"use server";

import { revalidatePath } from "next/cache";
import { TaskUseCase } from "@/usecase/task";

export async function deleteTaskAction(id: string) {
  const usecase = new TaskUseCase();
  await usecase.deleteTask(id);
  revalidatePath("/");
}
