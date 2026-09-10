import { useNavigate } from "react-router";
import { MoveRight, Star, ArrowRight, Bike } from "lucide-react";
import type { Store } from "@/lib/api-types";

function getStoreImage(name: string, description: string): string {
  const n = name.toLowerCase();
  const d = (description || "").toLowerCase();

  if (d.includes("meat") || d.includes("fish") || n.includes("meat") || n.includes("fish") || n.includes("seafood")) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("fruit") || d.includes("vegetable") || n.includes("fruit") || n.includes("veg")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("dairy") || d.includes("milk") || d.includes("egg") || n.includes("dairy") || n.includes("milk")) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("bake") || d.includes("pastr") || n.includes("bake")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("snack") || n.includes("snack") || n.includes("sweet")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("spirit") || d.includes("beverage") || n.includes("spirit") || n.includes("wine")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80";
  }
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80";
}

function getStoreTag(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  if (text.includes("fruit") || text.includes("veg")) return "Fresh Produce";
  if (text.includes("meat") || text.includes("fish")) return "Meat & Fish";
  if (text.includes("milk") || text.includes("dairy")) return "Dairy & Eggs";
  if (text.includes("bake")) return "Bakery";
  if (text.includes("snack")) return "Snacks";
  if (text.includes("spirit") || text.includes("beverage")) return "Beverages";
  return "Supermarket";
}

interface PopularStoreSectionProps {
  stores?: Store[];
}

export function PopularStoreSection({ stores = [] }: PopularStoreSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="mt-15 mb-14">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-emerald-950">Popular Stores</h1>
          <p className="text-sm text-gray-500 pt-1">
            Our customers&apos; favorites, delivered fresh.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/stores")}
          className="flex items-center gap-2 cursor-pointer text-emerald-700 hover:text-emerald-800 transition"
        >
          <span className="text-sm font-medium">View all</span>
          <MoveRight size={14} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {stores.slice(0, 4).map((store, index) => {
          const img = getStoreImage(store.name, store.description);
          const tag = getStoreTag(store.name, store.description);
          const rating = Number((4.6 + ((index * 3) % 4) / 10).toFixed(1));
          const reviewCount = 80 + index * 45;

          return (
            <div
              key={store.id}
              onClick={() => navigate(`/stores/${store.id}`)}
              className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="w-full h-36 overflow-hidden bg-gray-100">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={img}
                  alt={store.name}
                />
              </div>

              <div className="px-3 pt-3 pb-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-emerald-900 truncate">
                      {store.name}
                    </h2>

                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={13} className="text-yellow-500 fill-current" />
                      <p className="text-xs font-medium text-gray-700">
                        {rating}{" "}
                        <span className="font-normal text-gray-500">
                          ({reviewCount})
                        </span>
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="text-emerald-900 shrink-0 mt-0.5 transition-transform group-hover:translate-x-1"
                    size={15}
                  />
                </div>

                <div className="mt-2.5 inline-block bg-emerald-50 px-2 py-0.5 rounded-md">
                  <p className="text-[11px] font-medium text-emerald-700">{tag}</p>
                </div>

                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-100">
                  <Bike size={13} className="text-gray-500" />
                  <p className="text-[11px] text-gray-500">
                    Delivery <span className="mx-1">•</span> Pickup
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
