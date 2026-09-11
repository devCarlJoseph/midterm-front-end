import { useNavigate } from "react-router";
import { MoveRight } from "lucide-react";
import type { Category } from "@/lib/api-types";

function getCategoryImage(slugOrName: string): string {
  const s = slugOrName.toLowerCase();
  if (s.includes("veg") || s.includes("fruit") || s.includes("produce")) {
    return "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=300&q=80";
  }
  if (s.includes("meat") || s.includes("fish") || s.includes("poultry")) {
    return "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80";
  }
  if (s.includes("dairy") || s.includes("egg") || s.includes("milk")) {
    return "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80";
  }
  if (s.includes("bake") || s.includes("bread") || s.includes("pastry")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80";
  }
  if (s.includes("snack") || s.includes("candy") || s.includes("sweet")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=300&q=80";
  }
  if (s.includes("pack") || s.includes("food") || s.includes("pantry") || s.includes("grocery")) {
    return "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=300&q=80";
  }
  if (s.includes("alcohol") || s.includes("beverage") || s.includes("drink") || s.includes("wine")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80";
  }
  return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80";
}

const fallbackCategories = [
  { id: 13, name: "Vegetables & Fruit", slug: "vegetables-fruit" },
  { id: 17, name: "Meat & Fish", slug: "meat-fish" },
  { id: 15, name: "Dairy & Eggs", slug: "dairy-eggs" },
  { id: 16, name: "Bakery", slug: "bakery" },
  { id: 12, name: "Snacks", slug: "snacks" },
  { id: 14, name: "Packed Foods", slug: "packed-foods" },
  { id: 18, name: "Alcohol", slug: "alcohol" },
];

interface HomeCategoriesSectionProps {
  categories?: Category[];
}

export function HomeCategoriesSection({ categories }: HomeCategoriesSectionProps) {
  const navigate = useNavigate();
  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-emerald-950">
            Shop by Category
          </h1>
          <p className="text-sm text-gray-500 pt-1">
            Everything you need, in one place.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/categories")}
          className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition cursor-pointer text-sm font-medium"
        >
          <span>View all</span>
          <MoveRight size={14} />
        </button>
      </div>

      <div className="mt-5 flex items-start gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none sm:justify-center">
        {displayCategories.map((category) => {
          const img = getCategoryImage(category.slug || category.name);

          return (
            <button
              key={category.id ?? category.name}
              type="button"
              onClick={() => navigate("/categories")}
              className="group flex flex-col items-center w-24 shrink-0 cursor-pointer text-center transition hover:-translate-y-1"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100/80 shadow-xs transition group-hover:border-emerald-400 group-hover:shadow-md">
                <img
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                  src={img}
                  alt={category.name}
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-emerald-900 group-hover:text-emerald-700 truncate max-w-24">
                  {category.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
