export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
};

export const processInput = (input: Record<string, string>): void => {
  const { address, amount } = input;

  if (!validateAddress(address)) {
    throw new Error('invalid wallet address format');
  }

  if (!validateAmount(amount)) {
    throw new Error('invalid transaction amount value');
  }

  console.log('processing validated transaction data');
};