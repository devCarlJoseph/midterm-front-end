import { useEffect, useMemo, useState } from "react";

import { useShop } from "@/context/shop-context";
import { useAuth } from "@/context/auth-context";

import { HeaderTopBar } from "./header/header-top-bar";
import { HeaderNavBar } from "./header/header-nav-bar";
import { MobileDrawer } from "./header/mobile-drawer";
import { CartDrawer } from "./header/cart-drawer";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cartItems,
    cartItemCount,
    favoriteIds,
    updateCartItemQuantity,
  } = useShop();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

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
        setIsCartOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isCartOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isCartOpen]);

  const cartSubtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const openCart = () => {
    setIsMenuOpen(false);
    setIsCartOpen(true);
  };

  const handleLogout = () => void logout();

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
          isScrolled ? "shadow-sm border-b border-slate-200" : "border-b border-slate-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeaderTopBar
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenCart={openCart}
            cartItemCount={cartItemCount}
            favoriteCount={favoriteIds.length}
            user={user}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onOpenAuthModal={openAuthModal}
            isCartOpen={isCartOpen}
          />

          <HeaderNavBar />
        </div>
      </header>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenCart={openCart}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onOpenAuthModal={openAuthModal}
        favoriteCount={favoriteIds.length}
        cartItemCount={cartItemCount}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartItemCount={cartItemCount}
        cartSubtotal={cartSubtotal}
        onUpdateQuantity={updateCartItemQuantity}
      />
    </>
  );
}
