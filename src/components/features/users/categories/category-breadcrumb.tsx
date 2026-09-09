export function CategoryBreadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      <span className="hover:text-[#087a5a]">
        Home
      </span>

      <span className="text-slate-300">
        /
      </span>

      <span className="font-medium text-[#087a5a]">
        Categories
      </span>
    </div>
  );
}