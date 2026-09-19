import { columnsTableUserManagement } from "./components/column";
import { DataTable } from "@/components/data.table";
import { AddUserForm } from "./components/add.user.form";
import { User } from "@/types/user.management.types";

export default function UserManagement() {
  const data: User[] = [
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

  return (
    <div>
      <DataTable
        data={data}
        columns={columnsTableUserManagement}
        filterColumn="nip"
        placeHolder="Cari NIP"
      >
        <AddUserForm />
      </DataTable>
    </div>
  );
}
