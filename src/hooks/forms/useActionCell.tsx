"use client";
import { CellContext } from "@tanstack/react-table";
import { ReactNode } from "react";
import { useDialogStore } from "@/stores/dialog";
import { useFormStore } from "@/stores/form";
import { toast } from "@/components/ui/use-toast";

export default function useActionCell<T extends { id?: string | undefined }>({
  cell,
  deleteAction,
  dialogContent,
}: {
  cell: CellContext<T, unknown>;
  deleteAction: (id: string) => Promise<void>;
  dialogContent: () => ReactNode;
}) {
  const { setFormType, setDefaultValueForm } = useFormStore<T>();
  const { showDialog, setContent } = useDialogStore();

  function handleEdit() {
    setDefaultValueForm(cell.row.original);
    setFormType("update");
    setContent(dialogContent());
    showDialog();
    // console.log("Edit Button is Clicked!");
  }

  async function handleDelete() {
    const cellId = cell.row.original.id;
    if (cellId) await deleteAction(cellId);
    toast({
      title: "Success!",
      description: `You have successfully deleted a Task!.`,
    });
  }
  return { handleEdit, handleDelete };
}
