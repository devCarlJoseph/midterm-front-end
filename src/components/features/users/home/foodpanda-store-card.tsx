import { useNavigate } from "react-router";
import { Star, Bike, Heart, Sparkles, Clock, Tag } from "lucide-react";
import type { Store } from "@/lib/api-types";
import { useFavoriteStores } from "@/lib/use-favorite-stores";

export function getStoreImage(name: string, description: string): string {
  const n = name.toLowerCase();
  const d = (description || "").toLowerCase();

  if (d.includes("meat") || d.includes("fish") || n.includes("meat") || n.includes("fish") || n.includes("seafood")) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("fruit") || d.includes("vegetable") || n.includes("fruit") || n.includes("veg")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("dairy") || d.includes("milk") || d.includes("egg") || n.includes("dairy") || n.includes("milk")) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("bake") || d.includes("pastr") || n.includes("bake")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("snack") || n.includes("snack") || n.includes("sweet")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=600&q=80";
  }
  if (d.includes("spirit") || d.includes("beverage") || n.includes("spirit") || n.includes("wine")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80";
  }
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

interface FoodpandaStoreCardProps {
  store: Store;
  index?: number;
  featuredBadge?: string;
  horizontalCompact?: boolean;
}

export function FoodpandaStoreCard({
  store,
  index = 0,
  featuredBadge,
  horizontalCompact = false,
}: FoodpandaStoreCardProps) {
  const navigate = useNavigate();
  const { isStoreFavorite, toggleFavoriteStore } = useFavoriteStores();
  const isFavorite = isStoreFavorite(store.id);

  const img = getStoreImage(store.name, store.description);
  const category = getStoreCategory(store.name, store.description);
  const rating = Number((4.6 + ((index * 3) % 4) / 10).toFixed(1));
  const reviewCount = 75 + index * 42;
  const eta = 15 + ((index * 5) % 20); // 15 to 30 mins
  const distance = (0.8 + ((index * 7) % 25) / 10).toFixed(1); // 0.8 - 3.2 km
  const hasFreeDelivery = index % 2 === 0;
  const promoTag =
    featuredBadge ??
    (index % 3 === 0
      ? "₱50 off min ₱300"
      : index % 3 === 1
      ? "Up to 20% off"
      : "Free Delivery voucher");

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteStore(store.id);
  };

  if (horizontalCompact) {
    return (
      <div
        onClick={() => navigate(`/stores/${store.id}`)}
        className="group relative flex w-72 sm:w-80 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
      >
        <div className="relative h-32 w-32 shrink-0 overflow-hidden bg-slate-100">
          <img
            src={img}
            alt={store.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 rounded-md bg-emerald-700/90 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
            {eta}-{eta + 10}m
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-3 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-1">
              <h4 className="truncate text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-800">
                {store.name}
              </h4>
              <button
                type="button"
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
                className={`p-1 rounded-full transition cursor-pointer ${
                  isFavorite
                    ? "text-rose-500 bg-rose-50"
                    : "text-slate-400 hover:text-rose-500 hover:bg-slate-50"
                }`}
              >
                <Heart size={14} className={isFavorite ? "fill-current" : ""} />
              </button>
            </div>

            <div className="mt-1 flex items-center gap-1 text-[11px]">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-700">{rating}</span>
              <span className="text-slate-400">({reviewCount})</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 truncate">{category}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
            <span className="text-emerald-700 font-medium">
              {hasFreeDelivery ? "Free delivery" : "₱19 delivery"}
            </span>
            <span className="text-slate-400">{distance} km</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={() => navigate(`/stores/${store.id}`)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg cursor-pointer"
    >
      {/* Store Banner Image */}
      <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={img}
          alt={store.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Promo tag (Foodpanda style top-left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-md">
          <Tag size={10} />
          <span>{promoTag}</span>
        </div>

        {/* Heart Favorite Button (Top-Right) */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove favorite" : "Add to favorites"}
          className={`absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-sm ${
            isFavorite
              ? "bg-white text-rose-500 hover:bg-rose-50"
              : "bg-white/85 text-slate-600 hover:bg-white hover:text-rose-500"
          }`}
        >
          <Heart size={16} className={isFavorite ? "fill-rose-500" : ""} />
        </button>

        {/* ETA & Distance Badge (Bottom-Right of Image) */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-sm">
          <Clock size={12} className="text-emerald-700" />
          <span>{eta}-{eta + 10} min</span>
        </div>

        {/* Dali Express Badge if top store */}
        {index < 3 && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            <Sparkles size={10} className="text-emerald-400" />
            <span>Dali Express</span>
          </div>
        )}
      </div>

      {/* Store Content */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-800">
              {store.name}
            </h3>

            <div className="flex items-center gap-1 shrink-0 rounded-md bg-amber-50 px-1.5 py-0.5 border border-amber-200/60">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-800">{rating}</span>
            </div>
          </div>

          {/* Subtext: Category & Distance */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 truncate">
            <span className="truncate">{category}</span>
            <span className="text-slate-300">•</span>
            <span>{distance} km</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">({reviewCount}+ reviews)</span>
          </div>
        </div>

        {/* Footer info: Delivery Fee & Pickup */}
        <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
          <div className="flex items-center gap-1.5">
            <Bike size={14} className={hasFreeDelivery ? "text-emerald-600" : "text-slate-400"} />
            <span
              className={
                hasFreeDelivery
                  ? "font-semibold text-emerald-700"
                  : "text-slate-600"
              }
            >
              {hasFreeDelivery ? "₱0 Free Delivery" : "₱19 delivery fee"}
            </span>
          </div>

          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            Dali Partner
          </span>
        </div>
      </div>
    </article>
  );
}
