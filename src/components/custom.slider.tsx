import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  onClick?: () => void;
}

interface CustomSliderProps {
  children: React.ReactNode;
  slidesToShow?: number;
  slidesToScroll?: number;
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/70 p-2 shadow-md backdrop-blur-md transition hover:bg-white"
      onClick={onClick}
      aria-label="Next"
    >
      <ChevronRight className="h-5 w-5 text-gray-700" />
    </button>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 cursor-pointer rounded-full bg-white/70 p-2 opacity-50 shadow-md backdrop-blur-md transition hover:bg-white"
      onClick={onClick}
      aria-label="Previous"
    >
      <ChevronLeft className="h-5 w-5 text-gray-700" />
    </button>
  );
}

export default function CustomSlider({
  children,
  slidesToShow = 3,
  slidesToScroll = 1,
  dots = false,
  arrows = true,
  infinite = true,
  autoplay = false,
  autoplaySpeed = 3000,
  className = "",
}: CustomSliderProps) {
  const settings = {
    dots,
    arrows,
    infinite,
    speed: 500,
    autoplay,
    autoplaySpeed,
    slidesToShow,
    slidesToScroll,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, slidesToShow),
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={`relative ${className}`}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
