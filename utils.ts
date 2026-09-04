import { ethers } from 'ethers';

export const formatUnits = (value: bigint, decimals: number = 18): string => {
  return ethers.formatUnits(value, decimals);
};

export const parseUnits = (value: string, decimals: number = 18): bigint => {
  return ethers.parseUnits(value, decimals);
};

export const isValidAddress = (address: string): boolean => {
  return ethers.isAddress(address);
};

export const retry = async <T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay);
  }
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateGasFee = (gasLimit: bigint, gasPrice: bigint): bigint => {
  return gasLimit * gasPrice;
};