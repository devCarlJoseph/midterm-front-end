import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import api from "@/lib/axios";
import type { PaginatedResponse, Store as ApiStore } from "@/lib/api-types";
import { getCached, setCached } from "@/lib/api-cache";
import { LoadingScreen } from "@/components/common/loading-screen";
import {
  mapStore,
  type StoreItem,
} from "@/components/features/users/stores/contents/store-category-content";
import { StoreFiltersSidebar } from "../ui/store-filters-sidebar";
import { FeaturedStores, StoreResults } from "../ui/store-results";

export function StoreCategory() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Shops");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [delivery, setDelivery] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [allStores, setAllStores] = useState<StoreItem[]>(
    () => getCached<StoreItem[]>("stores_list") ?? [],
  );
  const [isLoading, setIsLoading] = useState(
    () => !getCached<StoreItem[]>("stores_list"),
  );

  useEffect(() => {
    const cached = getCached<StoreItem[]>("stores_list");
    if (cached && cached.length > 0) {
      return;
    }

    async function fetchStores() {
      setIsLoading(true);
      try {
        const response = await api.get<PaginatedResponse<ApiStore>>(
          "/stores?per_page=50",
        );
        const mappedStores = response.data.data.map(mapStore);
        setAllStores(mappedStores);
        setCached("stores_list", mappedStores);
      } catch (error) {
        console.error("Unable to load stores from API:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchStores();
  }, []);

  const filteredStores = useMemo(
    () =>
      allStores.filter(
        (store) =>
          (selectedCategory === "All Shops" ||
            store.category === selectedCategory) &&
          (selectedRating === null || store.rating >= selectedRating) &&
          (!delivery || store.delivery) &&
          (!pickup || store.pickup),
      ),
    [allStores, selectedCategory, selectedRating, delivery, pickup],
  );

  const clearFilters = () => {
    setSelectedCategory("All Shops");
    setSelectedRating(null);
    setDelivery(false);
    setPickup(false);
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
    <div className="mx-auto flex w-full max-w-350 flex-col gap-5 py-5 sm:py-6 lg:flex-row lg:gap-6">
      <StoreFiltersSidebar
        selectedCategory={selectedCategory}
        selectedRating={selectedRating}
        delivery={delivery}
        pickup={pickup}
        onCategoryChange={setSelectedCategory}
        onRatingChange={setSelectedRating}
        onDeliveryChange={setDelivery}
        onPickupChange={setPickup}
        onBothChange={() => {
          setDelivery(true);
          setPickup(true);
        }}
        onClear={clearFilters}
      />
      <main className="min-w-0 flex-1">
        <FeaturedStores
          stores={allStores}
          onStoreClick={(store) => navigate(`/stores/${store.id}`)}
        />
        <StoreResults
          stores={filteredStores}
          selectedCategory={selectedCategory}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onStoreClick={(store) => navigate(`/stores/${store.id}`)}
        />
      </main>
    </div>
  );
}
