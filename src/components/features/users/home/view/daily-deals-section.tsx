import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useShop } from "@/context/shop-context";
import api from "@/lib/axios";
import { getCached, setCached } from "@/lib/api-cache";
import type { PaginatedResponse, ProductItem } from "@/lib/api-types";
import { toDailyDealItem, type DailyDealItem } from "../contents/daily-deals-content";
import { DailyDealCard } from "../ui/daily-deal-card";

export function DailyDealsSection() {
  const { addToCart } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [deals, setDeals] = useState<DailyDealItem[]>(() => getCached<DailyDealItem[]>("home_daily_deals_v2") ?? []);

  useEffect(() => {
    async function fetchDailyDeals() {
      try {
        const response = await api.get<PaginatedResponse<ProductItem>>("/products?per_page=20");
        const liveDeals = response.data.data.filter((product) => product.is_available).map(toDailyDealItem);
        setDeals(liveDeals);
        setCached("home_daily_deals_v2", liveDeals);
      } catch (error) {
        console.error("Unable to load daily deals:", error);
      }
    }

    void fetchDailyDeals();
  }, []);

  const handleAddToCart = async (deal: DailyDealItem) => {
    if (deal.storeId === null) return;

    await addToCart(
      {
        id: deal.id,
        name: deal.name,
        unit: deal.unit,
        price: deal.price,
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

        {/* Carousel Arrows */}
        <div className="flex items-center justify-between sm:justify-end gap-3">
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
        {deals.map((deal) => (
          <DailyDealCard
            key={deal.id}
            deal={deal}
            isAdded={addedIds.includes(deal.id)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
