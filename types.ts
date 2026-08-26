export type NetworkType = 'mainnet' | 'testnet' | 'devnet';

export interface WalletConfig {
  readonly address: string;
  readonly derivationPath: string;
  network: NetworkType;
}

export interface TransactionPayload {
  readonly recipient: string;
  readonly amount: bigint;
  readonly fee: bigint;
  memo?: string;
}

export interface SignedTransaction extends TransactionPayload {
  readonly signature: string;
  readonly txHash: string;
  readonly timestamp: number;
}

export type GasEstimate = {
  limit: bigint;
  price: bigint;
};

/**
 * Validates a cryptographic address format.
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Converts atomic units to standard coin representation.
 */
export function formatUnits(amount: bigint, decimals: number = 18): string {
  const divisor = 10n ** BigInt(decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;
  return `${integerPart}.${fractionalPart.toString().padStart(decimals, '0')}`;
}