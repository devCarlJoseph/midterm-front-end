import { StoreCategory } from "@/components/features/users/stores/store-category";
import { ShopsHero } from "@/components/features/users/stores/store-hero";

export default function StoresPage() {
  return (
    <div>
      <ShopsHero />
      <StoreCategory />
    </div>
  );
}
