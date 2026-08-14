import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(url: string, retries: number = MAX_RETRIES): Promise<any> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return fetchWithRetry(url, retries - 1);
        }
        throw error;
    }
}

export { fetchWithRetry };