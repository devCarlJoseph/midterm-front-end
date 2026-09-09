import type { Product } from "@/context/shop-context";

import { CategoryProductCard } from "./category-product-card";

type CategoryProductRowProps = {
  title: string;
  products: Product[];
  showAll: boolean;
  onToggleShowAll: () => void;
};

export function CategoryProductRow({
  title,
  products,
  showAll,
  onToggleShowAll,
}: CategoryProductRowProps) {
  const visibleProducts = showAll
    ? products
    : products.slice(0, 5);

  return (
    <section>
      {/* Section Header */}
      <div className="mb-5 flex h-8 items-center justify-between">
        {/* Category Title */}
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        {/* View All / Show Less */}
        {products.length > 5 && (
          <button
            type="button"
            onClick={onToggleShowAll}
            className="border-0 bg-transparent p-0 text-xs font-medium text-slate-500 transition hover:text-emerald-800"
          >
            {showAll
              ? "Show Less"
              : `View All (${products.length}) →`}
          </button>
        )}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product) => (
          <CategoryProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}