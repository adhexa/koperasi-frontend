import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { links } from "../sidebar.menu";

export function SidebarNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const { handleLogout } = useLogout();

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2">
      {links.map((link) => {
        if (link.name === "Logout") {
          return (
            <button
              key={link.name}
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-700"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </button>
          );
        } else {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              to={link.href}
              className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-blue-700 ${
                isActive ? "bg-blue-700 font-medium" : ""
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        }
      })}
    </nav>
  );
}
