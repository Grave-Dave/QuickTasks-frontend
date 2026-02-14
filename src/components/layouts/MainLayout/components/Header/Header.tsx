import { useEffect, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDispatch, uiSliceActions } from "@/store";

const SEARCH_PARAM = "search_keyword";

const Header = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordFromUrl = searchParams.get(SEARCH_PARAM) ?? "";
  const [searchInput, setSearchInput] = useState(keywordFromUrl);

  useEffect(() => {
    setSearchInput(keywordFromUrl);
  }, [keywordFromUrl]);

  const applySearch = () => {
    const value = searchInput.trim();
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(SEARCH_PARAM, value);
        } else {
          next.delete(SEARCH_PARAM);
        }
        next.set("page", "1");
        return next;
      },
      { replace: true }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applySearch();
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(SEARCH_PARAM);
        next.set("page", "1");
        return next;
      },
      { replace: true }
    );
  };

  return (
    <header className="flex items-center gap-4 w-full h-20 px-6 py-4 border-b bg-background">
      <h1 style={{ fontFamily: "var(--font-mono)" }}>QuickTasks</h1>

      <div className="flex-1 flex justify-center max-w-xl mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Szukaj zadań..."
          className="pl-9 pr-9"
          aria-label="Szukaj zadań"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {searchInput && (
          <Button
            type="button"
            variant="text"
            size="icon"
            onClick={clearSearch}
            className={cn("absolute right-3 top-1/2 -translate-y-1/2 !h-8 !w-8")}
            aria-label="Wyczyść wyszukiwanie"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      <Button
        size="default"
        className="shrink-0"
        onClick={() => dispatch(uiSliceActions.openTaskDialog())}
      >
        <Plus className="size-4"/>
        Utwórz
      </Button>
    </header>
  );
};

export default Header
