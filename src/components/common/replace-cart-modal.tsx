import React from "react";
import { AlertTriangle, ShoppingBag, X, Store, ArrowRight } from "lucide-react";

interface ReplaceCartModalProps {
  isOpen: boolean;
  currentStoreName?: string;
  newStoreName: string;
  pendingProductName?: string;
  itemCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ReplaceCartModal: React.FC<ReplaceCartModalProps> = ({
  isOpen,
  currentStoreName = "another store",
  newStoreName,
  pendingProductName,
  itemCount,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X size={18} />
        </button>

        {/* Header with Warning Icon */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-xs">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Create new order?
            </h3>
            <p className="text-xs text-amber-700 font-medium">
              Single-store delivery policy (Like Grab)
            </p>
          </div>
        </div>

        {/* Details Card */}
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs text-slate-600 space-y-2">
          <div className="flex items-center justify-between font-medium text-slate-700 pb-2 border-b border-slate-200">
            <span className="flex items-center gap-1.5 text-slate-500">
              <ShoppingBag size={14} /> Current Cart:
            </span>
            <span className="font-semibold text-slate-900 truncate max-w-[200px]">
              {currentStoreName} ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </div>

          <p className="leading-relaxed">
            Your cart already contains items from{" "}
            <strong className="text-slate-800 font-semibold">
              {currentStoreName}
            </strong>
            . Adding{" "}
            {pendingProductName ? (
              <strong className="text-emerald-800 font-semibold">
                “{pendingProductName}”
              </strong>
            ) : (
              "items"
            )}{" "}
            will clear your current items and start a new delivery order with{" "}
            <strong className="text-emerald-800 font-semibold">
              {newStoreName}
            </strong>
            .
          </p>
        </div>

        {/* Grab-like Logistics Notice */}
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50/80 border border-emerald-100 p-2.5 text-[11px] text-emerald-800">
          <Store size={14} className="shrink-0 mt-0.5 text-emerald-600" />
          <span>
            A single rider is dispatched to pick up from one physical store at a time for fresh, direct delivery.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Keep Current Cart
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 py-2.5 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
          >
            <span>Replace Cart</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
