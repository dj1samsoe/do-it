"use client";
import {
  ITaskPayloadUpdate,
  ITaskPayloadCreate,
  taskSchema,
  taskDefaultValueForm,
} from "@/types/task";
import { createTaskAction, updateTaskAction } from "../action/task-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/elements/submit-button";
import useActionForm from "@/hooks/forms/useActionForm";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SelectOptions from "@/components/elements/select-options";
import { labelOptions, priorityOptions, statusOptions } from "@/types/options";
import { Textarea } from "@/components/ui/textarea";

export default function TaskForm() {
  const {
    copyButtonIdle,
    copyButtonSubmitting,
    form,
    formType,
    defaultValueForm,
    isPending,
    onSubmit,
  } = useActionForm<ITaskPayloadCreate, ITaskPayloadUpdate>({
    title: "task",
    schema: taskSchema,
    createAction: createTaskAction,
    defaultValue: taskDefaultValueForm,
    updateAction: updateTaskAction,
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {formType === "update" ? `Edit Task` : "Add New Task"}
            </DialogTitle>
            <DialogDescription>
              {formType === "update"
                ? `Edit on ${defaultValueForm.title}`
                : "Add a new task here."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex md:flex-1 md:space-x-6 md:flex-row flex-col space-y-2">
            <div className="flex min-w-80 md:flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add your task title here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add your task description here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex min-w-80 md:flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <SelectOptions field={field} options={labelOptions} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <SelectOptions field={field} options={statusOptions} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <SelectOptions field={field} options={priorityOptions} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <SubmitButton
            idleText={copyButtonIdle}
            submittingText={copyButtonSubmitting}
            pending={isPending}
          />
        </form>
      </Form>
    </div>
  );
}
