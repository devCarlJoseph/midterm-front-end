import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Package } from "lucide-react";

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

import { getProductImage, getStoreImage } from "../contents/store-images";
import { StoreHeroBanner } from "../ui/store-hero-banner";
import { StoreProductsGrid } from "../ui/store-products-grid";

interface StoreDetailViewProps {
  storeId?: string;
}

export function StoreDetailView({ storeId: propStoreId }: StoreDetailViewProps) {
  const { storeId: paramStoreId } = useParams<{ storeId: string }>();
  const storeId = propStoreId ?? paramStoreId;
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

    setShowReplaceCartModal(false);
    setPendingProduct(null);

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

  const handleUpdateQuantity = (productId: number, newQty: number): void => {
    void updateCartItemQuantity(productId, newQty);
  };

  if (loading) {
    return (
      <LoadingScreen
        fullScreen
        message="Loading store details..."
        subMessage="Preparing products and catalog"
      />
    );
  }

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
            className="mt-4 rounded-lg bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-800 cursor-pointer"
          >
            Back to Stores
          </button>
        </div>
      </div>
    );
  }

  const storeImage = getStoreImage(store.name, store.description);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Store Hero Banner */}
      <StoreHeroBanner
        store={store}
        storeImage={storeImage}
        onBack={() => navigate("/stores")}
      />

      {/* Products Grid */}
      <StoreProductsGrid
        products={products}
        getCartQuantity={getCartQuantity}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

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
