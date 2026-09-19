import Container from "@/components/container";
import Image from "@/components/image";
import TitleSection from "@/components/Title";
import imgSatuanTugas from "@/assets/satuan-tugas.png";

export default function SatuanTugasSection() {
  return (
    <section className="bg-[#F9FAFB]">
      <Container className="space-y-7 py-10">
        <TitleSection
          titleClass="text-center"
          title="Satuan Tugas Koperasi Desa/Kelurahan Merah Putih"
        />
        <Image src={imgSatuanTugas} />
      </Container>
    </section>
  );
}
