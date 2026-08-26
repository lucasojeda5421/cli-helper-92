export interface RetryOptions {
  retries?: number;
  delayMs?: number;
  backoffFactor?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const retries = options.retries ?? 3;
  const delayMs = options.delayMs ?? 1000;
  const backoffFactor = options.backoffFactor ?? 2;

  let attempt = 0;
  let currentDelay = delayMs;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw new Error(`Operation failed after ${retries} attempts: ${error instanceof Error ? error.message : String(error)}`);
      }
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }
}

export async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
}