import { useEffect, useState } from "react";
import { LogIn, ShoppingBag } from "lucide-react";

import { BookingBanner } from "@/components/features/users/booking-delivery/booking-banner";
import { BookingLayout } from "@/components/features/users/booking-delivery/booking-layout";
import { LoadingScreen } from "@/components/common/loading-screen";
import { useAuth } from "@/context/auth-context";
import { useShop } from "@/context/shop-context";
import type { Cart } from "@/lib/api-types";

export default function BookingPage() {
  const { isAuthenticated, isLoading: authLoading, openAuthModal } = useAuth();
  const { cart: contextCart, refreshCart } = useShop();
  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCartData(): Promise<void> {
      if (authLoading) return;

      const token = localStorage.getItem("dali-auth-token");
      if (!token) {
        setIsLoading(false);
        setError("Sign in as a customer to review your cart and book delivery.");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const loaded = await refreshCart();
        setCart(loaded);
      } catch (err) {
        console.error("Unable to load cart:", err);
        setError("Sign in as a customer to load your cart and place an order.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCartData();
  }, [authLoading, refreshCart]);

  // Keep synced with context updates (e.g. quantity updates or item removals)
  useEffect(() => {
    if (contextCart) {
      setCart(contextCart);
    }
  }, [contextCart]);

  return (
    <div className="min-h-screen bg-white">
      <BookingBanner />

      {authLoading || isLoading ? (
        <LoadingScreen
          fullScreen
          message="Preparing your delivery booking..."
          subMessage="Fetching your items, store prices, and address details"
        />
      ) : !isAuthenticated ? (
        <div className="mx-auto max-w-lg px-4 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <ShoppingBag size={28} />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-800">
            Sign in to Book Delivery
          </h2>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed">
            Please sign in with your customer account to connect your live cart items,
            calculate delivery fees, and choose your delivery address just like Grab.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              <LogIn size={15} />
              Sign In to Proceed
            </button>
          </div>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-md px-4 py-12 text-center">
          <p className="text-sm font-medium text-red-600">{error}</p>
          <button
            type="button"
            onClick={() => void refreshCart()}
            className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
          >
            Retry
          </button>
        </div>
      ) : (
        <BookingLayout cart={cart} />
      )}
    </div>
  );
}
