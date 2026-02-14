import { useEffect, useState } from "react";
import Task from "@/components/containers/Task";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "@/store";
import type { RootState } from "@/store";
import { uiSliceActions } from "@/store";

const DoneTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((s: RootState) => s.tasks.tasks);
  const [isLoading, setIsLoading] = useState(true);
  const doneTasks = tasks.filter((task) => task.status === "done");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 pr-8 pb-4 pl-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 p-8 pr-8 pb-4 pl-4 sm:grid-cols-2 lg:grid-cols-3">
      {doneTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={(t) => dispatch(uiSliceActions.openTaskDialog(t))}
        />
      ))}
    </div>
  );
};

export default DoneTasks;
