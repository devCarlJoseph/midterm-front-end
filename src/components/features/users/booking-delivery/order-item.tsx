import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/api-types";
import { useShop } from "@/context/shop-context";

interface OrderItemProps {
  item: CartItem;
}

export function OrderItem({ item }: OrderItemProps) {
  const { updateCartItemQuantity, removeFromCart } = useShop();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      void updateCartItemQuantity(item.product.id, item.quantity - 1);
    } else {
      void removeFromCart(item.product.id);
    }
  };

  const handleIncrease = () => {
    void updateCartItemQuantity(item.product.id, item.quantity + 1);
  };

  const handleRemove = () => {
    void removeFromCart(item.product.id);
  };

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-3.5 last:border-0">
      {/* Product Avatar */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#eef8f3] text-base font-bold text-[#087a5a]">
        {item.product.name.charAt(0)}
      </div>

      {/* Product Name & Unit */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-semibold text-[#164f45]">
          {item.product.name}
        </h3>
        <p className="mt-0.5 text-[10px] text-slate-400">
          ₱ {Number(item.product.price).toFixed(2)} / {item.product.unit}
        </p>
      </div>

      {/* Grab-like Quantity Stepper (+/-) */}
      <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
        <button
          type="button"
          onClick={handleDecrease}
          title={item.quantity === 1 ? "Remove item" : "Decrease quantity"}
          className="flex h-5 w-5 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200 transition"
        >
          {item.quantity === 1 ? <Trash2 size={11} className="text-red-500" /> : <Minus size={11} />}
        </button>

        <span className="min-w-4 text-center text-xs font-bold text-[#164f45]">
          {item.quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrease}
          title="Increase quantity"
          className="flex h-5 w-5 items-center justify-center rounded-full text-slate-600 hover:bg-slate-200 transition"
        >
          <Plus size={11} />
        </button>
      </div>

      {/* Line Total & Remove button */}
      <div className="text-right min-w-[70px]">
        <p className="text-xs font-bold text-[#164f45]">
          ₱ {Number(item.line_total).toFixed(2)}
        </p>
        <button
          type="button"
          onClick={handleRemove}
          className="mt-0.5 text-[10px] font-medium text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
