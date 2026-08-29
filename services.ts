export interface TransactionInput {
  address: string;
  amount: number;
  currency: string;
}

function validateAddress(address: string): boolean {
  if (typeof address !== 'string' || address.length < 10) {
    return false;
  }
  return /^[a-zA-Z0-9]{10,}$/.test(address);
}

function validateAmount(amount: number): boolean {
  return typeof amount === 'number' && amount > 0 && Number.isFinite(amount);
}

function validateCurrency(currency: string): boolean {
  const valid = ['BTC', 'ETH', 'USDT'];
  return typeof currency === 'string' && valid.includes(currency.toUpperCase());
}

export function validateInput(input: TransactionInput): boolean {
  if (!input || typeof input !== 'object') {
    return false;
  }
  return validateAddress(input.address) && validateAmount(input.amount) && validateCurrency(input.currency);
}

export class CryptoService {
  private queue: TransactionInput[] = [];
  enqueue(input: TransactionInput): boolean {
    if (!validateInput(input)) {
      return false;
    }
    this.queue.push(input);
    return true;
  }
  processAll(): void {
    let i = 0;
    while (i < this.queue.length) {
      const input = this.queue[i];
      if (validateInput(input)) {
        console.log('Processing transaction:', input);
      }
      i++;
    }
    this.queue = [];
  }
}