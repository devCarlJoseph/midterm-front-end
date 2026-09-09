import type { Product } from "@/context/shop-context";

import { CategoryProductCard } from "./category-product-card";

type CategoryProductRowProps = {
  title: string;
  products: Product[];
};

export function CategoryProductRow({
  title,
  products,
}: CategoryProductRowProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="mb-5 flex h-8 items-center">
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <CategoryProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}