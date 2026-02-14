import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { type RootState } from "@/store";
import { uiSliceActions } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const SNACKBAR_DURATION_MS = 15000;

const variantStyles = {
  success: "border-green-500/50 bg-green-500/15 text-green-800 dark:text-green-200",
  error: "border-destructive/50 bg-destructive/15 text-destructive",
  warning: "border-amber-500/50 bg-amber-500/15 text-amber-800 dark:text-amber-200",
} as const;

export function Snackbar() {
  const notification = useSelector((state: RootState) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!notification) return;
    const id = setTimeout(() => {
      dispatch(uiSliceActions.setNotification(null));
    }, SNACKBAR_DURATION_MS);
    return () => clearTimeout(id);
  }, [notification, dispatch]);

  if (!notification) return null;

  const close = () => dispatch(uiSliceActions.setNotification(null));

  const snackbar = (
    <div
      role="alert"
      className={cn(
        "fixed top-5 right-15 -translate-x-1/2 z-[9999] flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-lg",
        variantStyles[notification.variant]
      )}
    >
      <p className="flex-1 text-sm font-medium">{notification.message}</p>
      <Button
        type="button"
        variant="outlineNoBg"
        size="icon"
        className="h-7 w-7 shrink-0 opacity-70 hover:opacity-100"
        onClick={close}
        aria-label="Zamknij"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  return createPortal(snackbar, document.body);
}
