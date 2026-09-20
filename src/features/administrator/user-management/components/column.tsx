import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, CheckCircle2, XCircle, Copy, Eye, Pencil, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user.management.types";
import { usersAPI } from "@/lib/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function UserActions({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editNama, setEditNama] = useState(user.nama);
  const [editJabatan, setEditJabatan] = useState(user.jabatan);
  const [editError, setEditError] = useState<string | null>(null);

  const toggleStatusMutation = useMutation({
    mutationFn: () => usersAPI.updateStatus(user.id, user.status !== "active"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => usersAPI.deleteUser(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      queryClient.invalidateQueries({ queryKey: ["raw-users-list"] });
    },
    onError: (err: any) => {
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Gagal menghapus user"
      );
    },
  });

  const editUserMutation = useMutation({
    mutationFn: () =>
      usersAPI.updateProfile({
        nama_user: editNama,
        jabatan_user: editJabatan,
        uuid: user.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      queryClient.invalidateQueries({ queryKey: ["raw-users-list"] });
      setIsEditOpen(false);
      setEditError(null);
    },
    onError: (err: any) => {
      setEditError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          err.response?.data?.msg ||
          "Gagal memperbarui data user"
      );
    },
  });

  const handleOpenEdit = () => {
    setEditNama(user.nama);
    setEditJabatan(user.jabatan);
    setEditError(null);
    setIsEditOpen(true);
  };

  return (
    <>
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
            onClick={handleOpenEdit}
          >
            <Pencil className="h-4 w-4 text-blue-600" />
            Edit User
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={() => toggleStatusMutation.mutate()}
          >
            {user.status === "active" ? (
              <>
                <XCircle className="h-4 w-4 text-amber-500" />
                <span>Set Nonaktif</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Set Status Aktif</span>
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={() => {
              if (confirm(`Apakah Anda yakin ingin menghapus user ${user.nama}?`)) {
                deleteUserMutation.mutate();
              }
            }}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            <span>Hapus User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal Edit User */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Edit User ({user.username})</DialogTitle>
          </DialogHeader>

          {editError && (
            <div className="mb-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
              ⚠️ {editError}
            </div>
          )}

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-600">Nama User</Label>
              <Input
                value={editNama}
                onChange={(e: any) => setEditNama(e.target.value)}
                placeholder="Masukkan nama user"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-gray-600">Jabatan</Label>
              <Input
                value={editJabatan}
                onChange={(e: any) => setEditJabatan(e.target.value)}
                placeholder="Masukkan jabatan"
                className="h-10"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="flex-1 h-10 border-gray-200"
              disabled={editUserMutation.isPending}
            >
              Batal
            </Button>
            <Button
              onClick={() => editUserMutation.mutate()}
              disabled={editUserMutation.isPending || !editNama || !editJabatan}
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 gap-2 cursor-pointer"
            >
              {editUserMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {editUserMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columnsTableUserManagement: ColumnDef<User>[] = [
  {
    header: "No",
    cell: ({ row }: { row: any }) => row.index + 1,
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
    cell: ({ row }: { row: any }) => {
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
    cell: ({ row }: { row: any }) => <UserActions user={row.original} />,
  },
];

