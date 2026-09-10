import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Store,
  ShoppingBasket,
  Building2,
  Croissant,
  Beef,
  Apple,
  Milk,
  Package,
  MapPin,
  ChevronDown,
  RotateCcw,
  Grid2X2,
  List,
  ArrowRight,
  Star,
} from "lucide-react";
import api from "@/lib/axios";
import type { PaginatedResponse, Store as ApiStore } from "@/lib/api-types";
import { LoadingScreen } from "@/components/common/loading-screen";
import { getCached, setCached } from "@/lib/api-cache";

type Category = {
  id: number;
  categoryName: string;
  icon: React.ReactNode;
};

type StoreItem = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  delivery: boolean;
  pickup: boolean;
  image: string;
};

/*
|--------------------------------------------------------------------------
| STORE CATEGORIES
|--------------------------------------------------------------------------
*/

const storeCategories: Category[] = [
  {
    id: 1,
    categoryName: "All Shops",
    icon: <Store size={16} />,
  },
  {
    id: 2,
    categoryName: "Meat & Fish",
    icon: <Beef size={16} />,
  },
  {
    id: 3,
    categoryName: "Fruits & Vegetables",
    icon: <Apple size={16} />,
  },
  {
    id: 4,
    categoryName: "Dairy & Eggs",
    icon: <Milk size={16} />,
  },
  {
    id: 5,
    categoryName: "Pantry & Groceries",
    icon: <Package size={16} />,
  },
  {
    id: 6,
    categoryName: "Bakeries",
    icon: <Croissant size={16} />,
  },
  {
    id: 7,
    categoryName: "Snacks",
    icon: <ShoppingBasket size={16} />,
  },
  {
    id: 8,
    categoryName: "Beverages & Spirits",
    icon: <Building2 size={16} />,
  },
];

function getStoreImage(name: string, category: string): string {
  const c = category.toLowerCase();
  const n = name.toLowerCase();

  if (c.includes("meat") || c.includes("fish") || n.includes("meat")) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80";
  }
  if (c.includes("fruit") || c.includes("veg") || n.includes("fruit")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  }
  if (c.includes("dairy") || n.includes("milk") || n.includes("dairy")) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80";
  }
  if (c.includes("bake") || n.includes("bake")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  }
  if (c.includes("snack") || n.includes("sweet")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=600&q=80";
  }
  if (c.includes("beverage") || c.includes("spirit") || n.includes("spirit")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80";
  }
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80";
}

/*
|--------------------------------------------------------------------------
| STORE CARD
|--------------------------------------------------------------------------
*/

function StoreCard({
  store,
  onClick,
}: {
  store: StoreItem;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
    >
      {/* Store Image */}
      <div className="relative h-[125px] w-full overflow-hidden bg-gray-100">
        <img
          src={store.image}
          alt={store.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Store Details */}
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[13px] font-semibold text-gray-700">
            {store.name}
          </h3>

          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-emerald-700 transition-transform group-hover:translate-x-1">
            <ArrowRight size={14} />
          </span>
        </div>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1">
          <Star
            size={11}
            fill="#FBBF24"
            className="text-yellow-400"
          />

          <span className="text-[10px] text-gray-500">
            {store.rating}
          </span>

          <span className="text-[10px] text-gray-400">
            ({store.reviews})
          </span>
        </div>

        {/* Category */}
        <p className="mt-2 text-[9px] text-gray-400">
          {store.category}
        </p>

        {/* Delivery / Pickup */}
        <div className="mt-2 flex items-center gap-1 text-[9px] text-gray-400">
          {store.delivery && (
            <span>◉ Delivery</span>
          )}

          {store.delivery && store.pickup && (
            <span>·</span>
          )}

          {store.pickup && (
            <span>Pickup</span>
          )}
        </div>
      </div>
    </button>
  );
}

/*
|--------------------------------------------------------------------------
| MAIN COMPONENT
|--------------------------------------------------------------------------
*/

export function StoreCategory() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("All Shops");

  const [selectedRating, setSelectedRating] =
    useState<number | null>(null);

  const [delivery, setDelivery] =
    useState(false);

  const [pickup, setPickup] =
    useState(false);

  const [viewMode, setViewMode] =
    useState<"grid" | "list">("grid");

  const [allStores, setAllStores] = useState<StoreItem[]>(() => {
    return getCached<StoreItem[]>("stores_list") ?? [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !getCached<StoreItem[]>("stores_list");
  });

  useEffect(() => {
    const cached = getCached<StoreItem[]>("stores_list");
    if (cached && cached.length > 0) {
      setAllStores(cached);
      setIsLoading(false);
      return;
    }

    async function fetchStores() {
      setIsLoading(true);
      try {
        const response = await api.get<PaginatedResponse<ApiStore>>("/stores?per_page=50");
        const mappedStores: StoreItem[] = response.data.data.map((store, index) => {
          let cat = "Pantry & Groceries";
          const desc = (store.description || "").toLowerCase();
          const n = store.name.toLowerCase();

          if (desc.includes("meat") || desc.includes("fish") || n.includes("meat") || n.includes("fish") || n.includes("seafood")) {
            cat = "Meat & Fish";
          } else if (desc.includes("fruit") || desc.includes("vegetable") || n.includes("fruit") || n.includes("vegi")) {
            cat = "Fruits & Vegetables";
          } else if (desc.includes("dairy") || desc.includes("milk") || desc.includes("egg") || n.includes("dairy") || n.includes("milk") || n.includes("egg")) {
            cat = "Dairy & Eggs";
          } else if (desc.includes("bake") || desc.includes("pastr") || n.includes("bake")) {
            cat = "Bakeries";
          } else if (desc.includes("snack") || n.includes("snack") || n.includes("sweet")) {
            cat = "Snacks";
          } else if (desc.includes("spirit") || desc.includes("beverage") || n.includes("spirit")) {
            cat = "Beverages & Spirits";
          }

          return {
            id: store.id,
            name: store.name,
            category: cat,
            rating: Number((4 + ((index * 7) % 10) / 10).toFixed(1)),
            reviews: 20 + index * 13,
            delivery: index % 3 !== 1,
            pickup: true,
            image: getStoreImage(store.name, cat),
          };
        });

        setAllStores(mappedStores);
        setCached("stores_list", mappedStores);
      } catch (err) {
        console.error("Unable to load stores from API:", err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchStores();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FILTER STORES
  |--------------------------------------------------------------------------
  */

  const filteredStores = useMemo(() => {
    let stores = allStores;

    // Category filter
    if (selectedCategory !== "All Shops") {
      stores = stores.filter(
        (store) =>
          store.category ===
          selectedCategory
      );
    }

    // Rating filter
    if (selectedRating !== null) {
      stores = stores.filter(
        (store) =>
          store.rating >= selectedRating
      );
    }

    // Delivery filter
    if (delivery) {
      stores = stores.filter(
        (store) => store.delivery
      );
    }

    // Pickup filter
    if (pickup) {
      stores = stores.filter(
        (store) => store.pickup
      );
    }

    return stores;
  }, [
    allStores,
    selectedCategory,
    selectedRating,
    delivery,
    pickup,
  ]);

  /*
  |--------------------------------------------------------------------------
  | CLEAR FILTERS
  |--------------------------------------------------------------------------
  */

  const clearFilters = () => {
    setSelectedCategory("All Shops");
    setSelectedRating(null);
    setDelivery(false);
    setPickup(false);
  };

  /*
  |--------------------------------------------------------------------------
  | STORE CLICK
  |--------------------------------------------------------------------------
  */

  const handleStoreClick = (
    store: StoreItem
  ) => {
    navigate(`/stores/${store.id}`);
  };

  if (isLoading) {
    return (
      <LoadingScreen
        fullScreen
        message="Loading stores..."
        subMessage="Discovering fresh partner shops and supermarkets near you"
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1400px] gap-6 px-5 py-6">
      {/* ================================================================
          LEFT SIDEBAR
      ================================================================ */}

      <aside className="w-[250px] shrink-0 rounded-xl border border-gray-100 bg-white shadow-sm sticky top-6 self-start">
        {/* Shop Categories */}
        <div className="p-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-700">
            Shop Categories
          </h2>

          <div className="space-y-1">
            {storeCategories.map(
              (category) => {
                const isActive =
                  selectedCategory ===
                  category.categoryName;

                return (
                  <button
                    key={category.id}
                    onClick={() =>
                      setSelectedCategory(
                        category.categoryName
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-xs transition-all ${
                      isActive
                        ? "bg-emerald-50 font-medium text-emerald-700"
                        : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <span
                      className={
                        isActive
                          ? "text-emerald-600"
                          : "text-gray-400"
                      }
                    >
                      {category.icon}
                    </span>

                    <span className="flex-1">
                      {category.categoryName}
                    </span>

                    {isActive && (
                      <ArrowRight
                        size={13}
                        className="text-emerald-600"
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Filters */}
        <div className="p-4">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">
            Filter By
          </h2>

          {/* Location */}
          <div className="mb-5">
            <label className="mb-2 block text-[11px] font-medium text-gray-600">
              Location
            </label>

            <button className="flex w-full items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-500">
              <MapPin size={14} />

              <span className="flex-1 text-left">
                All Areas
              </span>

              <ChevronDown size={14} />
            </button>
          </div>

          {/* Delivery */}
          <div className="mb-5">
            <h3 className="mb-2 text-[11px] font-medium text-gray-600">
              Delivery Option
            </h3>

            <div className="space-y-2">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={delivery}
                  onChange={(e) =>
                    setDelivery(
                      e.target.checked
                    )
                  }
                  className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />

                Delivery
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={pickup}
                  onChange={(e) =>
                    setPickup(
                      e.target.checked
                    )
                  }
                  className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />

                Pickup
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                <input
                  type="checkbox"
                  checked={delivery && pickup}
                  onChange={() => {
                    setDelivery(true);
                    setPickup(true);
                  }}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />

                Both
              </label>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-5">
            <h3 className="mb-2 text-[11px] font-medium text-gray-600">
              Rating
            </h3>

            <div className="space-y-2">
              {[5, 4, 3].map(
                (rating) => (
                  <label
                    key={rating}
                    className="flex cursor-pointer items-center gap-2 text-xs"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={
                        selectedRating ===
                        rating
                      }
                      onChange={() =>
                        setSelectedRating(
                          rating
                        )
                      }
                      className="h-3.5 w-3.5 border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />

                    <span className="text-yellow-400">
                      ★★★★★
                    </span>

                    <span className="text-gray-500">
                      {rating}.0 & above
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-50 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
          >
            <RotateCcw size={13} />

            Clear Filters
          </button>
        </div>
      </aside>

      {/* ================================================================
          RIGHT SIDE
      ================================================================ */}

      <main className="min-w-0 flex-1">
        {/* Featured Shops */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-700">
                Featured Shops
              </h1>

              <p className="mt-1 text-[10px] text-gray-400">
                Top-rated and most visited shops near you.
              </p>
            </div>

            {/* Sort */}
            <button className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-[10px] text-gray-500">
              <span>Sort by</span>

              <span className="font-medium text-gray-600">
                Recommended
              </span>

              <ChevronDown size={12} />
            </button>
          </div>

          {/* Featured Store Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {allStores
              .slice(0, 4)
              .map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onClick={() =>
                    handleStoreClick(
                      store
                    )
                  }
                />
              ))}
          </div>
        </section>

        {/* ==============================================================
            ALL SHOPS
        ============================================================== */}

        <section>
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-700">
                {selectedCategory}
              </h2>

              <p className="mt-1 text-[10px] text-gray-400">
                {selectedCategory ===
                "All Shops"
                  ? "Browse all available shops in your area."
                  : `Browse ${selectedCategory.toLowerCase()} in your area.`}
              </p>
            </div>

            {/* View Mode */}
            <div className="flex overflow-hidden rounded-md border border-gray-200">
              <button
                onClick={() =>
                  setViewMode("grid")
                }
                className={`flex h-8 w-9 items-center justify-center ${
                  viewMode === "grid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-400"
                }`}
              >
                <Grid2X2 size={15} />
              </button>

              <button
                onClick={() =>
                  setViewMode("list")
                }
                className={`flex h-8 w-9 items-center justify-center ${
                  viewMode === "list"
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-400"
                }`}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Store Cards */}
          {filteredStores.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid grid-cols-1 gap-4"
              }
            >
              {filteredStores.map(
                (store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onClick={() =>
                      handleStoreClick(
                        store
                      )
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
              <Store
                size={35}
                className="mx-auto mb-3 text-gray-300"
              />

              <h3 className="text-sm font-semibold text-gray-600">
                No stores found
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Try changing your filters.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
