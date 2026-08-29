export type Address = string;
export interface CryptoTransaction {
  from: Address;
  to: Address;
  amount: bigint;
  gasLimit?: number;
}

export class CryptoError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidAddressError extends CryptoError {
  constructor(address: string) {
    super('INVALID_ADDRESS', `Invalid address: ${address}`);
  }
}

export class InvalidAmountError extends CryptoError {
  constructor(amount: bigint) {
    super('INVALID_AMOUNT', `Invalid amount: ${amount}`);
  }
}

export class InsufficientBalanceError extends CryptoError {
  constructor(balance: bigint, amount: bigint) {
    super('INSUFFICIENT_BALANCE', `Insufficient balance: ${balance}, required: ${amount}`);
  }
}

export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

export function validateTransaction(tx: CryptoTransaction, balance: bigint): void {
  if (!isValidAddress(tx.from)) {
    throw new InvalidAddressError(tx.from);
  }
  if (!isValidAddress(tx.to)) {
    throw new InvalidAddressError(tx.to);
  }
  if (tx.amount <= 0n) {
    throw new InvalidAmountError(tx.amount);
  }
  if (balance < tx.amount) {
    throw new InsufficientBalanceError(balance, tx.amount);
  }
}

export function executeTransaction(tx: CryptoTransaction, balance: bigint): bigint {
  validateTransaction(tx, balance);
  return balance - tx.amount;
}

export async function safeExecuteTransaction(
  tx: CryptoTransaction,
  balance: bigint
): Promise<bigint | CryptoError> {
  try {
    return executeTransaction(tx, balance);
  } catch (error) {
    if (error instanceof CryptoError) {
      return error;
    }
    return new CryptoError('UNKNOWN_ERROR', 'Unexpected error occurred');
  }
}