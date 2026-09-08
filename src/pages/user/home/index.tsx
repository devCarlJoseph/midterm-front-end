import { HomeHeroSection } from "@/components/features/users/home/hero-section";
import { HomeCategoriesSection } from "@/components/features/users/home/home-categories-section";
import { PopularStoreSection } from "@/components/features/users/home/popular-stores-section";
import { PromoBannerSection } from "@/components/features/users/home/promo-banner-section";
import { StoreSection } from "@/components/features/users/home/stores-section";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <HomeCategoriesSection />
      <PromoBannerSection />
    </>
  );
}