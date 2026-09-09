import type { Product } from "@/context/shop-context";

export function CategoryProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="group w-full overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Image */}
      <div className="h-36 overflow-hidden bg-[#eef8f3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Information */}
      <div className="flex items-center justify-between gap-3 bg-white px-4 py-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#164f45]">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Fresh products
          </p>
        </div>

        {/* Arrow */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f6ef] text-[#07835f] transition duration-200 group-hover:bg-[#07835f] group-hover:text-white">
          <span className="text-lg leading-none">
            →
          </span>
        </div>
      </div>
    </article>
  );
}