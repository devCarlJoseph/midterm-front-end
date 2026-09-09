import { useState } from "react";

import { fruitProducts, vegetableProducts } from "./data/products-data";
import { CategorySidebar } from "./category-sidebar";
import { CategoryProductRow } from "./category-product-row";

export function CategorySection() {
  const [activeCategory, setActiveCategory] = useState("Fresh Fruit");
  const [openCategory, setOpenCategory] = useState<string | null>(
    "Vegetables & Fruit",
  );

  const allProducts = [...fruitProducts, ...vegetableProducts];

  const selectedProducts =
    activeCategory === "Vegetables & Fruit"
      ? allProducts
      : allProducts.filter(
          (product) => product.category === activeCategory,
        );

  const selectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategory((current) =>
      current === categoryName ? null : categoryName,
    );
  };

  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <CategorySidebar
          activeCategory={activeCategory}
          openCategory={openCategory}
          onSelectCategory={selectCategory}
          onToggleCategory={toggleCategory}
        />

        <div className="min-w-0">
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
      </div>
    </section>
  );
}