"use client";

import { ITask, taskDefaultValueForm } from "@/types/task";
import TaskForm from "./task-form";
import useActionTable from "@/hooks/tables/useActionTable";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { taskTableColumns } from "./columns";

export default function TaskTable({ tasks }: { tasks: ITask[] }) {
  const { handleClickAdd } = useActionTable<ITask>({
    defaultValue: taskDefaultValueForm,
    dialogContent: () => <TaskForm />,
  });
  return (
    <div>
      <div className="flex items-baseline justify-end mb-5">
        <Button variant="default" onClick={handleClickAdd}>
          New Task
        </Button>
      </div>
      <DataTable columns={taskTableColumns} data={tasks} />
    </div>
  );
}
