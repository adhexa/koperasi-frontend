import { DashboardLayout } from "@/components/layout/administrator/dashboard.layout";
import DaftarPermission from "@/features/administrator/daftar-permission";
import DaftarMenuPage from "@/pages/administrator/daftar.menu.page";
import DaftarRolesPage from "@/pages/administrator/daftar.roles.page";
import ProfileUserPage from "@/pages/administrator/profile.user.page";
import UserManagementPage from "@/pages/administrator/user.management.page";
import { Route } from "react-router-dom";

export const adminRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<h1>Dashboard Index</h1>} />
    <Route path="roles" element={<DaftarRolesPage />} />
    <Route path="permissions" element={<DaftarPermission />} />
    <Route path="user-management" element={<UserManagementPage />} />
    <Route path="menus" element={<DaftarMenuPage />} />
    <Route path="profile" element={<ProfileUserPage />} />
  </Route>
);
