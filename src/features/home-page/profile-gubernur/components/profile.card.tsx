import { Card } from "@/components/ui/card";
import { ProfileCardProps } from "@/types/profile.gubernur.types";

export default function ProfileCard({
  name,
  position,
  imageUrl,
}: ProfileCardProps) {
  return (
    <Card className="w-full h-[380px] overflow-hidden rounded-2xl border-0 shadow-lg bg-white">
      {/* Image Container with Consistent Background */}
      <div className="relative bg-white h-[260px] flex-shrink-0 overflow-hidden">
                <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="h-full w-full rounded-t-2xl object-contain object-center bg-white"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-6 min-h-0 bg-white">


        <div className="flex-1 min-h-0 pt-2">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed font-medium">
            {position}
          </p>
        </div>

      </div>
    </Card>
  );
}
