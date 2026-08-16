import axios, { AxiosRequestConfig } from 'axios';

async function retry<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            if (attempt === retries) throw error;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Max retry attempts reached');
}

export { retry };