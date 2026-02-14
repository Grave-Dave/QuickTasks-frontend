import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ListTask, Check2Square, ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface IMenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: IMenuItem[] = [
  {
    label: "Dashboard",
    icon: <ListTask className="size-5" />,
    path: "/",
  },
  {
    label: "DoneTasks",
    icon: <Check2Square className="size-5" />,
    path: "/done",
  },
];

const DashboardMenu = () => {
  const [isCondensed, setIsCondensed] = useState(false);

  return (
    <div
      className={cn(
        "flex h-full shrink-0 flex-col rounded-[12px] bg-white transition-[width] duration-200",
        "shadow-[0px_2px_5px_rgba(6,25,56,0.06)]",
        isCondensed ? "w-14 p-2" : "w-[280px] p-4"
      )}
    >
      <nav className="flex flex-1 flex-col gap-4 overflow-hidden">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-[18px] font-medium !text-black transition-colors hover:bg-muted hover:!text-black",
                isCondensed && "justify-center px-2",
                isActive && "bg-muted"
              )
            }
            title={isCondensed ? item.label : undefined}
          >
            {item.icon}
            {!isCondensed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      <Button
        type="button"
        variant="full"
        size="icon"
        onClick={() => setIsCondensed((prev) => !prev)}
        className="mt-auto w-full"
        aria-label={isCondensed ? "Rozwiń menu" : "Zwiń menu"}
      >
        {isCondensed ? (
          <ArrowRight className="size-5" />
        ) : (
          <ArrowLeft className="size-5" />
        )}
      </Button>
    </div>
  );
};

export default DashboardMenu;
