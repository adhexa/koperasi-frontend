import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  title?: string;
  hidden?: boolean;
}

export default function CardWrapper({
  children,
  title,
  hidden,
}: CardWrapperProps) {
  return (
    <Card className="border-b border-gray-300 shadow-none w-full">
      <CardHeader className="border-b text-center">
        <CardTitle>{title}</CardTitle>

        {!hidden && (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mt-2">
            <span className="text-lg font-semibold text-gray-700">CN</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="my-4">{children}</CardContent>
    </Card>
  );
}
