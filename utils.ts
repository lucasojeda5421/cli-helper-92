type ErrorType = 'NETWORK' | 'VALIDATION' | 'UNKNOWN';

interface CustomError extends Error {
    type: ErrorType;
}

function handleNetworkError(message: string): CustomError {
    return { name: 'NetworkError', message, type: 'NETWORK' };
}

function handleValidationError(message: string): CustomError {
    return { name: 'ValidationError', message, type: 'VALIDATION' };
}

function handleUnknownError(message: string): CustomError {
    return { name: 'UnknownError', message, type: 'UNKNOWN' };
}

function processTransaction(transaction: any): void {
    try {
        if (!transaction.amount || transaction.amount <= 0) {
            throw handleValidationError('Invalid amount specified.');
        }
        if (!transaction.recipient) {
            throw handleValidationError('Recipient address is missing.');
        }
        // Simulating network call
        const success = Math.random() > 0.2;
        if (!success) {
            throw handleNetworkError('Failed to process transaction due to network issue.');
        }
        console.log('Transaction processed successfully.');
    } catch (error) {
        if (error.type) {
            console.error(
                `${error.name}: ${error.message} (Type: ${error.type})`
            );
        } else {
            const unknownError = handleUnknownError('An unexpected error occurred.');
            console.error(`${unknownError.name}: ${unknownError.message}`);
        }
    }
}

export { processTransaction };