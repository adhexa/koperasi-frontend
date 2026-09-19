import CardAdmin from "@/components/card.admin";
import DaftarMenu from "@/features/administrator/daftar-menu";

export default function DaftarMenuPage() {
  return (
    <CardAdmin
      titleCard="Daftar Menu"
      descriptionCard="Menampilkan daftar menu."
      subTitleCard="Klik tombol tambah untuk menambahkan menu baru."
    >
      <DaftarMenu />
    </CardAdmin>
  );
}
