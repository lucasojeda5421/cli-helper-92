import * as crypto from 'crypto';

export function hashInput(input: unknown): string {
  if (input === null || input === undefined) {
    throw new Error('Input is required');
  }
  const str = String(input);
  if (str.length === 0) {
    throw new Error('Input cannot be empty');
  }
  try {
    return crypto.createHash('sha256').update(str).digest('hex');
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'unknown';
    throw new Error('Hashing failed: ' + msg);
  }
}

export function generateKey(length: number = 32): string {
  if (length < 16 || length > 64) {
    throw new Error('Key length must be between 16 and 64');
  }
  try {
    return crypto.randomBytes(length).toString('hex');
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'unknown';
    throw new Error('Key generation failed: ' + msg);
  }
}

export function encryptData(data: string, key: string): string {
  if (typeof data !== 'string' || data.length === 0) {
    throw new Error('Data must be non-empty string');
  }
  if (typeof key !== 'string' || key.length < 16) {
    throw new Error('Key must be string with length >= 16');
  }
  try {
    const keyBuffer = Buffer.from(key.padEnd(32, '0').substring(0, 32));
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'unknown';
    throw new Error('Encryption failed: ' + msg);
  }
}

export function decryptData(encrypted: string, key: string): string {
  if (typeof encrypted !== 'string' || !encrypted.includes(':')) {
    throw new Error('Invalid encrypted data format');
  }
  if (typeof key !== 'string' || key.length < 16) {
    throw new Error('Key must be string with length >= 16');
  }
  try {
    const [ivHex, dataHex] = encrypted.split(':');
    if (!ivHex || !dataHex) {
      throw new Error('Malformed encrypted data');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const keyBuffer = Buffer.from(key.padEnd(32, '0').substring(0, 32));
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
    let decrypted = decipher.update(dataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'unknown';
    throw new Error('Decryption failed: ' + msg);
  }
}