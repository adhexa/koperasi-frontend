import { DataTable } from "@/components/data.table";
import { columnsDaftarMenu } from "./_components/column.daftar.menu";
import { AddMenuForm } from "./_components/add.menu.fom";

export default function DaftarMenu() {
  const data = [
    {
      id: "1",
      menu: "User Management",
      url: "/admin/users",
      get: true,
      post: false,
      put: true,
      delete: false,
      isMenu: true,
      isButton: false,
      isEndpoint: true,
    },
    {
      id: "2",
      menu: "Roles",
      url: "/admin/roles",
      get: true,
      post: true,
      put: true,
      delete: true,
      isMenu: true,
      isButton: false,
      isEndpoint: true,
    },
    {
      id: "3",
      menu: "Settings Save",
      url: "/admin/settings/save",
      get: false,
      post: true,
      put: false,
      delete: false,
      isMenu: false,
      isButton: true,
      isEndpoint: true,
    },
  ];
  return (
    <DataTable
      columns={columnsDaftarMenu}
      filterColumn="menu"
      placeHolder="Cari Menu"
      data={data}
    >
      <AddMenuForm />
    </DataTable>
  );
}
