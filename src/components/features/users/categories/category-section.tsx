import { useEffect, useState } from "react";

import api from "@/lib/axios";
import type { PaginatedResponse, ProductItem } from "@/lib/api-types";
import type { Product } from "@/context/shop-context";
import { CategorySidebar } from "./category-sidebar";
import { CategoryProductRow } from "./category-product-row";
import { LoadingScreen } from "@/components/common/loading-screen";
import { getCached, setCached } from "@/lib/api-cache";

function getProductImage(name: string, category?: string): string {
  const cat = (category || "").toLowerCase();
  const n = name.toLowerCase();

  if (
    cat.includes("meat") ||
    cat.includes("fish") ||
    n.includes("beef") ||
    n.includes("chicken") ||
    n.includes("pork") ||
    n.includes("bangus")
  ) {
    return "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80";
  }

  if (
    cat.includes("fruit") ||
    n.includes("apple") ||
    n.includes("banana") ||
    n.includes("berry") ||
    n.includes("mango")
  ) {
    return "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80";
  }

  if (
    cat.includes("vegetable") ||
    n.includes("tomato") ||
    n.includes("carrot") ||
    n.includes("pepper") ||
    n.includes("cucumber")
  ) {
    return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80";
  }

  if (
    cat.includes("dairy") ||
    cat.includes("egg") ||
    n.includes("milk") ||
    n.includes("egg") ||
    n.includes("butter") ||
    n.includes("cheese")
  ) {
    return "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80";
  }

  if (
    cat.includes("bakery") ||
    n.includes("bread") ||
    n.includes("cake") ||
    n.includes("buns") ||
    n.includes("croissant")
  ) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80";
  }

  if (
    cat.includes("snack") ||
    n.includes("chip") ||
    n.includes("cookie") ||
    n.includes("candy") ||
    n.includes("knot")
  ) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=300&q=80";
  }

  if (cat.includes("alcohol") || n.includes("beer") || n.includes("wine")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80";
  }

  return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80";
}

export function CategorySection() {
  const [activeCategory, setActiveCategory] = useState("Vegetables & Fruit");
  const [openCategory, setOpenCategory] = useState<string | null>(
    "Vegetables & Fruit",
  );
  const [apiProducts, setApiProducts] = useState<Product[]>(() => {
    return getCached<Product[]>("category_products") ?? [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !getCached<Product[]>("category_products");
  });

  useEffect(() => {
    const cached = getCached<Product[]>("category_products");
    if (cached && cached.length > 0) {
      setApiProducts(cached);
      setIsLoading(false);
      return;
    }

    async function fetchProducts() {
      setIsLoading(true);
      try {
        const response = await api.get<PaginatedResponse<ProductItem>>(
          "/products?per_page=60",
        );
        const loaded = response.data.data.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category?.name || "General",
          unit: item.unit,
          price: parseFloat(item.price),
          image: getProductImage(item.name, item.category?.name),
        }));
        setApiProducts(loaded);
        setCached("category_products", loaded);
      } catch (err) {
        console.error("Unable to load products from API:", err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchProducts();
  }, []);

  const selectedProducts =
    activeCategory === "Vegetables & Fruit"
      ? apiProducts.filter(
          (product) =>
            (product.category ?? "").toLowerCase().includes("vegetable") ||
            (product.category ?? "").toLowerCase().includes("fruit"),
        )
      : apiProducts.filter(
          (product) =>
            (product.category ?? "").toLowerCase() ===
              activeCategory.toLowerCase() ||
            product.name.toLowerCase().includes(activeCategory.toLowerCase()),
        );

  const selectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((current) =>
      current === categoryName ? null : categoryName,
    );
  };

  if (isLoading) {
    return (
      <LoadingScreen
        fullScreen
        message="Loading category products..."
        subMessage="Gathering fresh inventory and catalog items"
      />
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-350 gap-6 px-5 py-6">
      <CategorySidebar
        activeCategory={activeCategory}
        openCategory={openCategory}
        onSelectCategory={selectCategory}
        onToggleCategory={toggleCategory}
      />

      <div className="min-w-0 flex-1">
        {selectedProducts.length > 0 ? (
          <CategoryProductRow
            title={activeCategory}
            products={selectedProducts}
          />
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-700">
              No products available yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Products for {activeCategory} will be added soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}