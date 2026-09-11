export interface DailyDealItem {
  id: number;
  name: string;
  storeName: string;
  storeId: number;
  originalPrice: number;
  dealPrice: number;
  unit: string;
  discountBadge: string;
  claimedPercent: number;
  image: string;
}

export const dailyDealsList: DailyDealItem[] = [
  {
    id: 99101,
    name: "Dali Farm Fresh Large White Eggs (Tray of 30)",
    storeName: "Dali Fresh Mart - Poblacion",
    storeId: 1,
    originalPrice: 245.0,
    dealPrice: 179.0,
    unit: "tray",
    discountBadge: "27% OFF",
    claimedPercent: 84,
    image:
      "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 99102,
    name: "Pure Golden Soya Cooking Oil 1L Bottle",
    storeName: "Dali Everyday Grocery",
    storeId: 1,
    originalPrice: 110.0,
    dealPrice: 79.0,
    unit: "bottle",
    discountBadge: "28% OFF",
    claimedPercent: 92,
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 99103,
    name: "Fresh Whole Dressed Spring Chicken (1kg)",
    storeName: "Cordova Fresh Meat & Poultry",
    storeId: 2,
    originalPrice: 215.0,
    dealPrice: 159.0,
    unit: "kg",
    discountBadge: "26% OFF",
    claimedPercent: 68,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 99104,
    name: "Dali Premium Fragrant Sinandomeng Rice 5kg",
    storeName: "Dali Supermarket Hub",
    storeId: 1,
    originalPrice: 310.0,
    dealPrice: 239.0,
    unit: "bag",
    discountBadge: "23% OFF",
    claimedPercent: 76,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 99105,
    name: "Sweet Ripe Cavendish Bananas (1kg)",
    storeName: "Island Fresh Fruits & Greens",
    storeId: 3,
    originalPrice: 95.0,
    dealPrice: 65.0,
    unit: "kg",
    discountBadge: "32% OFF",
    claimedPercent: 59,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 99106,
    name: "Freshly Baked Golden Pandesal (Pack of 12)",
    storeName: "Pan De Dali Bakery",
    storeId: 4,
    originalPrice: 65.0,
    dealPrice: 45.0,
    unit: "pack",
    discountBadge: "30% OFF",
    claimedPercent: 95,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80",
  },
];
