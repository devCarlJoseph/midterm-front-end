import { useEffect, useState } from "react";
import {
  Ellipsis,
  MapPin,
  Search,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { useShop } from "@/context/shop-context";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItemCount, favoriteIds } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-5">
            <button type="button">
              <Ellipsis className="cursor-pointer text-emerald-600" />
            </button>

            <h1 className="text-md font-bold text-emerald-600">DALI</h1>

            <button
              type="button"
              className="flex items-center justify-center rounded-full bg-gray-200 p-2"
            >
              <MapPin size={16} />
            </button>
          </div>

          <div className="hidden w-full max-w-3xl overflow-hidden rounded-full border-2 border-gray-300 bg-white md:flex">
            <input
              type="text"
              placeholder="Search products and stores..."
              className="flex-1 px-5 py-2.5 text-sm outline-none"
            />

            <button
              type="button"
              className="flex items-center gap-2 bg-emerald-950 px-5 py-2.5 text-sm text-white"
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="Favorite products"
              className="relative flex items-center justify-center rounded-full border border-emerald-400 bg-white p-2"
            >
              <Heart className="text-emerald-600" size={16} />

              {favoriteIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {favoriteIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
              className="relative flex items-center justify-center rounded-full border border-emerald-400 bg-white p-2"
            >
              <ShoppingCart className="text-emerald-600" size={16} />

              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <button
            type="button"
            className="hidden rounded-2xl bg-emerald-700 px-5 py-2 text-xs text-white sm:block"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}