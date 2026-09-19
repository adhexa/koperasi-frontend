import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate?: Date;
}

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setExpired(true);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (expired) {
    return (
      <div className="text-2xl lg:text-3xl font-bold text-white">Waktu Telah Habis</div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
      {[
        { value: timeLeft.days, label: "Hari" },
        { value: timeLeft.hours, label: "Jam" },
        { value: timeLeft.minutes, label: "Menit" },
        { value: timeLeft.seconds, label: "Detik" },
      ].map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="min-w-[60px] rounded-xl bg-white px-3 py-3 text-center shadow-lg sm:min-w-[70px] sm:px-4 sm:py-4 lg:min-w-[80px] lg:px-5 lg:py-5 xl:min-w-[90px] xl:px-6 xl:py-6">
            <div className="text-xl font-bold text-[#204984] sm:text-2xl lg:text-3xl xl:text-4xl">
              {item.value}
            </div>
            <div className="text-xs font-medium text-[#204984] sm:text-sm lg:text-base">
              {item.label}
            </div>
          </div>
          {index < 3 && (
            <div className="px-1 text-xl font-bold text-white sm:px-2 sm:text-2xl lg:text-3xl xl:text-4xl">
              :
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
