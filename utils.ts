export interface CryptoData {
  symbol: string;
  price: number;
  timestamp: number;
}

export const formatCurrency = (amount: number, precision: number = 2): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: precision,
  });
};

export const calculatePercentageChange = (oldPrice: number, newPrice: number): number => {
  if (oldPrice === 0) return 0;
  return ((newPrice - oldPrice) / oldPrice) * 100;
};

export const sanitizeSymbol = (symbol: string): string => {
  return symbol.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
};

export const validateData = (data: any): data is CryptoData => {
  return (
    typeof data.symbol === 'string' &&
    typeof data.price === 'number' &&
    typeof data.timestamp === 'number'
  );
};