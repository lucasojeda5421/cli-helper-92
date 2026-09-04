export interface NetworkConfig {
  rpcUrl: string;
  chainId: number;
  timeoutMs: number;
}

export interface CryptoConfig {
  provider: string;
  retries: number;
  debug: boolean;
}

/**
 * Application configuration management for crypto cli operations
 */
export const getNetworkConfig = (network: string): NetworkConfig => {
  const configs: Record<string, NetworkConfig> = {
    mainnet: { rpcUrl: 'https://mainnet.infura.io', chainId: 1, timeoutMs: 5000 },
    sepolia: { rpcUrl: 'https://sepolia.infura.io', chainId: 11155111, timeoutMs: 10000 }
  };

  return configs[network] || configs['sepolia'];
};

/**
 * Global settings for client behavior
 */
export const appConfig: CryptoConfig = {
  provider: 'ethers-v6',
  retries: 3,
  debug: false
};

export type ConfigRegistry = {
  network: NetworkConfig;
  global: CryptoConfig;
};