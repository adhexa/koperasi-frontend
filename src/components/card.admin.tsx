import Image from "./image";
import kemendagriLogo from "@/assets/kemendagri-logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardAdminProps {
  children?: React.ReactNode;
  titleCard?: string;
  descriptionCard?: string;
  subTitleCard?: string;
  subDescriptionCard?: string;
}

export default function CardAdmin({
  children,
  titleCard,
  descriptionCard,
  subTitleCard,
  subDescriptionCard,
}: CardAdminProps) {
  return (
    <Card className="border-b border-gray-300 shadow-none space-y-5 rounded-sm">
      <CardHeader className="border-b">
        <CardTitle>{titleCard}</CardTitle>
        <CardDescription>{descriptionCard}</CardDescription>
      </CardHeader>
      <div className="flex items-center gap-4 border border-gray-300 rounded-sm p-5 my-5 mx-5">
        <Image
          className="h-24 object-contain"
          src={kemendagriLogo}
          alt="Kemendagri Logo"
        />
        <div>
          <CardTitle className="text-base">{subTitleCard}</CardTitle>
          <CardDescription>{subDescriptionCard}</CardDescription>
        </div>
      </div>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
