import TitleSection from "@/components/Title";
import ProfileCard from "./components/profile.card";
import { ProfileCardProps } from "@/types/profile.gubernur.types";
import Container from "@/components/container";
import CustomSlider from "@/components/custom.slider";

// Import all 38 gubernur photos
import acehGubernur from "@/assets/images/gubernur/Aceh.png";
import sumateraUtaraGubernur from "@/assets/images/gubernur/Sumatera_Utara.jpg";
import sumateraBaratGubernur from "@/assets/images/gubernur/Sumatera_Barat.jpg";
import riauGubernur from "@/assets/images/gubernur/Riau.jpg";
import jambiGubernur from "@/assets/images/gubernur/Jambi.jpg";
import sumateraSelatanGubernur from "@/assets/images/gubernur/Sumatera_Selatan.jpg";
import bengkuluGubernur from "@/assets/images/gubernur/Bengkulu.png";
import lampungGubernur from "@/assets/images/gubernur/Lampung.jpg";
import kepulauanBangkaBelitungGubernur from "@/assets/images/gubernur/Kepulauan_Bangka_Belitung.jpg";
import kepulauanRiauGubernur from "@/assets/images/gubernur/Kepulauan_Riau.png";
import dkiJakartaGubernur from "@/assets/images/gubernur/Daerah_Khusus_Ibukota_Jakarta.jpg";
import jawaBaratGubernur from "@/assets/images/gubernur/Jawa_Barat.jpg";
import jawaTengahGubernur from "@/assets/images/gubernur/Jawa_Tengah.png";
import diyYogyakartaGubernur from "@/assets/images/gubernur/Daerah_Istimewa_Yogyakarta.png";
import jawaTimurGubernur from "@/assets/images/gubernur/Jawa_Timur.png";
import bantenGubernur from "@/assets/images/gubernur/Banten.png";
import baliGubernur from "@/assets/images/gubernur/Bali.png";
import ntbGubernur from "@/assets/images/gubernur/Nusa_Tenggara_Barat.jpg";
import nttGubernur from "@/assets/images/gubernur/Nusa_Tenggara_Timur.jpg";
import kalimantanBaratGubernur from "@/assets/images/gubernur/Kalimantan_Barat.png";
import kalimantanTengahGubernur from "@/assets/images/gubernur/Kalimantan_Tengah.png";
import kalimantanSelatanGubernur from "@/assets/images/gubernur/Kalimantan_Selatan.png";
import kalimantanTimurGubernur from "@/assets/images/gubernur/Kalimantan_Timur.jpg";
import kalimantanUtaraGubernur from "@/assets/images/gubernur/Kalimantan_Utara.png";
import sulawesiUtaraGubernur from "@/assets/images/gubernur/Sulawesi_Utara.png";
import sulawesiTengahGubernur from "@/assets/images/gubernur/Sulawesi_Tengah.jpg";
import sulawesiSelatanGubernur from "@/assets/images/gubernur/Sulawesi_Selatan.jpg";
import sulawesiTenggaraGubernur from "@/assets/images/gubernur/Sulawesi_Tenggara.jpg";
import gorontaloGubernur from "@/assets/images/gubernur/Gorontalo.jpg";
import sulawesiBaratGubernur from "@/assets/images/gubernur/Sulawesi_Barat.png";
import malukuGubernur from "@/assets/images/gubernur/Maluku.png";
import malukuUtaraGubernur from "@/assets/images/gubernur/Maluku_Utara.jpg";
import papuaBaratGubernur from "@/assets/images/gubernur/Papua_Barat.jpg";
import papuaGubernur from "@/assets/images/gubernur/Papua.png";
import papuaTengahGubernur from "@/assets/images/gubernur/Papua_Tengah.jpg";
import papuaPegununganGubernur from "@/assets/images/gubernur/Papua_Pegunungan.png";
import papuaSelatanGubernur from "@/assets/images/gubernur/Papua_Selatan.png";
import papuaBaratDayaGubernur from "@/assets/images/gubernur/Papua_Barat_Daya.png";

const gubernurProfiles: ProfileCardProps[] = [
  { name: "Muzakir Manaf", position: "Gubernur Provinsi Aceh", imageUrl: acehGubernur },
  { name: "Bobby Nasution", position: "Gubernur Provinsi Sumatera Utara", imageUrl: sumateraUtaraGubernur },
  { name: "Mahyeldi Ansharullah", position: "Gubernur Provinsi Sumatera Barat", imageUrl: sumateraBaratGubernur },
  { name: "Abdul Wahid", position: "Gubernur Provinsi Riau", imageUrl: riauGubernur },
  { name: "Al Haris", position: "Gubernur Provinsi Jambi", imageUrl: jambiGubernur },
  { name: "Herman Deru", position: "Gubernur Provinsi Sumatera Selatan", imageUrl: sumateraSelatanGubernur },
  { name: "Helmi Hasan", position: "Gubernur Provinsi Bengkulu", imageUrl: bengkuluGubernur },
  { name: "Rahmat Mirzani Djausal", position: "Gubernur Provinsi Lampung", imageUrl: lampungGubernur },
  { name: "Hidayat Arsani", position: "Gubernur Provinsi Kepulauan Bangka Belitung", imageUrl: kepulauanBangkaBelitungGubernur },
  { name: "Ansar Ahmad", position: "Gubernur Provinsi Kepulauan Riau", imageUrl: kepulauanRiauGubernur },
  { name: "Pramono Anung", position: "Gubernur Daerah Khusus Ibukota Jakarta", imageUrl: dkiJakartaGubernur },
  { name: "Dedi Mulyadi", position: "Gubernur Provinsi Jawa Barat", imageUrl: jawaBaratGubernur },
  { name: "Ahmad Luthfi", position: "Gubernur Provinsi Jawa Tengah", imageUrl: jawaTengahGubernur },
  { name: "Hamengkubuwana X", position: "Gubernur Daerah Istimewa Yogyakarta", imageUrl: diyYogyakartaGubernur },
  { name: "Khofifah Indar Parawansa", position: "Gubernur Provinsi Jawa Timur", imageUrl: jawaTimurGubernur },
  { name: "Andra Soni", position: "Gubernur Provinsi Banten", imageUrl: bantenGubernur },
  { name: "I Wayan Koster", position: "Gubernur Provinsi Bali", imageUrl: baliGubernur },
  { name: "Lalu Muhamad Iqbal", position: "Gubernur Provinsi Nusa Tenggara Barat", imageUrl: ntbGubernur },
  { name: "Emanuel Melkiades Laka Lena", position: "Gubernur Provinsi Nusa Tenggara Timur", imageUrl: nttGubernur },
  { name: "Ria Norsan", position: "Gubernur Provinsi Kalimantan Barat", imageUrl: kalimantanBaratGubernur },
  { name: "Agustiar Sabran", position: "Gubernur Provinsi Kalimantan Tengah", imageUrl: kalimantanTengahGubernur },
  { name: "Hasnuryadi Sulaiman", position: "Gubernur Provinsi Kalimantan Selatan", imageUrl: kalimantanSelatanGubernur },
  { name: "Rudy Mas'ud", position: "Gubernur Provinsi Kalimantan Timur", imageUrl: kalimantanTimurGubernur },
  { name: "Zainal Arifin Paliwang", position: "Gubernur Provinsi Kalimantan Utara", imageUrl: kalimantanUtaraGubernur },
  { name: "Yulius Selvanus", position: "Gubernur Provinsi Sulawesi Utara", imageUrl: sulawesiUtaraGubernur },
  { name: "Anwar Hafid", position: "Gubernur Provinsi Sulawesi Tengah", imageUrl: sulawesiTengahGubernur },
  { name: "Andi Sudirman Sulaiman", position: "Gubernur Provinsi Sulawesi Selatan", imageUrl: sulawesiSelatanGubernur },
  { name: "Andi Sumangerukka", position: "Gubernur Provinsi Sulawesi Tenggara", imageUrl: sulawesiTenggaraGubernur },
  { name: "Gusnar Ismail", position: "Gubernur Provinsi Gorontalo", imageUrl: gorontaloGubernur },
  { name: "Suhardi Duka", position: "Gubernur Provinsi Sulawesi Barat", imageUrl: sulawesiBaratGubernur },
  { name: "Hendrik Lewerissa", position: "Gubernur Provinsi Maluku", imageUrl: malukuGubernur },
  { name: "Sherly Tjoanda", position: "Gubernur Provinsi Maluku Utara", imageUrl: malukuUtaraGubernur },
  { name: "Dominggus Mandacan", position: "Gubernur Provinsi Papua Barat", imageUrl: papuaBaratGubernur },
  { name: "Ramses Limbong", position: "Gubernur Provinsi Papua", imageUrl: papuaGubernur },
  { name: "Hermus Indou", position: "Gubernur Provinsi Papua Tengah", imageUrl: papuaTengahGubernur },
  { name: "Wempi Wetipo", position: "Gubernur Provinsi Papua Pegunungan", imageUrl: papuaPegununganGubernur },
  { name: "Henok Ibo", position: "Gubernur Provinsi Papua Selatan", imageUrl: papuaSelatanGubernur },
  { name: "Yoab Syukur", position: "Gubernur Provinsi Papua Barat Daya", imageUrl: papuaBaratDayaGubernur },
];

export default function ProfileGubernurSection() {
  return (
    <section className="bg-gradient-to-br from-[#F1F4FB] via-[#F8FAFF] to-[#EEF2FF] py-20 relative overflow-hidden">


      <Container className="space-y-12 relative z-10">
        <TitleSection
          title="Gubernur se-Indonesia"
          description="Temukan daftar lengkap Gubernur di seluruh Indonesia."
        />
                <div className="px-4">
          <CustomSlider
            slidesToShow={4}
            autoplay
            arrows
            className="gubernur-slider"
            autoplaySpeed={3500}
          >
            {gubernurProfiles.map((profile, index) => (
              <div key={index} className="px-4">
                <ProfileCard {...profile} />
              </div>
            ))}
          </CustomSlider>
        </div>
      </Container>
    </section>
  );
}
