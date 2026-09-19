export function HeaderTitle({ headerTitle }: { headerTitle: string }) {
  return (
    <h1 className="text-xl font-semibold hidden md:block">{headerTitle}</h1>
  );
}
