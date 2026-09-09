import type { Product } from "@/context/shop-context";

interface OrderItemProps {
  product: Product;
  quantity?: number;
}

export function OrderItem({
  product,
  quantity = 1,
}: OrderItemProps) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-0">

      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-semibold text-[#164f45]">
          {product.name}
        </h3>

        <p className="mt-1 text-[10px] text-slate-400">
          1 kg
        </p>
      </div>

      <p className="text-xs font-semibold text-[#164f45]">
        ₱ {product.price.toFixed(2)}
      </p>

      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1">
        <button
          type="button"
          className="text-slate-400 hover:text-[#087a5a]"
        >
          −
        </button>

        <span className="text-[10px] font-medium text-slate-600">
          {quantity}
        </span>

        <button
          type="button"
          className="text-slate-400 hover:text-[#087a5a]"
        >
          +
        </button>
      </div>

    </div>
  );
}