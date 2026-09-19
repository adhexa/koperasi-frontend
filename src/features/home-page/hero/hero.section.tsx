import { Button } from "@/components/ui/button";
import { CountdownTimer } from "../hero/components/countdown.timer";
import indonesiaBanner from "@/assets/indonesia-banner.svg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const targetDatee = new Date("July 12, 2025 00:00:00");
  return (
    <section
      className="relative min-h-[80vh] lg:min-h-screen bg-no-repeat bg-center bg-cover flex items-center"
      style={{
        backgroundImage: `url(${indonesiaBanner})`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
      }}
    >
      {/* Background Map Pattern */}
      {/* <div className="absolute inset-0 opacity-20">
        <Image src={mapIndonesia} />
      </div> */}

      {/* Main Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left - Text Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <h1 className="text-3xl leading-tight font-bold text-white uppercase sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Wujudkan Koperasi
              <br />
              Desa
              <div className="mt-2 lg:mt-3 text-yellow-400">Merah Putih Digital</div>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-lg lg:max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
              Platform terpadu untuk mendirikan dan mengembangkan koperasi
              desa secara legal, modern, dan digital. Bergabunglah dalam
              gerakan pemberdayaan ekonomi desa.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center lg:justify-start">
              <Link to={"/socialization"}>
                <Button className="w-full rounded-full bg-blue-600 px-6 py-4 text-base font-semibold text-white hover:bg-blue-700 sm:w-auto sm:px-8 sm:py-5 sm:text-lg lg:px-8 lg:py-6">
                  Daftar Koperasi
                </Button>
              </Link>

              <Link to="/statistics">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white bg-white px-6 py-4 text-base font-semibold text-[#204984] hover:text-[#204984] hover:bg-gray-50 sm:w-auto sm:px-8 sm:py-5 sm:text-lg lg:px-8 lg:py-6"
                >
                  Lihat Statistik
                </Button>
              </Link>
            </div>
          </div>

          {/* Right - Timer */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <CountdownTimer targetDate={targetDatee} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}