export class CryptoError extends Error {
  constructor(public message: string, public code: string, public status?: number) {
    super(message);
    this.name = 'CryptoError';
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof CryptoError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new CryptoError(error.message, 'INTERNAL_SERVER_ERROR', 500);
  }

  throw new CryptoError('An unknown error occurred', 'UNKNOWN_ERROR', 500);
};

export const validateAddress = (address: string): void => {
  if (!address.startsWith('0x') || address.length !== 42) {
    throw new CryptoError('Invalid wallet address format', 'INVALID_ADDRESS', 400);
  }
};

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    return handleApiError(error);
  }
};