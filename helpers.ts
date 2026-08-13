import axios from 'axios';

interface CryptoData {
    symbol: string;
    price: number;
    changePercentage: number;
}

const API_URL = 'https://api.example.com/crypto';

export const fetchCryptoData = async (symbols: string[]): Promise<CryptoData[]> => {
    const response = await axios.get(`${API_URL}?symbols=${symbols.join(',')}`);
    return response.data.map((item: any) => ({
        symbol: item.symbol,
        price: parseFloat(item.price),
        changePercentage: parseFloat(item.changePercentage),
    }));
};

export const calculatePortfolioValue = (data: CryptoData[], holdings: Record<string, number>): number => {
    return data.reduce((total, crypto) => {
        const holding = holdings[crypto.symbol] || 0;
        return total + (holding * crypto.price);
    }, 0);
};

export const getTopPerformers = (data: CryptoData[], limit: number): CryptoData[] => {
    return data.sort((a, b) => b.changePercentage - a.changePercentage).slice(0, limit);
};