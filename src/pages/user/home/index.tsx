import { CategorySection } from "@/components/features/users/home/categories-section";
import { HomeHeroSection } from "@/components/features/users/home/hero-section";
import { PopularStoreSection } from "@/components/features/users/home/popular-stores-section";
import { PromoBannerSection } from "@/components/features/users/home/promo-banner-section";
import { StoreSection } from "@/components/features/users/home/stores-section";
import { WhyChooseUsSection } from "@/components/features/users/home/why-choose-us-section";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <StoreSection />
      <PopularStoreSection />
      <CategorySection />
      <PromoBannerSection />
      <WhyChooseUsSection />
    </>
  );
}