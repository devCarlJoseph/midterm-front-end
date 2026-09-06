import { HomeHeroSection } from "@/components/features/users/home/hero-section";
import { StoreSection } from "@/components/features/users/home/stores-section";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <StoreSection />
      <StoreSection />
      <StoreSection />
    </>
  );
}