import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class TaskRepository {
  protected prisma = prisma;

  get collection() {
    return this.prisma.task;
  }

  async findMany(args: Prisma.TaskFindManyArgs) {
    const data = await this.collection.findMany(args);
    return data;
  }

  async findUnique(args: Prisma.TaskFindUniqueArgs) {
    const data = await this.collection.findUnique(args);
    return data;
  }

  async count() {
    const count = await this.collection.count();
    return count;
  }

  async create(args: Prisma.TaskCreateArgs) {
    const data = await this.collection.create(args);
    return data;
  }

  async update(args: Prisma.TaskUpdateArgs) {
    const data = await this.collection.update(args);
    return data;
  }

  async delete(args: Prisma.TaskDeleteArgs) {
    const data = await this.collection.delete(args);
    return data;
  }
}
