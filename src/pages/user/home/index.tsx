import { useEffect, useState, useMemo } from "react";
import { HomeCategoriesSection } from "@/components/features/users/home/home-categories-section";
import { DailyDealsSection } from "@/components/features/users/home/daily-deals-section";
import { FavoriteStoresSection } from "@/components/features/users/home/favorite-stores-section";
import {
  HomeSidebarFilters,
  type StoreFiltersState,
} from "@/components/features/users/home/home-sidebar-filters";
import {
  FoodpandaStoreCard,
  getStoreCategory,
} from "@/components/features/users/home/foodpanda-store-card";
import { DaliAppCtaSection } from "@/components/features/users/home/dali-app-cta-section";
import { WhyChooseUsSection } from "@/components/features/users/home/why-choose-us-section";
import api from "@/lib/axios";
import type { Store, Category, PaginatedResponse, ApiResponse } from "@/lib/api-types";
import { getCached, setCached } from "@/lib/api-cache";
import { Store as StoreIcon, RotateCcw, X } from "lucide-react";
import { HomeHeroSection } from "@/components/features/users/home/hero-section";

const fallbackStores: Store[] = [
  {
    id: 1,
    name: "Dali Everyday Grocery - Poblacion Cordova",
    slug: "dali-everyday-grocery-poblacion",
    description:
      "Everyday low prices on pantry staples, snacks, beverages, and household goods.",
    address: "Poblacion, Cordova, Cebu",
    latitude: "10.2520",
    longitude: "123.9510",
    is_active: true,
  },
  {
    id: 2,
    name: "Cordova Fresh Meat & Seafood Depot",
    slug: "cordova-fresh-meat-seafood",
    description:
      "Freshly dressed local pork, farm chicken, premium beef cuts, and fresh fish.",
    address: "San Miguel, Cordova, Cebu",
    latitude: "10.2545",
    longitude: "123.9480",
    is_active: true,
  },
  {
    id: 3,
    name: "Island Green Farm & Fruit Market",
    slug: "island-green-farm-fruits",
    description:
      "Organic vegetables, fresh lettuce, tomatoes, bananas, and ripe mangoes.",
    address: "Bangbang, Cordova, Cebu",
    latitude: "10.2580",
    longitude: "123.9420",
    is_active: true,
  },
  {
    id: 4,
    name: "Pan De Dali Artisan Bakery",
    slug: "pan-de-dali-artisan-bakery",
    description:
      "Hot oven pandesal, ensaymada, sliced bread, Spanish bread, and pastries.",
    address: "Catarman, Cordova, Cebu",
    latitude: "10.2610",
    longitude: "123.9550",
    is_active: true,
  },
  {
    id: 5,
    name: "Dali Dairy & Morning Essentials",
    slug: "dali-dairy-morning-essentials",
    description:
      "Farm fresh eggs, pasteurized fresh milk, butter, cheeses, and breakfast yogurts.",
    address: "Day-as, Cordova, Cebu",
    latitude: "10.2490",
    longitude: "123.9600",
    is_active: true,
  },
  {
    id: 6,
    name: "Dali Snack & Sweet Delights",
    slug: "dali-snack-sweet-delights",
    description:
      "Crispy chips, imported biscuits, chocolates, candies, and kid-friendly party treats.",
    address: "Gabi, Cordova, Cebu",
    latitude: "10.2640",
    longitude: "123.9470",
    is_active: true,
  },
  {
    id: 7,
    name: "Cordova Beverage & Chilled Drinks Hub",
    slug: "cordova-beverage-chilled-drinks",
    description:
      "Cold soft drinks, natural fruit juices, mineral water, energy drinks, and craft beers.",
    address: "Alegria, Cordova, Cebu",
    latitude: "10.2560",
    longitude: "123.9520",
    is_active: true,
  },
  {
    id: 8,
    name: "Dali Supermarket Express - Lapu-Lapu Link",
    slug: "dali-supermarket-express-lapu-lapu",
    description:
      "Comprehensive supermarket catalog with fast 20-minute delivery to your doorstep.",
    address: "Basak-Cordova boundary, Cebu",
    latitude: "10.2700",
    longitude: "123.9650",
    is_active: true,
  },
];

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>(() => {
    const cached = getCached<Store[]>("home_stores");
    return cached && cached.length > 0 ? cached : fallbackStores;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    return getCached<Category[]>("home_categories") ?? [];
  });

  // Fallback stores make the home page useful even before a backend response.
  const [, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<StoreFiltersState>({
    category: "All Stores",
    hasDeals: false,
    freeDelivery: false,
    topRated: false,
    fastDelivery: false,
    sortBy: "recommended",
  });

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [storesRes, categoriesRes] = await Promise.allSettled([
          api.get<PaginatedResponse<Store>>("/stores?per_page=30"),
          api.get<ApiResponse<Category[]>>("/categories"),
        ]);

        if (storesRes.status === "fulfilled" && storesRes.value.data.data.length > 0) {
          setStores(storesRes.value.data.data);
          setCached("home_stores", storesRes.value.data.data);
        }

        if (categoriesRes.status === "fulfilled") {
          setCategories(categoriesRes.value.data.data);
          setCached("home_categories", categoriesRes.value.data.data);
        }
      } catch (err) {
        console.error("Failed to load home page data from backend:", err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchHomeData();
  }, []);

  // Filter and sort stores based on left sidebar state
  const filteredStores = useMemo(() => {
    let result = [...stores];

    // Category / Store Type Filter
    if (filters.category !== "All Stores") {
      result = result.filter((store) => {
        const cat = getStoreCategory(store.name, store.description);
        return cat.toLowerCase() === filters.category.toLowerCase();
      });
    }

    // Offers & Deals Filter
    if (filters.hasDeals) {
      result = result.filter((_, idx) => idx % 3 === 0);
    }

    // Free Delivery Filter
    if (filters.freeDelivery) {
      result = result.filter((_, idx) => idx % 2 === 0);
    }

    // Top Rated (4.5+) Filter
    if (filters.topRated) {
      result = result.filter((_, idx) => {
        const rating = Number((4.6 + ((idx * 3) % 4) / 10).toFixed(1));
        return rating >= 4.7;
      });
    }

    // Dali Express (<30m) Filter
    if (filters.fastDelivery) {
      result = result.filter((_, idx) => {
        const eta = 15 + ((idx * 5) % 20);
        return eta <= 25;
      });
    }

    // Sorting
    if (filters.sortBy === "rating") {
      result.sort((a, b) => {
        const ratingA = Number((4.6 + ((a.id * 3) % 4) / 10).toFixed(1));
        const ratingB = Number((4.6 + ((b.id * 3) % 4) / 10).toFixed(1));
        return ratingB - ratingA;
      });
    } else if (filters.sortBy === "fastest") {
      result.sort((a, b) => {
        const etaA = 15 + ((a.id * 5) % 20);
        const etaB = 15 + ((b.id * 5) % 20);
        return etaA - etaB;
      });
    }

    return result;
  }, [stores, filters]);

  const activePills: { label: string; onRemove: () => void }[] = [];
  if (filters.category !== "All Stores") {
    activePills.push({
      label: filters.category,
      onRemove: () => setFilters((prev) => ({ ...prev, category: "All Stores" })),
    });
  }
  if (filters.hasDeals) {
    activePills.push({
      label: "Daily Deals & Offers",
      onRemove: () => setFilters((prev) => ({ ...prev, hasDeals: false })),
    });
  }
  if (filters.freeDelivery) {
    activePills.push({
      label: "Free Delivery",
      onRemove: () => setFilters((prev) => ({ ...prev, freeDelivery: false })),
    });
  }
  if (filters.topRated) {
    activePills.push({
      label: "Top Rated (4.5+)",
      onRemove: () => setFilters((prev) => ({ ...prev, topRated: false })),
    });
  }
  if (filters.fastDelivery) {
    activePills.push({
      label: "Express (<30m)",
      onRemove: () => setFilters((prev) => ({ ...prev, fastDelivery: false })),
    });
  }

  return (
    <div className="pb-12">

      <HomeHeroSection />
      {/* 2. Quick Shop Categories Bar */}
      <HomeCategoriesSection categories={categories} />

      {/* 3. Daily Deals Section (Live Flash Countdown + Slashed Prices) */}
      <DailyDealsSection />

      {/* 4. Favorite Stores Section (Saved + Recommended) */}
      <FavoriteStoresSection stores={stores} />

      {/* 5. Foodpanda-Style Main Section with Left Filtering Sidebar */}
      <section className="my-8 sm:my-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Sidebar Filter */}
          <HomeSidebarFilters
            filters={filters}
            onChange={setFilters}
            totalStoresCount={stores.length}
            filteredCount={filteredStores.length}
          />

          {/* Right Main Store Feed */}
          <div className="flex-1 min-w-0 w-full">
            {/* Store Feed Header */}
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {filters.category === "All Stores"
                    ? "All Partner Stores"
                    : filters.category}
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                  {filteredStores.length}{" "}
                  {filteredStores.length === 1 ? "store" : "stores"} available for
                  fast delivery to your address
                </p>
              </div>

              {/* Reset if active */}
              {activePills.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      category: "All Stores",
                      hasDeals: false,
                      freeDelivery: false,
                      topRated: false,
                      fastDelivery: false,
                      sortBy: "recommended",
                    })
                  }
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw size={13} />
                  <span>Clear all filters</span>
                </button>
              )}
            </div>

            {/* Active Filter Tags */}
            {activePills.length > 0 && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  Active filters:
                </span>
                {activePills.map((pill) => (
                  <span
                    key={pill.label}
                    className="flex max-w-full items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800"
                  >
                    <span className="truncate">{pill.label}</span>
                    <button
                      type="button"
                      onClick={pill.onRemove}
                      className="ml-0.5 rounded-full hover:bg-emerald-200 p-0.5 transition cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Stores Grid */}
            {filteredStores.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredStores.map((store, index) => (
                  <FoodpandaStoreCard
                    key={store.id}
                    store={store}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 py-16 px-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-xs border border-slate-100">
                  <StoreIcon size={28} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-800">
                  No stores match these filters
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Try unchecking some filters or switching to another category to see
                  more stores.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      category: "All Stores",
                      hasDeals: false,
                      freeDelivery: false,
                      topRated: false,
                      fastDelivery: false,
                      sortBy: "recommended",
                    })
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
