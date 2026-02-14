import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, uiSliceActions } from "@/store";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="flex items-center gap-4 w-full h-20 px-6 py-4 border-b bg-background">
      <h1 style={{ fontFamily: "var(--font-mono)" }}>QuickTasks</h1>

      <div className="flex-1 flex justify-center max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Szukaj zadań..."
          className="pl-9"
          aria-label="Szukaj zadań"
        />
      </div>

      <Button
        size="default"
        className="shrink-0"
        onClick={() => dispatch(uiSliceActions.openTaskDialog())}
      >
        <Plus className="size-4" />
        Utwórz
      </Button>
    </header>
  );
};

export default Header
