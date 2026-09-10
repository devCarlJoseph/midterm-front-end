/**
 * Lightweight in-memory client-side cache for API responses.
 * Provides instant page navigation (0ms) and prevents redundant full-screen loading screens.
 */

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

/**
 * Retrieve cached data if present and younger than maxAgeMs (default 5 minutes).
 */
export function getCached<T>(key: string, maxAgeMs: number = 5 * 60 * 1000): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;

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
  memoryCache.set(key, { data, timestamp: Date.now() });
}

/**
 * Invalidate a specific cache key.
 */
export function invalidateCacheKey(key: string): void {
  memoryCache.delete(key);
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
}

/**
 * Clear the entire memory cache.
 */
export function clearAllCache(): void {
  memoryCache.clear();
}
