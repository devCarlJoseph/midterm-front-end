import { Check } from "lucide-react";
import type { DailyDealItem } from "../contents/daily-deals-content";

interface DailyDealCardProps {
  deal: DailyDealItem;
  isAdded: boolean;
  onAddToCart: (deal: DailyDealItem) => void;
}

export function DailyDealCard({
  deal,
  isAdded,
  onAddToCart,
}: DailyDealCardProps) {
  return (
    <article className="group relative flex w-[230px] sm:w-[260px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
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
        onClick={() => onAddToCart(deal)}
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
}
