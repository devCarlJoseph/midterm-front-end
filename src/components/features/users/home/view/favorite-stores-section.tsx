import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Store } from "@/lib/api-types";
import { useFavoriteStores } from "@/lib/use-favorite-stores";
import { FoodpandaStoreCard } from "@/components/features/users/home/ui/foodpanda-store-card";

interface FavoriteStoresSectionProps {
  stores: Store[];
}

export function FavoriteStoresSection({ stores }: FavoriteStoresSectionProps) {
  const { favoriteStoreIds } = useFavoriteStores();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const favoritedStores = stores.filter((s) => favoriteStoreIds.includes(s.id));
  const hasFavorites = favoritedStores.length > 0;
  // If no favorites, show top 3 recommended stores as candidates to favorite
  const displayStores = hasFavorites ? favoritedStores : stores.slice(0, 4);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (stores.length === 0) return null;

  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {hasFavorites ? "Your Favorite Stores" : "Favorite Stores & Recommendations"}
            </h2>
            {hasFavorites && (
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                {favoritedStores.length} saved
              </span>
            )}
          </div>

          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            {hasFavorites
              ? "Reorder swiftly from your trusted Dali partner stores"
              : "Tap the heart on any store to save your neighborhood favorites for quick access"}
          </p>
        </div>

        {/* Carousel controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-emerald-300 transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-emerald-300 transition cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Stores List */}
      <div
        ref={scrollContainerRef}
        className="mt-5 flex gap-4 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory"
      >
        {displayStores.map((store, index) => (
          <FoodpandaStoreCard
            key={store.id}
            store={store}
            index={index}
            horizontalCompact
          />
        ))}
      </div>
    </section>
  );
}
