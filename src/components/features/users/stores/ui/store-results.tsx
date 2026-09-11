import { ChevronDown, Grid2X2, List, Store } from "lucide-react";
import type { StoreItem } from "../contents/store-category-content";
import { StoreCard } from "./store-card";

type StoreResultsProps = {
  stores: StoreItem[];
  selectedCategory: string;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onStoreClick: (store: StoreItem) => void;
};

export function FeaturedStores({
  stores,
  onStoreClick,
}: Pick<StoreResultsProps, "stores" | "onStoreClick">) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-700">Featured Shops</h1>
          <p className="mt-1 text-[10px] text-gray-400">
            Top-rated and most visited shops near you.
          </p>
        </div>
        <button className="flex w-full items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-500 min-[430px]:w-auto">
          <span>Sort by</span>
          <span className="font-medium text-gray-600">Recommended</span>
          <ChevronDown size={12} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {stores.slice(0, 4).map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            onClick={() => onStoreClick(store)}
          />
        ))}
      </div>
    </section>
  );
}

export function StoreResults({
  stores,
  selectedCategory,
  viewMode,
  onViewModeChange,
  onStoreClick,
}: StoreResultsProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-700">
            {selectedCategory}
          </h2>
          <p className="mt-1 text-[10px] text-gray-400">
            {selectedCategory === "All Shops"
              ? "Browse all available shops in your area."
              : `Browse ${selectedCategory.toLowerCase()} in your area.`}
          </p>
        </div>
        <div className="flex overflow-hidden rounded-md border border-gray-200">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`flex h-8 w-9 items-center justify-center ${viewMode === "grid" ? "bg-emerald-50 text-emerald-700" : "text-gray-400"}`}
          >
            <Grid2X2 size={15} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`flex h-8 w-9 items-center justify-center ${viewMode === "list" ? "bg-emerald-50 text-emerald-700" : "text-gray-400"}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>
      {stores.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-3 min-[430px]:grid-cols-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4"
              : "grid grid-cols-1 gap-4"
          }
        >
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onClick={() => onStoreClick(store)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
          <Store size={35} className="mx-auto mb-3 text-gray-300" />
          <h3 className="text-sm font-semibold text-gray-600">
            No stores found
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            Try changing your filters.
          </p>
        </div>
      )}
    </section>
  );
}
