import { useEffect, useState, type ComponentType } from "react";
import { Link, NavLink } from "react-router";
import {
  ChevronDown,
  Globe,
  Heart,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  PackageCheck,
  Search,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Store,
  UserRound,
  X,
} from "lucide-react";

import { useShop } from "@/context/shop-context";
import { useAuth } from "@/context/auth-context";

type MenuItem = {
  label: string;
  to: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  badge?: "favorites" | "cart";
};

const mainMenuItems: MenuItem[] = [
  {
    label: "Home",
    to: "/",
    icon: Home,
  },
  {
    label: "Categories",
    to: "/categories",
    icon: ShoppingBasket,
  },
  {
    label: "Stores",
    to: "/stores",
    icon: Store,
  },
  {
    label: "Book Delivery",
    to: "/booking",
    icon: PackageCheck,
  },
];

const accountMenuItems: MenuItem[] = [
  {
    label: "Favorites",
    to: "/favorites",
    icon: Heart,
    badge: "favorites",
  },
  {
    label: "Cart",
    to: "/cart",
    icon: ShoppingCart,
    badge: "cart",
  },
  {
    label: "My Orders",
    to: "/orders",
    icon: PackageCheck,
  },
  {
    label: "My Profile",
    to: "/profile",
    icon: UserRound,
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { cartItemCount, favoriteIds } = useShop();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const getBadgeCount = (badge?: MenuItem["badge"]) => {
    if (badge === "favorites") return favoriteIds.length;
    if (badge === "cart") return cartItemCount;

    return 0;
  };

  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon;
    const badgeCount = getBadgeCount(item.badge);

    return (
      <NavLink
        key={item.label}
        to={item.to}
        onClick={() => setIsMenuOpen(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
            isActive
              ? "bg-emerald-50 text-emerald-800 font-semibold"
              : "text-slate-600 hover:bg-slate-100 hover:text-emerald-800"
          }`
        }
      >
        <Icon size={18} />

        <span className="flex-1">{item.label}</span>

        {badgeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
            {badgeCount}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
          isScrolled ? "shadow-sm border-b border-slate-200" : "border-b border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Tier: Brand, Location, Auth / User Actions, Language, Bag */}
          <div className="flex items-center justify-between gap-3 py-3 sm:py-3.5">
            {/* Left: Mobile hamburger, Logo, Address selector */}
            <div className="flex items-center gap-2 sm:gap-6">
              <button
                type="button"
                aria-label="Open navigation menu"
                onClick={() => setIsMenuOpen(true)}
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

              {/* Location Picker (Foodpanda style) */}
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
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-900">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-bold text-white uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-semibold max-w-[110px] truncate">{user.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void logout()}
                    title="Sign Out"
                    className="flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200 cursor-pointer"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth?mode=login"
                    className="rounded-xl border border-slate-300 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 transition hover:bg-slate-50 hover:border-slate-400"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    className="rounded-xl bg-emerald-600 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700 whitespace-nowrap"
                  >
                    <span className="inline sm:hidden">Sign up</span>
                    <span className="hidden sm:inline">Sign up for free delivery</span>
                  </Link>
                </div>
              )}

              {/* Language Selector */}
              <button
                type="button"
                aria-label="Select language"
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <Globe size={18} className="text-slate-700" />
                <span>EN</span>
                <ChevronDown size={14} className="text-emerald-700 font-bold" />
              </button>

              {/* Favorites Icon */}
              <Link
                to="/favorites"
                aria-label="Favorite products"
                className="relative hidden sm:flex items-center justify-center rounded-full p-2 text-slate-700 transition hover:bg-slate-100 cursor-pointer"
              >
                <Heart size={20} />
                {favoriteIds.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                    {favoriteIds.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag / Cart */}
              <NavLink
                to="/booking"
                aria-label="Shopping cart"
                className="relative flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 cursor-pointer"
              >
                <ShoppingBag size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white shadow-xs">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>

          {/* Bottom Tier: Foodpanda-style Navigation Tabs & Search Input */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100 pt-1 pb-1 sm:pb-1.5">
            {/* Tabs */}
            <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none py-0.5">
              {mainMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `group flex items-center gap-2 px-2.5 sm:px-3 py-2 text-xs sm:text-sm transition-all whitespace-nowrap border-b-2 font-medium cursor-pointer ${
                        isActive
                          ? "border-emerald-600 text-slate-900 font-bold"
                          : "border-transparent text-slate-600 hover:text-emerald-700 hover:border-slate-200"
                      }`
                    }
                  >
                    <Icon
                      size={18}
                      className="shrink-0 transition-colors"
                    />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Pill Search Bar */}
            <div className="relative pb-1 sm:pb-0 w-full sm:w-72 md:w-80 lg:w-[380px]">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, and dishes"
                className="w-full rounded-full border border-slate-200 bg-slate-50/80 py-2 pl-9.5 pr-4 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-950/45 transition-opacity duration-300 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Drawer Aside */}
      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center"
            aria-label="DALI home"
          >
            <img
              src="/dali-transparent.png"
              alt="DALI"
              className="h-8 w-auto object-contain"
            />
          </NavLink>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Address Banner */}
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700">
            <MapPin size={17} className="text-emerald-700 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">New address</p>
              <p className="text-slate-500 text-[11px]">Select your address</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-4 pb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Navigation
          </p>

          <nav className="space-y-1">{mainMenuItems.map(renderMenuItem)}</nav>

          <div className="my-4 border-t border-slate-100" />

          <p className="px-4 pb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Account
          </p>

          <nav className="space-y-1">
            {accountMenuItems.map(renderMenuItem)}
          </nav>
        </div>

        <div className="border-t border-slate-100 p-4">
          {isAuthenticated && user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-bold text-white uppercase text-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  void logout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 cursor-pointer"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/auth?mode=login"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                <LogIn size={16} />
                Log in
              </Link>
              <Link
                to="/auth?mode=register"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-700"
              >
                Sign up for free delivery
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
