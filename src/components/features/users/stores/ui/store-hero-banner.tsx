import { ArrowLeft, MapPin, Star, Bike } from "lucide-react";
import type { Store } from "@/lib/api-types";

interface StoreHeroBannerProps {
  store: Store;
  storeImage: string;
  onBack: () => void;
}

export function StoreHeroBanner({
  store,
  storeImage,
  onBack,
}: StoreHeroBannerProps) {
  return (
    <div className="relative h-[200px] w-full overflow-hidden bg-gray-200 sm:h-[240px]">
      <img
        src={storeImage}
        alt={store.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white cursor-pointer"
        aria-label="Back to stores"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Store Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          {store.name}
        </h1>
        <p className="mt-1 text-sm text-white/80">{store.description}</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-white/80">
            <MapPin size={12} />
            {store.address}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/80">
            <Star size={12} fill="#FBBF24" className="text-yellow-400" />
            4.5
          </span>
          <span className="flex items-center gap-1 text-xs text-white/80">
            <Bike size={12} />
            Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
