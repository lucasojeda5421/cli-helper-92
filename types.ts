export type CryptoSymbol = 'BTC' | 'ETH' | 'SOL' | 'USDT';
export interface CryptoPriceData {
  symbol: CryptoSymbol;
  usdPrice: number;
  timestamp: number;
}
export interface CryptoTransactionData {
  txHash: string;
  symbol: CryptoSymbol;
  amount: number;
  fromAddress: string;
  toAddress: string;
  blockNumber: number;
}
export type CryptoData = CryptoPriceData | CryptoTransactionData;
export function isPriceData(data: CryptoData): data is CryptoPriceData {
  return (data as CryptoPriceData).usdPrice !== undefined;
}
export function isTransactionData(data: CryptoData): data is CryptoTransactionData {
  return (data as CryptoTransactionData).txHash !== undefined;
}
export function handleCryptoData(data: CryptoData): string {
  if (isPriceData(data)) {
    return `${data.symbol}: $${data.usdPrice} at ${new Date(data.timestamp).toISOString()}`;
  }
  if (isTransactionData(data)) {
    return `TX ${data.txHash}: ${data.amount} ${data.symbol} from ${data.fromAddress}`;
  }
  return 'unknown crypto data';
}
export function formatPriceData(priceData: CryptoPriceData): string {
  return `Current price for ${priceData.symbol} is ${priceData.usdPrice} USD`;
}
export function validateTransaction(tx: CryptoTransactionData): boolean {
  return tx.amount > 0 && tx.txHash.length > 0;
}
export function aggregatePrices(prices: CryptoPriceData[]): Record<CryptoSymbol, number> {
  const result: Partial<Record<CryptoSymbol, number>> = {};
  for (const p of prices) {
    result[p.symbol] = p.usdPrice;
  }
  return result as Record<CryptoSymbol, number>;
}