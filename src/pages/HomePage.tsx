import { Layout } from "../components/layout";

import ProfileGubernurSection from "@/features/home-page/profile-gubernur";
import NewsSection from "@/features/home-page/news";
import SatuanTugasSection from "@/features/home-page/satuan-tugas";
import HeroSection from "@/features/home-page/hero/hero.section";

export function HomePage() {
  return (
    <Layout>
      <div className="bg-white">
        <HeroSection />
        <div className="space-y-16 py-8 lg:py-12">
          <NewsSection />
          <ProfileGubernurSection />
          <SatuanTugasSection />
        </div>
      </div>
    </Layout>
  );
}
