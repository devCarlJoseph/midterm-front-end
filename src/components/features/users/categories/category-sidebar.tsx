import { ChevronDown, ChevronUp } from "lucide-react";

import { categories, type Category } from "./data/categories-data";

type CategorySidebarProps = {
  activeCategory: string;
  openCategory: string | null;
  onSelectCategory: (categoryName: string) => void;
  onToggleCategory: (categoryName: string) => void;
};

export function CategorySidebar({
  activeCategory,
  openCategory,
  onSelectCategory,
  onToggleCategory,
}: CategorySidebarProps) {
  return (
    <aside className="self-start overflow-hidden rounded-lg border border-slate-200 bg-white lg:sticky lg:top-24">
      <div className="bg-emerald-900 px-4 py-3 text-sm font-semibold text-white">
        Categories
      </div>

      <nav className="py-2">
        {categories.map((category: Category) => {
          const Icon = category.icon;
          const hasSubcategories = Boolean(category.subcategories?.length);
          const isOpen = openCategory === category.name;
          const isActive = activeCategory === category.name;

          return (
            <div key={category.name}>
              <button
                type="button"
                onClick={() => {
                  if (hasSubcategories) {
                    onToggleCategory(category.name);
                  }
                  onSelectCategory(category.name);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                  isOpen || isActive
                    ? "bg-emerald-50 text-slate-800"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={17} className="text-emerald-500" />

                <span className="flex-1">{category.name}</span>

                {hasSubcategories &&
                  (isOpen ? (
                    <ChevronUp size={16} className="text-slate-500" />
                  ) : (
                    <ChevronDown size={16} className="text-slate-500" />
                  ))}
              </button>

              {hasSubcategories && isOpen && (
                <div className="bg-white py-1">
                  {category.subcategories?.map((subcategory) => {
                    const isSubcategoryActive =
                      activeCategory === subcategory;

                    return (
                      <button
                        type="button"
                        key={subcategory}
                        onClick={() => onSelectCategory(subcategory)}
                        className={`block w-full px-5 py-2 text-left text-sm transition ${
                          isSubcategoryActive
                            ? "font-semibold text-emerald-600"
                            : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                        }`}
                      >
                        {subcategory}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
