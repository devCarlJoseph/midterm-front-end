import { useEffect, useState } from "react";
import { DailyDealsSection } from "@/components/features/users/home/view/daily-deals-section";
import { FavoriteStoresSection } from "@/components/features/users/home/view/favorite-stores-section";
import { HomeHeroSection } from "@/components/features/users/home/view/hero-section";
import api from "@/lib/axios";
import type { Store, PaginatedResponse } from "@/lib/api-types";
import { getCached, setCached } from "@/lib/api-cache";

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>(() => {
    const cached = getCached<Store[]>("home_stores_v2");
    return cached ?? [];
  });

  useEffect(() => {
    if (getCached<Store[]>("home_stores_v2")) return;

    async function fetchHomeStores() {
      try {
        const storesRes = await api.get<PaginatedResponse<Store>>("/stores?per_page=30");
        if (storesRes.data.data.length > 0) {
          setStores(storesRes.data.data);
          setCached("home_stores_v2", storesRes.data.data);
        }
      } catch (err) {
        console.error("Failed to load home page stores from backend:", err);
      }
    }

    void fetchHomeStores();
  }, []);

  return (
    <div className="pb-12">
      <HomeHeroSection />
      <DailyDealsSection />
      <FavoriteStoresSection stores={stores} />
    </div>
  );
}
