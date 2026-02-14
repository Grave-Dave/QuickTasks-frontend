import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Check2, Pencil, ArrowCounterclockwise } from "react-bootstrap-icons";
import type { ITask, TaskStatus } from "@/types/task";
import { updateTaskStatus } from "@/api/tasks";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useDispatch } from "@/store";
import { tasksSliceActions } from "@/store";
import { PRIORITY_LABELS, STATUS_COLOR, STATUS_LABELS } from "@/consts.ts";

interface TaskProps {
  task: ITask;
  onEdit?: (task: ITask) => void;
  className?: string;
}

const Task = ({ task, onEdit, className }: TaskProps) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const newStatus: TaskStatus = task.status === "done" ? "todo" : "done";
  const handleToggleStatus = async () => {
    setIsUpdating(true);
    try {
      await updateTaskStatus(task.id, newStatus);
      dispatch(tasksSliceActions.updateTaskStatus({ id: task.id, status: newStatus }));
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!task.description || isExpanded) return;

    const el = descriptionRef.current;
    if (!el) return;
    setHasOverflow(el.scrollHeight > el.clientHeight);
  }, [task.description, isExpanded]);

  return (
    <article
      className={cn(
        "relative flex flex-1 flex-col gap-2 min-h-50 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      style={{ borderLeftWidth: "4px", borderLeftColor: STATUS_COLOR[task.status] }}
    >
      {isUpdating && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-[var(--radius)] bg-[var(--card)]/80"
          aria-busy="true"
        >
          <Spinner size="lg" />
        </div>
      )}
      <Button
        type="button"
        variant="text"
        size="sm"
        className="absolute right-0 top-0 !h-8 !min-h-0 !w-8 !p-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        aria-label="Edytuj zadanie"
        onClick={() => onEdit?.(task)}
        disabled={isUpdating}
      >
        <Pencil className="size-4" />
      </Button>
      <h3 className="text-base font-semibold text-[var(--card-foreground)] leading-tight pr-8">
        {task.title}
      </h3>
      {task.description && (
        <div className="flex flex-col gap-4">
          <p
            ref={descriptionRef}
            className={cn(
              "text-sm text-[var(--muted-foreground)] overflow-hidden text-ellipsis",
              !isExpanded && "line-clamp-2"
            )}
          >
            {task.description}
          </p>
          {hasOverflow && (
            <Button
              type="button"
              variant="text"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="w-fit text-xs font-medium"
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <>
                  Zwiń <ChevronUp className="size-3.5" />
                </>
              ) : (
                <>
                  Rozwiń <ChevronDown className="size-3.5" />
                </>
              )}
            </Button>
          )}
        </div>
      )}
      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
              task.status === "done" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
              task.status === "todo" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
            )}
          >
            {STATUS_LABELS[task.status]}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
              task.priority === "high" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
              task.priority === "medium" && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
              task.priority === "low" && "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            )}
          >
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>
        <Button
          type="button"
          variant="text"
          size="sm"
          className="!h-7 shrink-0 gap-1.5 text-xs"
          onClick={handleToggleStatus}
          disabled={isUpdating}
          aria-label={task.status === "done" ? "Przywróć do zrobienia" : "Oznacz jako zrobione"}
        >
          {task.status === "done" ? (
            <>
              <ArrowCounterclockwise className="size-3.5" />
              Do zrobienia
            </>
          ) : (
            <>
              <Check2 className="size-3.5" />
              Zrobione
            </>
          )}
        </Button>
      </div>
    </article>
  );
};

export default Task;
