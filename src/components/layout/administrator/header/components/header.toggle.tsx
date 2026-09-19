import { Menu } from "lucide-react";
import { useSidebar } from "@/context/sidebar.context";
import { Button } from "@/components/ui/button";

export function SidebarToggle() {
  const { toggle } = useSidebar();

  return (
    <Button
      onClick={toggle}
      variant={"ghost"}
      className="cursor-pointer rounded p-1 hover:bg-gray-100 md:hidden"
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6" />
    </Button>
  );
}
