import { CategorySection } from "@/components/features/users/categories/category-section";
import { CategoryBanner} from "@/components/features/users/categories/category-banner";

export default function CategoriesPage() {
  return (
    <div>
      <CategoryBanner />
      <CategorySection />      
    </div>
  );
}
