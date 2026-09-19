import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./countdown.timer";

export default function HeroSection() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 46);

  return (
    <section className="relative overflow-hidden bg-red-700">
      {/* Background Map Pattern */}
      <div className="absolute inset-0 opacity-20"></div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-32 lg:pt-24 lg:pb-48">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h1 className="mb-4 text-3xl leading-tight font-bold text-white uppercase sm:text-4xl lg:text-6xl">
                Wujudkan Koperasi
                <br />
                Desa
                <div className="mt-2 text-yellow-400">Merah Putih Digital</div>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 lg:text-xl">
                Platform terpadu untuk mendirikan dan mengembangkan koperasi
                desa secara legal, modern, dan digital. Bergabunglah dalam
                gerakan pemberdayaan ekonomi desa.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="w-full rounded-full bg-blue-600 px-8 py-6 text-lg font-semibold text-white hover:bg-blue-700 sm:w-auto">
                  Daftar Koperasi
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white bg-white px-8 py-6 text-lg font-semibold text-red-700 hover:bg-gray-50 sm:w-auto"
                >
                  Lihat Statistik
                </Button>
              </div>
            </div>

            {/* Right - Timer */}
            <div className="flex justify-center lg:justify-end">
              <CountdownTimer targetDate={targetDate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
