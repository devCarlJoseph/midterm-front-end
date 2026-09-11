import { NavLink } from "react-router";
import {
  Heart,
  Home,
  LogIn,
  LogOut,
  MapPin,
  PackageCheck,
  ShoppingCart,
  Store,
  UserRound,
  X,
} from "lucide-react";

import { HeaderMenuItem, type MenuItem } from "./header-menu-item";

const mainMenuItems: MenuItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Stores", to: "/stores", icon: Store },
];

const accountMenuItems: MenuItem[] = [
  { label: "Favorites", to: "/favorites", icon: Heart, badge: "favorites" },
  { label: "Cart", to: "/cart", icon: ShoppingCart, badge: "cart" },
  { label: "My Orders", to: "/orders", icon: PackageCheck },
  { label: "My Profile", to: "/profile", icon: UserRound },
];

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  user: { name: string; email: string } | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  onOpenAuthModal: (mode: "login" | "register") => void;
  favoriteCount: number;
  cartItemCount: number;
};

export function MobileDrawer({
  isOpen,
  onClose,
  onOpenCart,
  user,
  isAuthenticated,
  onLogout,
  onOpenAuthModal,
  favoriteCount,
  cartItemCount,
}: MobileDrawerProps) {
  const getBadgeCount = (badge?: MenuItem["badge"]) => {
    if (badge === "favorites") return favoriteCount;
    if (badge === "cart") return cartItemCount;
    return 0;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-950/45 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,calc(100vw-1.25rem))] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <NavLink
            to="/"
            onClick={onClose}
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
            onClick={onClose}
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

          <nav className="space-y-1">
            {mainMenuItems.map((item) => (
              <HeaderMenuItem
                key={item.label}
                item={item}
                badgeCount={getBadgeCount(item.badge)}
                onNavigate={onClose}
                onOpenCart={onOpenCart}
              />
            ))}
          </nav>

          <div className="my-4 border-t border-slate-100" />

          <p className="px-4 pb-2 text-xs font-bold tracking-wider text-slate-400 uppercase">
            Account
          </p>

          <nav className="space-y-1">
            {accountMenuItems.map((item) => (
              <HeaderMenuItem
                key={item.label}
                item={item}
                badgeCount={getBadgeCount(item.badge)}
                onNavigate={onClose}
                onOpenCart={onOpenCart}
              />
            ))}
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
                  onClose();
                  onLogout();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 cursor-pointer"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthModal("login");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 cursor-pointer"
              >
                <LogIn size={16} />
                Log in
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthModal("register");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-[#C21760] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition cursor-pointer"
              >
                Sign up for free delivery
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
