import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import api from "@/lib/axios";
import type { ApiResponse, Cart, CartItem as ApiCartItem } from "@/lib/api-types";

export type Product = {
  id: number;
  name: string;
  unit: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image?: string;
  category?: string;
  description?: string;
  store_id?: number;
};

export type CartItem = Product & {
  quantity: number;
  cart_item_id?: number;
};

type ShopContextValue = {
  cartItems: CartItem[];
  favoriteIds: number[];
  cart: Cart | null;
  isLoadingCart: boolean;
  addToCart: (product: Product, quantity?: number, targetStoreId?: number) => Promise<void>;
  updateCartItemQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  toggleFavorite: (productId: number) => void;
  cartItemCount: number;
  clearCart: () => Promise<void>;
  replaceCartWithProduct: (product: Product, quantity?: number) => Promise<void>;
  refreshCart: () => Promise<Cart | null>;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("dali-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // Debounce timers for quantity updates to prevent request flooding and latency
  const debounceTimersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  // Latest cart items reference to prevent stale closures during debounced requests
  const cartItemsRef = useRef<CartItem[]>(cartItems);
  cartItemsRef.current = cartItems;

  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    try {
      const savedFavorites = localStorage.getItem("dali-favorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("dali-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("dali-favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Convert backend Cart to frontend local items
  const mapApiCartToItems = useCallback((apiCart: Cart | null): CartItem[] => {
    if (!apiCart || !apiCart.items) return [];
    return apiCart.items.map((item: ApiCartItem) => ({
      id: item.product.id,
      name: item.product.name,
      unit: item.product.unit,
      price: Number(item.product.price),
      quantity: item.quantity,
      store_id: apiCart.store?.id,
      cart_item_id: item.id,
    }));
  }, []);

  // Build an optimistic Cart object instantly (0ms delay)
  const buildOptimisticCart = useCallback((items: CartItem[], baseCart: Cart | null): Cart => {
    const subtotalNum = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      id: baseCart?.id ?? null,
      store: baseCart?.store ?? (items[0]?.store_id ? { id: items[0].store_id, name: "Store" } : null),
      subtotal: subtotalNum.toFixed(2),
      items: items.map((i) => ({
        id: i.cart_item_id ?? i.id,
        quantity: i.quantity,
        line_total: (i.price * i.quantity).toFixed(2),
        product: {
          id: i.id,
          name: i.name,
          price: i.price.toFixed(2),
          unit: i.unit,
        },
      })),
    };
  }, []);

  // Fetch cart from backend API
  const refreshCart = useCallback(async (): Promise<Cart | null> => {
    const token = localStorage.getItem("dali-auth-token");
    if (!token) {
      setCart(null);
      return null;
    }

    try {
      setIsLoadingCart(true);
      const res = await api.get<ApiResponse<Cart>>("/cart");
      const loadedCart = res.data.data;
      setCart(loadedCart);
      const mapped = mapApiCartToItems(loadedCart);
      setCartItems(mapped);
      return loadedCart;
    } catch (err) {
      console.warn("Unable to fetch backend cart:", err);
      return null;
    } finally {
      setIsLoadingCart(false);
    }
  }, [mapApiCartToItems]);

  // Initial cart load when token exists
  useEffect(() => {
    const token = localStorage.getItem("dali-auth-token");
    if (token) {
      void refreshCart();
    }
  }, [refreshCart]);

  // Smartly merge backend Cart with current local optimistic cart items
  const syncWithBackendCart = useCallback(
    (apiCart: Cart | null) => {
      if (!apiCart) {
        if (cartItemsRef.current.length === 0) {
          setCart(null);
        }
        return;
      }

      const currentItems = cartItemsRef.current;

      // Detect if the backend contains items that the user already removed locally
      if (apiCart.items) {
        for (const serverItem of apiCart.items) {
          const stillInLocal = currentItems.some(
            (ci) => ci.id === serverItem.product.id
          );
          if (!stillInLocal) {
            // User removed this item while a request was in flight!
            // Clean it up immediately on the backend so it doesn't re-appear
            void api
              .delete(`/cart/items/product/${serverItem.product.id}`)
              .catch(() => {});
          }
        }
      }

      // Preserve local quantity & items, but attach server cart_item_id
      const updatedLocalItems = currentItems.map((localItem) => {
        const matchingServerItem = apiCart.items?.find(
          (si) => si.product.id === localItem.id
        );
        if (matchingServerItem) {
          return {
            ...localItem,
            cart_item_id: matchingServerItem.id,
          };
        }
        return localItem;
      });

      setCartItems(updatedLocalItems);
      cartItemsRef.current = updatedLocalItems;
      setCart(buildOptimisticCart(updatedLocalItems, apiCart));
    },
    [buildOptimisticCart]
  );

  // Optimistic Add to Cart (0ms UI response)
  const addToCart = async (product: Product, quantity: number = 1, targetStoreId?: number) => {
    const token = localStorage.getItem("dali-auth-token");

    // 1. Instantly update UI optimistically
    const currentList = cartItemsRef.current;
    const existingIndex = currentList.findIndex((item) => item.id === product.id);
    let optimisticItems: CartItem[];

    if (existingIndex >= 0) {
      optimisticItems = currentList.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      optimisticItems = [
        ...currentList,
        { ...product, store_id: targetStoreId ?? product.store_id, quantity },
      ];
    }

    setCartItems(optimisticItems);
    cartItemsRef.current = optimisticItems;
    setCart((prev) => buildOptimisticCart(optimisticItems, prev));

    // 2. Synchronize with backend API in the background
    if (token) {
      try {
        const response = await api.post<ApiResponse<Cart>>("/cart/items", {
          product_id: product.id,
          quantity,
        });
        syncWithBackendCart(response.data.data);
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
        if (
          axiosErr.response?.status === 422 &&
          axiosErr.response.data?.message?.includes("one store at a time")
        ) {
          try {
            await api.delete("/cart");
            const response = await api.post<ApiResponse<Cart>>("/cart/items", {
              product_id: product.id,
              quantity,
            });
            syncWithBackendCart(response.data.data);
          } catch (retryErr) {
            console.error("Error retrying add to cart:", retryErr);
          }
        } else {
          console.error("Error adding to backend cart:", err);
        }
      }
    }
  };

  // Optimistic Quantity Update with Debounced Backend Sync (0ms UI response)
  const updateCartItemQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    // 1. Instantly update UI optimistically (0ms)
    const currentList = cartItemsRef.current;
    const optimisticItems = currentList.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(optimisticItems);
    cartItemsRef.current = optimisticItems;
    setCart((prev) => buildOptimisticCart(optimisticItems, prev));

    // 2. Debounce backend sync by 200ms so rapid stepper clicks (+ + +) send only 1 final PATCH
    if (debounceTimersRef.current[productId]) {
      clearTimeout(debounceTimersRef.current[productId]);
    }

    const token = localStorage.getItem("dali-auth-token");
    const targetItem = currentList.find((i) => i.id === productId);

    if (token) {
      debounceTimersRef.current[productId] = setTimeout(async () => {
        try {
          const res = await api.patch<ApiResponse<Cart>>(`/cart/items/product/${productId}`, {
            quantity,
          });
          syncWithBackendCart(res.data.data);
        } catch {
          if (targetItem?.cart_item_id) {
            try {
              const res = await api.patch<ApiResponse<Cart>>(`/cart/items/${targetItem.cart_item_id}`, {
                quantity,
              });
              syncWithBackendCart(res.data.data);
            } catch (err) {
              console.error("Failed to update cart item quantity on backend:", err);
            }
          }
        }
      }, 200);
    }
  };

  // Optimistic Remove From Cart (0ms UI response)
  const removeFromCart = async (productId: number) => {
    // Cancel any pending debounced updates for this product immediately
    if (debounceTimersRef.current[productId]) {
      clearTimeout(debounceTimersRef.current[productId]);
      delete debounceTimersRef.current[productId];
    }

    // 1. Instantly remove from UI (0ms)
    const currentList = cartItemsRef.current;
    const targetItem = currentList.find((i) => i.id === productId);
    const optimisticItems = currentList.filter((item) => item.id !== productId);

    setCartItems(optimisticItems);
    cartItemsRef.current = optimisticItems;
    setCart((prev) => (optimisticItems.length > 0 ? buildOptimisticCart(optimisticItems, prev) : null));

    // 2. Synchronize removal with backend by product endpoint
    const token = localStorage.getItem("dali-auth-token");
    if (token) {
      try {
        const res = await api.delete<ApiResponse<Cart>>(`/cart/items/product/${productId}`);
        syncWithBackendCart(res.data.data);
      } catch {
        if (targetItem?.cart_item_id) {
          try {
            const res = await api.delete<ApiResponse<Cart>>(`/cart/items/${targetItem.cart_item_id}`);
            syncWithBackendCart(res.data.data);
          } catch (err) {
            console.error("Failed to remove item from backend cart:", err);
          }
        }
      }
    }
  };

  // Clear Cart
  const clearCart = async () => {
    // Cancel any pending updates
    Object.values(debounceTimersRef.current).forEach((timer) => clearTimeout(timer));
    debounceTimersRef.current = {};

    cartItemsRef.current = [];
    setCartItems([]);
    setCart(null);
    localStorage.removeItem("dali-cart");

    const token = localStorage.getItem("dali-auth-token");
    if (token) {
      try {
        await api.delete("/cart");
      } catch {
        // Ignore error
      }
    }
  };

  // Replace entire cart with a new product from a new store (0ms instant response)
  const replaceCartWithProduct = async (product: Product, quantity: number = 1) => {
    // Cancel any pending debounced updates
    Object.values(debounceTimersRef.current).forEach((timer) => clearTimeout(timer));
    debounceTimersRef.current = {};

    // 1. Immediately replace UI state with only the new product (0ms)
    const newCartItem: CartItem = {
      ...product,
      quantity,
    };
    cartItemsRef.current = [newCartItem];
    setCartItems([newCartItem]);
    setCart(buildOptimisticCart([newCartItem], null));

    // 2. Clear backend cart and post the new item in background
    const token = localStorage.getItem("dali-auth-token");
    if (token) {
      try {
        await api.delete("/cart");
        const res = await api.post<ApiResponse<Cart>>("/cart/items", {
          product_id: product.id,
          quantity,
        });
        syncWithBackendCart(res.data.data);
      } catch (err) {
        console.error("Failed to replace cart on backend:", err);
      }
    }
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
        cart,
        isLoadingCart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        toggleFavorite,
        cartItemCount,
        clearCart,
        replaceCartWithProduct,
        refreshCart,
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