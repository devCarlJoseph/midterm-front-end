import { Link } from "react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import type { CartItem } from "@/context/shop-context";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartItemCount: number;
  cartSubtotal: number;
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>;
};

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  cartItemCount,
  cartSubtotal,
  onUpdateQuantity,
}: CartDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-slate-950/35 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[51] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[28rem] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-lg font-bold text-slate-900">Your cart</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {cartItemCount === 0 ? "Add items to get started" : `${cartItemCount} ${cartItemCount === 1 ? "item" : "items"} in your cart`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={21} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <ShoppingBag size={28} />
            </div>
            <h2 className="mt-5 text-base font-bold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">Browse our stores and add the groceries you need.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-6">
              {cartItems.map((item) => (
                <article key={item.id} className="flex gap-3 border-b border-slate-100 py-4">
                  {item.image ? (
                    <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-700">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold text-slate-800">{item.name}</h2>
                    <p className="mt-0.5 text-xs text-slate-500">₱ {item.price.toFixed(2)} / {item.unit}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
                        <button type="button" onClick={() => void onUpdateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`} className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-200">
                          {item.quantity === 1 ? <Trash2 size={14} className="text-red-500" /> : <Minus size={14} />}
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button type="button" onClick={() => void onUpdateQuantity(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`} className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-200">
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-slate-900">₱ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="border-t border-slate-200 bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-900">₱ {cartSubtotal.toFixed(2)}</span>
              </div>
              <Link to="/booking" onClick={onClose} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600">
                Review order
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
