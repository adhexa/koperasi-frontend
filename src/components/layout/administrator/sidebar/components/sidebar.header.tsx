import { X } from "lucide-react";
import { useSidebar } from "@/context/sidebar.context";

export function SidebarHeader() {
  const { close } = useSidebar();

  return (
    <div className="relative flex items-center justify-between border-blue-700 p-4 border-b h-16">
      <div className="absolute inset-0 flex justify-center items-center">
        <h2 className="text-xl font-semibold">HEADER</h2>
      </div>
      <div className="ml-auto z-10 md:hidden">
        <button
          onClick={close}
          className="cursor-pointer rounded p-1 hover:bg-blue-700"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </button>
      </div>
    </div>
  );
}
