import {
  Apple,
  Beef,
  Candy,
  Carrot,
  ChevronDown,
  ChevronUp,
  Croissant,
  Egg,
  Heart,
  Milk,
  Package,
  ShoppingBasket,
  ShoppingCart,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  unit: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
};

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
    unit: "1kg",
    price: 20.12,
    oldPrice: 24.12,
    discount: "20% off",
    image:
      "https://images.unsplash.com/photo-1568584711271-cc21be5af9d5?auto=format&fit=crop&w=300&q=80",
  },
];

function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-600">
          {product.discount}
        </span>

        <button
          type="button"
          aria-label={`Add ${product.name} to favorites`}
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-orange-400 hover:text-orange-600"
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex h-28 items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-800">
        {product.name}
      </h3>

      <p className="mt-0.5 text-xs text-slate-400">Unit: {product.unit}</p>

      <div className="mt-1 flex items-center gap-1">
        <span className="text-sm font-bold text-slate-800">
          ${product.price.toFixed(2)}
        </span>

        {product.oldPrice && (
          <span className="text-xs text-slate-400 line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-md bg-emerald-900 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
      >
        <ShoppingCart size={14} />
        Add to Cart
      </button>
    </article>
  );
}

function ProductRow({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        <button
          type="button"
          className="text-xs font-medium text-slate-500 hover:text-emerald-800"
        >
          View All (35) →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
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
                      } else {
                        setActiveCategory(category.name);
                      }
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition ${
                      isOpen || isActive
                        ? "bg-orange-50 text-slate-800"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={17} className="text-orange-400" />

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
                            onClick={() => setActiveCategory(subcategory)}
                            className={`block w-full px-5 py-2 text-left text-sm transition ${
                              isSubcategoryActive
                                ? "font-semibold text-orange-500"
                                : "text-slate-500 hover:bg-orange-50 hover:text-orange-500"
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

        <div className="min-w-0 space-y-12">
          <ProductRow title="Fresh Fruit" products={fruitProducts} />
          <ProductRow title="Fresh Vegetables" products={vegetableProducts} />
        </div>
      </div>
    </section>
  );
}