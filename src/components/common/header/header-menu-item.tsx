import { NavLink } from "react-router";
import type { ComponentType } from "react";

export type MenuItem = {
  label: string;
  to: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  badge?: "favorites" | "cart";
};

type HeaderMenuItemProps = {
  item: MenuItem;
  badgeCount: number;
  onNavigate: () => void;
  onOpenCart: () => void;
};

export function HeaderMenuItem({
  item,
  badgeCount,
  onNavigate,
  onOpenCart,
}: HeaderMenuItemProps) {
  const Icon = item.icon;

  if (item.badge === "cart") {
    return (
      <button
        type="button"
        onClick={onOpenCart}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-emerald-800"
      >
        <Icon size={18} />
        <span className="flex-1">{item.label}</span>
        {badgeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
            {badgeCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
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
}
