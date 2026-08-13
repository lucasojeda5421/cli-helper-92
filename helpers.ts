import axios from 'axios';

export interface CryptoPrice {
    symbol: string;
    price: number;
}

export async function fetchCryptoPrices(symbols: string[]): Promise<CryptoPrice[]> {
    const response = await axios.get(`https://api.example.com/prices?symbols=${symbols.join(',')}`);
    const prices = response.data;
    return symbols.map((symbol) => ({
        symbol,
        price: prices[symbol],
    }));
}

export function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}

export function calculatePortfolioValue(prices: CryptoPrice[], quantities: { [key: string]: number }): number {
    return prices.reduce((total, { symbol, price }) => {
        const quantity = quantities[symbol] || 0;
        return total + price * quantity;
    }, 0);
}