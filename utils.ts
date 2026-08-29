import { createHash } from 'crypto';
interface CacheEntry { value: string; timestamp: number; }
export class CryptoCache {
  private cache: Map<string, CacheEntry> = new Map();
  private maxSize: number = 1000;
  private ttl: number = 60000;
  private getKey(type: string, input: string): string { return `${type}:${input}`; }
  private isValid(entry: CacheEntry): boolean { return Date.now() - entry.timestamp < this.ttl; }
  private evict(): void {
    if (this.cache.size <= this.maxSize) return;
    const sorted = Array.from(this.cache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
    const removeCount = this.cache.size - this.maxSize + 10;
    for (let i = 0; i < removeCount && i < sorted.length; i++) {
      this.cache.delete(sorted[i][0]);
    }
  }
  hash(input: string): string {
    const key = this.getKey('hash', input);
    const entry = this.cache.get(key);
    if (entry && this.isValid(entry)) return entry.value;
    const result = createHash('sha256').update(input).digest('hex');
    this.evict();
    this.cache.set(key, { value: result, timestamp: Date.now() });
    return result;
  }
  deriveKey(input: string): string {
    const key = this.getKey('key', input);
    const entry = this.cache.get(key);
    if (entry && this.isValid(entry)) return entry.value;
    const hash1 = createHash('sha256').update(input).digest();
    const hash2 = createHash('sha256').update(hash1).digest('hex');
    this.evict();
    this.cache.set(key, { value: hash2, timestamp: Date.now() });
    return hash2;
  }
  clear(): void { this.cache.clear(); }
}