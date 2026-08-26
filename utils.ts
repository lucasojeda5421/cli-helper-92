import { createHash } from 'crypto';

interface CacheItem<T> {
  value: T;
  expiresAt: number;
}

export class MemCache<T> {
  private store = new Map<string, CacheItem<T>>();
  private maxAgeMs: number;

  constructor(maxAgeMs: number = 5000) {
    this.maxAgeMs = maxAgeMs;
  }

  private hashKey(input: string): string {
    return createHash('sha256').update(input).digest('hex');
  }

  public get(key: string): T | undefined {
    const hashed = this.hashKey(key);
    const item = this.store.get(hashed);
    
    if (!item) return undefined;
    
    if (Date.now() > item.expiresAt) {
      this.store.delete(hashed);
      return undefined;
    }
    
    return item.value;
  }

  public set(key: string, value: T): void {
    const hashed = this.hashKey(key);
    const expiresAt = Date.now() + this.maxAgeMs;
    this.store.set(hashed, { value, expiresAt });
  }

  public clear(): void {
    this.store.clear();
  }
}

export function memoizeAsync<T>(fn: (arg: string) => Promise<T>, cache: MemCache<T>): (arg: string) => Promise<T> {
  return async (arg: string): Promise<T> => {
    const cached = cache.get(arg);
    if (cached !== undefined) {
      return cached;
    }
    const result = await fn(arg);
    cache.set(arg, result);
    return result;
  };
}