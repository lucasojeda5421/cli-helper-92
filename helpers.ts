import axios from 'axios';
import { createError } from './utils';

export const fetchCryptoData = async (url: string): Promise<any> => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return createError(`Network error: ${error.message}`);
        }
        return createError('An unknown error occurred');
    }
};

export const validateCryptoSymbol = (symbol: string): boolean => {
    const regex = /^[A-Z]{1,5}$/;
    return regex.test(symbol);
};

export const getCryptoPrice = async (symbol: string): Promise<number | null> => {
    if (!validateCryptoSymbol(symbol)) {
        throw new Error('Invalid crypto symbol');
    }
    const url = `https://api.crypto.com/v1/prices/${symbol}`;
    const data = await fetchCryptoData(url);
    return data ? data.lastPrice : null;
};