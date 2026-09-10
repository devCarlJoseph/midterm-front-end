import { useEffect, useState, type ComponentType } from "react";
import { Link, NavLink } from "react-router";
import {
  Heart,
  Home,
  LogIn,
  LogOut,
  MapPin,
  Menu,
  PackageCheck,
  Search,
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
              ? "bg-emerald-50 text-emerald-800"
              : "text-slate-600 hover:bg-slate-100 hover:text-emerald-800"
          }`
        }
      >
        <Icon size={18} />

        <span className="flex-1">{item.label}</span>

        {badgeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
            {badgeCount}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation menu"
                onClick={() => setIsMenuOpen(true)}
                className="rounded-full p-2 text-emerald-700 transition hover:bg-emerald-50"
              >
                <Menu size={22} />
              </button>

              <NavLink
                to="/"
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
                aria-label="Choose delivery location"
                className="hidden items-center justify-center rounded-full bg-slate-100 p-2 text-slate-700 sm:flex"
              >
                <MapPin size={16} />
              </button>
            </div>

            <div className="hidden w-full max-w-2xl overflow-hidden rounded-full border-2 border-slate-200 bg-white md:flex">
              <input
                type="text"
                placeholder="Search products and stores..."
                className="flex-1 px-5 py-2.5 text-sm outline-none"
              />

              <button
                type="button"
                className="flex items-center gap-2 bg-emerald-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-900"
              >
                <Search size={16} />
                Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Favorite products"
                className="relative flex items-center justify-center rounded-full border border-emerald-300 bg-white p-2 text-emerald-700 transition hover:bg-emerald-50"
              >
                <Heart size={17} />

                {favoriteIds.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                    {favoriteIds.length}
                  </span>
                )}
              </button>

              <NavLink
                to="/booking"
                aria-label="Shopping cart"
                className="relative flex items-center justify-center rounded-full border border-emerald-300 bg-white p-2 text-emerald-700 transition hover:bg-emerald-50"
              >
                <ShoppingCart size={17} />

                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>

              {isAuthenticated && user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs text-emerald-900">
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
                <Link
                  to="/auth"
                  className="hidden rounded-full bg-emerald-700 px-5 py-2 text-xs font-medium text-white transition hover:bg-emerald-800 sm:block"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-950/45 transition-opacity duration-300 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center"
            aria-label="DALI home"
          >
            <img
              src="/dali-transparent.png"
              alt="DALI"
              className="h-9 w-auto object-contain"
            />
          </NavLink>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-4 pb-2 text-xs font-bold tracking-wider text-slate-400">
            MENU
          </p>

          <nav className="space-y-1">{mainMenuItems.map(renderMenuItem)}</nav>

          <div className="my-5 border-t border-slate-100" />

          <p className="px-4 pb-2 text-xs font-bold tracking-wider text-slate-400">
            ACCOUNT
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
            <Link
              to="/auth"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <LogIn size={17} />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
