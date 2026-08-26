import { createHash } from 'crypto';

export interface CryptoPayload {
  timestamp: number;
  nonce: string;
  data: Record<string, unknown>;
}

export function generateApiSignature(payload: CryptoPayload, secretKey: string): string {
  const serialized = JSON.stringify({
    timestamp: payload.timestamp,
    nonce: payload.nonce,
    data: payload.data,
  });

  return createHash('sha256')
    .update(serialized + secretKey)
    .digest('hex');
}

export function sanitizeHashString(input: string): string {
  return input.toLowerCase().replace(/[^a-f0-9]/g, '');
}

export function parseSatoshisToBtc(satoshis: number): number {
  if (satoshis < 0) {
    throw new Error('Satoshis cannot be negative');
  }
  return satoshis / 100000000;
}

export function maskWalletAddress(address: string): string {
  if (address.length < 10) {
    return '***';
  }
  const start = address.slice(0, 6);
  const end = address.slice(-4);
  return `${start}...${end}`;
}