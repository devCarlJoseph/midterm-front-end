import type { ProductItem } from "@/lib/api-types";

export type DailyDealItem = { id: number; name: string; storeName: string; storeId: number | null; price: number; unit: string; image: string };

function getProductImage(product: ProductItem): string {
  const text = `${product.name} ${product.category?.name ?? ""}`.toLowerCase();
  if (text.includes("meat") || text.includes("fish") || text.includes("chicken")) return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80";
  if (text.includes("fruit") || text.includes("vegetable") || text.includes("produce")) return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80";
  if (text.includes("dairy") || text.includes("milk") || text.includes("egg")) return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=500&q=80";
  if (text.includes("bakery") || text.includes("bread") || text.includes("pastry")) return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80";
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80";
}

export function toDailyDealItem(product: ProductItem): DailyDealItem {
  return { id: product.id, name: product.name, storeName: product.store?.name ?? product.category?.name ?? "DALI", storeId: product.store?.id ?? product.store_id ?? null, price: Number(product.price), unit: product.unit, image: getProductImage(product) };
}
