/**
 * Lightweight in-memory client-side cache for API responses.
 * Provides instant page navigation (0ms) and prevents redundant full-screen loading screens.
 */

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();
const STORAGE_PREFIX = "dali-api-cache:";

function readSessionCache<T>(key: string, maxAgeMs: number): T | null {
  try {
    const rawEntry = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!rawEntry) return null;

    const entry = JSON.parse(rawEntry) as CacheEntry<T>;
    if (Date.now() - entry.timestamp > maxAgeMs) {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return null;
    }

    memoryCache.set(key, entry);
    return entry.data;
  } catch {
    return null;
  }
}

/**
 * Retrieve cached data if present and younger than maxAgeMs (default 5 minutes).
 */
export function getCached<T>(key: string, maxAgeMs: number = 5 * 60 * 1000): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return readSessionCache<T>(key, maxAgeMs);

  if (Date.now() - entry.timestamp > maxAgeMs) {
    memoryCache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Store data in the client cache with current timestamp.
 */
export function setCached<T>(key: string, data: T): void {
  const entry = { data, timestamp: Date.now() };
  memoryCache.set(key, entry);

  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // Keep the in-memory cache when browser storage is unavailable or full.
  }
}

/**
 * Invalidate a specific cache key.
 */
export function invalidateCacheKey(key: string): void {
  memoryCache.delete(key);
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    // Ignore unavailable browser storage.
  }
}

/**
 * Invalidate all cache entries that start with a prefix.
 */
export function invalidateCachePrefix(prefix: string): void {
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }

  try {
    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const storageKey = sessionStorage.key(index);
      if (storageKey?.startsWith(`${STORAGE_PREFIX}${prefix}`)) {
        sessionStorage.removeItem(storageKey);
      }
    }
  } catch {
    // Ignore unavailable browser storage.
  }
}

/**
 * Clear the entire memory cache.
 */
export function clearAllCache(): void {
  memoryCache.clear();
  try {
    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const storageKey = sessionStorage.key(index);
      if (storageKey?.startsWith(STORAGE_PREFIX)) sessionStorage.removeItem(storageKey);
    }
  } catch {
    // Ignore unavailable browser storage.
  }
}
