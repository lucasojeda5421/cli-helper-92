import { createHash, randomBytes } from 'crypto';

export function computeHash(input: string | Buffer, algorithm: string = 'sha256'): string {
  return createHash(algorithm).update(input).digest('hex');
}

export function getRandomBytes(size: number = 32): Buffer {
  return randomBytes(size);
}

export function hexEncode(data: Buffer | Uint8Array): string {
  return Buffer.from(data).toString('hex');
}

export function hexDecode(hex: string): Buffer {
  if (!/^[0-9a-fA-F]*$/.test(hex) || hex.length % 2 !== 0) {
    throw new Error('Invalid hex input');
  }
  return Buffer.from(hex, 'hex');
}

export function base64Encode(data: string | Buffer): string {
  const buf = Buffer.from(data);
  return buf.toString('base64');
}

export function base64Decode(encoded: string): Buffer {
  return Buffer.from(encoded, 'base64');
}

export function validateCryptoAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}