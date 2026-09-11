import { Apple, Beef, Croissant, Milk, ShoppingBasket, Sparkles, Store, Wine } from "lucide-react";

export const storeCategoriesList = [
  { id: "all", label: "All Stores", icon: Store },
  { id: "mart", label: "Dali Everyday Mart", icon: Sparkles },
  { id: "produce", label: "Fruits & Vegetables", icon: Apple },
  { id: "meat", label: "Meat & Seafood", icon: Beef },
  { id: "dairy", label: "Dairy & Eggs", icon: Milk },
  { id: "bakery", label: "Bakery & Bread", icon: Croissant },
  { id: "snacks", label: "Snacks & Sweets", icon: ShoppingBasket },
  { id: "beverages", label: "Beverages & Drinks", icon: Wine },
] as const;
