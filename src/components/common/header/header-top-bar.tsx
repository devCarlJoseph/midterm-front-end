import { Link, NavLink } from "react-router";
import {
  ChevronDown,
  Globe,
  Heart,
  LogOut,
  MapPin,
  Menu,
  ShoppingBag,
} from "lucide-react";

type HeaderTopBarProps = {
  onOpenMenu: () => void;
  onOpenCart: () => void;
  cartItemCount: number;
  favoriteCount: number;
  user: { name: string; email: string } | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  onOpenAuthModal: (mode: "login" | "register") => void;
  isCartOpen: boolean;
};

export function HeaderTopBar({
  onOpenMenu,
  onOpenCart,
  cartItemCount,
  favoriteCount,
  user,
  isAuthenticated,
  onLogout,
  onOpenAuthModal,
  isCartOpen,
}: HeaderTopBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 sm:py-3.5">
      {/* Left: Mobile hamburger, Logo, Address selector */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-6">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={onOpenMenu}
          className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <NavLink
          to="/"
          className="flex items-center shrink-0"
          aria-label="DALI home"
        >
          <img
            src="/dali-transparent.png"
            alt="DALI"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </NavLink>

        {/* Location Picker */}
        <button
          type="button"
          aria-label="Choose delivery location"
          className="hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200"
        >
          <MapPin size={18} className="text-slate-700 shrink-0" />
          <div className="flex items-baseline gap-1.5 text-left">
            <span className="font-bold text-slate-900">New address</span>
            <span className="text-slate-500 hidden md:inline font-normal">
              Select your address
            </span>
          </div>
        </button>
      </div>

      {/* Right: Auth, Language, Wishlist, Cart */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {isAuthenticated && user ? (
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-bold text-white uppercase">
                {user.name.charAt(0)}
              </div>
              <span className="font-semibold max-w-[110px] truncate">{user.name}</span>
            </div>
            <button
              type="button"
              onClick={onLogout}
              title="Sign Out"
              className="flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 min-[400px]:flex">
            <button
              type="button"
              onClick={() => onOpenAuthModal("login")}
              className="rounded-xl border border-slate-300 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 transition hover:bg-slate-50 hover:border-slate-400 cursor-pointer"
            >
              Log in
            </button>
          </div>
        )}

        {/* Favorites Icon */}
        <Link
          to="/favorites"
          aria-label="Favorite products"
          className="relative hidden sm:flex items-center justify-center rounded-full p-2 text-slate-700 transition hover:bg-slate-100 cursor-pointer"
        >
          <Heart size={20} />
          {favoriteCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
              {favoriteCount}
            </span>
          )}
        </Link>

        {/* Shopping Bag / Cart */}
        <button
          type="button"
          aria-label="Shopping cart"
          aria-expanded={isCartOpen}
          onClick={onOpenCart}
          className="relative flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 cursor-pointer"
        >
          <ShoppingBag size={20} />
          {cartItemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white shadow-xs">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
