export interface CryptoInput {
  type: 'address' | 'transaction' | 'amount';
  value: string;
}
function isValidAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}
function isValidTransaction(value: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(value);
}
function isValidAmount(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}
function validateInput(input: CryptoInput): boolean {
  if (!input.value) return false;
  switch (input.type) {
    case 'address': return isValidAddress(input.value);
    case 'transaction': return isValidTransaction(input.value);
    case 'amount': return isValidAmount(input.value);
    default: return false;
  }
}
function processInput(input: CryptoInput): string {
  if (input.type === 'amount') return `Amount: ${input.value} ETH`;
  return `Processed ${input.type}: ${input.value}`;
}
export function mainProcessingLoop(inputs: CryptoInput[]): string[] {
  const results: string[] = [];
  for (const input of inputs) {
    if (!validateInput(input)) {
      throw new Error(`Invalid ${input.type} input: ${input.value}`);
    }
    results.push(processInput(input));
  }
  return results;
}