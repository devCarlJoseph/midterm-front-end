import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "dali-favorite-stores";
const EVENT_NAME = "dali-favorite-stores-updated";

export function useFavoriteStores() {
  const [favoriteStoreIds, setFavoriteStoreIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setFavoriteStoreIds(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener(EVENT_NAME, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(EVENT_NAME, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleFavoriteStore = useCallback((storeId: number) => {
    setFavoriteStoreIds((prev) => {
      const next = prev.includes(storeId)
        ? prev.filter((id) => id !== storeId)
        : [...prev, storeId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isStoreFavorite = useCallback(
    (storeId: number) => favoriteStoreIds.includes(storeId),
    [favoriteStoreIds]
  );

  return { favoriteStoreIds, toggleFavoriteStore, isStoreFavorite };
}
