import { checkPermission } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { TaskRepository } from "@/repository/task";
import { ITaskPayloadCreate, ITaskPayloadUpdate } from "@/types/task";
import { User } from "@/types/user";
import { PrismaError } from "@/utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class TaskUseCase {
  private readonly repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }

  async getAllTasks() {
    const session = await checkPermission();
    if (!session) {
      return null;
    }
    if (session && session?.user?.email) {
      try {
        const user = await prisma.user.findUnique({
          where: { email: session?.user?.email }, // Assuming the user's email is stored in the session
        });
        const tasks = await this.repository.findMany({
          where: { userId: user?.id },
        });
        return tasks;
      } catch (err) {
        const error = err as PrismaClientKnownRequestError;
        throw new PrismaError(error.code);
      }
    }
  }

  async getTasksById(id: string) {
    try {
      const task = await this.repository.findUnique({
        where: { id },
      });
      return task;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async getTotalTasks() {
    try {
      const count = await this.repository.count();
      return count;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async createTask(task: ITaskPayloadCreate) {
    const session = await checkPermission();
    const user = session?.user as User;
    try {
      const data = await this.repository.create({
        data: {
          title: task.title,
          description: task.description,
          label: task.label,
          status: task.status,
          priority: task.priority,
          user: {
            connect: {
              email: user.email,
            },
          },
        },
      });
      return data;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async updateTask(task: ITaskPayloadUpdate) {
    await checkPermission();
    if (typeof task.id !== "string") {
      throw new Error(
        "use-case: expected product to have an id of type string"
      );
    }

    try {
      const data = await this.repository.update({
        where: { id: task.id },
        data: {
          title: task.title,
          description: task.description,
          label: task.label,
          status: task.status,
          priority: task.priority,
        },
      });
      return data;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }

  async deleteTask(id: string) {
    await checkPermission();
    if (typeof id !== "string") {
      throw new Error(
        "use-case: expected product to have an id of type string"
      );
    }
    try {
      const data = await this.repository.delete({
        where: { id },
      });
      return data;
    } catch (err) {
      const error = err as PrismaClientKnownRequestError;
      throw new PrismaError(error.code);
    }
  }
}
