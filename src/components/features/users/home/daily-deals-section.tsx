import { useState, useEffect, useRef } from "react";
import {
  Flame,
  Clock,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useShop } from "@/context/shop-context";

interface DailyDealItem {
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

const dealsList: DailyDealItem[] = [
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

export function DailyDealsSection() {
  const { addToCart } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const handleAddToCart = async (deal: DailyDealItem) => {
    await addToCart(
      {
        id: deal.id,
        name: deal.name,
        unit: deal.unit,
        price: deal.dealPrice,
        oldPrice: deal.originalPrice,
        discount: deal.discountBadge,
        image: deal.image,
        store_id: deal.storeId,
      },
      1,
      deal.storeId
    );

    setAddedIds((prev) => [...prev, deal.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== deal.id));
    }, 2000);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };


  return (
    <section className="mt-10">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Daily Deals
            </h2>
          </div>

          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Dali daily specials &amp; flash deals. Grab them before they sell out!
          </p>
        </div>

        {/* Countdown & Navigation */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Foodpanda style Flash Timer */}

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-emerald-300 transition cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-emerald-300 transition cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
      >
        {dealsList.map((deal) => {
          const isAdded = addedIds.includes(deal.id);

          return (
            <article
              key={deal.id}
              className="group relative flex w-[230px] sm:w-[260px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xs"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-36 sm:h-40 w-full overflow-hidden rounded-xl bg-slate-50">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Discount Badge (Foodpanda Style) */}
                  <div className="absolute top-2 left-2 rounded-lg bg-emerald-600/70 px-2 py-0.5 text-xs font-medium text-white shadow-xs">
                    {deal.discountBadge}
                  </div>

                  <div className="absolute bottom-2 right-2 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                    per {deal.unit}
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3">
                  <p className="text-[11px] font-medium text-emerald-700 truncate">
                    {deal.storeName}
                  </p>
                  <h3 className="mt-0.5 text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                    {deal.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2.5 flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold text-emerald-700">
                      ₱{deal.dealPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₱{deal.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleAddToCart(deal)}
                className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                  isAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={14} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
