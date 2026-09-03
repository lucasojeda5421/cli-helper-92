import { z } from 'zod';

const TransactionSchema = z.object({
  amount: z.number().positive(),
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  currency: z.enum(['BTC', 'ETH', 'SOL']),
});

export type Transaction = z.infer<typeof TransactionSchema>;

export const processTransactions = async (inputs: unknown[]): Promise<void> => {
  for (const input of inputs) {
    const validation = TransactionSchema.safeParse(input);

    if (!validation.success) {
      console.error('Invalid transaction schema:', validation.error.format());
      continue;
    }

    await executeTransaction(validation.data);
  }
};

const executeTransaction = async (tx: Transaction): Promise<void> => {
  console.log(`Processing ${tx.amount} ${tx.currency} to ${tx.address}`);
};