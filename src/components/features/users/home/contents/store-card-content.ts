export function getStoreImage(name: string, description: string): string {
  const n = name.toLowerCase();
  const d = (description || "").toLowerCase();

  if (d.includes("meat") || d.includes("fish") || n.includes("meat") || n.includes("fish") || n.includes("seafood")) return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80";
  if (d.includes("fruit") || d.includes("vegetable") || n.includes("fruit") || n.includes("veg")) return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  if (d.includes("dairy") || d.includes("milk") || d.includes("egg") || n.includes("dairy") || n.includes("milk")) return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80";
  if (d.includes("bake") || d.includes("pastr") || n.includes("bake")) return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  if (d.includes("snack") || n.includes("snack") || n.includes("sweet")) return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=600&q=80";
  if (d.includes("spirit") || d.includes("beverage") || n.includes("spirit") || n.includes("wine")) return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80";
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80";
}

export function getStoreCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  if (text.includes("fruit") || text.includes("veg")) return "Fruits & Vegetables";
  if (text.includes("meat") || text.includes("fish") || text.includes("seafood")) return "Meat & Seafood";
  if (text.includes("milk") || text.includes("dairy") || text.includes("egg")) return "Dairy & Eggs";
  if (text.includes("bake") || text.includes("bread") || text.includes("pastr")) return "Bakery & Bread";
  if (text.includes("snack") || text.includes("sweet")) return "Snacks & Sweets";
  if (text.includes("spirit") || text.includes("beverage") || text.includes("drink")) return "Beverages & Drinks";
  return "Dali Everyday Mart";
}
