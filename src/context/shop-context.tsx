import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Product = {
  id: number;
  name: string;
  unit: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  category: string;
};

type CartItem = Product & {
  quantity: number;
};

type ShopContextValue = {
  cartItems: CartItem[];
  favoriteIds: number[];
  addToCart: (product: Product) => void;
  toggleFavorite: (productId: number) => void;
  cartItemCount: number;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("dali-cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem("dali-favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("dali-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("dali-favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: number) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  };

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        favoriteIds,
        addToCart,
        toggleFavorite,
        cartItemCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider.");
  }

  return context;
}