import { useSidebar } from "@/context/sidebar.context";
import { SidebarHeader } from "./components/sidebar.header";
import { SidebarNav } from "./components/sidebar.nav";
import { SidebarFooter } from "./components/sidebar.footer";

export function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-blue-600 text-white transition-transform duration-300 ease-in-out border-r border-blue-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <SidebarHeader />
        <SidebarNav />
        <SidebarFooter />
      </aside>
    </>
  );
}
