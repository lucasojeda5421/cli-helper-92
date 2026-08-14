import { isAddress } from 'ethers';
import { request } from 'http';

export const validateInput = (address: string): boolean => {
    return isAddress(address);
};

export const fetchData = (address: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!validateInput(address)) {
            reject(new Error('Invalid address'));
            return;
        }
        request(`https://api.crypto.com/v1/address/${address}`, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', err => {
            reject(err);
        }).end();
    });
};

export const processAddresses = async (addresses: string[]) => {
    const results = [];
    for (const address of addresses) {
        try {
            const data = await fetchData(address);
            results.push(data);
        } catch (error) {
            console.error(`Error fetching data for ${address}:`, error.message);
        }
    }
    return results;
};