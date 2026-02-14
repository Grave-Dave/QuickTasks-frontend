import { useSearchParams } from "react-router-dom";
import Task from "@/components/containers/Task";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { useGetTasks } from "@/api";
import { useDispatch } from "@/store";
import { uiSliceActions } from "@/store";

const TASKS_PER_PAGE = 9;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const searchKeyword = searchParams.get("search_keyword") ?? undefined;

  const { data, isLoading, isError, error } = useGetTasks({
    page,
    limit: TASKS_PER_PAGE,
    search_keyword: searchKeyword || undefined,
  });

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 pr-8 pb-4 pl-4">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 pr-8 pb-4 pl-4 text-red-600">
        {error?.message ?? "Nie udało się załadować zadań."}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 pr-8 pb-4 pl-4 text-muted-foreground">
        Brak zadań
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-4 pr-8 pb-4 pl-4">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={(t) => dispatch(uiSliceActions.openTaskDialog(t))}
          />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={data.total_pages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Dashboard;
