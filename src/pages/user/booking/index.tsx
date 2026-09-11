import { useEffect, useState } from "react";

import { BookingBanner } from "@/components/features/users/booking-delivery/view/booking-banner";
import { BookingLayout } from "@/components/features/users/booking-delivery/view/booking-layout";
import { BookingAuthPrompt } from "@/components/features/users/booking-delivery/ui/booking-auth-prompt";
import { BookingErrorState } from "@/components/features/users/booking-delivery/ui/booking-error-state";
import { LoadingScreen } from "@/components/common/loading-screen";
import { useAuth } from "@/context/auth-context";
import { useShop } from "@/context/shop-context";
import type { Cart } from "@/lib/api-types";

export default function BookingPage() {
  const { isAuthenticated, isLoading: authLoading, openAuthModal } = useAuth();
  const { cart: contextCart, refreshCart } = useShop();
  const [fetchedCart, setFetchedCart] = useState<Cart | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const cart = contextCart ?? fetchedCart;

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
        setFetchedCart(loaded);
      } catch (err) {
        console.error("Unable to load cart:", err);
        setError("Sign in as a customer to load your cart and place an order.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCartData();
  }, [authLoading, refreshCart]);

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
        <BookingAuthPrompt onSignIn={() => openAuthModal("login")} />
      ) : error ? (
        <BookingErrorState error={error} onRetry={() => void refreshCart()} />
      ) : (
        <BookingLayout cart={cart} />
      )}
    </div>
  );
}
