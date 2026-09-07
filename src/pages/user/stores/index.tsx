import { StoreCategory } from "@/components/features/users/stores/store-cateory";
import { NearStores } from "@/components/features/users/stores/near-stores";


export default function StoresPage() {
  return (
    <div>
      <StoreCategory />
      <NearStores />
    </div>
  );
}
