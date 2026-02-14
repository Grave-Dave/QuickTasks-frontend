import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 0) return null;

  return (
    <div
      role="navigation"
      aria-label="Paginacja"
      className={cn("flex items-center justify-center gap-2 py-12", className)}
    >
      <Button
        type="button"
        variant="outlineNoBg"
        size="icon"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Poprzednia strona"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="min-w-[8rem] text-center text-sm text-muted-foreground">
        Strona {page} z {totalPages}
      </span>
      <Button
        type="button"
        variant="outlineNoBg"
        size="icon"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Następna strona"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
