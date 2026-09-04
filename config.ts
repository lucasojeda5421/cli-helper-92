import { readFileSync, existsSync } from 'fs';

interface CryptoConfig {
  rpcUrl: string;
  timeout: number;
  retryAttempts: number;
}

const defaults: CryptoConfig = {
  rpcUrl: 'https://mainnet.infura.io/',
  timeout: 5000,
  retryAttempts: 3
};

export const loadConfig = (path: string): CryptoConfig => {
  if (!existsSync(path)) {
    return defaults;
  }

  try {
    const fileContent = readFileSync(path, 'utf-8');
    const parsed: Partial<CryptoConfig> = JSON.parse(fileContent);
    return { ...defaults, ...parsed };
  } catch (error) {
    console.error('Failed to parse config, using defaults');
    return defaults;
  }
};
