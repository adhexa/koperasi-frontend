export function SidebarFooter() {
  const data = {
    username: "John Doe",
    role: "Admin",
    avatarName: "JD",
  };

  return (
    <div className="border-t border-blue-700 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700">
          <span className="text-xs text-white">
            {data.avatarName?.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium">{data.username}</p>
          <p className="text-xs text-blue-200">{data.role}</p>
        </div>
      </div>
    </div>
  );
}
