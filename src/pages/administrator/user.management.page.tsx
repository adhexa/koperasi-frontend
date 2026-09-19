import { Breadcrumbs } from "@/components/breadcrumbs";
import CardAdmin from "@/components/card.admin";
import UserManagement from "@/features/administrator/user-management";

export default function UserManagementPage() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "User Management" },
  ];

  return (
    <section className="space-y-6 py-3">
      <Breadcrumbs items={breadcrumbItems} />
      <CardAdmin
        titleCard="User Management"
        descriptionCard="Menampilkan user management."
        subTitleCard="Klik tombol tambah untuk menambahkan user baru."
      >
        <UserManagement />
      </CardAdmin>
    </section>
  );
}
