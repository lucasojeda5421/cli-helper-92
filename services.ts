interface TransactionInput {
  address: string;
  amount: number;
  currency: string;
}

const isValidAddress = (address: string): boolean => address.startsWith("0x") && address.length === 42;
const isValidAmount = (amount: number): boolean => amount > 0 && amount <= 1000000000;
const isValidCurrency = (currency: string): boolean => ["BTC", "ETH", "SOL"].includes(currency);

const validateInput = (input: TransactionInput): boolean => {
  return isValidAddress(input.address) && isValidAmount(input.amount) && isValidCurrency(input.currency);
};

export class CryptoProcessingService {
  process(inputs: TransactionInput[]) {
    const results = [];
    for (const input of inputs) {
      if (validateInput(input)) {
        results.push({ status: "success", txId: "tx_" + Date.now(), ...input });
      } else {
        results.push({ status: "invalid", input });
      }
    }
    return results;
  }
}