export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
}

export function normalizeCryptoData(raw: any): CryptoData[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item: any) => ({
      id: String(item.id || item.coin_id || ''),
      symbol: String(item.symbol || item.ticker || '').toUpperCase(),
      name: String(item.name || ''),
      price: Number(item.price || item.current_price || 0),
      marketCap: Number(item.market_cap || item.marketCap || 0),
    }))
    .filter((item) => item.id.length > 0 && item.price > 0);
}

export function calculateTotalMarketCap(data: CryptoData[]): number {
  return data.reduce((total, item) => total + item.marketCap, 0);
}

export function getHighestPriced(data: CryptoData[], limit: number = 3): CryptoData[] {
  return data
    .slice()
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
}

export function formatNumber(value: number): string {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  return value.toFixed(2);
}

export function filterByMinimumPrice(data: CryptoData[], minPrice: number): CryptoData[] {
  return data.filter((item) => item.price >= minPrice);
}