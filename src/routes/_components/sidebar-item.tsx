import { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

interface SideBarItemProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

const SideBarItem = ({ icon: Icon, href, label }: SideBarItemProps) => {
  const navigate = useNavigate();
  let location = useLocation();

  const handleClick = () => {
    navigate(href);
  };

  const isActive =
    (location.pathname === "/" && href === "/") ||
    location.pathname === href ||
    location.pathname.startsWith("${href}/");
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700  "
      )}
    >
      <div className="flex items-center gap-x-2 py-2">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      ></div>
    </button>
  );
};

export default SideBarItem;
