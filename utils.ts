export interface NetworkOperation<T> {
  (): Promise<T>;
}
export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
}
export async function executeWithRetry<T>(
  operation: NetworkOperation<T>,
  config: RetryConfig = { maxAttempts: 3, baseDelay: 1000 }
): Promise<T> {
  const { maxAttempts, baseDelay } = config;
  let attempt = 0;
  let lastError: unknown;
  while (attempt < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      attempt++;
      if (attempt < maxAttempts) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError as Error;
}
export async function fetchWithRetry<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  return executeWithRetry(async () => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  });
}