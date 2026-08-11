import axios, { AxiosError } from 'axios';

async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries === 0 || !(error instanceof AxiosError)) {
            throw error;
        }
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay);
    }
}

export { retry };