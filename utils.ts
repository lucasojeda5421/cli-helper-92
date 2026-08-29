export interface RetryOptions {
  maxRetries: number;
  delay: number;
  shouldRetry: (error: unknown) => boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const defaults: RetryOptions = {
    maxRetries: 3,
    delay: 1000,
    shouldRetry: () => true
  };
  const opts = { ...defaults, ...options };
  let lastError: unknown;
  for (let i = 0; i <= opts.maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i === opts.maxRetries || !opts.shouldRetry(err)) {
        break;
      }
      const wait = opts.delay * Math.pow(2, i);
      await sleep(wait);
    }
  }
  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}