import CardAdmin from "@/components/card.admin";

import {
  Level,
  columnsTableRoles,
} from "@/features/administrator/daftar-roles/components/column";
import { DataTable } from "@/components/data.table";
import { AddrRolesForm } from "@/features/administrator/daftar-roles/components/add.roles.form";

export default function DaftarRolesPage() {
  const data: Level[] = [
    {
      id: "1",
      namaLevel: "Admin",
      status: "active",
    },
    {
      id: "2",
      namaLevel: "Manager",
      status: "inactive",
    },
    {
      id: "3",
      namaLevel: "Supervisor",
      status: "active",
    },
    {
      id: "4",
      namaLevel: "Staff",
      status: "inactive",
    },
    {
      id: "5",
      namaLevel: "HR",
      status: "active",
    },
  ];
  return (
    <CardAdmin
      titleCard="Daftar Roles"
      descriptionCard="Menampilkan daftar roles yang tersedia."
      subTitleCard="Klik tombol tambah roles untuk menambahkan level baru."
    >
      <DataTable
        data={data}
        columns={columnsTableRoles}
        filterColumn="namaLevel"
        placeHolder="Cari level..."
      >
        <AddrRolesForm />
      </DataTable>
    </CardAdmin>
  );
}
