import Breakline from "@/components/Breakline";
import { TaskUseCase } from "@/usecase/task";
import { ITask } from "@/types/task";
import TaskTable from "@/modules/Home/component/task-table";

export default async function Home() {
  const usecase = new TaskUseCase();
  const tasks: ITask[] = (await usecase.getAllTasks()) || [];
  return (
    <div className="w-full min-h-screen lg:bg-white/10 py-12">
      <div className="w-full mx-auto md:px-10">
        <div className="flex flex-col space-y-4 items-start relative">
          <h1 className="text-3xl font-bold text-white">All Tasks</h1>
          <Breakline className="w-full" />
          <div className="flex w-full flex-col justify-center bg-white p-5 rounded-lg">
            <TaskTable tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
