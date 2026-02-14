import { useFormik } from "formik";
import { isAxiosError } from "axios";
import { useDispatch, useSelector } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PRIORITY_LABELS } from "@/consts";
import { type RootState, uiSliceActions } from "@/store";
import type { ITasksResponse } from "@/api/types";
import { usePostTask, usePutTask } from "@/api";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

function getApiFieldErrors(error: unknown): Record<string, string> | undefined {
  if (isAxiosError(error) && error.response?.data && typeof error.response.data === "object") {
    const data = error.response.data as { errors?: Record<string, string> };
    return data.errors;
  }
  return undefined;
}

const PRIORITY_OPTIONS: number[] = [1, 2, 3];

type TaskFormValues = Pick<ITasksResponse, "title" | "description" | "priority">;

const emptyFormValues = (): TaskFormValues => ({
  title: "",
  description: null,
  priority: 1,
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isTaskDialogOpen = useSelector((s: RootState) => s.ui.isTaskDialogOpen);
  const editingTask = useSelector((s: RootState) => s.ui.editingTask);
  const isTaskEditing = editingTask !== null;

  const postTask = usePostTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatch(uiSliceActions.closeTaskDialog());
      dispatch(uiSliceActions.setNotification({ message: "Zadanie dodane", variant: "success" }));
      formik.resetForm();
    },
  });

  const putTask = usePutTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      dispatch(uiSliceActions.closeTaskDialog());
      dispatch(uiSliceActions.setNotification({ message: "Zadanie zaktualizowane", variant: "success" }));
      formik.resetForm();
    },
  });

  const apiErrors = (postTask.error ?? putTask.error) ? getApiFieldErrors(postTask.error ?? putTask.error) : undefined;
  const titleError = apiErrors?.title;

  const formik = useFormik<TaskFormValues>({
    initialValues: editingTask
      ? {
          title: editingTask.title,
          description: editingTask.description,
          priority: editingTask.priority,
        }
      : emptyFormValues(),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isTaskEditing && editingTask) {
        putTask.mutate({
          id: editingTask.id,
          title: values.title,
          description: values.description,
          priority: values.priority,
        });
        return;
      }
      postTask.mutate({
        title: values.title,
        description: values.description,
        priority: values.priority,
      });
    },
  });

  const handleClose = (open: boolean) => {
    if (!open) {
      dispatch(uiSliceActions.closeTaskDialog());
      postTask.reset();
      putTask.reset();
      formik.resetForm();
    }
  };

  return (
    <Dialog open={isTaskDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isTaskEditing ? "Edycja zadania" : "Nowe zadanie"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="task-title" className={cn("text-sm font-medium", titleError && "text-destructive")}>
              Tytuł
            </label>
            <Input
              id="task-title"
              name="title"
              value={formik.values.title}
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.name === "title") postTask.reset();
              }}
              onBlur={formik.handleBlur}
              placeholder="Tytuł zadania"
              className={cn(titleError && "border-destructive focus-visible:ring-destructive")}
            />
            {titleError && <p className="text-sm text-destructive">{titleError}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="task-description" className="text-sm font-medium">
              Opis
            </label>
            <Input
              id="task-description"
              name="description"
              value={formik.values.description ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Opis (opcjonalnie)"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="task-priority" className="text-sm font-medium">
              Priorytet
            </label>
            <select
              id="task-priority"
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex h-9 w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {PRIORITY_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outlineNoBg" onClick={() => dispatch(uiSliceActions.closeTaskDialog())}>
              Anuluj
            </Button>
            <Button type="submit" disabled={postTask.isPending || putTask.isPending}>
              {postTask.isPending || putTask.isPending ? "Zapisywanie…" : isTaskEditing ? "Zapisz" : "Utwórz"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
