import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

const sizeClasses = {
  sm: "size-4 border-2",
  default: "size-6 border-2",
  lg: "size-8 border-[3px]",
};

const Spinner = ({ className, size = "default" }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-[var(--border)] border-t-[var(--primary)]",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Ładowanie"
    />
  );
};

export { Spinner };
