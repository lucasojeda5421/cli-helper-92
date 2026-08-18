import axios, { AxiosRequestConfig } from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retryRequest(config: AxiosRequestConfig, retries: number = MAX_RETRIES): Promise<any> {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (retries > 0) {
            await new Promise(r => setTimeout(r, RETRY_DELAY));
            return retryRequest(config, retries - 1);
        } else {
            throw error;
        }
    }
}

export { retryRequest };