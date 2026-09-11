import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Bike,
  Star,
  Zap,
  Tag,
} from "lucide-react";
import { storeCategoriesList } from "../contents/store-filter-content";

export interface StoreFiltersState {
  category: string;
  hasDeals: boolean;
  freeDelivery: boolean;
  topRated: boolean;
  fastDelivery: boolean;
  sortBy: "recommended" | "rating" | "fastest";
}

interface HomeSidebarFiltersProps {
  filters: StoreFiltersState;
  onChange: (filters: StoreFiltersState) => void;
  totalStoresCount: number;
  filteredCount: number;
}

export function HomeSidebarFilters({
  filters,
  onChange,
  totalStoresCount,
  filteredCount,
}: HomeSidebarFiltersProps) {
  const activeFiltersCount =
    (filters.category !== "All Stores" ? 1 : 0) +
    (filters.hasDeals ? 1 : 0) +
    (filters.freeDelivery ? 1 : 0) +
    (filters.topRated ? 1 : 0) +
    (filters.fastDelivery ? 1 : 0) +
    (filters.sortBy !== "recommended" ? 1 : 0);

  const handleCategorySelect = (categoryName: string) => {
    onChange({ ...filters, category: categoryName });
  };

  const handleToggle = (key: keyof StoreFiltersState) => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  const handleReset = () => {
    onChange({
      category: "All Stores",
      hasDeals: false,
      freeDelivery: false,
      topRated: false,
      fastDelivery: false,
      sortBy: "recommended",
    });
  };

  return (
    <>
      {/* Mobile Filter Bar (visible on < lg) */}
      <div className="mb-4 w-full min-w-0 max-w-full overflow-hidden lg:hidden">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto overscroll-x-contain scrollbar-none py-1">
          {storeCategoriesList.map((cat) => {
            const isSelected =
              filters.category === (cat.id === "all" ? "All Stores" : cat.label);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  handleCategorySelect(cat.id === "all" ? "All Stores" : cat.label)
                }
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <cat.icon size={13} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Desktop Sticky Left Sidebar (Foodpanda Style) */}
      <aside className="hidden lg:block w-64 shrink-0 self-start sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Store Filters
            </h2>
          </div>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 transition cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Store Types / Categories */}
        <div className="py-4 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Store Type
          </h3>

          <div className="space-y-1">
            {storeCategoriesList.map((cat) => {
              const categoryName = cat.id === "all" ? "All Stores" : cat.label;
              const isSelected = filters.category === categoryName;
              const Icon = cat.icon;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(categoryName)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      size={15}
                      className={isSelected ? "text-emerald-600" : "text-slate-400"}
                    />
                    <span>{cat.label}</span>
                  </div>

                  {isSelected && (
                    <Check size={14} className="text-emerald-600 font-bold" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Toggles / Offers */}
        <div className="py-4 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Offers &amp; Perks
          </h3>

          <div className="space-y-2">
            <label className="flex items-center justify-between rounded-xl p-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-emerald-600" />
                <span>Daily Deals &amp; Offers</span>
              </div>
              <input
                type="checkbox"
                checked={filters.hasDeals}
                onChange={() => handleToggle("hasDeals")}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl p-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Bike size={14} className="text-emerald-600" />
                <span>Free Delivery</span>
              </div>
              <input
                type="checkbox"
                checked={filters.freeDelivery}
                onChange={() => handleToggle("freeDelivery")}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl p-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Star size={14} className="text-amber-500 fill-amber-400" />
                <span>Top Rated (4.5+)</span>
              </div>
              <input
                type="checkbox"
                checked={filters.topRated}
                onChange={() => handleToggle("topRated")}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl p-2 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-emerald-600" />
                <span>Dali Express (&lt;30m)</span>
              </div>
              <input
                type="checkbox"
                checked={filters.fastDelivery}
                onChange={() => handleToggle("fastDelivery")}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
            </label>
          </div>
        </div>

        {/* Sort By */}
        <div className="pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Sort By
          </h3>

          <div className="space-y-1">
            {[
              { id: "recommended", label: "Recommended" },
              { id: "rating", label: "Rating: High to Low" },
              { id: "fastest", label: "Fastest Delivery" },
            ].map((option) => {
              const isSelected = filters.sortBy === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      sortBy: option.id as StoreFiltersState["sortBy"],
                    })
                  }
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50 text-emerald-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <Check size={13} className="text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer Store Count */}
        <div className="mt-5 rounded-2xl bg-slate-50 p-3 text-center border border-slate-100">
          <p className="text-[11px] text-slate-500">
            Showing <strong className="text-slate-800">{filteredCount}</strong> of{" "}
            {totalStoresCount} stores
          </p>
        </div>
      </aside>

    </>
  );
}
