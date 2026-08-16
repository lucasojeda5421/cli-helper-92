import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function fetchWithRetry(url: string): Promise<any> {
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (attempt < MAX_RETRIES - 1) {
                attempt++;
                await new Promise(res => setTimeout(res, RETRY_DELAY));
            } else {
                throw error;
            }
        }
    }
}

export { fetchWithRetry };