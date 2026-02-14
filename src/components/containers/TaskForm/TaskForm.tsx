import { useFormik } from "formik";
import { useDispatch, useSelector } from "@/store";
import type { ITask, TaskPriority, TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PRIORITY_LABELS, STATUS_LABELS } from "@/consts";
import { type RootState, uiSliceActions } from "@/store";

const STATUS_OPTIONS: TaskStatus[] = ["todo", "done"];
const PRIORITY_OPTIONS: TaskPriority[] = ["low", "medium", "high"];

type TaskFormValues = Pick<ITask, "title" | "description" | "status" | "priority">;

const emptyFormValues = (): TaskFormValues => ({
  title: "",
  description: null,
  status: "todo",
  priority: "medium",
});

const TaskForm = () => {
  const dispatch = useDispatch();
  const isTaskDialogOpen = useSelector((s: RootState) => s.ui.isTaskDialogOpen);
  const editingTask = useSelector((s: RootState) => s.ui.editingTask);
  const isTaskEditing = editingTask !== null;

  const formik = useFormik<TaskFormValues>({
    initialValues: editingTask
      ? {
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          priority: editingTask.priority,
        }
      : emptyFormValues(),
    enableReinitialize: true,
    onSubmit: (_values) => {
      // TODO: dispatch save/create to API (_values)
      dispatch(uiSliceActions.closeTaskDialog());
    },
  });

  const handleClose = (open: boolean) => {
    if (!open) dispatch(uiSliceActions.closeTaskDialog());
  };

  return (
    <Dialog open={isTaskDialogOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isTaskEditing ? "Edycja zadania" : "Nowe zadanie"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <label htmlFor="task-title" className="text-sm font-medium">
              Tytuł
            </label>
            <Input
              id="task-title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tytuł zadania"
              required
            />
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
            <label htmlFor="task-status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="task-status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="flex h-9 w-full rounded-md border border-[var(--input)] bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
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
            <Button type="submit">{isTaskEditing ? "Zapisz" : "Utwórz"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
