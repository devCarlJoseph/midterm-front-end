import {
  Beef,
  Candy,
  Croissant,
  Egg,
  Package,
  ShoppingBasket,
  Wine,
  type LucideIcon,
} from "lucide-react";

export type Category = {
  name: string;
  icon: LucideIcon;
  subcategories?: string[];
};

export const categories: Category[] = [
  {
    name: "Snacks",
    icon: Candy,
    subcategories: [
      "Chips & Crisps",
      "Biscuits & Cookies",
      "Chocolate",
      "Candies",
      "Nuts & Seeds",
      "Popcorn",
    ],
  },

  {
    name: "Vegetables & Fruit",
    icon: ShoppingBasket,
    subcategories: [
      "Fresh Vegetables",
      "Fresh Fruit",
      "Leafy Greens",
      "Berries",
      "Citrus Fruits",
      "Root Vegetables",
      "Tropical Fruits",
    ],
  },

  {
    name: "Packed Foods",
    icon: Package,
    subcategories: [
      "Canned Goods",
      "Instant Noodles",
      "Pasta",
      "Rice",
      "Cereals",
      "Sauces & Condiments",
      "Ready-to-Eat Meals",
    ],
  },

  {
    name: "Dairy & Eggs",
    icon: Egg,
    subcategories: [
      "Fresh Eggs",
      "Organic Eggs",
      "Quail Eggs",
      "Cheese",
      "Yogurt",
      "Cream",
      "Egg Products",
    ],
  },

  {
    name: "Bakery",
    icon: Croissant,
    subcategories: [
      "Bread",
      "Buns & Rolls",
      "Cakes",
      "Pastries",
      "Donuts",
      "Croissants",
      "Muffins",
    ],
  },

  {
    name: "Meat & Fish",
    icon: Beef,
    subcategories: [
      "Beef",
      "Pork",
      "Chicken",
      "Fish",
      "Seafood",
      "Sausages",
      "Processed Meat",
    ],
  },

  {
    name: "Alcohol",
    icon: Wine,
    subcategories: [
      "Beer",
      "Wine",
      "Whiskey",
      "Brandy",
      "Rum",
      "Vodka",
      "Cocktails",
    ],
  },
];