import { DataTable } from "@/components/data.table";

import { columnsAdministratorPermissions } from "./column.administrtaor.permission";
import { AddPermissionForm } from "./add.permission.form";

export default function AdministratorPermission() {
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
      data={data}
      columns={columnsAdministratorPermissions}
      filterColumn="menu"
      placeHolder="Cari Menu"
    >
      <AddPermissionForm />
    </DataTable>
  );
}
