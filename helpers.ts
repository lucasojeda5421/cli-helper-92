import * as crypto from 'crypto';

export class CryptoOptimizer {
  private hashCache: Map<string, string> = new Map();
  private keyCache: Map<string, Buffer> = new Map();

  computeHash(data: string, algorithm: string = 'sha256'): string {
    const cacheKey = `${algorithm}:${data}`;
    if (this.hashCache.has(cacheKey)) {
      return this.hashCache.get(cacheKey)!;
    }
    const hash = crypto.createHash(algorithm).update(data).digest('hex');
    if (this.hashCache.size > 1000) {
      const firstKey = this.hashCache.keys().next().value;
      this.hashCache.delete(firstKey);
    }
    this.hashCache.set(cacheKey, hash);
    return hash;
  }

  deriveKey(password: string, salt: string, iterations: number = 10000): Buffer {
    const cacheKey = `${password}:${salt}:${iterations}`;
    if (this.keyCache.has(cacheKey)) {
      return this.keyCache.get(cacheKey)!;
    }
    const key = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha512');
    if (this.keyCache.size > 100) {
      const firstKey = this.keyCache.keys().next().value;
      this.keyCache.delete(firstKey);
    }
    this.keyCache.set(cacheKey, key);
    return key;
  }

  batchComputeHashes(datas: string[]): string[] {
    return datas.map(data => this.computeHash(data));
  }

  clearCaches(): void {
    this.hashCache.clear();
    this.keyCache.clear();
  }
}