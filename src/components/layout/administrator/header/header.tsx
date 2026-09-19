import { UserDropdown } from "./components/header.dropdown";
import { HeaderTitle } from "./components/header.title";
import { SidebarToggle } from "./components/header.toggle";

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-between border-b bg-white px-4 ">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <HeaderTitle headerTitle="ROLE BASED ACCESS CONTROL" />
      </div>

      <div className="flex items-center gap-4">
        <UserDropdown />
      </div>
    </header>
  );
}
