import { LRUCache } from 'lru-cache';

interface CryptoConfig {
  cacheSize: number;
  refreshInterval: number;
  endpoints: string[];
}

export const config: CryptoConfig = {
  cacheSize: 500,
  refreshInterval: 60000,
  endpoints: ['https://api.crypto.com/v1', 'https://api.exchange.net/v2']
};

export const responseCache = new LRUCache<string, any>({
  max: config.cacheSize,
  ttl: config.refreshInterval,
  updateAgeOnGet: true
});

export const getCachedData = async <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
  const cached = responseCache.get(key);
  if (cached) return cached as T;
  
  const fresh = await fetcher();
  responseCache.set(key, fresh);
  return fresh;
};

export const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new Map<string, ReturnType<T>>();
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};