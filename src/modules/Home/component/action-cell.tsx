import useActionCell from "@/hooks/forms/useActionCell";
import { CellContext } from "@tanstack/react-table";
import TaskForm from "./task-form";
import { Task } from "@/types/task";
import { deleteTaskAction } from "../action/action-cell";
import BaseActionCell from "@/components/elements/base-action-cell";

export function ActionCell({ cell }: { cell: CellContext<Task, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<Task>({
    cell,
    deleteAction: deleteTaskAction,
    dialogContent: () => <TaskForm />,
  });
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />;
}
