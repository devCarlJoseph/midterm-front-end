import { NavLink } from "react-router";
import { Home, Search, Store } from "lucide-react";

import type { MenuItem } from "./header-menu-item";

const mainMenuItems: MenuItem[] = [
  {
    label: "Home",
    to: "/",
    icon: Home,
  },
  {
    label: "Stores",
    to: "/stores",
    icon: Store,
  },
];

export function HeaderNavBar() {
  return (
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
  );
}
