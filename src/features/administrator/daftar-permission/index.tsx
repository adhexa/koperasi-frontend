import CardAdmin from "@/components/card.admin";
import { ReusableTabs } from "@/components/tabs";
import AdministratorPermission from "./components/administrator.permission";

export default function DaftarPermission() {
  return (
    <ReusableTabs
      defaultValue="administrator"
      tabs={[
        {
          label: "Administrator",
          value: "administrator",
          content: (
            <CardAdmin titleCard="Administrator">
              <AdministratorPermission />
            </CardAdmin>
          ),
        },
        {
          label: "Maker",
          value: "maker",
          content: (
            <CardAdmin titleCard="Maker">
              <h1>Profile</h1>
            </CardAdmin>
          ),
        },
      ]}
    />
  );
}
