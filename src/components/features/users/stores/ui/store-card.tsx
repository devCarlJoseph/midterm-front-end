import { ArrowRight, Star } from "lucide-react";
import type { StoreItem } from "../contents/store-category-content";

type StoreCardProps = { store: StoreItem; onClick: () => void };

export function StoreCard({ store, onClick }: StoreCardProps) {
  return (
    <button onClick={onClick} className="group w-full overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <div className="relative h-31.25 w-full overflow-hidden bg-gray-100">
        <img src={store.image} alt={store.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[13px] font-semibold text-gray-700">{store.name}</h3>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center text-emerald-700 transition-transform group-hover:translate-x-1"><ArrowRight size={14} /></span>
        </div>
        <div className="mt-1 flex items-center gap-1">
          <Star size={11} fill="#FBBF24" className="text-yellow-400" />
          <span className="text-[10px] text-gray-500">{store.rating}</span>
          <span className="text-[10px] text-gray-400">({store.reviews})</span>
        </div>
        <p className="mt-2 text-[9px] text-gray-400">{store.category}</p>
        <div className="mt-2 flex items-center gap-1 text-[9px] text-gray-400">
          {store.delivery && <span>◉ Delivery</span>}
          {store.delivery && store.pickup && <span>·</span>}
          {store.pickup && <span>Pickup</span>}
        </div>
      </div>
    </button>
  );
}
