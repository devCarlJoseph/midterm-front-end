import { useEffect, useState } from "react";
import { HomeHeroSection } from "@/components/features/users/home/hero-section";
import { HomeCategoriesSection } from "@/components/features/users/home/home-categories-section";
import { PopularStoreSection } from "@/components/features/users/home/popular-store-section";
import { PromoBannerSection } from "@/components/features/users/home/promo-banner-section";
import { WhyChooseUsSection } from "@/components/features/users/home/why-choose-us-section";
import { LoadingScreen } from "@/components/common/loading-screen";
import api from "@/lib/axios";
import type { Store, Category, PaginatedResponse, ApiResponse } from "@/lib/api-types";

import { getCached, setCached } from "@/lib/api-cache";

export default function HomePage() {
  const [stores, setStores] = useState<Store[]>(() => {
    return getCached<Store[]>("home_stores") ?? [];
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    return getCached<Category[]>("home_categories") ?? [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !getCached<Store[]>("home_stores") || !getCached<Category[]>("home_categories");
  });

  useEffect(() => {
    const cachedStores = getCached<Store[]>("home_stores");
    const cachedCategories = getCached<Category[]>("home_categories");

    if (cachedStores && cachedCategories) {
      setStores(cachedStores);
      setCategories(cachedCategories);
      setIsLoading(false);
      return;
    }

    async function fetchHomeData() {
      setIsLoading(true);
      try {
        const [storesRes, categoriesRes] = await Promise.allSettled([
          api.get<PaginatedResponse<Store>>("/stores?per_page=8"),
          api.get<ApiResponse<Category[]>>("/categories"),
        ]);

        if (storesRes.status === "fulfilled") {
          setStores(storesRes.value.data.data);
          setCached("home_stores", storesRes.value.data.data);
        }

        if (categoriesRes.status === "fulfilled") {
          setCategories(categoriesRes.value.data.data);
          setCached("home_categories", categoriesRes.value.data.data);
        }
      } catch (err) {
        console.error("Failed to load home page data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchHomeData();
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen
        fullScreen
        message="Loading Dali fresh market..."
        subMessage="Discovering partner stores and fresh catalog in your area"
      />
    );
  }

  return (
    <>
      <HomeHeroSection />
      <HomeCategoriesSection categories={categories} />
      <PromoBannerSection />
      <PopularStoreSection stores={stores} />
      <WhyChooseUsSection />
    </>
  );
}