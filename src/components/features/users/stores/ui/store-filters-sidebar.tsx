import { ArrowRight, ChevronDown, MapPin, RotateCcw } from "lucide-react";
import { storeCategories } from "../contents/store-category-content";

type StoreFiltersSidebarProps = {
  selectedCategory: string;
  selectedRating: number | null;
  delivery: boolean;
  pickup: boolean;
  onCategoryChange: (category: string) => void;
  onRatingChange: (rating: number) => void;
  onDeliveryChange: (checked: boolean) => void;
  onPickupChange: (checked: boolean) => void;
  onBothChange: () => void;
  onClear: () => void;
};

export function StoreFiltersSidebar(props: StoreFiltersSidebarProps) {
  const { selectedCategory, selectedRating, delivery, pickup, onCategoryChange, onRatingChange, onDeliveryChange, onPickupChange, onBothChange, onClear } = props;
  return (
    <aside className="w-full shrink-0 rounded-xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-6 lg:w-[250px] lg:self-start">
      <div className="p-3 sm:p-4">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Shop Categories</h2>
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {storeCategories.map((category) => {
            const isActive = selectedCategory === category.categoryName;
            return (
              <button key={category.id} onClick={() => onCategoryChange(category.categoryName)} className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-left text-xs transition-all lg:w-full lg:gap-3 ${isActive ? "bg-emerald-50 font-medium text-emerald-700" : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"}`}>
                <span className={isActive ? "text-emerald-600" : "text-gray-400"}>{category.icon}</span>
                <span className="flex-1">{category.categoryName}</span>
                {isActive && <ArrowRight size={13} className="text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="border-t border-gray-100" />
      <div className="grid gap-4 p-3 sm:grid-cols-2 sm:p-4 lg:block">
        <h2 className="mb-0 text-sm font-semibold text-gray-700 sm:col-span-2 lg:mb-4">Filter By</h2>
        <div className="sm:col-span-2 lg:mb-5">
          <label className="mb-2 block text-[11px] font-medium text-gray-600">Location</label>
          <button className="flex w-full items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-500"><MapPin size={14} /><span className="flex-1 text-left">All Areas</span><ChevronDown size={14} /></button>
        </div>
        <div className="lg:mb-5">
          <h3 className="mb-2 text-[11px] font-medium text-gray-600">Delivery Option</h3>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"><input type="checkbox" checked={delivery} onChange={(event) => onDeliveryChange(event.target.checked)} className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />Delivery</label>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"><input type="checkbox" checked={pickup} onChange={(event) => onPickupChange(event.target.checked)} className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />Pickup</label>
            <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"><input type="checkbox" checked={delivery && pickup} onChange={onBothChange} className="h-3.5 w-3.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />Both</label>
          </div>
        </div>
        <div className="lg:mb-5">
          <h3 className="mb-2 text-[11px] font-medium text-gray-600">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => <label key={rating} className="flex cursor-pointer items-center gap-2 text-xs"><input type="radio" name="rating" checked={selectedRating === rating} onChange={() => onRatingChange(rating)} className="h-3.5 w-3.5 border-gray-300 text-emerald-600 focus:ring-emerald-500" /><span className="text-yellow-400">★★★★★</span><span className="text-gray-500">{rating}.0 & above</span></label>)}
          </div>
        </div>
        <button onClick={onClear} className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-50 py-2.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 sm:col-span-2 lg:col-auto"><RotateCcw size={13} />Clear Filters</button>
      </div>
    </aside>
  );
}
