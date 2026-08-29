interface Wallet {
  address: string;
  privateKey: string;
}

/**
 * Generates a wallet from seed.
 * @param seed - Input seed string
 * @returns Generated wallet
 */
function generateWallet(seed: string): Wallet {
  const address = '0x' + seed.padEnd(40, '0').slice(0, 40);
  const privateKey = '0x' + '1'.repeat(64);
  return { address, privateKey };
}

/**
 * Validates crypto address format.
 * @param address - Address to validate
 * @returns Validation result
 */
function isValidAddress(address: string): boolean {
  return address.length === 42 && address.startsWith('0x');
}

/**
 * Computes simple hash for data.
 * @param data - Input data
 * @returns Hash string
 */
function simpleHash(data: string): string {
  let h = 0;
  for (let i = 0; i < data.length; i++) {
    h = (h * 31 + data.charCodeAt(i)) | 0;
  }
  return h.toString(16);
}

/**
 * Signs message with private key.
 * @param message - Message to sign
 * @param privateKey - Private key
 * @returns Signature
 */
function signMessage(message: string, privateKey: string): string {
  if (!privateKey.startsWith('0x')) {
    throw new Error('Bad key');
  }
  return '0x' + simpleHash(message + privateKey).padStart(64, '0');
}

/**
 * Prepares and signs a transfer.
 * @param from - From address
 * @param to - To address
 * @param amount - Transfer amount
 * @param privateKey - Key for signing
 * @returns Signed tx hash
 */
function transfer(from: string, to: string, amount: number, privateKey: string): string {
  if (!isValidAddress(from) || !isValidAddress(to)) {
    throw new Error('Invalid addresses');
  }
  const txData = from + to + amount.toString();
  return signMessage(txData, privateKey);
}