import { HomeHeroSection } from "@/components/features/users/home/hero-section";
import { PopularStoreSection } from "@/components/features/users/home/popular-stores-section";
import { StoreSection } from "@/components/features/users/home/stores-section";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <StoreSection />
      <PopularStoreSection />
    </>
  );
}