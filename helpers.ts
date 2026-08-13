type CryptoCurrency = { name: string; symbol: string; marketCap: number; price: number; };

type Transaction = { from: string; to: string; amount: number; timestamp: Date; };

/**
 * Convert a number to a formatted currency string.
 * @param value - The number to format.
 * @param currency - The currency symbol.
 * @returns A formatted currency string.
 */
const formatCurrency = (value: number, currency: string): string => {
    return `${currency}${value.toFixed(2)}`;
};

/**
 * Calculate the market cap of a cryptocurrency.
 * @param crypto - The cryptocurrency object.
 * @returns The market cap in formatted string.
 */
const calculateMarketCap = (crypto: CryptoCurrency): string => {
    return formatCurrency(crypto.marketCap, '$');
};

/**
 * Logs a transaction to the console.
 * @param transaction - The transaction object.
 */
const logTransaction = (transaction: Transaction): void => {
    console.log(`Transaction from ${transaction.from} to ${transaction.to} of amount ${transaction.amount} at ${transaction.timestamp}`);
};

export { formatCurrency, calculateMarketCap, logTransaction };