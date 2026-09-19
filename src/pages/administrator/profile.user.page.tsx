import CardAdmin from "@/components/card.admin";
import ProfileUser from "@/features/administrator/profile-user";

export default function ProfileUserPage() {
  return (
    <CardAdmin
      titleCard="Profile User"
      descriptionCard="Menampilkan profile user."
      subTitleCard="Edit informasi pribadi dan detail akun kamu di sini."
    >
      <ProfileUser />
    </CardAdmin>
  );
}
