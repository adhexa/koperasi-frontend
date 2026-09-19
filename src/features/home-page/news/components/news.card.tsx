import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface NewsCardProps {
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  href?: string;
  size?: "default" | "large" | "small";
}

export default function NewsCard({
  title = "After All Is Said And Done, More Is Done",
  category = "Business",
  date = "5 may tahun - 27 Des 2023",
  imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5idUz4ZMtb4kflxjkAGnexNE3Ct03A.png",
  href = "#",
  size = "default",
}: NewsCardProps) {
  const CardWrapper = href ? "a" : "div";

  const getHeightClass = () => {
    switch (size) {
      case "large":
        return "h-full min-h-[600px]";
      case "small":
        return "h-full min-h-[285px]";
      default:
        return "h-80";
    }
  };

  const getTitleClass = () => {
    switch (size) {
      case "large":
        return "text-2xl lg:text-3xl";
      case "small":
        return "text-base lg:text-lg";
      default:
        return "text-xl";
    }
  };

  const getPaddingClass = () => {
    switch (size) {
      case "large":
        return "p-8";
      case "small":
        return "p-4";
      default:
        return "p-6";
    }
  };

  return (
    <Card className="group relative overflow-hidden rounded-lg border-0 shadow-lg w-full h-full">
      <CardWrapper
        href={href}
        className={`relative block w-full cursor-pointer ${getHeightClass()}`}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            variant="destructive"
            className="bg-[#204984] px-3 py-1 font-medium text-white hover:bg-[#204984] text-xs"
          >
            {category}
          </Badge>
        </div>

        {/* Content Overlay */}
        <div className={`absolute right-0 bottom-0 left-0 text-white ${getPaddingClass()}`}>
          <p className="mb-2 text-xs font-light text-gray-200 opacity-90">{date}</p>
          <h3
            className={`line-clamp-3 leading-tight font-bold ${getTitleClass()}`}
          >
            {title}
          </h3>
        </div>
      </CardWrapper>
    </Card>
  );
}
