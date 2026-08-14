import axios, { AxiosRequestConfig } from 'axios';

type RetryOptions = {
    retries: number;
    factor?: number;
    minTimeout?: number;
};

const defaultRetryOptions: RetryOptions = {
    retries: 5,
    factor: 2,
    minTimeout: 1000,
};

const retry = async <T>(
    fn: () => Promise<T>,
    options: RetryOptions = defaultRetryOptions
): Promise<T> => {
    const { retries, factor, minTimeout } = options;
    let attempt = 0;

    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            attempt++;
            if (attempt >= retries) throw error;
            const timeout = minTimeout ? minTimeout * Math.pow(factor || 2, attempt - 1) : 1000;
            await new Promise(res => setTimeout(res, timeout));
        }
    }
    throw new Error('Max retries exceeded');
};

export { retry };