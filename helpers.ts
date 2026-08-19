import { BigNumber } from 'bignumber.js';

const PRECISION = 1e18;

export const calculatePriceImpact = (inputAmount: number, outputAmount: number): number => {
    if (inputAmount <= 0 || outputAmount <= 0) return 0;
    const impact = (inputAmount / (outputAmount + inputAmount)) * 100;
    return parseFloat(impact.toFixed(2));
};

export const optimizedTransactionFee = (baseFee: number, multiplier: number): number => {
    return BigNumber(baseFee)
        .multipliedBy(multiplier)
        .toNumber();
};

export const normalizeAmount = (amount: number): string => {
    return BigNumber(amount)
        .div(PRECISION)
        .toString();
};

export const toBigNumber = (value: number | string): BigNumber => {
    return BigNumber(value);
};