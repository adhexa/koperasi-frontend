import { columnsTableUserManagement } from "./components/column";
import { DataTable } from "@/components/data.table";
import { AddUserForm } from "./components/add.user.form";
import { User } from "@/types/user.management.types";
import { usersAPI } from "@/lib/api/users";
import { useQuery } from "@tanstack/react-query";

export default function UserManagement() {
  const { data: usersData, isLoading, error } = useQuery<User[]>({
    queryKey: ["users-list"],
    queryFn: () => usersAPI.getUsers(),
  });

  const fallbackData: User[] = [
    {
      id: "1",
      nip: "1987654321",
      username: "andi123",
      nama: "Andi Prasetyo",
      jabatan: "Admin",
      status: "active",
    },
    {
      id: "2",
      nip: "1987123456",
      username: "budi456",
      nama: "Budi Santoso",
      jabatan: "Manager",
      status: "inactive",
    },
    {
      id: "3",
      nip: "1978123456",
      username: "citra789",
      nama: "Citra Dewi",
      jabatan: "Supervisor",
      status: "active",
    },
    {
      id: "4",
      nip: "1998123456",
      username: "dian001",
      nama: "Dian Rahma",
      jabatan: "Staff",
      status: "inactive",
    },
    {
      id: "5",
      nip: "1999021345",
      username: "eko222",
      nama: "Eko Nugroho",
      jabatan: "HR",
      status: "active",
    },
  ];

  const dataToDisplay =
    usersData && usersData.length > 0
      ? usersData
      : error
      ? fallbackData
      : usersData || fallbackData;

  return (
    <div>
      {isLoading && (
        <div className="py-2 text-center text-sm font-medium text-blue-600 animate-pulse">
          🔄 Memuat data pengguna dari database backend...
        </div>
      )}
      <DataTable
        data={dataToDisplay}
        columns={columnsTableUserManagement}
        filterColumn="nip"
        placeHolder="Cari NIP..."
      >
        <AddUserForm />
      </DataTable>
    </div>
  );
}
