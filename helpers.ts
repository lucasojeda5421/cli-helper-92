import axios from 'axios';

export async function fetchCryptoPrices(cryptoIds: string[]): Promise<{ [key: string]: number | null }> {
    const prices: { [key: string]: number | null } = {};
    const baseUrl = 'https://api.coingecko.com/api/v3/simple/price';
    
    try {
        const response = await axios.get(baseUrl, { params: { ids: cryptoIds.join(','), vs_currencies: 'usd' } });
        cryptoIds.forEach(id => {
            prices[id] = response.data[id]?.usd || null;
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        cryptoIds.forEach(id => prices[id] = null);
    }
    return prices;
}

export function validateCryptoIds(cryptoIds: string[]): string[] {
    return cryptoIds.filter(id => typeof id === 'string' && id.length > 0);
}

export function handleFetchCryptoPrices(cryptoIds: string[]): Promise<{ [key: string]: number | null }> {
    const validIds = validateCryptoIds(cryptoIds);
    if (validIds.length === 0) {
        throw new Error('No valid cryptocurrency IDs provided.');
    }
    return fetchCryptoPrices(validIds);
}