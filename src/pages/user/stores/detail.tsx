import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
  Bike,
  Star,
  Package,
} from "lucide-react";

import api from "@/lib/axios";
import type {
  ApiResponse,
  PaginatedResponse,
  Store,
  ProductItem,
} from "@/lib/api-types";
import { useShop, type Product } from "@/context/shop-context";
import { LoadingScreen } from "@/components/common/loading-screen";
import { ReplaceCartModal } from "@/components/common/replace-cart-modal";
import { getCached, setCached } from "@/lib/api-cache";

/*
|--------------------------------------------------------------------------
| PRODUCT IMAGE HELPER
|--------------------------------------------------------------------------
*/

function getProductImage(name: string, categorySlug?: string): string {
  const n = name.toLowerCase();
  const c = (categorySlug ?? "").toLowerCase();

  if (c.includes("meat") || n.includes("pork") || n.includes("chicken") || n.includes("beef") || n.includes("hotdog") || n.includes("chorizo") || n.includes("corned") || n.includes("luncheon")) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80";
  }
  if (c.includes("fruit") || c.includes("veg") || n.includes("banana") || n.includes("mango") || n.includes("apple") || n.includes("tomato") || n.includes("onion") || n.includes("potato")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";
  }
  if (c.includes("dairy") || n.includes("milk") || n.includes("egg") || n.includes("cheese") || n.includes("yogurt") || n.includes("butter")) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=400&q=80";
  }
  if (c.includes("bake") || n.includes("bread") || n.includes("pastry") || n.includes("cake") || n.includes("cookie") || n.includes("pan")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80";
  }
  if (c.includes("snack") || n.includes("chips") || n.includes("candy") || n.includes("chocolate") || n.includes("biscuit")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=400&q=80";
  }
  if (c.includes("beverage") || c.includes("spirit") || n.includes("juice") || n.includes("soda") || n.includes("beer") || n.includes("wine") || n.includes("water")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80";
  }
  if (n.includes("rice") || n.includes("noodle") || n.includes("pasta") || n.includes("sugar") || n.includes("salt") || n.includes("oil") || n.includes("sauce") || n.includes("vinegar")) {
    return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80";
  }
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80";
}

function getStoreImage(name: string, description: string): string {
  const n = name.toLowerCase();
  const d = description.toLowerCase();

  if (d.includes("meat") || d.includes("fish") || n.includes("meat") || n.includes("fish") || n.includes("seafood")) {
    return "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("fruit") || d.includes("vegetable") || n.includes("fruit") || n.includes("vegi")) {
    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("dairy") || d.includes("milk") || d.includes("egg") || n.includes("dairy") || n.includes("milk")) {
    return "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("bake") || d.includes("pastr") || n.includes("bake")) {
    return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("snack") || n.includes("snack") || n.includes("sweet")) {
    return "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=900&q=80";
  }
  if (d.includes("spirit") || d.includes("beverage") || d.includes("wine") || d.includes("beer") || n.includes("spirit")) {
    return "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80";
  }
  return "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=900&q=80";
}

/*
|--------------------------------------------------------------------------
| STORE DETAIL PAGE
|--------------------------------------------------------------------------
*/

export default function StoreDetailPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const navigate = useNavigate();
  const {
    cartItems,
    cart,
    addToCart,
    updateCartItemQuantity,
    cartItemCount,
    replaceCartWithProduct,
  } = useShop();

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingProduct, setPendingProduct] = useState<ProductItem | null>(null);
  const [showReplaceCartModal, setShowReplaceCartModal] = useState(false);

  useEffect(() => {
    if (!storeId) return;

    const cachedStore = getCached<Store>(`store_${storeId}`);
    const cachedProducts = getCached<ProductItem[]>(`store_products_${storeId}`);
    if (cachedStore && cachedProducts) {
      setStore(cachedStore);
      setProducts(cachedProducts);
      setLoading(false);
    }

    async function fetchStoreData(): Promise<void> {
      if (!cachedStore || !cachedProducts) {
        setLoading(true);
      }
      setError(null);

      try {
        const [storeRes, productsRes] = await Promise.all([
          api.get<ApiResponse<Store>>(`/stores/${storeId}`),
          api.get<PaginatedResponse<ProductItem>>(
            `/stores/${storeId}/products?per_page=50`,
          ),
        ]);

        setStore(storeRes.data.data);
        setProducts(productsRes.data.data);
        setCached(`store_${storeId}`, storeRes.data.data);
        setCached(`store_products_${storeId}`, productsRes.data.data);
      } catch (err) {
        console.error("Failed to load store:", err);
        if (!cachedStore) {
          setError("Unable to load store details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    void fetchStoreData();
  }, [storeId]);

  const handleAddToCart = (product: ProductItem): void => {
    // Check if cart has items from a different store
    const currentCartStoreId = cartItems.length > 0 ? cartItems[0].store_id : undefined;
    if (currentCartStoreId && currentCartStoreId !== store?.id) {
      setPendingProduct(product);
      setShowReplaceCartModal(true);
      return;
    }

    const shopProduct: Product = {
      id: product.id,
      name: product.name,
      unit: product.unit,
      price: Number(product.price),
      description: product.description ?? undefined,
      store_id: store?.id,
      image: getProductImage(product.name, product.category?.slug),
    };

    void addToCart(shopProduct, 1);
  };

  const handleConfirmReplaceCart = (): void => {
    if (!pendingProduct || !store) return;
    const targetProduct = pendingProduct;

    // 1. Instantly remove modal from screen (0ms)
    setShowReplaceCartModal(false);
    setPendingProduct(null);

    // 2. Instantly replace cart with the new store's product (0ms)
    const shopProduct: Product = {
      id: targetProduct.id,
      name: targetProduct.name,
      unit: targetProduct.unit,
      price: Number(targetProduct.price),
      description: targetProduct.description ?? undefined,
      store_id: store.id,
      image: getProductImage(targetProduct.name, targetProduct.category?.slug),
    };

    void replaceCartWithProduct(shopProduct, 1);
  };

  const getCartQuantity = (productId: number): number => {
    const item = cartItems.find((ci) => ci.id === productId);
    return item?.quantity ?? 0;
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  /*
  |--------------------------------------------------------------------------
  | LOADING STATE
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <LoadingScreen
        fullScreen
        message="Loading store details..."
        subMessage="Preparing products and catalog"
      />
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR STATE
  |--------------------------------------------------------------------------
  */

  if (error || !store) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <Package size={40} className="mx-auto mb-3 text-gray-300" />
          <h2 className="text-lg font-bold text-gray-700">Store not found</h2>
          <p className="mt-1 text-sm text-gray-400">
            {error ?? "The store you're looking for doesn't exist."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/stores")}
            className="mt-4 rounded-lg bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800"
          >
            Back to Stores
          </button>
        </div>
      </div>
    );
  }

  const storeImage = getStoreImage(store.name, store.description);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* ================================================================
          STORE HERO BANNER
      ================================================================ */}

      <div className="relative h-[200px] w-full overflow-hidden bg-gray-200 sm:h-[240px]">
        <img
          src={storeImage}
          alt={store.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/stores")}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm transition hover:bg-white"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Store Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <h1 className="text-xl font-bold text-white sm:text-2xl">
            {store.name}
          </h1>
          <p className="mt-1 text-sm text-white/80">{store.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-white/80">
              <MapPin size={12} />
              {store.address}
            </span>
            <span className="flex items-center gap-1 text-xs text-white/80">
              <Star size={12} fill="#FBBF24" className="text-yellow-400" />
              4.5
            </span>
            <span className="flex items-center gap-1 text-xs text-white/80">
              <Bike size={12} />
              Delivery
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================
          PRODUCTS GRID
      ================================================================ */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-700">
            Products ({products.length})
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Browse and add items to your cart
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
            <Package size={35} className="mx-auto mb-3 text-gray-300" />
            <h3 className="text-sm font-semibold text-gray-600">
              No products available
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              This store doesn't have any products yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => {
              const qty = getCartQuantity(product.id);

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="relative h-[130px] overflow-hidden bg-[#eef8f3]">
                    <img
                      src={getProductImage(
                        product.name,
                        product.category?.slug,
                      )}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.category && (
                      <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h3 className="truncate text-[13px] font-semibold text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-gray-400">
                      per {product.unit}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-700">
                        ₱{Number(product.price).toFixed(2)}
                      </span>

                      {qty > 0 ? (
                        <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() => void updateCartItemQuantity(product.id, qty - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-emerald-700 hover:bg-emerald-200/60 transition"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="min-w-4 text-center text-xs font-bold text-emerald-800">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => void updateCartItemQuantity(product.id, qty + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700"
                        >
                          <Plus size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================================================================
          BOTTOM CART BAR (Grab-like)
      ================================================================ */}

      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-emerald-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            {/* Left: Cart info */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <ShoppingCart size={18} />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">
                  {cartItemCount} {cartItemCount === 1 ? "item" : "items"} in
                  cart
                </p>
                <p className="text-sm font-bold text-emerald-700">
                  ₱{cartSubtotal.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Right: Book Delivery Button */}
            <button
              type="button"
              onClick={() => navigate("/booking")}
              className="flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <Bike size={16} />
              Book Delivery
            </button>
          </div>
        </div>
      )}

      {/* Grab-like Replace Cart Warning Modal */}
      <ReplaceCartModal
        isOpen={showReplaceCartModal}
        currentStoreName={cart?.store?.name || "your previous store"}
        newStoreName={store?.name || "this store"}
        pendingProductName={pendingProduct?.name}
        itemCount={cartItemCount}
        onConfirm={handleConfirmReplaceCart}
        onCancel={() => {
          setShowReplaceCartModal(false);
          setPendingProduct(null);
        }}
      />
    </div>
  );
}
