import axios from 'axios';
import { ApiResponse, ApiError } from './types';

const API_BASE_URL = 'https://api.example.com';

export const fetchCryptoData = async (symbol: string): Promise<ApiResponse | ApiError> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/crypto/${symbol}`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

export const fetchMarketData = async (): Promise<ApiResponse | ApiError> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/market`);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};

export const getHistoricalData = async (symbol: string, timeframe: string): Promise<ApiResponse | ApiError> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/historical/${symbol}`, { params: { timeframe } });
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
};