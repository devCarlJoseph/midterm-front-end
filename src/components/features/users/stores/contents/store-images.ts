export function getProductImage(name: string, categorySlug?: string): string {
  const n = name.toLowerCase();
  const c = (categorySlug ?? "").toLowerCase();

  if (
    c.includes("meat") ||
    n.includes("pork") ||
    n.includes("chicken") ||
    n.includes("beef") ||
    n.includes("hotdog") ||
    n.includes("chorizo") ||
    n.includes("corned") ||
    n.includes("luncheon")
  ) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80";
  }
  if (
    c.includes("fruit") ||
    c.includes("veg") ||
    n.includes("banana") ||
    n.includes("mango") ||
    n.includes("apple") ||
    n.includes("tomato") ||
    n.includes("onion") ||
    n.includes("potato")
  ) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";
  }
  if (
    c.includes("dairy") ||
    n.includes("milk") ||
    n.includes("egg") ||
    n.includes("cheese") ||
    n.includes("yogurt") ||
    n.includes("butter")
  ) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=400&q=80";
  }
  if (
    c.includes("bake") ||
    n.includes("bread") ||
    n.includes("pastry") ||
    n.includes("cake") ||
    n.includes("cookie") ||
    n.includes("pan")
  ) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80";
  }
  if (
    c.includes("snack") ||
    n.includes("chips") ||
    n.includes("candy") ||
    n.includes("chocolate") ||
    n.includes("biscuit")
  ) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=400&q=80";
  }
  if (
    c.includes("beverage") ||
    c.includes("spirit") ||
    n.includes("juice") ||
    n.includes("soda") ||
    n.includes("beer") ||
    n.includes("wine") ||
    n.includes("water")
  ) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80";
  }
  if (
    n.includes("rice") ||
    n.includes("noodle") ||
    n.includes("pasta") ||
    n.includes("sugar") ||
    n.includes("salt") ||
    n.includes("oil") ||
    n.includes("sauce") ||
    n.includes("vinegar")
  ) {
    return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80";
  }
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80";
}

export function getStoreImage(name: string, description: string): string {
  const n = name.toLowerCase();
  const d = description.toLowerCase();

  if (
    d.includes("meat") ||
    d.includes("fish") ||
    n.includes("meat") ||
    n.includes("fish") ||
    n.includes("seafood")
  ) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80";
  }
  if (
    d.includes("fruit") ||
    d.includes("vegetable") ||
    n.includes("fruit") ||
    n.includes("vegi")
  ) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";
  }
  if (
    d.includes("dairy") ||
    d.includes("milk") ||
    d.includes("egg") ||
    n.includes("dairy") ||
    n.includes("milk")
  ) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("bake") || d.includes("pastr") || n.includes("bake")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("snack") || n.includes("snack") || n.includes("sweet")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=900&q=80";
  }
  if (
    d.includes("spirit") ||
    d.includes("beverage") ||
    d.includes("wine") ||
    d.includes("beer") ||
    n.includes("spirit")
  ) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80";
  }
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=900&q=80";
}
