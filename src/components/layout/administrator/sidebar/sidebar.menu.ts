import {
  Home,
  LogOut,
  ShieldCheck,
  KeyRound,
  Users,
  ListTree,
  User,
} from "lucide-react";

export const links = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Daftar Roles", href: "/dashboard/roles", icon: ShieldCheck },
  { name: "Daftar Permission", href: "/dashboard/permissions", icon: KeyRound },
  { name: "User Management", href: "/dashboard/user-management", icon: Users },
  { name: "Daftar Menu", href: "/dashboard/menus", icon: ListTree },
  { name: "Profile User", href: "/dashboard/profile", icon: User },
  { name: "Logout", href: "#", icon: LogOut },
];
