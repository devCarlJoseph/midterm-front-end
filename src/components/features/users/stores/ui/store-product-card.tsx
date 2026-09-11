import { Plus, Minus } from "lucide-react";
import type { ProductItem } from "@/lib/api-types";
import { getProductImage } from "../contents/store-images";

interface StoreProductCardProps {
  product: ProductItem;
  quantity: number;
  onAddToCart: (product: ProductItem) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
}

export function StoreProductCard({
  product,
  quantity,
  onAddToCart,
  onUpdateQuantity,
}: StoreProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      {/* Product Image */}
      <div className="relative h-[130px] overflow-hidden bg-[#eef8f3]">
        <img
          src={getProductImage(product.name, product.category?.slug)}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            {product.category.name}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="truncate text-[13px] font-semibold text-gray-700">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[10px] text-gray-400">
          per {product.unit}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-emerald-700">
            ₱{Number(product.price).toFixed(2)}
          </span>

          {quantity > 0 ? (
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-1 py-0.5">
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full text-emerald-700 hover:bg-emerald-200/60 transition cursor-pointer"
                aria-label={`Decrease ${product.name} quantity`}
              >
                <Minus size={12} />
              </button>
              <span className="min-w-4 text-center text-xs font-bold text-emerald-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition cursor-pointer"
                aria-label={`Increase ${product.name} quantity`}
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700 cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
