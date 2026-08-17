export interface CryptoInput {
    amount: number;
    currency: string;
}

export function validateInput(input: CryptoInput): boolean {
    if (input.amount <= 0) {
        throw new Error('Amount must be greater than zero');
    }
    const validCurrencies = ['BTC', 'ETH', 'LTC'];
    if (!validCurrencies.includes(input.currency)) {
        throw new Error('Invalid currency type');
    }
    return true;
}

export function processTransaction(input: CryptoInput) {
    try {
        validateInput(input);
        // Proceed with transaction logic
    } catch (error) {
        console.error(error.message);
    }
}