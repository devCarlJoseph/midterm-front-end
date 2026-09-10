import { ChevronDown, ChevronUp, ArrowRight, RotateCcw } from "lucide-react";

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
    <aside className="w-[250px] shrink-0 rounded-xl border border-gray-100 bg-white shadow-sm sticky top-6 self-start">
      {/* Category Header */}
      <div className="p-4">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">
          Categories
        </h2>

        {/* Category List */}
        <div className="space-y-1">
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
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs transition-all ${
                    isOpen || isActive
                      ? "bg-emerald-50 font-medium text-emerald-700"
                      : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  <span
                    className={
                      isOpen || isActive ? "text-emerald-600" : "text-gray-400"
                    }
                  >
                    <Icon size={16} />
                  </span>

                  <span className="flex-1">{category.name}</span>

                  {hasSubcategories ? (
                    isOpen ? (
                      <ChevronUp size={13} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={13} className="text-gray-400" />
                    )
                  ) : (
                    isActive && (
                      <ArrowRight size={13} className="text-emerald-600" />
                    )
                  )}
                </button>

                {/* Subcategories */}
                {hasSubcategories && isOpen && (
                  <div className="mt-1 space-y-0.5 pl-6 pr-1">
                    {category.subcategories?.map((subcategory) => {
                      const isSubcategoryActive =
                        activeCategory === subcategory;

                      return (
                        <button
                          type="button"
                          key={subcategory}
                          onClick={() => onSelectCategory(subcategory)}
                          className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-[11px] transition-all ${
                            isSubcategoryActive
                              ? "bg-emerald-50/70 font-medium text-emerald-700"
                              : "text-gray-500 hover:bg-emerald-50/50 hover:text-emerald-700"
                          }`}
                        >
                          <span>{subcategory}</span>
                          {isSubcategoryActive && (
                            <ArrowRight
                              size={11}
                              className="text-emerald-600"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Reset Filter Button */}
      <div className="p-4">
        <button
          type="button"
          onClick={() => onSelectCategory("Vegetables & Fruit")}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-50 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw size={13} />
          Reset Category
        </button>
      </div>
    </aside>
  );
}