import { Package } from "lucide-react";
import type { ProductItem } from "@/lib/api-types";
import { StoreProductCard } from "./store-product-card";

interface StoreProductsGridProps {
  products: ProductItem[];
  getCartQuantity: (productId: number) => number;
  onAddToCart: (product: ProductItem) => void;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
}

export function StoreProductsGrid({
  products,
  getCartQuantity,
  onAddToCart,
  onUpdateQuantity,
}: StoreProductsGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-700">
          Products ({products.length})
        </h2>
        <p className="mt-1 text-xs text-gray-400">
          Browse and add items to your cart
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
          <Package size={35} className="mx-auto mb-3 text-gray-300" />
          <h3 className="text-sm font-semibold text-gray-600">
            No products available
          </h3>
          <p className="mt-1 text-xs text-gray-400">
            This store doesn't have any products yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <StoreProductCard
              key={product.id}
              product={product}
              quantity={getCartQuantity(product.id)}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
