import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { Outlet, useLocation } from "react-router-dom";

export function DashboardLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/") {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return (
    <div className="">
      <Sidebar />
      <div className="ml-0 flex flex-1 flex-col md:ml-64">
        <Header />
        <main className="flex-1 overflow-hidden p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
