import type { Cart } from "@/lib/api-types";

import { OrderItem } from "./order-item";

interface OrderItemsProps {
  cart: Cart | null;
}

export function OrderItems({ cart }: OrderItemsProps) {
  return (
    <section className="mt-6 border-t border-slate-200 pt-5">
      <div>
        <h2 className="text-sm font-bold text-[#164f45]">Order Items</h2>
        <p className="mt-1 text-xs text-slate-400">
          Review your selected items before proceeding.
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 px-3">
        <div className="flex items-center gap-3 border-b border-slate-100 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff4e9] text-[#087a5a]">
            🛒
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-[#164f45]">
              {cart?.store?.name ?? "No store selected"}
            </p>
            <p className="text-[10px] text-slate-400">Your current cart</p>
          </div>
        </div>

        {cart?.items.length ? (
          cart.items.map((item) => <OrderItem key={item.id} item={item} />)
        ) : (
          <p className="py-5 text-center text-xs text-slate-500">
            Your cart is empty.
          </p>
        )}
      </div>
    </section>
  );
}
