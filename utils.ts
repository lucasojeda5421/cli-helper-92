export interface CryptoHolding {
  symbol: string;
  amount: number;
  priceUsd: number;
}

export function normalizeCryptoData(rawData: any[]): CryptoHolding[] {
  return rawData
    .filter((item) => 
      item && 
      typeof item.symbol === 'string' && 
      typeof item.amount === 'number' && 
      typeof item.priceUsd === 'number'
    )
    .map((item) => ({
      symbol: item.symbol.toUpperCase(),
      amount: item.amount,
      priceUsd: item.priceUsd,
    }));
}

export function calculateTotalValue(holdings: CryptoHolding[]): number {
  return holdings.reduce((sum, holding) => {
    return sum + holding.amount * holding.priceUsd;
  }, 0);
}

export function getTopHoldings(holdings: CryptoHolding[], limit: number = 5): CryptoHolding[] {
  return [...holdings]
    .sort((a, b) => {
      const valueA = a.amount * a.priceUsd;
      const valueB = b.amount * b.priceUsd;
      return valueB - valueA;
    })
    .slice(0, limit);
}

export function convertUsdToCrypto(amountUsd: number, priceUsd: number, decimals: number = 8): number {
  if (priceUsd <= 0) {
    return 0;
  }
  const result = amountUsd / priceUsd;
  return parseFloat(result.toFixed(decimals));
}

export function groupHoldingsBySymbol(holdings: CryptoHolding[]): Record<string, CryptoHolding[]> {
  return holdings.reduce((groups, holding) => {
    const key = holding.symbol;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(holding);
    return groups;
  }, {} as Record<string, CryptoHolding[]>);
}

export function aggregateHoldings(holdings: CryptoHolding[]): CryptoHolding[] {
  const grouped = groupHoldingsBySymbol(holdings);
  return Object.keys(grouped).map((symbol) => {
    const group = grouped[symbol];
    const totalAmount = group.reduce((sum, h) => sum + h.amount, 0);
    const totalValue = group.reduce((sum, h) => sum + h.amount * h.priceUsd, 0);
    const avgPrice = totalValue / totalAmount;
    return {
      symbol,
      amount: parseFloat(totalAmount.toFixed(8)),
      priceUsd: parseFloat(avgPrice.toFixed(2)),
    };
  });
}
