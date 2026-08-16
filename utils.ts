import fetch from 'node-fetch';

export async function fetchData(url: string): Promise<any> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch data');
    }
}

export function validateAddress(address: string): boolean {
    const addressPattern = /^0x[a-fA-F0-9]{40}$/;
    return addressPattern.test(address);
}

export function handleError(error: Error): void {
    console.error('Error:', error.message);
    // Additional error handling logic can be implemented here
}

export function isNetworkError(error: Error): boolean {
    return error.message.includes('network');
}
