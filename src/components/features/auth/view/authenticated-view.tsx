import { Link } from "react-router";
import { LogOut, ShoppingBag, Store, UserCheck, Utensils } from "lucide-react";
import type { User } from "@/lib/api-types";
import { PandaMascot } from "../ui/auth-mascot";

interface AuthenticatedViewProps {
  user: User;
  onLogout: () => Promise<void>;
}

export function AuthenticatedView({ user, onLogout }: AuthenticatedViewProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 text-center shadow-xl shadow-pink-500/5">
      {/* Top Banner accent */}
      <div className="mx-auto mb-4 flex justify-center">
        <div className="relative">
          <PandaMascot size={88} mood="happy" />
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm ring-2 ring-white">
            <UserCheck size={14} />
          </div>
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D70F64]">
        <span>Panda VIP Member</span>
      </div>

      <h2 className="mt-3 text-xl sm:text-2xl font-black text-slate-900">
        Welcome back, {user.name}!
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-slate-500">
        You are currently signed in with{" "}
        <span className="font-semibold text-slate-800">{user.email}</span>
      </p>

      {/* Account Highlights */}
      <div className="my-6 grid grid-cols-2 gap-3 text-left">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Account Role
          </p>
          <p className="mt-1 text-sm font-bold text-slate-800 capitalize">
            {user.role || "Customer"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Delivery Status
          </p>
          <p className="mt-1 text-sm font-bold text-[#D70F64]">
            Ready to Order
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D70F64] py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-pink-500/20 transition hover:bg-[#C21760] active:scale-[0.99]"
        >
          <Utensils size={16} />
          <span>Explore Restaurants & Food</span>
        </Link>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/stores"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Store size={15} />
            <span>All Stores</span>
          </Link>
          <Link
            to="/booking"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ShoppingBag size={15} />
            <span>View Bag</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => void onLogout()}
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
