import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, CheckCircle2, XCircle, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user.management.types";
import { usersAPI } from "@/lib/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function UserActions({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const toggleStatusMutation = useMutation({
    mutationFn: () => usersAPI.updateStatus(user.id, user.status !== "active"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => {
            navigator.clipboard.writeText(user.nip || user.id);
            alert(`NIP/ID ${user.nip || user.id} berhasil disalin!`);
          }}
        >
          <Copy className="h-4 w-4" />
          Copy ID / NIP
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => {
            alert(
              `Detail User:\nNama: ${user.nama}\nUsername: ${user.username}\nNIP: ${user.nip}\nJabatan: ${user.jabatan}\nStatus: ${user.status}`
            );
          }}
        >
          <Eye className="h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2"
          onClick={() => toggleStatusMutation.mutate()}
        >
          {user.status === "active" ? (
            <>
              <XCircle className="h-4 w-4 text-red-500" />
              <span>Set Nonaktif</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Set Status Aktif</span>
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columnsTableUserManagement: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "nama",
    header: "Nama User",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={status === "active" ? "default" : "secondary"}
          className={status === "active" ? "bg-green-500" : "bg-gray-400"}
        >
          {status === "active" ? "Aktif" : "Nonaktif"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
