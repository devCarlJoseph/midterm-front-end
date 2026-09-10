import {
  Beef,
  Candy,
  ChevronDown,
  ChevronUp,
  Croissant,
  Egg,
  Milk,
  Package,
  ShoppingBasket,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import type { Product } from "@/context/shop-context";

type Category = {
  name: string;
  icon: LucideIcon;
  subcategories?: string[];
};

const categories: Category[] = [
  { name: "Dairy", icon: Milk },
  { name: "Snacks", icon: Candy },
  {
    name: "Vegetables & Fruit",
    icon: ShoppingBasket,
    subcategories: [
      "Fresh Vegetables",
      "Fresh Fruit",
      "Pooches Leafy Greens",
      "Berries",
      "Citrus Fruits",
      "Butternut lettuce Berries",
      "Root Vegetables",
    ],
  },
  { name: "Packed Foods", icon: Package },
  { name: "Dairy & Eggs", icon: Egg },
  { name: "Bakery", icon: Croissant },
  { name: "Meat & Fish", icon: Beef },
  { name: "Alcohol", icon: Wine },
];

const fruitProducts: Product[] = [
  {
    id: 1,
    name: "Bananas",
    category: "Fresh Fruit",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Apples",
    category: "Fresh Fruit",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Strawberries",
    category: "Fresh Fruit",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Pineapples",
    category: "Fresh Fruit",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Watermelons",
    category: "Fresh Fruit",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=300&q=80",
  },
];

const vegetableProducts: Product[] = [
  {
    id: 6,
    name: "Tomato",
    category: "Fresh Vegetables",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 7,
    name: "Cucumbers",
    category: "Fresh Vegetables",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 8,
    name: "Carrots",
    category: "Fresh Vegetables",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "15% off",
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 9,
    name: "Green Beans",
    category: "Fresh Vegetables",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 10,
    name: "Cauliflower",
    category: "Fresh Vegetables",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1568584711271-cc21be5af9d5?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 11,
    name: "Cauliflower",
    category: "Fresh Vegetables",
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1568584711271-cc21be5af9d5?auto=format&fit=crop&w=300&q=80",
  },  
];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="relative h-28 w-45 overflow-hidden rounded-xl">
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-emerald-950/95 via-emerald-900/75 to-emerald-900/20" />
      <div className="absolute inset-0 z-10 flex items-center justify-center p-3 text-center text-white">
        <p className="text-sm font-semibold">{product.name}</p>
      </div>
    </article>
  );
}

function ProductRow({
  title,
  products,
  showAll,
  onToggleShowAll,
}: {
  title: string;
  products: Product[];
  showAll: boolean;
  onToggleShowAll: () => void;
}) {
  const visibleProducts = showAll ? products : products.slice(0, 5);

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        {products.length > 5 && (
          <button
            type="button"
            onClick={onToggleShowAll}
            className="text-xs font-medium text-slate-500 transition hover:text-emerald-800"
          >
            {showAll ? "Show Less" : `View All (${products.length}) →`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function CategorySection() {
  const [activeCategory, setActiveCategory] = useState("Fresh Fruit");
  const [openCategory, setOpenCategory] = useState<string | null>(
    "Vegetables & Fruit",
  );
  const [showAll, setShowAll] = useState(false);

  const allProducts = [...fruitProducts, ...vegetableProducts];

  const selectedProducts =
    activeCategory === "Vegetables & Fruit"
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

  const selectCategory = (categoryName: string) => {
    setActiveCategory(categoryName);
    setShowAll(false);
  };

  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="self-start overflow-hidden rounded-lg border border-slate-200 bg-white lg:sticky lg:top-24">
          <div className="bg-emerald-900 px-4 py-3 text-sm font-semibold text-white">
            Categories
          </div>

          <nav className="py-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const hasSubcategories = Boolean(category.subcategories?.length);
              const isOpen = openCategory === category.name;
              const isActive = activeCategory === category.name;

              return (
                <div key={category.name}>
                  <button
                    type="button"
                    onClick={() => {
                      if (hasSubcategories) {
                        setOpenCategory(isOpen ? null : category.name);
                        selectCategory(category.name);
                        return;
                      }

                      selectCategory(category.name);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                      isOpen || isActive
                        ? "bg-emerald-50 text-slate-800"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={17} className="text-emerald-500" />

                    <span className="flex-1">{category.name}</span>

                    {hasSubcategories &&
                      (isOpen ? (
                        <ChevronUp size={16} className="text-slate-500" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-500" />
                      ))}
                  </button>

                  {hasSubcategories && isOpen && (
                    <div className="bg-white py-1">
                      {category.subcategories?.map((subcategory) => {
                        const isSubcategoryActive =
                          activeCategory === subcategory;

                        return (
                          <button
                            type="button"
                            key={subcategory}
                            onClick={() => selectCategory(subcategory)}
                            className={`block w-full px-5 py-2 text-left text-sm transition ${
                              isSubcategoryActive
                                ? "font-semibold text-emerald-600"
                                : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                            }`}
                          >
                            {subcategory}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          {selectedProducts.length > 0 ? (
            <ProductRow
              title={activeCategory}
              products={selectedProducts}
              showAll={showAll}
              onToggleShowAll={() => setShowAll((current) => !current)}
            />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <h2 className="text-lg font-semibold text-slate-700">
                No products available yet
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Products for {activeCategory} will be added soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}