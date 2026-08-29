export interface NetworkConfig {
  name: string;
  chainId: number;
  rpcUrl: string;
}
export interface TokenInfo {
  symbol: string;
  address: string;
  decimals: number;
}
export type TransactionType = 'transfer' | 'swap';
export interface TransactionRequest {
  type: TransactionType;
  from: string;
  to: string;
  value: bigint;
  gasLimit?: bigint;
}
export interface TransactionReceipt {
  hash: string;
  status: number;
  blockNumber: number;
  gasUsed: bigint;
}
export interface WalletInfo {
  address: string;
  balance: bigint;
  tokens: Array<{symbol: string, balance: bigint}>;
}
export interface CryptoConfig {
  network: NetworkConfig;
  apiKey: string;
}
export type ErrorCode = 'INVALID_ADDRESS' | 'INSUFFICIENT_FUNDS' | 'NETWORK_ERROR';
export interface AppError {
  code: ErrorCode;
  message: string;
}
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
export function toBigInt(value: string | number): bigint {
  return BigInt(value);
}
export class CryptoService {
  constructor(private config: CryptoConfig) {}
  validateAddress(addr: string): boolean {
    return isValidAddress(addr);
  }
  async getBalance(address: string): Promise<bigint> {
    if (!this.validateAddress(address)) {
      throw {code: 'INVALID_ADDRESS', message: 'Invalid address'} as AppError;
    }
    return BigInt(0);
  }
  createTx(type: TransactionType, from: string, to: string, value: bigint): TransactionRequest {
    return {type, from, to, value};
  }
}