import CardWrapper from "@/components/card.wrapper";
import { ProfileUserForm } from "./components/profile.user.form";
import { ProfileUserPassword } from "./components/profile.user.password";
import { ReusableTabs } from "@/components/tabs";

export default function ProfileUser() {
  return (
    <ReusableTabs
      defaultValue="profile"
      tabs={[
        {
          label: "Profile",
          value: "profile",
          content: (
            <CardWrapper title="Profile">
              <ProfileUserForm />
            </CardWrapper>
          ),
        },
        {
          label: "Password",
          value: "password",
          content: (
            <CardWrapper hidden title="Password">
              <ProfileUserPassword />
            </CardWrapper>
          ),
        },
      ]}
    />
  );
}
