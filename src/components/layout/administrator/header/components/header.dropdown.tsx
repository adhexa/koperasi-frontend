import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "../../hooks/useLogout";
import { ConfirmationDialog } from "@/components/confirmation.dialog";

export function UserDropdown() {
  const { openDialog, setOpenDialog, handleLogout } = useLogout();

  const username = "JohnDoe123";
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="cursor-pointer outline-none hover:bg-transparent focus:bg-transparent"
        >
          <button className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-1 transition">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 font-semibold text-blue-900">
              {firstLetter}
            </div>
            <span className="hidden font-medium text-blue-900 underline ">
              {username}
            </span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleLogout}
        title="Logout"
        description="Are you sure want to logout?"
      />
    </>
  );
}
