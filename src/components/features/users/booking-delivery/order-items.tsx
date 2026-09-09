import type { Product } from "@/context/shop-context";

import { OrderItem } from "./order-item";

interface OrderItemsProps {
  products: Product[];
}

export function OrderItems({
  products,
}: OrderItemsProps) {
  const visibleProducts = products.slice(0, 4);

  return (
    <section className="mt-6 border-t border-slate-200 pt-5">

      <div>
        <h2 className="text-sm font-bold text-[#164f45]">
          Order Items
        </h2>

        <p className="mt-1 text-xs text-slate-400">
          Review your selected items before proceeding.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 px-3">

        {/* Store */}
        <div className="flex items-center gap-3 border-b border-slate-100 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff4e9] text-[#087a5a]">
            🛒
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-[#164f45]">
              Puregold
            </p>

            <p className="text-[10px] text-slate-400">
              Supermarket
            </p>
          </div>

          <button
            type="button"
            className="text-[10px] font-medium text-[#087a5a] hover:underline"
          >
            Change Store
          </button>
        </div>

        {/* Products */}
        {visibleProducts.map((product, index) => (
          <OrderItem
            key={product.id}
            product={product}
            quantity={index === 0 ? 2 : 1}
          />
        ))}

        {/* Add more */}
        <button
          type="button"
          className="my-3 flex w-full items-center gap-2 rounded-lg bg-[#eef9f3] px-3 py-2.5 text-xs font-medium text-[#087a5a] transition hover:bg-[#e1f5eb]"
        >
          <span className="text-base">
            +
          </span>

          Add more items
        </button>

      </div>
    </section>
  );
}