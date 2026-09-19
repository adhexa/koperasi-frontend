import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface AdministratorPermission {
  id: string;
  menu: string;
  url: string;
  get: boolean;
  post: boolean;
  put: boolean;
  delete: boolean;
  isMenu: boolean;
  isButton: boolean;
  isEndpoint: boolean;
}

export const columnsAdministratorPermissions: ColumnDef<AdministratorPermission>[] =
  [
    {
      header: "No",
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: "menu",
      header: "Menu",
    },
    {
      accessorKey: "url",
      header: "URL",
    },
    {
      accessorKey: "get",
      header: "GET",
      cell: () => <Checkbox />,
    },
    {
      accessorKey: "post",
      header: "POST",
      cell: () => <Checkbox />,
    },
    {
      accessorKey: "put",
      header: "PUT",
      cell: () => <Checkbox />,
    },
    {
      accessorKey: "delete",
      header: "DELETE",
      cell: () => <Checkbox />,
    },
    {
      accessorKey: "isMenu",
      header: "Is Menu",
      cell: () => <Checkbox />,
    },
    {
      accessorKey: "isButton",
      header: "Is Button",
      cell: () => <Checkbox />,
    },
    {
      accessorKey: "isEndpoint",
      header: "Is Endpoint",
      cell: () => <Checkbox />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
