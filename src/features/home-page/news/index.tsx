import Container from "@/components/container";
import NewsCard from "../news/components/news.card";
import TitleSection from "@/components/Title";

// Import all news images from berita folder
import hardiknas1 from "@/assets/images/berita/ Kemendagri Gelar Upacara Hardiknas, Dukung Pendidikan Bermutu untuk Semua.png";
import hardiknas2 from "@/assets/images/berita/Pimpin Upacara Hardiknas di Pemkot Blitar, Wamendagri Bima Arya Ingatkan Kembali Semangat Ki Hajar Dewantara.png";
import pembangunanDOB from "@/assets/images/berita/Kemendagri Tegaskan Komitmen Dukung Penyelesaian Pembangunan Kawasan Pusat Pemerintahan di Empat DOB.png";
import sinergimalang from "@/assets/images/berita/Wamendagri Bima Arya Ajak Pemkot Malang Perkuat Sinergi Dukung Program Prioritas Nasional.png";
import perencanaanPembangunan from "@/assets/images/berita/Kemendagri Perencanaan Pembangunan Daerah Harus Selaras dengan Perencanaan Pembangunan Nasional.png";

const featuredNews = {
  title: "Kemendagri Gelar Upacara Hardiknas, Dukung Pendidikan Bermutu untuk Semua",
  category: "Pendidikan",
  date: "Redaksi - 2 Mei 2024",
  imageUrl: hardiknas1,
  href: "#",
};

const sideNews = [
  {
    title: "Pimpin Upacara Hardiknas di Pemkot Blitar, Wamendagri Bima Arya Ingatkan Kembali Semangat Ki Hajar Dewantara",
    category: "Pendidikan",
    date: "Redaksi - 2 Mei 2024",
    imageUrl: hardiknas2,
    href: "#",
  },
  {
    title: "Kemendagri Tegaskan Komitmen Dukung Penyelesaian Pembangunan Kawasan Pusat Pemerintahan di Empat DOB",
    category: "Pembangunan",
    date: "Redaksi - 1 Mei 2024",
    imageUrl: pembangunanDOB,
    href: "#",
  },
  {
    title: "Wamendagri Bima Arya Ajak Pemkot Malang Perkuat Sinergi Dukung Program Prioritas Nasional",
    category: "Kerjasama",
    date: "Redaksi - 30 April 2024",
    imageUrl: sinergimalang,
    href: "#",
  },
  {
    title: "Kemendagri: Perencanaan Pembangunan Daerah Harus Selaras dengan Perencanaan Pembangunan Nasional",
    category: "Perencanaan",
    date: "Redaksi - 29 April 2024",
    imageUrl: perencanaanPembangunan,
    href: "#",
  },
];

export default function NewsSection() {
  return (
    <Container className="space-y-8 py-12">
      <TitleSection
        title="Berita Terkini"
        description="Informasi terbaru seputar perkembangan Koperasi Merah Putih"
      />
      <div className="grid grid-cols-12 gap-4 h-[600px]">
        {/* Featured News - Left Side - Takes 6 columns */}
        <div className="col-span-12 lg:col-span-6 h-full">
          <NewsCard {...featuredNews} size="large" />
        </div>

        {/* Side News Grid - Right Side - Takes 6 columns */}
        <div className="col-span-12 lg:col-span-6 h-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {sideNews.map((news, index) => (
              <div key={index} className="w-full h-full">
                <NewsCard {...news} size="small" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
