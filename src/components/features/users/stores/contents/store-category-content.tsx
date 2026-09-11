import type { ReactNode } from "react";
import { Apple, Beef, Building2, Croissant, Milk, Package, ShoppingBasket, Store } from "lucide-react";
import type { Store as ApiStore } from "@/lib/api-types";

export type StoreCategoryOption = { id: number; categoryName: string; icon: ReactNode };

export type StoreItem = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  delivery: boolean;
  pickup: boolean;
  image: string;
};

export const storeCategories: StoreCategoryOption[] = [
  { id: 1, categoryName: "All Shops", icon: <Store size={16} /> },
  { id: 2, categoryName: "Meat & Fish", icon: <Beef size={16} /> },
  { id: 3, categoryName: "Fruits & Vegetables", icon: <Apple size={16} /> },
  { id: 4, categoryName: "Dairy & Eggs", icon: <Milk size={16} /> },
  { id: 5, categoryName: "Pantry & Groceries", icon: <Package size={16} /> },
  { id: 6, categoryName: "Bakeries", icon: <Croissant size={16} /> },
  { id: 7, categoryName: "Snacks", icon: <ShoppingBasket size={16} /> },
  { id: 8, categoryName: "Beverages & Spirits", icon: <Building2 size={16} /> },
];

function getStoreImage(name: string, category: string): string {
  const c = category.toLowerCase();
  const n = name.toLowerCase();
  if (c.includes("meat") || c.includes("fish") || n.includes("meat")) return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80";
  if (c.includes("fruit") || c.includes("veg") || n.includes("fruit")) return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  if (c.includes("dairy") || n.includes("milk") || n.includes("dairy")) return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80";
  if (c.includes("bake") || n.includes("bake")) return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  if (c.includes("snack") || n.includes("sweet")) return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=600&q=80";
  if (c.includes("beverage") || c.includes("spirit") || n.includes("spirit")) return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80";
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80";
}

function getStoreCategory(store: ApiStore): string {
  const desc = (store.description || "").toLowerCase();
  const name = store.name.toLowerCase();
  if (desc.includes("meat") || desc.includes("fish") || name.includes("meat") || name.includes("fish") || name.includes("seafood")) return "Meat & Fish";
  if (desc.includes("fruit") || desc.includes("vegetable") || name.includes("fruit") || name.includes("vegi")) return "Fruits & Vegetables";
  if (desc.includes("dairy") || desc.includes("milk") || desc.includes("egg") || name.includes("dairy") || name.includes("milk") || name.includes("egg")) return "Dairy & Eggs";
  if (desc.includes("bake") || desc.includes("pastr") || name.includes("bake")) return "Bakeries";
  if (desc.includes("snack") || name.includes("snack") || name.includes("sweet")) return "Snacks";
  if (desc.includes("spirit") || desc.includes("beverage") || name.includes("spirit")) return "Beverages & Spirits";
  return "Pantry & Groceries";
}

export function mapStore(store: ApiStore, index: number): StoreItem {
  const category = getStoreCategory(store);
  return {
    id: store.id,
    name: store.name,
    category,
    rating: Number((4 + ((index * 7) % 10) / 10).toFixed(1)),
    reviews: 20 + index * 13,
    delivery: index % 3 !== 1,
    pickup: true,
    image: getStoreImage(store.name, category),
  };
}
