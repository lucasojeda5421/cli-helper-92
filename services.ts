import { createHash } from 'crypto';

interface CacheItem<T> {
  value: T;
  expiry: number;
}

export class CryptoServiceCache {
  private cache = new Map<string, CacheItem<any>>();
  private readonly ttl: number;

  constructor(ttlMs: number = 5000) {
    this.ttl = ttlMs;
  }

  private hashKey(data: Record<string, unknown>): string {
    return createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  public get<T>(params: Record<string, unknown>): T | null {
    const key = this.hashKey(params);
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }

  public set<T>(params: Record<string, unknown>, value: T): void {
    const key = this.hashKey(params);
    const expiry = Date.now() + this.ttl;
    this.cache.set(key, { value, expiry });
  }

  public clear(): void {
    this.cache.clear();
  }
}