import axios from 'axios';

export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    price: number;
}

export async function fetchCryptoData(id: string): Promise<CryptoData | null> {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = response.data;
        return {
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            price: data.market_data.current_price.usd,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching data:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return null;
    }
}

export async function fetchAllCryptos(): Promise<CryptoData[]> {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        return response.data.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
        }));
    } catch (error) {
        console.error('Error fetching all cryptocurrencies:', error);
        return [];
    }
}