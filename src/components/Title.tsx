interface TitleSectionProps {
  title?: string;
  description?: string;
  titleClass?: string;
}

export default function TitleSection({
  title,
  description: subtitle,
  titleClass,
}: TitleSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1
        className={`text-xl font-bold md:text-2xl lg:text-[24px] ${titleClass}`}
      >
        {title}
      </h1>
      <h2 className="text-base font-medium lg:text-[14px]">{subtitle}</h2>
    </div>
  );
}
